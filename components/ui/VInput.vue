<template>
  <div ref="wrap" class="v-input-wrap">
    <div :class="['v-input', isValid !== null ? !isValid ? 'v-input--danger': 'v-input--success': '',
      { disabled, readonly, 'v-input--focused': focused && !disabled && !readonly,
      required: dirty && required && !search }]"
    >
      <label :class="['v-input__label', !disabled ? 'v-input__label--active' : 'v-input__label--disabled']">
        {{ label + (label && required ? "*" : "") }}
      </label>
      <span class="v-input__pre-icon" v-if="preIcon">
        <i :class="['material-icons', 'icon', isValid !== null ? isValid ? 'green' : 'red' : '']">{{preIcon}}</i>
      </span>
      <input :class="['v-input__field', { 'v-input__field--cutLeft': preIcon,
        'v-input__field--cutRight': clearIcon || isValid, 'v-input__field--disabled': disabled }]"
             v-model="search"
             :type="type"
             :placeholder="placeholder"
             :disabled="disabled"
             :readonly="readonly"
             @input="inputEmmitter"
             @focus="focusHandler"
             @blur="blurHandler"
      />
      <transition name="slideInDown">
        <div :class="['v-input__popover', isValid === null && clearIcon ? 'v-input__popover--info': isValid !== null ?
        isValid ? 'v-input__popover--success': 'v-input__popover--danger': '']"
             v-if="showPopover && popoverMessage">
          <span
            :class="['v-input__popover-content', isValid !== null && !isValid ? 'v-input__popover-content--danger' : '']">
            {{popoverMessage}}
          </span>
        </div>
      </transition>
      <span @mouseenter="showPopover = true" @mouseleave="showPopover = false"
            :class="['v-input__clear-icon']"
            v-if="clearIcon || isValid || isValid !== null">
        <i :class="['material-icons', 'icon', isValid !== null ? isValid ? 'green' : 'red' : '']">{{clearIcon}}</i>
      </span>
    </div>
    <transition name="slideInDown">
      <div class="v-input__reminder" v-if="remind && search">
        <router-link :to="remindTo" class="v-input__reminder-text">{{remind}}</router-link>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      label: {
        type: String,
      },
      value: {
        type: String,
      },
      placeholder: {
        type: String,
      },
      preIcon: {
        type: String,
      },
      clearIcon: {
        type: String,
      },
      type: {
        type: String,
        default: 'text',
      },
      required: {
        type: Boolean,
        default: false,
      },
      readonly: {
        type: Boolean,
        default: false,
      },
      text: {
        type: String,
      },
      remind: {
        type: String,
      },
      remindTo: {
        type: String,
      },
      disabled: {
        type: Boolean,
        default: false,
      },
      isValid: {
        type: Boolean,
        default: null,
      },
      popoverMessage: {
        type: String,
      },
    },
    data() {
      return {
        search: '',
        focused: '',
        dirty: '',
        showPopover: false,
      }
    },
    created() {
      this.search = this.value
    },
    methods: {
      inputEmmitter() {
        this.$emit('input', this.search)
      },
      focusHandler() {
        this.$emit('focus')
        this.focused = true
      },
      blurHandler() {
        this.$emit('blur')
        this.focused = false
        this.dirty = true
      },
    },
    watch: {
      value( to ) {
        this.search = to
      },
    },
  }
</script>
<style lang="scss" scoped>
  $blue: #004BC8;
  $white: #ffffff;
  $focused: $blue;
  $success: #22af43;
  $warning: #ffc31e;
  $danger: #ff3c0d;
  $fontColor: #191E32;
  $disFontColor: #9DA0AC;
  $labelFontColor: #737682;
  $disLabelFontColor: #9DA0AC;
  $plhColor: #A3A5AD;
  $borderColor: #cfd2e1;
  $disabledBackColor: #F4F4F5;
  $iconSize: 24px;
  $boxShadow: 0 6px 7px -4px rgba(0, 0, 0, .2), 0 11px 15px 1px rgba(0, 0, 0, .14), 0 4px 20px 3px rgba(0, 0, 0, .12);
  $boxShadowDanger: 0 6px 7px -4px rgba(255, 60, 13, 0.2), 0 11px 15px 1px rgba(255, 60, 13, 0.14), 0 4px 20px 3px rgba(255, 60, 13, 0.12);
  $boxShadowSuccess: 0 6px 7px -4px rgba(34, 175, 67, 0.2), 0 11px 15px 1px rgba(34, 175, 67, 0.14), 0 4px 20px 3px rgba(34, 175, 67, 0.12);
  $boxShadowInfo: 0 6px 7px -4px rgba(86, 151, 255, 0.2), 0 11px 15px 1px rgba(86, 151, 255, 0.14), 0 4px 20px 3px rgba(86, 151, 255, 0.12);
  @mixin popover($shadowColor) {
    box-shadow: $shadowColor;
    color: $shadowColor;
    @content;
  }
  @mixin popoverAfter {
    &::after {
      content: "";
      display: block;
      position: absolute;
      z-index: 9999;
      top: 100%;
      right: 15px;
      border-right: 6px solid transparent;
      border-left: 6px solid transparent;
      border-top: 6px solid $white;
    }
  }
  .v-input-wrap {
    position: relative;
  }
  .v-input__label {
    position: absolute;
    left: 12px;
    font-family: "Roboto", sans-serif;
    top: 8px;
    font-size: 12px;
    z-index: 10;
    &--active {
      color: $labelFontColor;
    }
    &--disabled {
      color: $disLabelFontColor;
    }
  }
  .v-input {
    height: 52px;
    background: $white;
    border: 1px solid $borderColor;
    border-radius: 3px;
    cursor: pointer;
    transition: border 0.1s linear;
    perspective: 1000px;
    &--focused {
      border-color: $focused;
    }
    &--warning {
      border-color: $warning;
    }
    &--danger {
      border-color: $danger;
    }
    &--success {
      border-color: $success;
    }
    &__field {
      position: relative;
      outline: none;
      border: none;
      height: auto;
      width: 100%;
      color: $fontColor;
      font-size: 16px;
      font-family: 'Roboto', sans-serif;
      background: transparent;
      padding: 24px 12px 5px;
      &--cutLeft {
        padding: 24px 12px 5px 35px;
        width: 100%;
      }
      &--cutRight {
        width: calc(100% - 45px);
      }
      &--disabled {
        color: $disFontColor;
        border: none;
      }
      &::placeholder {
        color: $plhColor;
        font-size: 16px;
        font-family: Roboto, sans-serif;
      }
    }
    &__pre-icon {
      width: $iconSize;
      height: $iconSize;
      text-align: center;
      line-height: $iconSize;
      position: absolute;
      color: $blue;
      top: 40%;
      left: 10px;
    }
    &__clear-icon {
      width: $iconSize;
      height: $iconSize;
      position: absolute;
      text-align: center;
      line-height: $iconSize;
      top: 50%;
      right: 10px;
      color: $blue;
      transform: translateY(-50%);
      /*border: 1px solid red;*/
    }
    &__popover {
      width: 180px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      z-index: 9999;
      top: -80%;
      right: 0;
      border-radius: 5px;
      background: $white;
      &--info {
        @include popover($boxShadowInfo);
        @include popoverAfter;
      }
      &--danger {
        @include popover($boxShadowDanger);
        @include popoverAfter;
      }
      &--success {
        @include popover($boxShadowSuccess);
        @include popoverAfter;
      }
      &-content {
        width: 90%;
        height: auto;
        font-size: 12px;
        font-family: Roboto;
        line-height: 16px;
        &--danger {
          color: $danger;
        }
      }
    }
    &__reminder {
      width: 100%;
      text-align: right;
      position: absolute;
      top: 100%;
      &-text {
        color: $blue;
        font-size: 12px;
        line-height: 18px;
        letter-spacing: 0.2px;
        text-decoration: none;
      }
    }
  }
  .icon {
    font-size: 18px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .disabled, .readonly {
    background: $disabledBackColor;
  }
  .required {
    border-color: $danger;
  }
  .green {
    color: $success;
  }
  .red {
    color: $danger;
  }
  .slideInDown-enter, .slideInDown-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  .slideInDown-enter-active, .slideInDown-leave-active {
    transition: all .2s ease-in
  }
</style>