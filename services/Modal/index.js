import Vue from 'vue'

export const modalEvents = new Vue({})

export default {
  install(Vue) {
    const modal = (section, modalType) => {
      modalEvents.$emit('showModal', { section, modalType })
    }
    Vue.prototype.$modal = modal
  }
}