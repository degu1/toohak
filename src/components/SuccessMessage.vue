<template>
  <div class="successContainer">
    <div class="success">
      {{ successMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'successMessage',
  props: {
    successMessage: String
  }
}
</script>

<style>
.successContainer {
  position: fixed;
  width: 100%;
  top: 20px;
}

.success {
  padding: 20px;
  color: white;
  background: #3dcc66;
  border-radius: 10px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: 0 auto;
}
</style>