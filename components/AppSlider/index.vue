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
        :class="['slides',
        {'slides-prev': slide.prev, 'slides-next': slide.next, 'slides-active': slide.active, 'slides-move': slide.move}
        ]"
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
  import {debounce} from '@/utils'

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
						active: true,
						next: false,
						prev: false,
						move: false
					},
					{
						img: 'slide-1.jpg',
						title: 'center',
						text: 'something just a simple text',
						active: false,
						next: true,
						prev: false,
						move: false
					},
					{
						img: 'slide-3.jpg',
						title: 'center',
						text: 'something just a simple text',
						active: false,
						next: false,
						prev: false,
						move: false
					},
					{
						img: 'slide-4.jpg',
						title: 'center',
						text: 'something just a simple text',
						active: false,
						next: false,
						prev: false,
						move: false
					},
					{
						img: 'slide-5.jpg',
						title: 'center',
						text: 'something just a simple text',
						active: false,
						next: false,
						prev: true,
						move: false
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

    created() {
			this.changeSlide = debounce(this.changeSlide, 500)
		},

		mounted() {
			document.addEventListener('click', this.changeSlide.bind(this, 1))
		},

		methods: {
			changeSlide(step) {
				this.prevSlide()
				this.indexControl(step)
				this.nextSlide()
			},

			indexControl(step) {
				if (this.index + step > this.slides.length - 1) {
					this.index = 0
				} else if (this.index + step < 0) {
					this.index = this.slides.length - 1
				} else {
					this.index += step
				}
			},

			nextSlide() {
				const next = this.index + 1 > this.slides.length - 1 ? 0 : this.index + 1
				this.slides[this.index].active = true
				this.slides[this.index].next = false
				this.slides[next].next = true
			},

			prevSlide() {
				const prev = this.index - 1 >= 0 ? this.index - 1 : this.slides.length - 1
				this.slides[prev].prev = false
				this.slides[this.index].active = false
				this.slides[this.index].prev = true
			}
		},

		computed: {}
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
    z-index: 0;


    &-active {
      z-index: 10;
      transform: translateX(0);
      transition: all .5s ease-in-out;
    }

    &-next {
      z-index: 9;
      transform: translateX(100%);
      transition: all .5s ease-in-out;
    }

    &-prev {
      z-index: 9;
      transform: translateX(-100%);
      transition: all .5s ease-in-out;
    }

    &-move {
      transform: translateX(-100%);
      transition: transform 3s ease-in-out;
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


