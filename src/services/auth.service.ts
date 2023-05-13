import { BASE_URL, api } from 'src/boot/axios';
import { readonly, ref } from 'vue';

const user = ref();

const useAuth = () => {
  const verify = async () => {
    const jwt = localStorage.getItem('team_eevee_jwt');
    if (!jwt) return;

    const result = await api.post('/api/auth/verify', {}, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    user.value = null;
    if (result.data) {
      user.value = result.data;
    }
  };

  const login = () => {
    window.open(
      `${BASE_URL}/api/auth/github?redirect=${window.location.origin}`
    );
  };

  return {
    user: readonly(user),
    login,
    verify
  };
};

export { useAuth };
