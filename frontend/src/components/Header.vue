<template>
  <router-link to="/">
    <div class="header">
      <div class="logo">
        <img src="../assets/logo.png" alt="" />
      </div>
      <div><h2> LIVE Polling App</h2></div>  
    </div>
  </router-link>
</template>

<script>

export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>

<style scoped>
  .header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid;
    margin-bottom: 25px;
  }
  .logo img{
    width: 75px;
  }
</style>
