<template>
  <div class="card">
    <div class="card-image-wrap">
      <img class="card__image" :src="img" :alt="head">
    </div>
    <h2 class="card__head">{{head}}</h2>
    <div class="card-text-wrap">
      <!-- <p class="card__text">
        {{text}}
      </p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'VCard',
  props: {
    img: {
      type: String
    },
    head: {
      type: String
    },
    text: {
      type: String
    }
  }
}
</script>

<style lang="sass">
  .card
    width: 300px
    margin: 20px
    border-radius: 4px
    overflow: hidden
    box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12) !important
    
  .card-image-wrap
    width: auto
    height: 250px
    overflow: hidden

  .card__image
    width: 100%
    height: 100%
    object-fit: cover
</style>

