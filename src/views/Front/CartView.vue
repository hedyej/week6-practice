<template>
    <table class="table">
        <thead>
          <tr>
            <th scope="col">名稱</th>
            <th scope="col">圖片</th>
            <th scope="col">價錢</th>
            <th scope="col">數量</th>
            <th scope="col">小計</th>
            <th scope="col">操作</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="cart in carts" :key="cart.id">
                <td>{{cart.product.title}} </td>
                <td><img :src="cart.product.imageUrl" height="200" width="200" class="object-fit-cover"></td>
                <td>{{cart.product.price}} </td>
                <td>{{cart.qty}} </td>
                <td>{{cart.total}} </td>
                <td>
                    <button type="button" class="btn btn-outline-danger" @click="deleteCart(cart.id)">刪除</button>
                </td>
            </tr>
        </tbody>
    </table>

    <div class="my-5 row justify-content-center">
        <VForm
          ref="form"
          class="col-md-6"
          v-slot="{ errors }"
          @submit="submitOrder"
          v-if="this.carts.length"
        >
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <VField
              id="email"
              name="email"
              type="email"
              class="form-control"
              :class="{ 'is-invalid': errors['email'] }"
              rules="email|required"
              v-model="form.user.email"
            ></VField>
            <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名</label>
            <VField
              id="name"
              name="姓名"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['姓名'] }"
              rules="required"
              v-model="form.user.name"
            ></VField>
            <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話</label>
            <VField
              id="tel"
              name="電話"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['電話'] }"
              rules="required"
              v-model="form.user.tel"
            ></VField>
            <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址</label>
            <VField
              id="address"
              name="地址"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors['地址'] }"
              rules="required"
              v-model="form.user.address"
            ></VField>
            <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
          </div>

          <div class="mb-3">
            <label for="message" class="form-label">留言</label>
            <textarea
              name=""
              id="message"
              class="form-control"
              cols="30"
              rows="10"
              v-model="form.message"
            ></textarea>
          </div>
          <div class="text-end">
            <button type="submit" class="btn btn-primary">送出訂單</button>
          </div>
        </VForm>
      </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import cartStore from '../../stores/cartStore'
const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env

export default {
  data () {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        },
        message: ''
      }
    }
  },
  computed: {
    ...mapState(cartStore, ['carts'])
  },
  methods: {
    ...mapActions(cartStore, ['getCart', 'deleteCart']),
    submitOrder () {
      this.$http
        .post(`${VITE_BASE_URL}v2/api/${VITE_API_PATH}/order`, { data: this.form })
        .then(() => {
          alert('已送出訂單')
          this.getCart()
          this.$refs.form.resetForm()
        })
        .catch(err => console.log(err))
    }
  },
  mounted () {
    this.getCart()
  }
}
</script>
