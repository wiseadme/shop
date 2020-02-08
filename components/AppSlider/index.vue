<template>
  <div class="slider" ref="sliderBlock">
    <div class="slider__line">
      <div
        v-for="slide in slides"
        :key="slide.slide"
        :class="['slider__slide-wrap', {active: slide.active}]"
        ref="slides"
      >
        <div class="slider__slide">
          <img
            :src="`/img/slider/${slide.img}`"
            alt=""
            class="slider__slide-img"
          >
        </div>
      </div>
    </div>
    <div class="slider__info">
      <h1 ref="heads" class="slider__info-head">{{actualInfo.title}}</h1>
      <span class="slider__info-text">{{actualInfo.text}}</span>
      <div class="tumbnails">
        <div v-for="(slide, i) in slides" :key="i" class="tumbnails__item"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      play: {
        type: Boolean
      }
    },

    data() {
      return {
        slides: [
          { img: 'slide-2.jpg', title: 'center', text: 'something just a simple text', active: true },
          { img: 'slide-1.jpg', title: 'last', active: false },
          { img: 'slide-3.jpg', title: 'last', active: false },
          { img: 'slide-4.jpg', title: 'last', active: false },
          { img: 'slide-5.jpg', title: 'last', active: false }
        ],
        carousel: true,
      }
    },

    mounted() {
      this.addActive()
    },

    computed: {
      actualInfo() {
        const actual = this.slides.filter(it => it.active)
        return actual[0]
      }
    },

    methods: {
      addActive() {
        let slides = this.$refs.slides
      },
    }
  }
</script>

<style lang="scss">
  .slider {
    position: relative;
    display: inline-block;
    width: 100%;
    height: 600px;
    top: 0;
    left: 0;
    overflow: hidden;

    &__line {
      /*width: 2500px;*/
      height: 100%;
    }

    &__slide-wrap {
      display: inline-block;
      width: calc(#{$screenWidth} * 70 / 100);
      height: 100%;
      transition: opacity 1s ease;
      overflow: hidden;
      opacity: 1;
      position: relative;
    }

    &__slide {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      &-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .slide:nth-child(1) {
      z-index: 3;
    }

    &__info {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 8;
      width: calc(#{$screenWidth} * 30 / 100);
      height: 100%;
      background: #272727;
      text-align: center;

      &-head {
        @include fontPlay($white, 3em);
        opacity: 1;
      }

      &-text {
        @include fontPlay($white, 1em);
        opacity: 1;
      }
    }
  }

  .active {

  }


  .buttons-block {
    display: flex;
    justify-content: space-between;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9;
  }

  .buttons-block__prev,
  .buttons-block__next {
    display: block;
    height: 40px;
    width: 40px;
    opacity: 0.5;
    transition: opacity 0.3s;
    cursor: pointer;
    border: 2px solid #ffffff;
    border-radius: 50%;
    margin: 0 10px;
  }

  .tumbnails {
    display: flex;
    position: absolute;
    bottom: 10px;
    z-index: 100;
    width: 100%;
    justify-content: center;
  }

  .tumbnails__item {
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #fff;
    margin: 5px;
    cursor: pointer;
  }
</style>


