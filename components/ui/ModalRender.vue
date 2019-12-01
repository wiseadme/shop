<script>
  import VInput from './VInput'
  import VButton from './VButton'
  import VModal from './VModal'

  export default {
    components: {
      VInput,
      VButton,
      VModal
    },
    props: {
      modals: {
        type: Array,
      }
    },

    methods: {
      createVNodes(nodesArray, render) {
        const vNodes = []
        nodesArray.forEach(it => {
          vNodes.push(render('h1', { slot: 'header' }, it.head.value))
          if (it.inputs.length) {
            it.inputs.forEach(it => {
              vNodes.push(render(VInput, {
                slot: 'body',
                props: {
                  label: it.label,
                  placeholder: it.placeholder,
                },
                on: {}
              }))
            })
          }
        })
        return vNodes
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