<template>
  <template v-if="game">
    <div class="backbtn"><GoBackButton></GoBackButton></div>
    <h1 class="gameTitle">{{ game.name }}</h1>
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
            <LeaderboardMember
              v-for="(item, index) in sortedLeaderboard"
              :key="index"
            >
              <template #number_name
                ><p>
                  <span style="margin-right: 1rem">{{ index + 1 }}</span
                  >{{ item.name }}
                </p></template
              >
              <template #innerbar
                ><div
                  class="inner_bar"
                  :style="{ width: item.totalScore + '%' }"
                ></div
              ></template>
              <template #points>{{ item.totalScore }}</template>
              <template #arrow>&#129138;</template>
            </LeaderboardMember>
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
    // const router = useRoute();
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
    // const detailsOfGame = (param: string) => {
    //   router.push({ name: ROUTE_NAMES.scoreboard }
    // }
    const goBack = () => void router.go(-1);
    return {
      game,
      sortedLeaderboard,
      goBack,
      // detailsOfGame
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
  background-image: url('https://wallpaperaccess.com/full/2907976.jpg');
  border-radius: 5px;
  padding: 25px 40px;
  position: relative;
  opacity: 0.6;
}

.lboard_section:first-child:hover {
  opacity: 1;
}
.lboard_section:last-child:hover {
  opacity: 1;
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

.lboard_section ul li:hover,
.lboard_section ul li.active {
  color: #fff;
}

.lboard_wrap {
  position: absolute;
  top: 70px;
  left: 40px;
  background: #c8c8a9;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  font-family: 'Yanone Kaffeesatz';
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  background-image: linear-gradient(to right, #c8c8a9, #c8c8a9 50%, #000 10%);
  background-size: 200% 100%;
  background-position: -100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 1s ease-in-out;
}
.gameTitle:hover {
  background-position: 0;
  color: #fff;
  text-shadow: 0 0 2px #c8c8a9, 0 0 1px #000000, 0 0 10px #c8c8a9,
    0 0 100px #c8c8a9;
}

.backbtn {
  display: flex;
  margin-left: 10px;
  margin-top: 10px;
}
</style>
