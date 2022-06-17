import axios from 'axios'
console.log('verify ambient', process.env.NODE_ENV)
const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.PROD_URL : process.env.DEV_URL
})

export default api
