<template>
  <div class="toolbar">
    <div class="toolbar__methods">
      <div
        v-for="f in functions"
        :key="f.icon"
        :class="['toolbar__methods-item', f.disabled ? 'toolbar__methods-item--disabled' : 'toolbar__methods-item--active']"
        @click="emitFuncEvent(f)"
        @mouseenter="f.tooltip = true"
        @mouseleave="f.tooltip = false"
      >
        <i class="material-icons toolbar__methods-icon">{{f.icon}}</i>
        <transition name="fadeIn" mode="out-in">
          <span v-if="f.tooltip" class="toolbar__methods-tooltip">{{f.description}}</span>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        functions: [
          {
            name: 'create',
            icon: 'add',
            event: 'create',
            description: 'Создать',
            tooltip: false,
            disabled: false
          },
          {
            name: 'edit',
            icon: 'create',
            event: 'edit',
            description: 'Редактировать',
            tooltip: false,
            disabled: false
          },
          {
            name: 'download',
            icon: 'insert_drive_file',
            event: 'download',
            description: 'Скачать',
            tooltip: false,
            disabled: false
          },
          {
            name: 'save',
            icon: 'save',
            event: 'save',
            description: 'Сохранить',
            tooltip: false,
            disabled: true
          },
          {
            name: 'delete',
            icon: 'delete_forever',
            event: 'delete',
            description: 'Удалить',
            tooltip: false,
            disabled: true
          }
        ]
      }
    },
    methods: {
      emitFuncEvent(func) {
        if (!func.disable) {
          this.$emit(func.event)
        }
      }
    }
  }
</script>

<style lang="scss">
  .toolbar {
    width: 100%;
    height: 60px;
    @include flexAlign(flex-end);

    &__methods {
      margin: 0 20px;
      @include flexAlign(center);
    }

    &__methods-item {
      position: relative;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      margin: 0 5px;
      transition: all .2s linear;

      &--active {
        background: $blue;
        box-shadow: $boxShadow;

        &:hover {
          background: $white;

          .toolbar__methods-icon {
            color: $blue;
          }
        }
      }

      &--disabled {
        background: $grey;
      }

    }

    &__methods-tooltip {
      padding: 10px;
      position: absolute;
      top: 110%;
      left: 50%;
      transform: translateX(-50%);
      background: $black;
      border-radius: 5px;
      box-shadow: $boxShadow;
      @include fontPlay($white, 12px)
    }

    &__methods-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: $white;
      font-size: 25px;
      transition: color .2s linear;
    }
  }
</style>