<script>
  import VInput from './VInput'
  import VButton from './VButton'
  import VModal from './VModal'

  export default {
    name: 'VModalRender',
    components: {
      VInput,
      VButton,
      VModal
    },
    props: {
      modals: {
        type: Object,
      }
    },

    methods: {
      createVNodes(nodeObject, render) {
        return this.vNodeFromObject(nodeObject, render)
      },

      vNodeFromObject(obj, render) {
        const nodes = []
        Object.keys(obj).forEach(it => {
          if (obj[it]) {
            obj[it].forEach(v => {
              const { element, slot, attrs, on, nativeOn, props, value } = v
              nodes.push(render(element, { slot, attrs, nativeOn, on, props }, value))
            })
          }
        })
        return nodes
      }
    },

    render(h) {
      return h('div', { class: 'modal-wrap' }, [
        h(VModal, (() => this.createVNodes(this.modals, h))())
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .modal-wrap {
    @include flexAlign(center);
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .4);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 999;
  }

  .modal {
    width: 500px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: $boxShadow;

    &__header {
      @include fontPlay($white, 1.2em);
      text-align: center;
      padding: 15px;
      background: $blue;
    }

    &__body {
      background: $white;
      padding: 15px;
    }

    &__footer {
      padding: 15px;
      background: $white;
    }
  }
</style>