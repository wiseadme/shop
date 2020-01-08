<template>
  <form class="search">
    <div class="search__group">
      <input class="search__input" type="text" placeholder="поиск по товарам">
      <button class="search__icon" value="" @click.prevent></button>
    </div>
  </form>
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
.search{
  width: 100%;
}
  .search__group{
    display: flex;
  }
  .search__icon{
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    background-image: url("../../../assets/img/search.svg");
    background-size: 50%;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: $blue;
    cursor: pointer;
  }

  .search__icon:active{
    box-shadow: inset 0px 0px 7px 3px rgba(0,0,0,0.4);
  }

  .search__input{
    width: 100%;
    min-width: 150px;
    height: 40px;
    padding: 0 5px;
    border: 1px solid $blue;
    border-right: none;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
    float: left;
  }
  .search__input::placeholder{
    color:rgb(197, 202, 200);
  }
</style>