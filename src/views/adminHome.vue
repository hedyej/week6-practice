<template>
    <RouterLink to="/Admin/Order">Order</RouterLink>
    <RouterView></RouterView>
</template>

<script>
import { RouterView, RouterLink } from 'vue-router'
const { VITE_BASE_URL } = import.meta.env

export default {
  components: {
    RouterView,
    RouterLink
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    if (token) {
      this.$http.defaults.headers.common.Authorization = token
      this.$http
        .post(`${VITE_BASE_URL}v2/api/user/check`)
        .then(() => { console.log('登入成功') })
        .catch(() => {
          alert('請重新登入')
          this.$router.push('/Admin/Login')
        })
    } else {
      alert('尚未登入')
      this.$router.push('/Admin/Login')
    }
  }
}
</script>
