<template>
  <div>
    Идёт активация пользователя...
  </div>
</template>

<script>
  export default {
    name: 'Activation',
    props: ['code'],
    beforeMount () {
      this.$store.dispatch('AUTH_ACTIVATION', { code: this.code })
        .then(() => {
          this.$router.push('/log')
        })
        .catch(() => {
          this.$router.push('/log')
        })
      // this.$store.dispatch('LOAD_LIST_EXEMPLARS_WITH_TEMPLATE_BY_COMPANY_ID_FOR_REPORT', { companyId: this.id })
      // this.$store.dispatch('LOAD_COMPANY', { companyId: this.id })
      // this.$store.dispatch('LOAD_POINT_EXEMPLARS_BY_COMPANY', { companyId: this.id })
    },
    computed: {
    },
    methods: {
    }
  }
</script>

<style scoped>

</style>
