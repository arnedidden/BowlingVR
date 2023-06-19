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
  border: 3px solid;
  margin-top: 10px;
  margin-left: 10px;
  letter-spacing: 2px;
  font-family: 'Open Sans', sans-serif;
  text-decoration: none;
  text-transform: uppercase;
  padding: 0.25em 0.5em;
  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px,
    5px 5px 0px 0px;
  background-color: #fff;
  color: #000;
  font-size: 16px;
  cursor: pointer;
  touch-action: manipulation;
}

.arrow {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-top: 2px solid #000;
  border-right: 2px solid #000;
  transform: rotate(-135deg);
  margin-right: 6px;
  color: #000;
}
</style>
