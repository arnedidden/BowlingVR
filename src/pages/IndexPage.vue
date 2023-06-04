  <template v-if="game">
    <h1>GAMES</h1>
    <div class="games">
      <div class="game" v-for="(item, index) in game.data" :key="index">
        <div class="title">{{ item.name }}</div>
        <div class="links">

          <div @click="goToLeaderboard(item._id)" class="arrow">Leaderboard</div>
          <div @click="goToConfig(item._id)" class="arrow">Configuratie</div>
        </div>
      </div>
    </div>
  </template>
<style>
body{
  display: flex;
  justify-content: center;
  align-items: center;
}
  .games{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding:1rem;
    background: gray;
    border: 2px solid black;
    margin: 1rem;
    border-radius: 2rem;
    gap: 2rem;
  }
  .game{
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding:1rem;
    background: gray;
    border: 2px solid black;
    gap: 1rem;
    border-radius: 2rem;;
  }
.links{
display: flex;
gap: 1rem;
color: aliceblue;
}
.arrow{
  transition: all 0.5s;
}
  .arrow:hover{
    cursor: pointer;
    border-bottom: 2px solid white;
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
    const goToConfig = (param: string): void => {
      void router.push({
        name: ROUTE_NAMES.CONFIGURATIE_OVERZICHT,
        params: {
          id: param,
        },
      });
    };
    console.log(game);
    return { game, goToLeaderboard, goToConfig };
  },
});
</script>
