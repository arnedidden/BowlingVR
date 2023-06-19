<template>
  <button class="terug-knop" @click="goBack">
    <span class="arrow"></span>
    Back
  </button>
</template>

<script>
export default {
  name: 'TerugKnop',
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.terug-knop {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  border: 2px solid #fff;
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 10px;
  box-shadow: 4px 4px 8px black;
  background-color: deeppink;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.arrow {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  transform: rotate(-45deg);
  margin-right: 6px;
}
</style>
