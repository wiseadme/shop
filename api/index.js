import axios from 'axios'

const BASE_URL = process.env.BASE_URL

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  baseURL: BASE_URL,
  withCredentials: true,
  maxContentLength: 50000000,
  timeout: 150000
})

export const login = user => api.post('/api/auth/login', user)
export const createUser = newUser => api.post('/api/auth/registration', newUser)

//categories
export const fetchAllCategories = () => api.get('/api/category/all')
export const createCategory = category => api.post('/api/category/create', category)
export const updateCategories = categories => api.patch('/api/category/update', categories)
export const deleteCategories = categories => api.post('/api/category/delete', categories)

//products

const multi = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  },
  baseURL: BASE_URL,
  withCredentials: true,
  maxContentLength: 50000000,
  timeout: 150000
})

export const fetchAllProducts = () => api.get('/api/product/all')
export const createProduct = product => multi.post('/api/product/create', product)
export const updateProducts = products => api.patch('/api/product/update', products)
export const deleteProducts = products => api.post('/api/product/delete', products)
export const fetchProductItem = url => api.post('/api/product/item', { url })
