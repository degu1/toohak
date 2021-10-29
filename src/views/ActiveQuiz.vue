<template>
  <div>
    <h1>{{ quiz[0].quiz_name }}</h1>
    <ul>

      <li class="quizName" v-for="(question, qIndex) in questions" v-bind:key="question" v-on:load="getNewAnswers">
        {{ question.question }}
        <div v-if="questionIndex == qIndex">
          <form v-on:submit.prevent="checkAnswer(question.correct_answer)">
            <div v-for="choice of choices" v-bind:key="choice">
              <div v-if="choice.question_id === question.question_id">
                <input type="radio" name="answer" v-model="answer" :value="choice.answer">
                {{ choice.answer }}
              </div>
            </div>
            <button v-if="questionIndex<questions.length-1">Next</button>
            <button v-if="questionIndex===questions.length-1">Finish</button>
          </form>
        </div>
      </li>
    </ul>
    <p>Score= {{ this.score }} of {{questions.length}}</p>

  </div>
</template>

<script>
export default {
  name: "ActiveQuiz",
  data: function () {
    return {
      quiz: [],
      questions: [],
      questionIndex: 0,
      activateChoicesAtIndexNum: 0,
      choices: [],
      answer: '',
      score: 0

    }
  },
  mounted() {
    fetch('http://127.0.0.1:3000/quizes/' + this.$route.params.quiz_id)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.quizes);
          this.quiz = data.quizes;
        });
    fetch('http://127.0.0.1:3000/questions/' + this.$route.params.quiz_id)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.questions);
          this.questions = data.questions;
        });
    fetch('http://127.0.0.1:3000/answers/' + this.$route.params.quiz_id)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.answers);
          this.choices = data.answers;
        });
  },
  methods: {
    checkAnswer: function (correctAnswer) {
      if (correctAnswer === this.answer) {
        this.score++;
      }
      this.questionIndex++;
    },
    getNewAnswers: function () {

    },
    nextQuestion: function () {
      this.questionIndex++;
      this.getNewAnswers();
    }
  }
}
</script>

<style scoped>

</style>