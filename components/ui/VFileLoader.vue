<template>
  <div class="v-file-loader">
    <input v-if="isClear" @change="fileLoader" ref="input" type="file" multiple hidden>
    <div class="v-file-loader__field" @click="$refs.input.click()">
      <i class="material-icons">attach_file</i>
      <span class="v-file-loader__label">{{label}}</span>
    </div>

    <transition-group name="fadeIn" tag="div" move-class="move" class="v-file-loader__chips-box">
      <div v-for="it in files" :key="it.name" class="v-file-loader__chip">
        <span class="v-file-loader__chip-file">{{it.name}}</span>
        <i @click="removeFile(it)" class="material-icons v-file-loader__chip-del">cancel</i>
      </div>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: 'VFileLoader',
    props: {
      label: {
        type: String,
        required: true
      }
    },

    data() {
      return {
        files: [],
        isClear: true
      }
    },

    methods: {
      fileLoader(e) {
        const files = e.target.files
        if (this.files.length + files.length > 12) {
          return this.$emit('limit')
        } else {
          Array.prototype.forEach.call(files, it => {
            this.files.push(it)
          })
          this.isClear = false
          setTimeout(() => this.isClear = true)
        }
      },

      removeFile(file) {
        this.files.splice(this.files.indexOf(file), 1)
      }
    }
  }
</script>

<style lang="scss">
  .v-file-loader {
    width: 100%;
    height: auto;

    &__field {
      position: relative;
      width: 100%;
      height: 52px;
      border-radius: 3px;
      border: 2px dotted $blue;
      @include flexAlign(center, center);
      @include fontExo($blue, .8em);
      cursor: pointer;
    }

    &__chips-box {
      max-width: 450px;
      height: auto;
      min-height: 70px;
      @include flexAlign(center, flex-start);
      flex-wrap: wrap;
      border: 2px dotted $blue;
      border-radius: 3px;
      margin: 10px 0;
    }

    &__chip {
      border-radius: 20px;
      background: $blue;
      @include fontExo($white, .8em);
      @include flexAlign(center, space-between);
      min-width: 75px;
      box-shadow: $boxShadow;
      padding: 5px;
      margin: 5px;

      &-file {
        margin: 0 5px;
      }

      &-del {
        cursor: pointer;
        /*margin: 0 5px;*/
      }
    }
  }

  .move {
    transition: all .5s;
  }
</style>
