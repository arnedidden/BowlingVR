<template>
  <span class="go-back">
    <button @click="goBack" class="label">
      <i class="fa-solid fa-circle-chevron-left"></i>
      Back
    </button>
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'BackButton',
  setup() {
    const router = useRouter();

    function goBack() {
      window.history.length > 1 ? router.go(-1) : router.push('/');
    }
    return {
      goBack,
    };
  },
});
</script>

<style lang="scss" scoped>
.label {
  margin-top: 10px;
  margin-left: 10px;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  letter-spacing: 2px;
  text-decoration: none;
  text-transform: uppercase;
  color: #000;
  cursor: pointer;
  border: 3px solid;
  padding: 0.25em 0.5em;
  box-shadow: 1px 1px 0px 0px, 2px 2px 0px 0px, 3px 3px 0px 0px, 4px 4px 0px 0px,
    5px 5px 0px 0px;
  position: relative;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}
.label:active {
  box-shadow: 0px 0px 0px 0px;
  top: 5px;
  left: 5px;
}
</style>
