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
    <h1 class="loging-title">Login</h1>
    <q-btn @click="() => login()"> GitHub </q-btn>
  </div>
</template>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.login-title {
  font-size: 3rem;
  margin-bottom: 2rem;
}
</style>
