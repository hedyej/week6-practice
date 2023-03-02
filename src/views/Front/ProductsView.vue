
<template>
    <productDetail ref="modal"></productDetail>
    <table class="table">
        <thead>
          <tr>
            <th scope="col">名稱</th>
            <th scope="col">圖片</th>
            <th scope="col">價錢</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="product in products" :key="product.id">
                <td>{{product.title}} </td>
                <td><img :src="product.imageUrl" height="200" width="200" class="object-fit-cover"></td>
                <td>{{product.price}} </td>
                <td>
                    <button @click="this.$refs.modal.openModal(product)" class="btn btn-secondary me-3">詳細資訊</button>
                    <button type="button" class="btn btn-primary" @click="addCart(product.id)">加入購物車</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '@/stores/cartStore'
import productStore from '@/stores/productStore'
import productDetail from '../../components/productDetail.vue'

export default {
  components: {
    productDetail
  },

  computed: {
    ...mapState(productStore, ['products'])
  },

  methods: {
    ...mapActions(cartStore, ['addCart']),
    ...mapActions(productStore, ['getProduct'])
  },

  mounted () {
    this.getProduct()
    this.$refs.modal.resetModal()
  }

}
</script>
