<template>
    在產品頁面加上按鈕和加入購物車
    <p>{{ product.title }}</p>
    <img :src="product.imageUrl" alt="">
</template>

<script type="module">
const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env

export default {
  data () {
    return {
      product: {}
    }
  },

  methods: {
    getProduct () {
      this.$http.get(`${VITE_BASE_URL}v2/api/${VITE_API_PATH}/product/${this.$route.params.id}`)
        .then(res => { this.product = res.data.product })
    }
  },

  mounted () {
    this.getProduct()
  }

}
</script>
