<script lang="ts">
import { defineComponent, watch } from 'vue';
import { useAuth } from 'src/services/auth.service';
import { useRoute, useRouter } from 'vue-router';
import { ROUTE_NAMES } from 'src/router/routes';

export default defineComponent({
  setup() {
    const { login } = useAuth();

    const route = useRoute();
    const router = useRouter();

    watch(
      () => route.fullPath,
      (code) => {
        if (code && code.includes('access_token')) {
          const token = code.split('=')[1];
          window.localStorage.setItem('team_eevee_jwt', token);
          router.push({ name: ROUTE_NAMES.HOME });
        }
      },
      { immediate: true }
    );

    return {
      login,
    };
  },
});
</script>

<template>
  <div class="login-page">
    <h1 class="login-title">Login</h1>
    <q-btn @click="() => login()" class="label"> GitHub </q-btn>
  </div>
</template>

<style lang="scss">
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.login-title {
  transition: all 0.5s;
  text-align: center;
  -webkit-text-stroke: 4px #d6f4f4;
  font-variation-settings: 'wght' 900, 'ital' 1;
  color: transparent;
  font-family: 'Meta', sans-serif;
  text-shadow: 10px 10px 0px #07bccc, 15px 15px 0px #e601c0,
    20px 20px 0px #e9019a, 25px 25px 0px #f40468, 45px 45px 10px #482896;
  cursor: pointer;
  padding-bottom: 20px;
}

.login-title:hover {
  font-variation-settings: 'wght' 100, 'ital' 0;
  text-shadow: none;
}

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
