import Vue from "vue"
import Notifications from '../services/Notifications'
// import Modal from '../services/Modal'
import BaseComponents from "./BaseComponents"
import './gsap/esm/TweenMax'

Object.keys(BaseComponents).forEach(cmp => {
  Vue.component(cmp, BaseComponents[cmp])
})

Vue.use(Notifications)
// Vue.use(Modal)
