<template>
  <div class="admin-main-page">
    <h1>Main Admin Page</h1>
  </div>
</template>

<script>
  export default {
    layout: 'admin',

    computed: {
      ...mapState({
        isAdmin: state => state.AuthModule.isAdmin
      })
    }
  }
</script>
