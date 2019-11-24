<template>
  <div class="contact-block">
    <div class="icon-wrap">
      <i class="material-icons icon">phone_iphone</i>
    </div>
    <div class="phones-wrap">
      <p class="phone">+7(926)781-22-38</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
  .contact-block{
    display: flex;
    align-items: center;
    height: 40px;
  }
  .icon-wrap{
    margin: 0 5px;
  }

  .icon{
    color: $blue;
  }

  .phones-wrap{
    color: $darkBlue;
  }
  .phone{
    @include fontPlay($darkBlue, .8em);
    line-height: 1.6em;
    padding: 4px 0;

  }
</style>
