<template>
  <span class="go-back">
    <button @click="goToAdminPage" class="label">Create New Game</button>
  </span>
</template>

<script lang="ts">
import { ROUTE_NAMES } from 'src/router/routes';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const router = useRouter();
    const goToAdminPage = (): void => {
      void router.push({
        name: ROUTE_NAMES.ADMIN,
      });
    };
    return {
      goToAdminPage,
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

.label:hover {
  scale: 1.1;
}
</style>
