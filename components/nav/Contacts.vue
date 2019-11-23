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

<style lang="css" scoped>
  .contact-block{
    display: flex;
    /* border: 1px solid red; */
  }
  .icon-wrap{
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .icon{
    display: block;
    margin: 0 auto;
    background-image: url("../../assets/img/phone.svg");
    background-size: cover;
    width: 20px;
    height: 20px;
    margin-top: 4px;
  }

  .phones-wrap{
    color: #040424;
  }
  .phone{
    padding: 4px 0;

  }
</style>
