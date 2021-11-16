<template>
  <main>
    <h1>Statistics</h1>
    <ul class="itemContainer" v-for="result in quizResults" v-bind:key="result.result_id">
      <li>
        <h3>{{result.quiz_name}}</h3>
        <p style="font-weight: lighter">Total number of Questions: <span style="font-weight: 500">{{result.n_questions}}</span></p>
        <p style="font-weight: lighter">Correct answers: <span style="font-weight: 500">{{result.result}}</span></p>
        <img v-if="result.passed === 'passed'" src="../assets/passed.png" style="margin: 20px">
        <img v-if="result.passed === 'failed'" src="../assets/failed.png" style="margin: 20px">
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