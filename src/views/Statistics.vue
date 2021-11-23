<template>
  <main>
    <h1>Statistics</h1>

    <div id="chartContainer" class="itemContainer" v-if="isLoggedIn === 'student'">
      <DonutChart v-bind:chart-information="passedQuizChart[0]" v-bind:value-one="passedQuizChart[1]" v-bind:value-two="passedQuizChart[2]"></DonutChart>
      <DonutChart v-bind:chart-information="passedQuestionsChart[0]" v-bind:value-one="passedQuestionsChart[1]"></DonutChart>
      <DonutChart v-bind:chart-information="completedQuizChart[0]" v-bind:value-one="completedQuizChart[1]"></DonutChart>
    </div>

    <ul class="itemContainer" v-for="result in quizResults" v-bind:key="result.result_id">
      <li v-if="isLoggedIn==='student'">
        <h3>{{ result.quiz_name }}</h3>
        <p style="font-weight: lighter">Total number of Questions: <span
            style="font-weight: 500">{{ result.n_questions }}</span></p>
        <p style="font-weight: lighter">Correct answers: <span style="font-weight: 500">{{ result.result }}</span></p>
        <img v-if="result.passed === 'passed'" src="../assets/passed.png" style="margin: 20px">
        <img v-if="result.passed === 'failed'" src="../assets/failed.png" style="margin: 20px">
      </li>
    </ul>

    <div class="itemContainer" v-if="isLoggedIn === 'teacher'">

      <ul v-for="c in classes" v-bind:key="c.classes_id" style=" user-select: none;">
        <p v-on:click="openResultForClass(c.classes_id)" style=" cursor: pointer">{{ c.classes_name }}</p>

        <div class="resultsContainer" v-if="activeClass == c.classes_id">
          <li v-for="stats in statistics" v-bind:key="stats.quiz_id" style="padding-bottom: 20px">
            <p>{{ stats.quiz_name }}</p>

            <table>
              <tr>
                <th>Name:</th>
                <th>Score:</th>
                <th>passed:</th>
              </tr>
              <tr v-for="result in stats.results" v-bind:key="result.user_id">
                <td v-if="result.atempeted === 1">{{ result.user_username }}</td>
                <td v-if="result.atempeted === 0">{{ result.user_username }}</td>
                <td v-if="result.atempeted === 0"></td>
                <td v-if="result.atempeted === 1">{{ result.sum_result }} / {{ result.n_questions }}</td>
                <td>
                  <img v-if="result.pass === 1" class="passedBtn" src="../assets/passed.svg"
                       v-on:click="openStudentStats(result.user_id)">
                  <img v-if="result.pass === 0" class="passedBtn" src="../assets/delete-btn.svg">
                  <img v-if="result.atempeted === 0" class="passedBtn" src="../assets/not_done.svg">
                </td>
              </tr>
            </table>

          </li>
        </div>
      </ul>
    </div>


  </main>
</template>

<script>
import DonutChart from "../components/DonutChart";

export default {
  name: "Statistics",
  components: {DonutChart},
  degrees: '',
  data: function () {
    return {
      quizResults: [],
      classes: [],
      statistics: '',
      activeClass: '',
      totalAmountOfActiveQuizes: 0,
      passedQuizChart: ['Quiz passed'],
      passedQuestionsChart: ['Correct answers'],
      completedQuizChart: ['Quiz Completed '],
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

    fetch('http://127.0.0.1:3000/quizes/users/' + this.userId)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.quizes);
          this.totalAmountOfActiveQuizes = data.quizes.length;
        });

    fetch('http://127.0.0.1:3000/user_statistics/users/' + this.userId)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.quiz_result);
          this.quizResults = data.quiz_result;

          for (let i = 0; i < this.quizResults.length; i++) {
            if (this.quizResults[i].passed === 0) {
              this.quizResults[i].passed = 'failed'
            } else {
              this.quizResults[i].passed = 'passed'
            }
          }
          this.passedQuizChart[1] = parseInt((this.quizResults.map(r => r.passed).filter(p => p === 'passed').length / this.quizResults.map(r => r.n_questions).length * 100).toFixed(0))
          this.passedQuizChart[2] = parseInt((this.quizResults.map(r => r.passed).filter(p => p === 'failed').length / this.quizResults.map(r => r.n_questions).length * 100).toFixed(0))
          this.passedQuestionsChart[1] = parseInt((this.quizResults.map(r => r.result).reduce(function (a, b) {return a + b;}, 0) / this.quizResults.map(r => r.n_questions).reduce(function (a, b) {return a + b;}, 0) * 100).toFixed(0))
          this.completedQuizChart[1] = parseInt((this.quizResults.length / this.totalAmountOfActiveQuizes * 100).toFixed(0))
        });

    fetch('http://127.0.0.1:3000/classes/')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.classes);
          this.classes = data.classes;
        });
  },
  methods: {
    openResultForClass: function (classId) {
      fetch('http://127.0.0.1:3000/class_statistics/' + classId)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.quiz_result);
            this.statistics = data.quiz_result;
          });
      this.activeClass = classId;
    }
  }
}
</script>

<style scoped>

</style>