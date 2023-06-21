<template>
  <GoBackButton></GoBackButton>
  <template v-if="game">
    <h1 class="gameTitle">{{ game.name }}</h1>
    <div class="wrappers">
      <div class="wrapper1">
        <div class="lboard_section1">
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
      </div>
      <div class="wrapper"></div>
      <div class="wrapper2">
        <div class="lboard_section2">
          <div class="lboard_tabs">
            <div class="tabs">
              <ul>
                <li class="lboardTitle" data-li="leaderbord">Leaderboard</li>
                <!-- <li data-li="detailpagina">Detailpagina</li> -->
              </ul>
            </div>
          </div>

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
                    <div class="wrap">
                      <div class="frame">Turn: {{ turn.turn }}</div>
                    </div>
                    <div class="wrap2">
                      <div class="pins">Pins: {{ turn.pinsHit }}</div>
                      <div v-if="index > 0" class="score">
                        score: {{ turn.subTotal }}
                      </div>
                    </div>
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
import { ROUTE_NAMES } from 'src/router/routes';

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
      gameTitle: 'VR game',
    };
  },

  setup() {
    const { getLeaderBoardForGame } = useBowling();
    const game = ref();
    const sortedLeaderboard = ref();
    const route = useRoute();
    const router = useRouter();

    const { id } = route.params;
    const getLeaderBord = async () => {
      const leaderbord = await getLeaderBoardForGame(`${id}`);
      sortedLeaderboard.value = leaderbord.sortedLeaderboard;
      game.value = leaderbord.game;

      return {
        sortedLeaderboard,
        game,
      };
    };

    getLeaderBord();

    const goBack = (): void => {
      void router.push({
        name: ROUTE_NAMES.HOME,
      });
    };
    return {
      game,
      sortedLeaderboard,
      goBack,
    };
  },
});
</script>

<style lang="scss">
body {
  background-color: #866bca !important;
}
* {
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
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

.wrappers {
  display: flex;
}

.wrapper {
  width: 10%;
}
.wrapper1 {
  margin-left: 10px;
  width: 30%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.wrapper2 {
  width: 60%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-right: 25px;
}

.lboard_section1 {
  width: 100%;
  height: 400px;
  margin: 100px auto 0;
  background: #07bccc;
  border-radius: 5px;
  padding: 25px 40px;
  position: relative;
  transition: 0.2s ease-in-out;
  box-shadow: 8px 8px 16px black;
}

.lboard_section2 {
  width: 100%;
  height: 400px;
  margin: 100px auto 0;
  background: #07bccc;
  border-radius: 5px;
  padding: 25px 40px;
  position: relative;
  transition: 0.2s ease-in-out;
  box-shadow: 8px 8px 16px black;
}

.lboard_section1 ul {
  display: flex;
}

.lboard_section1 ul li {
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
  top: 100px;
  left: 40px;
  background: white;
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

.lboardTitle {
  font-family: 'Meta', sans-serif;
  font-size: 20px;
  font-weight: bolder;
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

.scoreboard {
  user-select: none;
  display: flex;
  flex-direction: column;
  margin: 20px;
  padding: 10px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  color: black;
  font-size: 24px;
  box-shadow: 8px 8px 16px black;
  width: fit-content;
  transition: 0.2s ease-in-out;
}

.scoreboard:hover {
  transform: scale(1.05);
}
.speler-row {
  display: flex;
  flex-direction: row;
}
.speler-naam {
  width: 20%;
  font-size: 30px;
  text-align: center;
  text-shadow: 3px 3px 6px deeppink;
  padding: 1rem;
}

.frame-row {
  max-width: fit-content;
  box-shadow: 4px 4px 7px black;
  border: 1px solid #ccc;
  width: auto;
  background-color: #07bccc;
}

.wrap {
  width: 100%;
}

.frame {
  margin: 8px;
  background-color: deeppink;
  border: 2px solid #fff;
  border-radius: 10px;
  color: black;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 8px;
}
.wrap2 {
  display: flex;
}
.score {
  width: fit-content;
  margin: 8px;
  background-color: deeppink;
  border: 2px solid #fff;
  border-radius: 10px;
  color: black;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 8px;
  flex-direction: row;
}

.pins {
  width: 60px;
  margin: 8px;
  background-color: deeppink;
  border: 2px solid #fff;
  border-radius: 10px;
  color: black;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 8px;
}
.totalScore {
  width: 20%;
  font-size: 30px;
  text-align: center;
  text-shadow: 3px 3px 6px deeppink;
  padding: 1rem;
}

@media only screen and (max-width: 1200px) {
  .wrappers {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .wrapper1 {
    width: 60%;
  }
  .wrapper {
    margin-top: 50px;
  }
  .wrapper2 {
    width: 60%;
  }
  .speler-row {
    display: grid;
    width: 750px;
  }
}
</style>
