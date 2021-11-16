<template>
  <main>
    <h1>Statistics</h1>
    <ul class="itemContainer" v-for="result in quizResults" v-bind:key="result.result_id">
      <li>
        <h3>{{result.quiz_name}}</h3>
        <p style="font-weight: lighter">Total number of Questions: {{result.n_questions}}</p>
        <p style="font-weight: lighter">Correct answers: {{result.result}}</p>
        <img v-if="result.passed === 'passed'" src="../assets/passed.png">
        <img v-if="result.passed === 'failed'" src="../assets/failed.png">
      </li>
    </ul>
  </main>
</template>

<script>
export default {
  name: "Statistics",
  degrees: '',
  data: function () {
    return {
      quizResults: [],
      get isLoggedIn() {
        return localStorage.getItem('role') || '';
      },
      get userId() {
        return localStorage.getItem('user_id') || '';
      },
    }
  },
  mounted() {
    if (this.isLoggedIn === null)
      this.$router.push({name: 'Login/Register'})

    fetch('http://127.0.0.1:3000/user_statistics/users/' + this.userId)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.quiz_result);
          this.quizResults = data.quiz_result;

          for (let i = 0; i < this.quizResults.length; i++) {
            console.log('test')
            if(this.quizResults[i].passed === 0) {
              this.quizResults[i].passed = 'failed'
            }else {
              this.quizResults[i].passed = 'passed'
            }
          }
        });

    this.degrees = 1/2*360
  }
}
</script>

<style scoped>

</style>