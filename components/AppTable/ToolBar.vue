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
            name: 'reload',
            icon: 'autorenew',
            event: 'reload',
            description: 'Обновить данные',
            tooltip: false,
            disabled: false
          },
          {
            name: 'formatTable',
            icon: 'format_list_numbered',
            event: 'format-table',
            description: 'Отображение колонок',
            tooltip: false,
            disabled: false
          },
          {
            name: 'edit',
            icon: 'edit',
            event: 'edit-row',
            description: 'Редактировать',
            tooltip: false,
            disabled: false
          },
          {
            name: 'showAll',
            icon: 'view_list',
            event: 'show-all',
            description: 'Отобразить все колонки',
            tooltip: false,
            disabled: false
          },
          {
            name: 'save',
            icon: 'save',
            event: 'save',
            description: 'Сохранить',
            tooltip: false,
            disabled: false
          },
          {
            name: 'delete',
            icon: 'delete_forever',
            event: 'delete',
            description: 'Удалить',
            tooltip: false,
            disabled: false
          },
          {
            name: 'add',
            icon: 'add',
            event: 'add',
            description: 'Добавить',
            tooltip: false,
            disabled: false
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
    @include flexAlign(center, center);

    &__methods {
      margin: 0 20px;
      position: relative;
      @include flexAlign(center, center);
    }

    &__methods-item {
      position: relative;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      cursor: pointer;
      margin: 0 5px;
      transition: all .2s linear;
      @include flexAlign(center, center);

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
      position: absolute;
      top: 120%;
      left: 50%;
      white-space: nowrap;
      padding: 5px 10px;
      transform: translateX(-50%);
      text-align: center;
      background: $darkGrey;
      border-radius: 5px;
      box-shadow: $boxShadow;
      z-index: 10;
      @include fontExo($white, 12px);
    }

    &__methods-icon {
      color: $white;
      font-size: 25px;
      transition: color .2s linear;
    }
  }
</style>
