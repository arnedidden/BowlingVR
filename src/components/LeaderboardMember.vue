<template>
  <div class="lboard_mem">
    <div class="name_bar">
      <slot name="number_name"></slot>
      <div class="bar_wrap">
        <slot name="innerbar"></slot>
      </div>
    </div>
    <div class="points"><slot name="points"></slot></div>
    <div class="arrow">
      <slot name="arrow"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LeaderboardMember',
});
</script>
<style lang="scss">
.name_bar {
  margin: 0 20px;
  width: calc(100% - 150px);
}

.name_bar p {
  color: white;
}

.name_bar p span {
  margin-left: 5px;
}

.bar_wrap {
  height: 5px;
  width: 100%;
  background: #d5b000;
  border-radius: 5px;
  margin-top: 5px;
  position: relative;
  overflow: hidden;
}

.points {
  width: 100px;
  color: white;
}

.lboard_mem {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 2px solid #ffe773;
}

.lboard_mem:first-child {
  padding-top: 0;
}

.arrow:hover {
  cursor: pointer;
  animation: scale 1s linear infinite;
}

@keyframes scale {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(1.1);
  }
  50% {
    transform: scale(1.2);
  }
  75% {
    transform: scale(1.1);
  }
  10% {
    transform: scale(1);
  }
}
</style>
