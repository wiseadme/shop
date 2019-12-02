<template>
  <div id="app">
    <div class="page-wrap">
      <AdminHeader v-if="isAdmin"/>
      <AdminAside v-if="isAdmin"/>
      <Notify/>
      <ModalRender v-if="showModal" :modals="modals"/>
      <div class="admin-routes">
        <transition name="fadeIn">
          <nuxt/>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  import AdminHeader from '@/components/AdminLayout/AdminHeader'
  import AdminAside from '@/components/AdminLayout/AdminAside'
  import Notify from '@/services/Notifications/Notify'
  import VModal from '@/components/ui/VModal'
  import VInput from '@/components/ui/VInput'
  import VButton from '@/components/ui/VButton'
  import ModalRender from '@/components/ui/ModalRender'

  export default {
    components: {
      AdminHeader,
      AdminAside,
      Notify,
      VModal,
      VInput,
      VButton,
      ModalRender
    },

    data() {
      return {
        showModal: true,
        create: true,
        modals: [
          {
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
                  'button-type': 'info', 'button-text': 'создать'
                },
                nativeOn: {
                  click: this.toggleModal
                }
              },
              {
                element: VButton,
                slot: 'footer',
                props: {
                  'button-type': 'warning', 'button-text': 'отменить'
                }
              }
            ]
          }
        ]
      }
    },

    mounted() {

    },

    methods: {
      toggleModal() {
        this.showModal = !this.showModal
      }
    },

    computed: {
      ...mapState({
        isAdmin: state => state.AuthModule.isAdmin
      })
    }
  }
</script>

<style lang="scss">
  .admin-routes {
    position: absolute;
    left: $adminAside;
    top: $adminHeader;
    height: calc(100vh - 60px);
    width: calc(100% - 200px);
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
