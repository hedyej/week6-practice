<template>
    <div class="container">
      <div class="row justify-content-center">
        <h1 class="h3 mb-3 font-weight-normal text-center">
          請先登入
        </h1>
        <div class="col-8">
          <form class="form-signin" @submit.prevent="login">
            <div class="form-floating mb-3">
              <input type="email" class="form-control" v-model="user.username" id="floatingInput"
                placeholder="name@example.com" required autofocus>
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" v-model="user.password" id="floatingPassword"
                placeholder="Password" required>
              <label for="floatingPassword">Password</label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3" type="submit" @click="submit">
              登入
            </button>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
const { VITE_BASE_URL } = import.meta.env
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    submit () {
      this.$http
        .post(`${VITE_BASE_URL}/v2/admin/signin`, this.user)
        .then(res => {
          if (res.data.success) {
            const { token, expired } = res.data
            document.cookie = `myToken=${token};expires=${new Date(expired)}; path=/`
            this.$router.push('/Admin')
          } else {
            alert(res.data.message)
          }
        })
        .catch(
          (err) => console.log(err))
    }
  }
}
</script>
