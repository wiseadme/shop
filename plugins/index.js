import Vue from "vue"
import Notifications from '../services/Notifications'
import './gsap/esm/TweenMax'

import '../assets/scss/fonts/iconfont/material-icons.css'

import BaseComponents from "./BaseComponents"

Object.keys(BaseComponents).forEach(cmp => {
  Vue.component(cmp, BaseComponents[cmp])
})

Vue.use(Notifications)
