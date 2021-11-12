<template>
  <div>
    <ul v-for="result in quizResults" v-bind:key="result.result_id">
      <li>
        <p>{{result.quiz_name}}</p>
        <p>Correct answers: {{result.result}}</p>
        <p>Questions answered: {{result.n_questions}}</p>
        <p>Passed: {{result.passed}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Statistics",
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
              this.quizResults[i].passed = 'Failed'
            }else {
              this.quizResults[i].passed = 'Passed'
            }
          }
        });
  }
}
</script>

<style scoped>

</style>