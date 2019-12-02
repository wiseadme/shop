import VInput from '@/components/ui/VInput'
import VButton from '@/components/ui/VButton'

export default {
  data() {
    return {
      category: {
        create: {
          head: [
            {
              element: 'h1',
              slot: 'header',
              value: 'Создать категорию'
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
              element: VButton,
              slot: 'footer',
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
              slot: 'footer',
              props: {
                'button-type': 'warning',
                'button-text': 'отменить'
              }
            }
          ]
        },
        update: {
          head: [
            {
              element: 'h1',
              slot: 'header',
              value: 'Обновить категорию'
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
              element: VButton,
              slot: 'footer',
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
              slot: 'footer',
              props: {
                'button-type': 'warning',
                'button-text': 'отменить'
              }
            }
          ]
        }
      }
    }
  },

  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    }
  }
}