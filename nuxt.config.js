const webpack = require('webpack')
const path = require('path')

const resolve = (pathString) => {
  return path.resolve(__dirname, pathString)
}

module.exports = {
  head: {
    title: 'Магазин книг по программированию',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'yandex-verification', content: '' },
      { name: 'google-site-verification', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/favicon-32x32.png' }
    ],
  },
  loading: true,
  css: ['~/assets/scss/main.scss'],
  plugins: [
    { src: '~/plugins/index.js', ssr: false },
  ],
  middleware: ['auth-control'],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],
  styleResources: {
    scss: ['~/assets/scss/_global.scss']
  },
  axios: {
    baseURL: process.env.BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    withCredentials: false,
    maxContentLength: 50000000,
    timeout: 150000
  },
  build: {
    vendor: ['axios'],
    postcss: [
      require('autoprefixer')(),
      require('css-mqpacker')()
    ],
    generate: {
      minify: {
        collapseWhitespace: false
      }
    },
    extractCSS: {
      allChunks: true
    },
    plugins: [
      new webpack.ProvidePlugin({
        mapState: ['vuex', 'mapState'],
        mapGetters: ['vuex', 'mapGetters'],
        mapMutations: ['vuex', 'mapMutations'],
        mapActions: ['vuex', 'mapActions'],
        action: resolve('./store/ActionsType'),
        mutation: resolve('./store/MutationsType')
      }),
    ],
    extend(config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      }
    }

  },
}
