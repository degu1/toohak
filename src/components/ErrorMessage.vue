<template>
    <div class="errorContainer">
      <div class="error">
        {{ errorMessage }}
      </div>
    </div>
</template>

<script>
export default {
  name: 'errorMessage',
  props: {
    errorMessage: String
  }
}
</script>



<style>
.errorContainer {
  position: fixed;
  width: 100%;
  top: 20px;
}

.error {
  padding: 20px;
  color: white;
  background: #cc3d3d;
  border-radius: 10px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  margin: 0 auto;
}
</style>