<template>
  <div id="app">
    <div class="page-wrap">
      <AdminHeader v-if="isAdmin"/>
      <AdminAside v-if="isAdmin"/>
      <Notify/>
      <ModalRender :modals="modals"/>
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
  import VInput from '../components/ui/VInput'
  import VButton from '../components/ui/VButton'
  import ModalRender from '../components/ui/ModalRender'

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
        showModal: false,
        create: true,
        modals: [
          {
            head: {
              element: 'h1',
              slot: 'header',
              value: 'Создать категорию'
            },
            inputs: [
              {
                element: VInput,
                slot: 'body',
                class: {
                  foo: true,
                  bar: false
                },
                props: {
                  label: 'Имя категории',
                  placeholder: 'Например "книги"'
                },
                on: {
                  // click: this.clickHandler
                },
              }
            ],

            buttons: []
          }
        ]
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
