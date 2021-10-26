<template>
  <div>
    <ul>
      <li v-for="question in questions" v-bind:key="question.question_id">{{ question }}</li>
    </ul>
    <h1>{{id}}</h1>
  </div>
</template>

<script>
export default {
  name: 'test',
  props: {
    id: String
  },
  data: function () {
    return {
      questions: [],
      testId: this.id
    }
  },
  mounted() {

  }
}

</script>

<style scoped>

</style>