import { defineStore } from 'pinia'
import axios from 'axios'
const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env

export default defineStore('productStore', {
  state: () => ({
    products: [],
    tempProduct: {}
  }),
  actions: {
    getProduct () {
      axios
        .get(`${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/products/all`)
        .then(res => {
          this.products = res.data.products
        })
        .catch(err => console.log(err))
    }
  }
})
