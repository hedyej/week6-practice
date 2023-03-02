import { defineStore } from 'pinia'
import axios from 'axios'

const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env

export default defineStore('cartStore', {
  state: () => ({
    carts: []
  }),

  actions: {
    getCart () {
      axios.get(`${VITE_BASE_URL}v2/api/${VITE_API_PATH}/cart`)
        .then(res => {
          this.carts = res.data.data.carts
        })
        .catch(err => console.log(err))
    },
    addCart (productId, qty = 1) {
      const data = {
        product_id: productId,
        qty
      }
      axios.post(`${VITE_BASE_URL}v2/api/${VITE_API_PATH}/cart`, { data })
        .then(() => {
          alert('新增成功')
          this.getCart()
        })
        .catch(err => console.log(err))
    },
    deleteCart (cartId) {
      alert('確定要刪除嗎')
      axios.delete(`${VITE_BASE_URL}v2/api/${VITE_API_PATH}/cart/${cartId}`)
        .then(res => {
          this.getCart()
        })
        .catch(err => console.log(err))
    }
  }
})
