<template>
  <div class="panel">
    <div class="panel__funcs">
      <span v-for="f in funcs" :key="f.icon" class="panel__funcs-item" @click="emitFuncEvent(f.event)">
        <i class="material-icons panel__funcs-icon">{{f.icon}}</i>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        funcs: [
          {icon: 'add', event: 'add'},
          {icon: 'create', event: 'create'},
          {icon: 'insert_drive_file', event: 'download'},
          {icon: 'save', event: 'save'},
          {icon: 'delete_forever', event: 'delete'}
        ]
      }
    },
    methods: {
      emitFuncEvent(eventName) {
        this.$emit(eventName)
      }
    }
  }
</script>

<style lang="scss">
  .panel {
    width: 100%;
    height: 60px;
    @include flexAlign(flex-end);

    &__funcs {
      margin: 0 20px;
      @include flexAlign(center);
    }

    &__funcs-item{
      @include flexAlign(center);
      width: 40px;
      height: 40px;
      background: $blue;
      border-radius: 50%;
      box-shadow: $boxShadow;
      cursor: pointer;
      margin: 0 5px;
    }

    &__funcs-icon {
      color: $white;
      font-size: 25px;
    }
  }
</style>