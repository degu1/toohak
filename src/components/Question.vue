<template>
    <div>
      <p>{{ question }}</p>
      <p><input type="radio" name=question value="1" v-model="test">{{ answer1 }}</p>
      <p><input type="radio" name=question value="2" v-model="test">{{ answer2 }}</p>
      <p><input type="radio" name=question value="3" v-model="test">{{ answer3 }}</p>
      <p><input type="radio" name=question value="4" v-model="test">{{ answer4 }}</p>
    </div>
</template>

<script>
export default {
  name: "Question",
  props: ['question','answer1','answer2','answer3','answer4','correctAnswer','activeQuizId','quizId','questionId']
}
//console.log(document.querySelector("input[name=answer]:checked").value)
</script>

<style scoped>

</style>