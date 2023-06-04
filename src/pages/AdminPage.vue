<script lang="ts">
import { defineComponent } from 'vue';
import { useAuth } from 'src/services/auth.service';

export default defineComponent({
    setup() {
        const { user } = useAuth();
        return { user };
    },
});
</script>
<template>
  <template v-if="user">
    <h1>Admin</h1>
    <p>
      User: <strong>{{ user.github.username }}</strong>
    </p>
  </template>
  <template v-else>
    
    <p>This page is only accessible to users that are logged in.</p>
    
  </template>

</template>
