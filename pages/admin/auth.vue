<template>
  <div class="admin-auth-page">
    <AppForm/>
  </div>
</template>

<script>
  import AppForm from '@/components/AppForm'

  export default {
    layout: 'auth',
    components: {
      AppForm
    }
  }
</script>

<style lang="scss">
  .admin-auth-page{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>