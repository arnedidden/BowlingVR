<template>
  
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import { useBowling } from 'src/services/bowling.service';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'IndexPage',
  
  setup() {
    const { getLeaderbordForGame } = useBowling();
    const game = ref();
    const route = useRoute();
    // const router = useRoute();
    const { id } = route.params;
    const getLeaderBords = async() => {
      const leaderbord = await getLeaderbordForGame(`${id}`);
      return game.value = leaderbord;
    };
    return {  };
  }
});
</script>
