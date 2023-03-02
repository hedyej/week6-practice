<template>
    <h1>訂單列表</h1>
    <table class="table">
    <thead>
      <tr>
        <th scope="col">訂單編號</th>
        <th scope="col">訂單日期</th>
        <th scope="col">付款狀態</th>
        <th scope="col">總金額</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in orderData" :key="item.create_at">
        <th scope="row"> {{ item.id }}</th>
        <td>{{ new Date(item.create_at) }}</td>
        <td>
          <span v-if="item.is_paid">
            已付款
          </span>
          <span v-else>
            未付款
          </span>
        </td>
        <td>
          {{ item.total }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script type="module">
const { VITE_BASE_URL, VITE_API_PATH } = import.meta.env

export default {
  data () {
    return {
      orderData: []
    }
  },
  methods: {
    getOrder () {
      this.$http
        .get(`${VITE_BASE_URL}/v2/api/${VITE_API_PATH}/admin/orders`)
        .then(res => {
          this.orderData = res.data.orders
        })
        .catch(err => console.log(err))
    }
  },
  mounted () {
    this.getOrder()
  }
}
</script>
