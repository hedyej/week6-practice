<template>
    HomePage
    <RouterLink to="/About">About</RouterLink>
    <RouterLink to="/Cart">Cart</RouterLink>
    <RouterLink to="/Product">Product</RouterLink>
    <RouterLink to="/Admin/Login">Login</RouterLink>
    <RouterView></RouterView>
</template>

<script>
import { RouterView, RouterLink } from 'vue-router'
export default {
  components: { RouterView, RouterLink }
}
</script>
