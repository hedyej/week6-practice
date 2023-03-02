<template>
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true" ref="detailModal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
              <span>{{ tempData.title }}</span>
          </h5>
          <button type="button" class="btn-close"
                  data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
              <div class="col-sm-6">
              <img class="img-fluid" :src="tempData.imageUrl">
          </div>
          <div class="col-sm-6">
          <span class="badge bg-primary rounded-pill">{{ tempData.description }}</span>

          <p>商品描述：{{ tempData.category }}</p>
          <p>商品內容：{{ tempData.content }}</p>
          <div class="h5" v-if="tempData.price">{{ tempData.price }} 元</div>
          <div v-else>
              <del class="h6">原價 {{ tempData.origin_price }} 元</del>
              <div class="h5">現在只要 {{ tempData.price }} 元</div>
          </div>
          <div>
              <div class="input-group">
              <input type="number" class="form-control"
                      min="1" v-model="qty">
              <button type="button" class="btn btn-primary" @click="modalAddCart(tempData.id,qty)">加入購物車</button>
      </div>
      </div>
          </div>
          <!-- col-sm-6 end1 -->
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import { mapActions } from 'pinia'
import cartStore from '@/stores/cartStore'

export default {
  data () {
    return {
      modal: {},
      tempData: {},
      qty: '1'
    }
  },
  methods: {
    ...mapActions(cartStore, ['addCart']),
    openModal (tempData) {
      this.modal.show()
      this.tempData = tempData
    },
    hideModal () {
      this.modal.hide()
    },
    modalAddCart (productId, qty) {
      this.addCart(productId, qty)
      this.hideModal()
    },
    resetModal () {
      this.$refs.detailModal.addEventListener('hide.bs.modal', () => { this.qty = 1 })
    }
  },
  mounted () {
    this.modal = new Modal(this.$refs.detailModal)
  }
}
</script>
