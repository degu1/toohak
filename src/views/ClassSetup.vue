<template>
  <main>

    <transition name="error">
      <ErrorMessage v-if="showError" v-bind:error-message="this.message"></ErrorMessage>
    </transition>
    <transition name="success">
      <SuccessMessage v-if="showSuccess" v-bind:success-message="this.message"></SuccessMessage>
    </transition>

    <div v-if="activeClassName === ''" class="itemContainer">
      <h1>Add new class</h1>

      <form class="editForm" v-on:submit.prevent="addNewClass(); updateClasses()">
        <input type="text" v-model="className" placeholder="Class name...">
        <button>Add class</button>
      </form>

      <h2>Your classes</h2>
      <ul v-for="(c, cIndex) in classes" v-bind:key="c.classes_id">
        <li class="editItemContainer">
          <p>{{ c.classes_name }}</p>
          <img class="editBtn" src="../assets/edit-btn.svg"
               v-on:click="setActiveClassId(c), getStudents(), getQuizes()">
          <img class="deleteBtn" src="../assets/delete-btn.svg" v-on:click="removeClass(c.classes_id, cIndex)">
        </li>
      </ul>
    </div>

    <div v-if="activeClassName!= ''" class="itemContainer">
      <h1>{{ this.activeClassName }}</h1>

      <!--      Students      -->

      <h2>Students</h2>
      <ul>
        <section v-if="this.activeStudents.length != 0">
          <li class="questionList" v-for="(student, sIndex) in activeStudents" v-bind:key="student.user_id">
            <div style="grid-area: questionTitle">
              <p style="padding: 0">{{ student.user_username }}</p>
              <p style="font-weight: 300; font-size: 0.8em;padding: 0 0 5px 0">{{ student.user_role }}</p>
            </div>
            <img class="deleteBtn" src="../assets/delete-btn.svg" v-on:click="removeStudent(student.user_id, sIndex)">
          </li>
        </section>
        <section v-if="this.activeStudents.length === 0">
          <p>No students added yet!</p>
        </section>
      </ul>

      <button v-on:click="searchOpen(); showStudents();">Add new student</button>

      <div class="searchContainer" v-on:click="searchClose">

        <div v-if="addStudent" class="itemContainer">
          <input type="search" placeholder="Search for student..." v-model="searchStudent">
          <ul style="max-height: 1000px; overflow-y: auto;">
            <section>

              <li class="questionList" v-for="(user, uIndex) in users" v-bind:key="user.user_id">
                <p style="grid-area: questionTitle"
                   v-if="user.user_username.toLowerCase().includes(searchStudent.toLowerCase()) && activeStudents.map(s => s.user_username).filter(u => u === user.user_username).length === 0">
                  {{ user.user_username }}</p>
                <img
                    v-if="user.user_username.toLowerCase().includes(searchStudent.toLowerCase()) && activeStudents.map(s => s.user_username).filter(u => u === user.user_username).length === 0"
                    class="addStudentBtn"
                    src="../assets/edit-btn.svg" v-on:click="addStudentToClass(user.user_id, uIndex)">
              </li>
            </section>
          </ul>
        </div>

        <div v-if="this.addQuizes" class="itemContainer">
          <input type="search" placeholder="Search for quiz..." v-model="searchQuiz">
          <ul style="max-height: 1000px; overflow-y: auto;">
            <section>
              <li class="questionList" v-for="(quiz, qIndex) in quizes" v-bind:key="quiz.quiz_id">
                <p style="grid-area: questionTitle"
                   v-if="quiz.quiz_name.toLowerCase().includes(searchQuiz.toLowerCase()) && activeQuizConnections.map(q => q.quiz_id).filter(i => i === quiz.quiz_id).length === 0">
                  {{ quiz.quiz_name }}</p>
                <img
                    v-if="quiz.quiz_name.toLowerCase().includes(searchQuiz.toLowerCase()) && activeQuizConnections.map(q => q.quiz_id).filter(i => i === quiz.quiz_id).length === 0"
                    class="addStudentBtn"
                    src="../assets/edit-btn.svg" v-on:click="addQuizToClass(quiz.quiz_id, qIndex)">
              </li>
            </section>
            <p style="font-weight: 300">Want to create a new quiz? <a style="font-weight: 600; cursor: pointer"
                                                                      v-on:click="changeRoute">Click here!</a></p>
          </ul>

        </div>
      </div>

      <!--      Quizes       -->

      <div>
        <h2>Quizes</h2>
        <ul>
          <li class="questionList" v-for="(quiz, qIndex) in activeQuizConnections" v-bind:key="quiz.quiz_id">
            <p style="grid-area: questionTitle">{{ quiz.quiz_name }}</p>
            <img class="deleteBtn" src="../assets/delete-btn.svg" v-on:click="removeQuiz(quiz.quiz_id, qIndex)">
          </li>
        </ul>
      </div>

      <button v-on:click="searchOpen(); showQuizes();">Share a quiz with class</button>

      <button v-on:click="activeClassName=''; activeClassId=''; addStudent=false; addQuizes=false; updateClasses()">
        Back
      </button>
    </div>
  </main>
</template>

<script>

import router from "../router";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";

export default {
  name: "ClassSetup",
  components: {SuccessMessage, ErrorMessage},
  data: function () {
    return {
      className: '',
      classes: [''],
      activeClassId: '',
      activeClassName: '',
      activeStudents: [''],
      users: [''],
      quizes: [''],
      searchStudent: '',
      searchQuiz: '',
      addStudent: false,
      addQuizes: false,
      message: '',
      showError: false,
      showSuccess: false,
      activeQuizConnections: [],
      showSeachContainer: false
    }
  },
  mounted() {
    fetch('http://127.0.0.1:3000/classes/')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.classes);
          this.classes = data.classes;
        });
    fetch('http://127.0.0.1:3000/users/')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.users);
          this.users = data.users;
        });
    fetch('http://127.0.0.1:3000/quizes/')
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data.quizes);
          this.quizes = data.quizes;
        });
  },
  methods: {
    addQuizToClass: function (quizId, index) {
      fetch('http://127.0.0.1:3000/classes_quizes/?class_id=' + this.activeClassId + '&quiz_id=' + quizId, {
        method: 'POST'
      })
      this.triggerSuccessMessage('Successfully added quiz to class!')
      this.activeQuizConnections.push(this.quizes[index])
    },
    updateClasses: function () {
      fetch('http://127.0.0.1:3000/classes/')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.classes);
            this.classes = data.classes;
          });
    },
    removeClass: function (classId, index) {
      fetch('http://127.0.0.1:3000/classes/' + classId, {
        method: 'DELETE'
      })
      this.triggerSuccessMessage('Successfully removed class!')
      this.classes.splice(index, 1)
    },
    addNewClass: function () {
      fetch('http://127.0.0.1:3000/classes/' + this.className.charAt(0).toUpperCase() + this.className.substring(1), {
        method: 'POST'
      }).then((response) => {
        if (response.status === 200) {
          this.triggerSuccessMessage('Successfully added class!')
        } else if (response.status === 403) {
          this.triggerErrorMessage('There is already a class with that name.')
        } else {
          this.triggerErrorMessage("Something went wrong.")
        }
      })
    },
    setActiveClassId: function (c) {
      this.activeClassId = c.classes_id
      this.activeClassName = c.classes_name
    },
    getStudents: function () {
      fetch('http://127.0.0.1:3000/students/' + this.activeClassId)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.students);
            this.activeStudents = data.students;
          });
    },
    getQuizes: function () {
      fetch('http://127.0.0.1:3000/classes_quizes/' + this.activeClassId)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data.quizes);
            this.activeQuizConnections = data.quizes;
          });
    },
    showStudents: function () {
      this.addStudent = true;
      this.addQuizes = false;
    },
    showQuizes: function () {
      this.addQuizes = true;
      this.addStudent = false;
    },
    removeStudent: function (userId, index) {
      fetch('http://127.0.0.1:3000/classes_users/' + this.activeClassId + '/' + userId, {
        method: 'DELETE'
      })
      this.triggerSuccessMessage('Successfully removed student!')
      this.activeStudents.splice(index, 1)
    },
    addStudentToClass: function (userId, index) {
      fetch('http://127.0.0.1:3000/classes_users/' + this.activeClassId + '/' + userId, {
        method: 'POST',
      })
      this.triggerSuccessMessage('Successfully added student to class!')
      this.activeStudents.push(this.users[index])
    },
    removeQuiz: function (quizId, index) {
      fetch('http://127.0.0.1:3000/classes_quizes/?class_id=' + this.activeClassId + '&quiz_id=' + quizId, {
        method: 'DELETE'
      })
      this.triggerSuccessMessage('Successfully removed quiz!')
      this.activeQuizConnections.splice(index, 1)
    },
    searchOpen: function () {
      const searchContainer = document.querySelector('.searchContainer');
      searchContainer.classList.add('show');
    }
    ,
    searchClose: function (event) {
      const searchContainer = document.querySelector('.searchContainer');
      const input = document.querySelector('input');
      const ul = document.querySelector('ul');

      if (input.className !== event.target.className || ul.className !== event.target.className)
        searchContainer.classList.remove('show')

      this.searchStudent = ''
      this.searchQuiz = ''
    },
    changeRoute: function () {
      router.push("/quiz_setup/")
    },
    triggerErrorMessage: function (message) {
      this.showError = true;
      this.message = message
      setTimeout(() => this.showError = false, 3000)
    },
    triggerSuccessMessage: function (message) {
      this.showSuccess = true;
      this.message = message
      setTimeout(() => this.showSuccess = false, 3000)
    }
  }
}
</script>

<style scoped>

.error-enter-active {
  animation: error-fade-show 0.5s ease;
}

.error-leave-active {
  animation: fade-leave 0.5s ease;
}

.success-enter-active {
  animation: success-fade-show 0.5s ease;
}

.success-leave-active {
  animation: fade-leave 0.5s ease;
}

@keyframes error-fade-show {
  0% {
    transform: translateY(-100px);
    opacity: 0
  }
  50% {
    transform: translateY(0);
    opacity: 1
  }
  60% {
    transform: translateX(8px);
  }
  70% {
    transform: translateX(-8px);
  }
  80% {
    transform: translateX(4px);
  }
  90% {
    transform: translateX(-4px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes success-fade-show {
  0% {
    transform: translateY(-100px);
    opacity: 0
  }
  100% {
    transform: translateY(0);
    opacity: 1
  }
}

@keyframes fade-leave {
  0% {
    transform: translateY(0);
    opacity: 1
  }
  100% {
    transform: translateY(-100px);
    opacity: 0
  }
}

@import '../assets/css/toohak.css';
</style>