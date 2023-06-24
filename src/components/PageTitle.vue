<template>
  <div class="game-title"><slot></slot></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({


  setup() {
    return {};
  },
});
</script>
<style lang="scss" scoped>
.game-title {
    text-align: center;
    -webkit-text-stroke: 4px #d6f4f4;
    font-variation-settings: 'wght' 900, 'ital' 1;
    color: transparent;
    font-family: 'Meta', sans-serif;
    text-shadow: 10px 10px 0px #07bccc, 15px 15px 0px #e601c0,
      20px 20px 0px #e9019a, 25px 25px 0px #f40468, 45px 45px 10px #482896;
    font-size: 3.75rem;
    font-weight: 300;
  }
</style>