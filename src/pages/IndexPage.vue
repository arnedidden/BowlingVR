<template>
  <template v-if="game">
    <h1>GAMES</h1>
    <div class="games">
      <div class="game" v-for="(item, index) in game.data" :key="index">
        <div class="title">{{ item.name }}</div>
        <div @click="goToLeaderboard(item._id)" class="arrow">&#129138;</div>
      </div>
    </div>
  </template>
</template>
<style>
  .games{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding:1rem;
    background: gray;
    border: 2px solid black;
    margin: 1rem;
    border-radius: 2rem;
  }

  .game{
    display: flex;
    padding:1rem;
    background: gray;
    border: 2px solid black;  
    gap: 1rem;
    border-radius: 2rem;;
  }

  .arrow:hover{
    cursor: pointer;
  }

  .title{
    color: aliceblue;
  }
</style>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useBowling } from 'src/services/bowling.service';
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from 'src/router/routes';

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const { getLeaderboards } = useBowling();
    const game = ref();
    const router = useRouter();
    const getLeaderBords = async () => {
      const leaderbord = await getLeaderboards();
      return (game.value = leaderbord);
    };
    getLeaderBords();
    const goToLeaderboard = (param: string): void => {
      void router.push({
        name: ROUTE_NAMES.LEADERBORD,
        params: {
          id: param,
        },
      });
    };
    console.log(game);

    return { game, goToLeaderboard };
  },
});
</script>
