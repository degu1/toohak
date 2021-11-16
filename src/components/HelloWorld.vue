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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
