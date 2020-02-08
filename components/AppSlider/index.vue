<template>
  <div ref="slider" class="slider">
    <div
      ref="box"
      class="slider-box"
    >
      <div
        v-for="slide in slides"
        :key="slide.img"
        ref="slides"
        class="slides"
      >
        <img
          :src="`/img/slider/${slide.img}`"
          alt=""
          class="slides-image"
        >
        <div class="slides-info">
          <div class="slides-heading">
            <h1 class="slides-head">Our online shop</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="slider-info"></div>
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
          {
            img: 'slide-2.jpg',
            title: 'center',
            text: 'something just a simple text',
            active: true
          },
          {
            img: 'slide-1.jpg',
            title: 'center',
            text: 'something just a simple text',
            active: false
          },
          {
            img: 'slide-3.jpg',
            title: 'center',
            text: 'something just a simple text',
            active: false
          },
          {
            img: 'slide-4.jpg',
            title: 'center',
            text: 'something just a simple text',
            active: false
          },
          {
            img: 'slide-5.jpg',
            title: 'center',
            text: 'something just a simple text',
            active: false
          },
        ],
        transitionOn: false,
        index: 0,
        amount: 5,
        outerIndex: 0,
        currentTranslate: [],
        startMove: null,
        movedLeft: 0,
        speed: 10,
      }
    },

    mounted() {
      this.$refs.slides.forEach((it, i) => {
        this.currentTranslate[i] = -this.slideWidth
        console.log(this.currentTranslate)
      })
      this.$refs.slider.addEventListener('click', () => {
        this.outerIndex = this.index % this.amount
        this.index >= (this.slides.length - 1) ? this.index = 0 : this.index += 1
        this.$refs.slides.forEach((it, i) => {
          it.style.cssText = `transform: translateX(+${this.currentTranslate[i] - this.slideWidth}px); opacity: 1;`
          this.currentTranslate[i] = this.currentTranslate[i] - this.slideWidth
        })
        const outerSlide = this.$refs.slides[this.outerIndex]
        outerSlide.style.transform = `translateX(+${this.currentTranslate[this.outerIndex] + (this.slideWidth * this.amount)}px)`
        outerSlide.style.opacity = '0'
        this.currentTranslate[this.outerIndex] = this.currentTranslate[this.outerIndex] + this.slideWidth * (this.amount)
        console.log(this.outerIndex, this.index)
      })
      this.$refs.box.style.width = this.slideWidth + 'px'
    },

    methods: {
      moveLine(time) {
        if (!this.startMove) this.startMove = time
        let progress = time - this.startMove
        // if ()
      }
    },

    computed: {
      slideWidth() {
        return this.$refs.slides[0].getBoundingClientRect().width
      }
    }
  }
</script>

<style lang="scss" scoped>
  .scale-in {
    transform: scale(.8);
  }

  .slider {
    position: relative;
    display: flex;
    width: 100%;
    height: 450px;
    overflow: hidden;

    &-box {
      width: 100%;
      position: relative;
      height: 450px;
    }
  }

  .slides {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    transform: translateX(-100%);
    transition: transform .4s ease-in-out;

    &:nth-child(2) {
      left: 100%;
    }

    &:nth-child(3) {
      left: 200%;
    }

    &:nth-child(4) {
      left: 300%;
    }

    &:nth-child(5) {
      left: 400%;
    }

    &::after {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, .5);
      background-blend-mode: multiply;
    }

    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

</style>


