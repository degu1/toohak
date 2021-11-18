<template>
  <main>
    <h1>Statistics</h1>

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

    <div class="itemContainer" v-if="isLoggedIn === 'teacher'" >

      <ul v-for="c in classes" v-bind:key="c.classes_id"  style=" user-select: none;">
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
export default {
  name: "Statistics",
  degrees: '',
  data: function () {
    return {
      quizResults: [],
      classes: [],
      statistics: '',
      activeClass: '',
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
            if (this.quizResults[i].passed === 0) {
              this.quizResults[i].passed = 'failed'
            } else {
              this.quizResults[i].passed = 'passed'
            }
          }
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