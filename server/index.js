const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = require('./app')
const keys = require('./keys')
const router = require('./routes')
const db = require('./db')
const config = require('../nuxt.config.js')
const permit = require('./middleware/permission.js')

config.dev = !(process.env.NODE_ENV === 'production')

const protectedApi = [
  '/api/category/create',
  '/api/category/delete',
  '/api/category/update',
  '/api/product/create',
  '/api/product/delete',
  '/api/product/update'
]

async function start() {
  const nuxt = new Nuxt(config)
  const { host, port } = nuxt.options.server

  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use('/api/auth', router.authRoute)
  app.use('/api/image', router.imageRoute)

  app.use(protectedApi, permit('admin'))
  app.use('/api/category', router.categoryRoute)
  app.use('/api/product', router.productRoute)
  app.use(nuxt.render)

  app.listen(keys.PORT, () => consola.success('server is started on ' + keys.PORT))
}
start()
