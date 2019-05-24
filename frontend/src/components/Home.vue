<template>
    <div class="ui text container">
      <div class="ui">
        <h2>Start Live Polling</h2>
        <h3>I am a..</h3>
      </div>
      <div class="ui divider"></div>
      <div class="ui two column doubling grid">
        <div class="column">
            <button class="ui blue basic button" @click="hostView">HOST</button>
        </div>
        <div class="column">
            <button class="ui teal basic button" @click="guestView">GUEST</button>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'home',
  methods: {
    hostView() {
        this.$router.push('/host');
    },
    guestView() {
        this.$router.push('/guest');
    }
  }
}
</script>