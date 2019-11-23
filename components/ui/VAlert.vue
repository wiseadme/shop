<template>
  <div :class="['alert', className]">
    <span class="alert__text">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    className: {
      type: String,
      required: true
    }
  }
}
</script>

