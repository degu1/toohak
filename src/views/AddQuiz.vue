<template>
  <div id="questionContainer">

    <div v-if="activeQuizName == ''" class="addQuizContainer">
      <h1 id="quizName">Add new quiz</h1>
      <form v-on:submit.prevent="addNewQuiz" id="addNewQuiz">

        <input type="text" v-model="quizName" placeholder="Quiz name...">

        <button v-on:click="updateQuizes()">Add quiz</button>
      </form>
      <h2>Your quizes</h2>
      <ul class="quizList">
        <li v-for="quiz in quizes" v-bind:key="quiz.quiz_id"
            v-on:click="setActiveQuizId(quiz), getQuestions()">
          {{ quiz.quiz_name }}
          <img src="../assets/remove-btn.png" v-on:click="removeQuiz(quiz.quiz_id)">
        </li>
      </ul>
    </div>
    <div v-if="activeQuizName!= ''" class="addQuizContainer">
      <form class="addQuestion" v-on:submit.prevent="addNewQuestion">
        <h2>{{this.activeQuizName}}</h2>
        <section class="formAddItemContainer">
        <label for="questionName"></label>
        <input type="text" id="questionName" v-model="question" placeholder="Question...">
        </section>

        <section class="formAddItemContainer">
          <input type="text" placeholder="Choice 1" id="choices" v-model="choiceOne">
          <input type="text" placeholder="Choice 2" v-model="choiceTwo">
          <input type="text" placeholder="Choice 3" v-model="choiceThree">
          <input type="text" placeholder="Choice 4" v-model="choiceFour">
        </section>

        <section class="formAddItemContainer">
        <input type="text" id="rightAnswer" v-model="rightAnswer" placeholder="Right answer...">
        </section>

        <button>Add question</button>
      </form>
      <button v-on:click="activeQuizName=''">Back</button>
      <h2>Questions</h2>
      <ul class="formAddItemContainer" id="questionListContainer">
        <li id="questionList" v-for="question in activeQuestions" v-bind:key="question.question_id">
          {{ question.question }}
          <img src="../assets/remove-btn.png" v-on:click="removeQuestion(question.question_id)">
        </li>
      </ul>
    </div>

  </div>
</template>

<script>

export default {
  name: "Add Quiz",
  data: function () {
    return {
      quizName: '',
      quizId: 0,
      question: '',
      choiceOne: '',
      choiceTwo: '',
      choiceThree: '',
      choiceFour: '',
      choices: [],
      rightAnswer: '',
      jsonBody: '',
      quizes: [],
      activeQuizId: '',
      activeQuizName: '',
      activeQuestions: []

    }
  }, mounted() {
    fetch('http://127.0.0.1:3000/quiznames')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.quizes);
          this.quizes = data.quizes;
        });
  },
  methods: {
    updateQuizes: function () {
      fetch('http://127.0.0.1:3000/quiznames')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.quizes);
            this.quizes = data.quizes;
          })
    },
    removeQuiz:function (quizId){
      fetch('http://127.0.0.1:3000/quizes/' + quizId,{
        method: 'DELETE'
      })
    },
    removeQuestion: function (questionId){
      fetch('http://127.0.0.1:3000/questions/' + questionId,{
        method: 'DELETE'
      })
    },
    addNewQuiz: function () {
      fetch('http://127.0.0.1:3000/quiz_name/' + this.quizName, {
        method: 'POST'
      }).then((response) => {
        response.text().then((text) => {
          let tempText = JSON.parse(text)
          this.quizId = tempText.quiz_id;
        })
      })

      //this.insertChoices();
      //this.addNewQuestion();
    },

    insertChoices: function () {

      this.choices.push(this.choiceOne)
      this.choices.push(this.choiceTwo)
      this.choices.push(this.choiceThree)
      this.choices.push(this.choiceFour)

    },
    addNewQuestion: function () {
      this.choices = []
      this.insertChoices()


      var question = {
        quiz_id: this.activeQuizId,
        question: this.question,
        correct_answer: this.rightAnswer,
        answers: [{"answer": this.choiceOne}, {"answer": this.choiceTwo}, {"answer": this.choiceThree}, {"answer": this.choiceFour}]
      }
      var jsonQuestion = JSON.stringify(question);
      console.log(jsonQuestion)
      fetch('http://127.0.0.1:3000/quiz_question/', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: jsonQuestion
      })


      setTimeout(this.getQuestions, 10)
      this.question = ''
      this.choiceOne = ''
      this.choiceTwo = ''
      this.choiceThree = ''
      this.choiceFour = ''
      this.rightAnswer = ''
    },
    setActiveQuizId: function (quiz) {
      this.activeQuizId = quiz.quiz_id
      this.activeQuizName = quiz.quiz_name
    },
    getQuestions: function () {
      fetch('http://127.0.0.1:3000/questions/' + this.activeQuizId)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.questions);
            this.activeQuestions = data.questions;
          });
    }

  },


}
</script>

<style>

#questionContainer {
  padding: 100px 10px;
  color: #17252A;
  display: grid;
}

.addQuizContainer {
  display: grid;
  flex-direction: column;
  border-radius: 20px;
}

button {
  margin: 10px 20px;
  border-radius: 10px;
  background-color: #17252A;
  color: white;
  justify-self: center;
  width: fit-content;
  font-weight: lighter;
  padding: 10px 30px;
  border-style: none;
  cursor: pointer;
}

ul {
  list-style: none;
  padding: 0;
}

.quizList {
  cursor: pointer;
  display: grid;
  justify-self: center;
  width: 100%;
}

.quizList li {
  display: grid;
  grid-template-columns: 1fr 10px;
  background-color: white;
  padding: 10px 20px;
  width: 50%;
  border-radius: 20px;
  margin-bottom: 20px;
  justify-self: center;
}

.addQuestion {
  display: flex;
  flex-direction: column;
}

.formAddItemContainer {
  display: grid;
  margin-top: 15px;
}

input {
  margin: 5px;
  width: 50%;
  justify-self: center;
  padding: 10px 20px;
  border-radius: 20px;
  border: none;
  font-weight: 300;
}

#addNewQuiz {
  display: grid;
}

.addQuestion {
  display: grid;
}

h1 {
  margin-bottom: 10px;
}

h2 {
  color: white;
  margin-bottom: 0;
}

textarea:focus, input:focus{
  outline: none;
}

#questionListContainer {
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  width: 50%;
  gap: 10px;
  justify-self: center;
}

#questionList {
  display: grid;
  grid-template-columns: 1fr 10px;
}

/* Tablet */
@media screen and (min-width: 768px) {
  .addQuizContainer {
    justify-self: center;
    width: 100%;
    max-width: 700px;
  }
}

</style>
