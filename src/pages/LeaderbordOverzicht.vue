<template>
  <GoButtons @click="goBack">Back</GoButtons>
  <template v-if="game">
    <PageTitle>{{ game.name }}</PageTitle>
    <div class="wrapper">
      <div class="lboardTitle">Leaderboard</div>
      <div class="scoreboard" v-if="sortedLeaderboard.length">
        <div v-for="(item, index) in sortedLeaderboard" :key="index">
          <div class="speler-row" v-if="index === 0">
            <div class="index1">{{ index + 1 }}</div>

            <div class="speler-naam1">{{ item.name }}</div>
            <div class="scores">
              <div
                class="frame-row1"
                v-for="(turn, index) in item.turns"
                :key="index"
              >
                <div class="wrap">
                  <div class="turn1">Turn: {{ turn.turn }}</div>
                </div>
                <div class="wrap">
                  <div class="frame1">{{ turn.score }}</div>
                  <div v-if="index === 0" class="frame1">
                    {{ turn.score }}
                  </div>
                  <div v-if="index > 0" class="frame1">
                    {{ turn.subTotal }}
                  </div>
                </div>
              </div>
            </div>
            <div class="totalScore1">Total Score: {{ item.totalScore }}</div>
          </div>
          <div class="speler-row" v-if="index > 0">
            <div class="index">{{ index + 1 }}</div>

            <div class="speler-naam">{{ item.name }}</div>
            <div class="scores">
              <div
                class="frame-row"
                v-for="(turn, index) in item.turns"
                :key="index"
              >
                <div class="wrap">
                  <div class="turn">Turn: {{ turn.turn }}</div>
                </div>
                <div class="wrap">
                  <div class="frame">{{ turn.score }}</div>
                  <div v-if="index === 0" class="frame">
                    {{ turn.score }}
                  </div>
                  <div v-if="index > 0" class="frame">
                    {{ turn.subTotal }}
                  </div>
                </div>
              </div>
            </div>
            <div class="totalScore">Total Score: {{ item.totalScore }}</div>
          </div>
        </div>
      </div>
      <div v-if="sortedLeaderboard.length === 0" class="error">Geen leaderboard om weer te geven!</div>
    </div>
  </template>
  <template v-if="!game">ERROR LOADING PAGE: Game does not exist </template>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useBowling } from 'src/services/bowling.service';
import { useRoute, useRouter } from 'vue-router';
import GoButtons from 'src/components/GoButtons.vue';
import PageTitle from 'src/components/PageTitle.vue';

export default defineComponent({
  components: {
    GoButtons,
    PageTitle
  },


  setup() {
    const { getLeaderBoardForGame } = useBowling();
    const game = ref();
    const sortedLeaderboard = ref();
    const route = useRoute();


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
    const router = useRouter();
    function goBack() {
      window.history.length > 1 ? router.go(-1) : router.push('/');
    }
    return {
      game,
      sortedLeaderboard,
      goBack,
    };
  },
});
</script>

<style lang="scss" scoped>
body {
  background-color: #866bca !important;
  padding: 1rem;
}
* {
  list-style: none;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}
.error{
  border-radius: 5px;
  padding: 15px;
  background-color: #866bca;
  color: rgb(189, 177, 4);
  font-weight: bold;
  box-shadow: 8px 8px 16px black;
}

.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-direction: column;
  background: white;
  padding: 10px;
  border-radius: 5px;
  color: black;
  font-size: 30px;
  box-shadow: 8px 8px 16px black;
  margin-top: 30px;
}

.scoreboard {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}

.speler-row {
  display: flex;
  gap: 1rem;
}

.speler-naam {
  width: 10%;
  font-size: 30px;
  text-align: center;
  align-self: center;
  text-shadow: 3px 3px 6px deeppink;
}
.speler-naam1 {
  width: 10%;
  font-size: 30px;
  text-align: center;
  align-self: center;
  text-shadow: 3px 3px 6px goldenrod;
}
.index {
  width: 3%;
  font-size: 30px;
  text-align: center;
  align-self: center;
  text-shadow: 3px 3px 6px deeppink;
}
.index1 {
  width: 3%;
  font-size: 30px;
  text-align: center;
  align-self: center;
  text-shadow: 3px 3px 6px goldenrod;
}

.frame-row {
  box-shadow: 4px 4px 7px black;
  border: 1px solid #ccc;
  width: 100%;
  background-color: #07bccc;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.frame-row1 {
  box-shadow: 4px 4px 7px black;
  border: 1px solid #ccc;
  width: 100%;
  background-color: goldenrod;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.turn {
  background-color: deeppink;
  border: 2px solid #fff;
  border-radius: 10px;
  color: black;
  width: 100%;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  padding: 5px;
}
.turn1 {
  background-color: rgb(112, 111, 44);
  border: 2px solid #fff;
  border-radius: 10px;
  color: black;
  width: 100%;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  padding: 5px;
}

.frame {
  background-color: deeppink;
  border: 2px solid #fff;
  border-radius: 10px;
  color: black;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  padding: 5px;
  width: 50%;
  min-width: fit-content;
}
.frame1 {
  background-color: rgb(112, 111, 44);
  border: 2px solid #fff;
  border-radius: 10px;
  color: black;
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  padding: 5px;
  width: 50%;
  min-width: fit-content;
}
.wrap {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.scores {
  display: flex;
  flex-grow: 3;
}

.totalScore {
  width: 10%;
  font-size: 30px;
  text-align: center;
  align-self: center;
  text-shadow: 3px 3px 6px deeppink;
}
.totalScore1 {
  width: 10%;
  font-size: 30px;
  text-align: center;
  align-self: center;
  text-shadow: 3px 3px 6px goldenrod;
}
@media only screen and (max-width: 850px) {
  .speler-row {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-bottom: 2px solid black;
  }
  .scores {
    display: flex;
    flex-grow: 3;
    overflow-x: scroll;
  }
}
</style>
