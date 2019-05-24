<template>
  <div class="">
        <div class="poll-content">
        <form @submit.prevent="onSubmit" v-if="!formSubmitted && question" class="form ui">
            <div class="question-title">
                <h3>{{question.title}}</h3>
            </div>

            <div v-for="error in errors" class="errors">
              <p>{{error}}</p>
            </div>

            <div class="options">
                <div class="ui radio checkbox">
                    <div class="field"  v-for="(option, index) in question.options" :key="index">
                        <input type="radio" v-model="selectedOption" name="option" :value="index" :id="index" >
                        <label :for="index">{{ option }}</label>
                    </div>
                </div>
            </div>

            <div class="field options" v-if="question.hasOpenTextField">
                <h4>Provide Open Answer</h4>
                <input type="text" name="openAnswer" v-model="openAnswer">
            </div>

            <div class="field">
                <button class="ui primary button" type="submit">Submit Answer</button>
            </div>
        </form>
        <div v-else-if="formSubmitted">
            <h3>You have submitted your answer! Wait for the next question</h3>
        </div>
        <div v-else>
            <h3>Please, wait until a question is posted.</h3>
        </div>
    </div>
  </div>
</template>

<script>



export default {
  name: 'Guest',
  data() {
    return {
        question: null,
        formSubmitted: false,
        selectedOption: null,
        openAnswer: null,
        errors: [],
    }
  },
  created() {
    console.log("guest emits join..")
    this.$socket.emit('joined');
  },
  sockets: {
    pollCreated(poll){
        console.log("poll created..", poll)
        this.formSubmitted = false;
        this.question = poll;
    }
  },
  methods: {
    validate() {
        this.errors = [];
        if (this.selectedOption === null) {
            this.errors.push("Please select one option");
        }

        const valid = this.errors.length === 0;
        return valid;
    },
    async onSubmit() {
        if (!this.validate()) {
            return;
        }

        this.$socket.emit('poll-answered', {
            option: this.selectedOption,
            openAnswer: this.openAnswer,
            question: this.question,
        });

        this.formSubmitted = true;
        this.selectedOption = null,
        this.question = null;
    }
  }
}
</script>

<style scoped>
.poll-content {
    text-align: left;
}

.question-title {
    padding: 20px;
    background: #eef5fd;
}

.errors {
    padding: 15px;
    margin: 10px 0;
    background-color: #DC7F7A;
    color: #fff;
    font-weight: bold;
}
.options {
    text-align: left;
    padding: 20px;
    background: #f0f0f0;
    margin: 20px 0;
}
button {
    border-radius: 0 !important;
    width: 250px;
    height: 50px;
}
.field {
    font-size: 17px;
    padding: 5px;
}
</style>
