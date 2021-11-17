<template>
  <div>
    <p>{{this.msg}}</p>
  </div>
</template>


<script>
export default {
  name: 'CapitalizeFirstLetter',
  props: {
    msg: String
  },
  methods: {
    capitalizeFirstLetter: function (string) {
      return string.charAt(0).toUpperCase() + string.substring(1)
    }
  }
}
</script>

<style scoped>

</style>
