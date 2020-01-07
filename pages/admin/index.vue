<template>
  <div class="admin-main-page">

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
