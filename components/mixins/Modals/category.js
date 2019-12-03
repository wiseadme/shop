import VInput from '@/components/ui/VInput'
import VButton from '@/components/ui/VButton'
// import * as action from '@/store/ActionsType'

export default {
  data() {
    return {
      categoryName: '',
      category: {
        create: {
          head: [
            {
              element: 'h1',
              slot: 'header',
              children: 'Создать категорию'
            }
          ],
          inputs: [
            {
              element: 'div',
              slot: 'body',
              attrs: { class: 'modal__body-block' },
              children: [
                {
                  element: VInput,
                  slot: 'body',
                  props: {
                    label: 'Имя категории',
                    placeholder: 'Например "книги"'
                  },
                  attrs: {},
                  on: {
                    input: this.inputHandler
                  },
                  children: []
                },
              ]
            },
            {
              element: 'div',
              slot: 'body',
              attrs: { class: 'modal__body-block' },
              children: [
                {
                  element: VInput,
                  slot: 'body',
                  props: {
                    label: 'Единицы измерения',
                    placeholder: 'Например "штук"'
                  },
                  attrs: {},
                  on: {
                    click: ''
                  },
                  children: []
                },
              ]
            },
          ],
          buttons: [
            {
              element: 'div',
              slot: 'footer',
              attrs: {
                class: 'modal__buttons-block'
              },
              children: [
                {
                  element: VButton,
                  props: {
                    'button-type': 'info',
                    'button-text': 'создать'
                  },
                  nativeOn: {
                    click: this.sendCategory
                  }
                },
                {
                  element: VButton,
                  props: {
                    'button-type': 'warning',
                    'button-text': 'отменить'
                  },
                  nativeOn: {
                    click: this.toggleModal
                  }
                }
              ]
            }
          ]
        },
        update: {
          head: [
            {
              element: 'h1',
              slot: 'header',
              children: 'Обновить категорию'
            }
          ],
          inputs: [
            {
              element: VInput,
              slot: 'body',
              props: {
                label: 'Имя категории',
                placeholder: 'Например "книги"'
              },
              attrs: {
                className: 'hello'
              },
              on: { click: '' },
            }
          ],
          buttons: [
            {
              element: 'div',
              slot: 'footer',
              attrs: {
                class: 'modal__buttons-block'
              },
              children: [
                {
                  element: VButton,
                  props: {
                    'button-type': 'info',
                    'button-text': 'создать'
                  },
                  nativeOn: {
                    click: this.toggleModal
                  }
                },
                {
                  element: VButton,
                  props: {
                    'button-type': 'warning',
                    'button-text': 'отменить'
                  }
                }
              ]
            }
          ]
        }
      }
    }
  },

  methods: {
    ...mapActions({
      saveCategory: `AdminModule/${action.SAVE_CATEGORY}`
    }),

    toggleModal() {
      this.showModal = !this.showModal
    },

    sendCategory() {
      const body = {
        name: this.categoryName,
        code: 'categoryName'
      }
      this.saveCategory(body).then(res => {
        this.$notify({
          type: 'success',
          message: res.message
        })
      })
    },

    inputHandler(ev) {
      this.categoryName = ev
    }
  }
}