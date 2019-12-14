import VInput from '@/components/ui/VInput'
import VSelect from '../../ui/VSelect'
import VButton from '@/components/ui/VButton'

export default {
  data() {
    return {
      name: '',
      url: '',
      icon: '',
      position: '',
      code: 'category',
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
                    input: this.inputHandler.bind(this, 'name')
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
                    label: 'Ссылка на страницу',
                    placeholder: 'Например "/tovari"'
                  },
                  attrs: {},
                  on: {
                    input: this.inputHandler.bind(this, 'url')
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
                    label: 'Иконка категории',
                    placeholder: 'material icons'
                  },
                  attrs: {},
                  on: {
                    input: this.inputHandler.bind(this, 'icon')
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
                    label: 'Позиция в списке',
                    placeholder: 'Например 0'
                  },
                  attrs: {},
                  on: {
                    input: this.inputHandler.bind(this, 'position')
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
                    click: this.saveNewCategory
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

    saveNewCategory() {
      const { name, url, icon, position, code } = this
      const body = { name, url, icon, position, code }
      this.saveCategory(body).then(res => {
        this.$notify({
          type: 'success',
          message: res.message
        })
      })
    },

    inputHandler(prop, ev) {
      this[prop] = ev
    }
  }
}