<template>
  <GoBackButton></GoBackButton>
  <template v-if="game">
    <h1 class="gameTitle">Spelnaam: {{ game.name }}</h1>
    <div class="wrapper">
      <div class="lboard_section">
        <LeaderboardMember>
          <template #number_name
            ><p style="font-size: 16px; font-weight: 600">
              <span style="margin-right: 1rem">1</span
              >{{ sortedLeaderboard[0].name }}
            </p></template
          >
          <template #innerbar
            ><div
              class="inner_bar"
              :style="{ width: sortedLeaderboard[0].totalScore + '%' }"
            ></div
          ></template>
          <template #points
            ><div style="font-size: 16px; font-weight: 600">
              {{ sortedLeaderboard[0].totalScore }}
            </div>
          </template>
        </LeaderboardMember>
        <div class="lboard_wrap">
          <img src="../../public/img/download.jpg" alt="image" height="360" />
        </div>
      </div>
      <div class="lboard_section">
        <div class="lboard_tabs">
          <div class="tabs">
            <ul>
              <li class="active" data-li="leaderbord">Leaderbord</li>
              <!-- <li data-li="detailpagina">Detailpagina</li> -->
            </ul>
          </div>
        </div>
        <div class="lboard_wrap">
          <div class="lboard_item">
            <div class="scoreboard">
              <div v-for="(item, index) in sortedLeaderboard" :key="index">
                <div class="speler-row">
                  <div class="speler-naam">{{ item.name }}</div>
                  <div
                    class="frame-row"
                    v-for="(turn, index) in item.turns"
                    :key="index"
                  >
                    <div class="frame">Turn: {{ turn.turn }}</div>
                    <div class="pins">Pins: {{ turn.pinsHit }}</div>
                    <div class="score">Score: {{ turn.score }}</div>
                  </div>
                  <div class="totalScore">
                    Total Score: {{ item.totalScore }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>ERROR LOADING PAGE</template>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import LeaderboardMember from 'components/LeaderboardMember.vue';
import { useBowling } from 'src/services/bowling.service';
import { useRoute, useRouter } from 'vue-router';
import GoBackButton from 'src/components/goBackButton.vue';

export default defineComponent({
  components: {
    LeaderboardMember,
    GoBackButton,
  },
  data() {
    return {
      Title: false,
      Assets: false,
      Ads: false,
      gameTitle: 'VR Bowling',
    };
  },

  setup() {
    const { getLeaderbordForGame } = useBowling();
    const game = ref();
    const sortedLeaderboard = ref();
    const route = useRoute();
    const router = useRouter();

    const { id } = route.params;
    const getLeaderBord = async () => {
      const leaderbord = await getLeaderbordForGame(`${id}`);
      sortedLeaderboard.value = leaderbord.sortedLeaderboard;
      game.value = leaderbord.game;
      console.log(sortedLeaderboard);

      return {
        sortedLeaderboard,
        game,
      };
    };

    getLeaderBord();

    const goBack = () => void router.go(-1);
    return {
      game,
      sortedLeaderboard,
      goBack,
    };
  },
});
</script>

<style lang="scss" scoped>
* {
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.arrowBack {
  width: fit-content;
  margin: 0;
}
.arrowBack:hover {
  border-bottom: 2px solid black;
  cursor: pointer;
}
.topPlayerNumber_name {
  font-size: 18px;
  font-weight: 600;
}
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}

.lboard_section {
  width: 500px;
  height: 400px;
  margin: 100px auto 0;
  background: #f94f62;
  border-radius: 5px;
  padding: 25px 40px;
  position: relative;
  transition: 0.2s ease-in-out;
}

.lboard_section:hover {
  transform: scale(1.01);
}

.lboard_section ul {
  display: flex;
}

.lboard_section ul li {
  margin-right: 50px;
  font-size: 18px;
  font-weight: 600;
  color: #3a3d51;
  cursor: pointer;
}

.lboard_section ul li.active {
  color: #fff;
}

.lboard_wrap {
  position: absolute;
  top: 70px;
  left: 40px;
  background: #ffd300;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 8px 8px 16px black;
  transition: 0.2s ease-in-out;
}

.lboard_wrap:hover {
  transform: scale(1.05);
}

.lboard_wrap .lboard_item {
  padding: 25px;
}

.inner_bar {
  position: absolute;
  top: 0%;
  left: 0;
  height: 5px;
  background: #fff;
  border-radius: 5px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

.topPlayer_bar {
  height: 5px;
  background: #fff;
  border-radius: 5px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
}

.gameTitle {
  display: flex;
  justify-content: center;
  font-style: italic;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

.scoreboard {
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  user-select: none;
  margin: 50px auto;
  padding: 25px;
  background-color: #000000;
  border-radius: 5px;
  color: #fff;
  font-size: 24px;
  box-shadow: 8px 8px 16px black;
  width: 500px;
  transition: 0.2s ease-in-out;
}

.scoreboard:hover {
  transform: scale(1.05);
}

.header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.speler-naam {
  flex-basis: 30%;
  font-size: 30px;
  text-align: center;
  text-shadow: 3px 3px 6px deeppink;
  padding: 1rem;
}

.frame-row {
  box-shadow: 4px 4px 7px deeppink;
  display: flex;
  width: auto;
}

.frame {
  flex-basis: 10%;
  margin: 8px;
  background-color: deeppink;
  border: 2px solid #fff;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 8px;
}

.score-row {
  display: flex;
  margin-top: 10px;
}

.score {
  flex-basis: 10%;
  margin: 8px;
  background-color: deeppink;
  border: 2px solid #fff;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 8px;
}

.totalScore {
  text-align: center;
  text-shadow: 3px 3px 6px deeppink;
  padding: 1rem;
}

.game-time {
  margin-top: 20px;
  font-size: 18px;
  color: #333;
  text-align: center;
}
.pins {
  flex-basis: 10%;
  margin: 8px;
  background-color: deeppink;
  border: 2px solid #fff;
  border-radius: 10px;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 8px;
}
</style>
