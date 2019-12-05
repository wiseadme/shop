import axios from 'axios'

const BASE_URL = process.env.BASE_URL

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  baseURL: process.env.BASE_URL,
  withCredentials: false,
  maxContentLength: 50000000,
  timeout: 150000
})

export const login = user => api.post('/api/auth/login', user)
export const createUser = newUser => api.post('/api/auth/registration', newUser)

//category
export const createCategory = category => api.post('/api/category/create', category)
export const fetchAllCategories = () => api.get('/api/category/all')
