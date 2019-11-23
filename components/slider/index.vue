<template>
  <div class="slider-block" ref="sliderBlock">
    <div class="slide-wrap" v-for="(slide, i) in slides" :key="slide" ref="slides">
      <img :src="`/img/slider/${slide}`" alt class="slide">
      <div class="slide-head__wrap">
        <h1 ref="heads" class="slide-head__text">{{slideHeads[i]}}</h1>
      </div>
    </div>
    <div class="buttons-block">
      <div class="buttons-block__prev">
        <svg class="prev" viewBox="0 0 24 24" ref="prev">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
        </svg>
      </div>
      <div class="buttons-block__next" ref="next">
        <svg class="next" viewBox="0 0 24 24">
          <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
        </svg>
      </div>
    </div>
    <div class="tumbnails">
      <div v-for="(slide, i) in slides" :key="i" class="tumbnails__item"></div>
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
          'slide-1.jpg',
          'slide-2.jpg',
          'slide-3.jpg',
          'slide-4.jpg',
          'slide-5.jpg'
        ],
        slideHeads: [
          'Табак индийский',
          'Кубанский сорт',
          'Азербайджанскик сорта табака',
          'Китайский табак',
          'Узбекский табак'
        ],
        carousel: true,
        setTimer: ''
      }
    },

    mounted() {
      this.addActive()
      this.$refs.next.addEventListener('click', this.nextSlide.bind(null, 1))
      this.$refs.prev.addEventListener('click', this.nextSlide.bind(null, -1))
      this.setTimer = setInterval(() => {
        this.nextSlide(1)
      }, 4000)
    },

    methods: {
      addActive() {
        let slides = this.$refs.slides
        slides[0].classList.add('active')
      },

      nextSlide(n) {
        let vm = this
        let slides = vm.$refs.slides
        let active = slides.findIndex(it => it.classList.contains('active'))
        if (active + n < 0) {
          slides[active].classList.remove('active')
          active = slides.length - 1
          slides[active].classList.add('active')
          return
        }
        if (active + n > slides.length - 1) {
          slides[slides.length - 1].classList.remove('active')
          active -= active
          slides[active].classList.add('active')
          return
        }
        slides[active].classList.remove('active')
        slides[active + n].classList.add('active')
      }
    },

    beforeDestroy() {
      this.$refs.next.removeEventListener('click', this.nextSlide.bind(null, 1))
      this.$refs.prev.removeEventListener('click', this.nextSlide.bind(null, -1))
      clearInterval(this.setTimer)
    }
  }
</script>

<style lang="scss">
  .slider-block {
    position: relative;
    display: block;
    width: 100%;
    height: 300px;
    top: 0;
    left: 0;
  }

  .slide-wrap {
    position: absolute;
    width: 100%;
    height: 300px;
    transition: opacity 1s ease;
    overflow: hidden;
    opacity: 0;
  }

  .slide {
    display: block;
    width: 100%;
    min-height: 300px;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .active {
    opacity: 1 !important;
    z-index: 10;
    transition: opacity 1s ease;
  }

  .slide:nth-child(1) {
    z-index: 3;
  }

  .slide-head__wrap {
    display: block;
    position: relative;
    top: calc(50% - 2em);
    z-index: 100;
    width: 100%;
    height: auto;
    text-align: center;
  }

  .slide-head__text {
    color: #fff;
    z-index: 3;
    font-size: 3em;
    opacity: 1;
  }

  .buttons-block {
    display: flex;
    justify-content: space-between;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    z-index: 99;
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

  .next,
  .prev {
    fill: #fff;
  }

  .slider-block:hover .buttons-block__prev {
    opacity: 1;
  }

  .slider-block:hover .buttons-block__next {
    opacity: 1;
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


