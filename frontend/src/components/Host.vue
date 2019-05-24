<template>
    <form @submit.prevent="onSubmit" class="create-question-form ui form">
      <div class="field">
        <h3>CREATE A NEW QUESTION</h3>
      </div>

      <div class="form-content">
        <div class="field">
          <label htmlFor="code">Title</label> 
          <input placeholder="title of the question" name="title" type="text" v-model="title"/>
        </div>

        <div class="field">
          <div class="ui right labeled input field"  v-for="(option) in options">
            <input @keyup="onOptionChange(option.id, $event.target.value)" type="text" :value="option.value"/>
            <div class="ui basic label" @click="removeOption(option.id)">Remove</div>
          </div>

          <button class="ui primary basic button" @click.prevent="addOption">
            <i class="plus icon"></i>
            ADD OPTION
          </button>
        </div>

        <div class="field">
          <div v-if="hasOpenTextField">
            <div class="ui right labeled input">
              <input placeholder="Open text field" name="openAnswer" type="text" />
              <div class="ui basic label" @click="toggleOpenTextField">Remove</div>
            </div>
          </div>
          <div v-else>
            <button class="ui primary basic button" @click.prevent="toggleOpenTextField">
              <i class="plus icon"></i>
              ADD OPEN TEXT FIELD
            </button>
          </div>
        </div>

        <div v-for="error in errors" class="errors">
          <p>{{error}}</p>
        </div>

        <div class="field">
          <button class="ui primary button" type="primary" htmlType="submit">
            PUBLISH 
          </button>
        </div>
        
        <Loading v-if="loading"/>

      </div>
    </form>
</template>

<script>

import Loading from './Loading'

export default {
  name: 'Host',
  components: {
    Loading,
  },
  props: {
  },
  data() {
    return {
        title: null,
        options: [],
        hasOpenTextField: false,
        errors: [],
    }
  },
  computed: {
      loading() {
        return this.$store.state.loading;
    }
  },
  created() {
    this.$socket.emit('host-joined');
    this.$socket.on('joined', () => {
        console.log(" a new guest joinged the poll")
    })
  },
  sockets: {
    connect: function() {
      console.log('socket connected')
    },
    joined: function(val) {
      console.log(" a new guest joinged the poll sockets:")
    }
  },
  methods: {
    validate() {
        this.errors = [];
        if (!this.title) {
            this.errors.push("Please Fill in the title of the question.")
        }
        if (this.options.length < 2 && !this.hasOpenTextField) {
            this.errors.push("Please add > 1 option and/or an open text field.")
        }

        const isValid =  this.errors.length === 0;
        
        return isValid;
    },
    async onSubmit() {
      if (!this.validate()) {
        return
      }

      console.log("form submitted " + this.title)
      const question = {
        title: this.title,
        options: this.options.map(op => op.value),
        hasOpenTextField: this.hasOpenTextField
      };
      await this.$store.dispatch('saveQuestion', question);

      this.$socket.emit('poll-created', question);

      this.$router.push('/result');
    },
    addOption() {
      this.options.push({
        id: (new Date()).getTime(),
      });
    },
    removeOption(id) {
      const _options = this.options.filter(option => option.id !== id);
      this.options = _options;
    },
    onOptionChange(id, value) {
      console.log("option changed..." + value)
      const option = this.options.find(op => op.id === id);
      option.value = value;
    },
    toggleOpenTextField() {
      this.hasOpenTextField = !this.hasOpenTextField;
    },
  }
}
</script>

<style scoped>
.ui.form {
    text-align: left;
}
h3 {
    padding: 20px;
    background: #f1f6f9;
}
.form-content {
    padding: 40px;
    background: #f3f7fb;
}
button {
    min-width: 155px;
    height: 40px;
    border-radius: 0 !important;
    margin-top: 25px;
}
.errors {
    padding: 15px;
    margin: 10px 0;
    background-color: #DC7F7A;
    color: #fff;
    font-weight: bold;
}
</style>
