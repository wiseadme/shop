<template>
  <div class="slider" ref="slider">
    <div class="slider__line">
      <div ref="line" class="slider__line-inner">
        <div
          v-for="slide in slides"
          :key="slide.slide"
          :class="['slider__slide', {'scale-in': !slide.active}]"
          ref="slides"
        >
          <div class="slider__image-wrap">
            <img
              :src="`/img/slider/${slide.img}`"
              alt=""
              class="slider__image"
            >
          </div>
          <div class="slider__content">
            <div class="slider__heading">
              <h1 class="slider__head">Our best online shop</h1>
            </div>
            <span class="slider__cont-line"></span>
            <div class="slider__desc">
              <span class="slider__text">
                slide text description
              </span>
            </div>
          </div>
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
				carousel: true,
        currentSlide: 0,
        slideWidth: 0
			}
		},

		mounted() {
			this.addActive()
			this.slideWidth = parseFloat(getComputedStyle(this.$refs.slides[0]).width)
		},

		computed: {
			actualInfo() {
				return this.slides[this.currentSlide]
			}
		},

		methods: {
			addActive() {
				let vm = this
				this.$refs.line.addEventListener('click', function () {
					vm.currentSlide += 1
					vm.slides[vm.currentSlide - 1].active = false
          vm.moveLine()
          vm.animate(this, vm.activeSlide)
				})
			},

      moveLine() {
				if (this.slideWidth * this.currentSlide) {

        }
				this.$refs.line.style.transform = `translateX(${this.currentSlide * (-20)}%)`
      },

      activeSlide() {
				this.slides[this.currentSlide].active = true
      },

      animate(target, cb) {
				target.removeEventListener('transitionend', cb)
        target.addEventListener('transitionend', cb)
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

    &__line {
      position: relative;
      width: 75%;
      height: 100%;
      overflow: hidden;

      &-inner {
        position: absolute;
        display: flex;
        width: 500%;
        height: 100%;
        transition: .5s all;
      }
    }

    &__slide {
      display: inline-block;
      position: relative;
      width: 75%;
      height: 100%;
      overflow: hidden;
      font-size: 0;
      vertical-align: top;
      transition: .3s all;
    }

    &__image-wrap {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, .5);
      background-blend-mode: multiply;
    }

    &__image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -2;
    }

    &__content {
      @include flexAlign(center, center, column);
      width: 80%;
      height: 200px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &__heading,
    &__desc {
      @include flexAlign(center, flex-start);
      width: 100%;
      height: 40px;
      text-align: left;
    }

    &__head {
      @include fontPlay(#ffffff, 25px);
      width: 100%;
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    &__cont-line {
      width: 100%;
      height: 3px;
      background: #00d42b;
    }

    &__text {
      @include fontPlay(#ffffff, 14px);
      text-transform: uppercase;
      letter-spacing: 2px;
    }

    &__info {
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      z-index: 8;
      width: 25%;
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


