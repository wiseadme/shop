<template>
  <div class="contact-block">
    <div class="icon-wrap">
      <div class="icon"></div>
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
  }
  .icon-wrap{
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .icon{
    display: block;
    background-image: url("../../assets/img/phone.svg");
    background-size: cover;
    width: 20px;
    height: 20px;
    margin: 4px auto 0;
  }

  .phones-wrap{
    color: #040424;
  }
  .phone{
    @include font($darkBlue, .8em);
    line-height: 1.6em;
    padding: 4px 0;

  }
</style>
