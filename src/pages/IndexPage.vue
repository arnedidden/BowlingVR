<template>
  <template v-if="game">
    <h1>GAMES</h1>
    <GoToAdminPageButton></GoToAdminPageButton>
    <div class="games">
      <div class="game" v-for="(item, index) in game.data" :key="index">
        <div class="title">{{ item.name }}</div>
        <div class="links">
          <div @click="goToLeaderboard(item._id)" class="link">Leaderboard</div>
          <div @click="goToConfig(item._id)" class="link">Configuratie</div>
        </div>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useBowling } from 'src/services/bowling.service';
import { useRouter } from 'vue-router';
import { ROUTE_NAMES } from 'src/router/routes';
import GoToAdminPageButton from 'src/components/GoToAdminPageButton.vue';

export default defineComponent({
  name: 'IndexPage',

  components:{
    GoToAdminPageButton
  },

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
    const goToConfig = (param: string): void => {
      void router.push({
        name: ROUTE_NAMES.CONFIGURATIE_OVERZICHT,
        params: {
          id: param,
        },
      });
    };
    return { game, goToLeaderboard, goToConfig };
  },
});
</script>

<style scoped>
body {
  display: flex;
  justify-content: center;
  align-items: center;
}
.games {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background: gray;
  border: 2px solid black;
  margin: 1rem;
  border-radius: 2rem;
  gap: 2rem;
}
.game {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  background: gray;
  border: 2px solid black;
  gap: 1rem;
  border-radius: 2rem;
}
.links {
  display: flex;
  gap: 1rem;
  color: aliceblue;
}
.link:hover {
  cursor: pointer;
  border-bottom: 2px solid white;
}
.arrow {
  transition: all 0.5s;
}
.arrow:hover {
  cursor: pointer;
  border-bottom: 2px solid white;
}
.title {
  color: aliceblue;
}
</style>
