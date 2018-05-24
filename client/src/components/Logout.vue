<template>
  <div>
    <a class="remove-underline" @click="logoutUser"><i class="fas fa-sign-out-alt"></i> LOGOUT</a>
  </div>
</template>

<script>
export default {
  methods: {
    logoutUser () {
      if (localStorage.getItem('token')) {
        localStorage.removeItem('token')
        localStorage.removeItem('id')
        localStorage.removeItem('name')
        window.location.reload()
      }
    }
  }
}
</script>
