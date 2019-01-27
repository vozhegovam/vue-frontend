<template>

</template>

<script>
  export default {
    props: ['code'],
    data () {
    },
    created () {
      console.log(this.id)
      this.$store.dispatch('AUTH_ACTIVATION', { code: this.code })
        .then(() => {
          this.$router.push('/log')
        })
        .catch(() => {})
    }
  }
</script>
