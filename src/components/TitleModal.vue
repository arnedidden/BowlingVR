<template>
  <my-modal
    :title="title"
    :message="message"
    @close="$emit('close')"
  >
    <h3 class="title">Kies de naam van het spel</h3>
    <form @submit.prevent="submitGameName">
      <input class="inputbox" type="text" v-model="gameName" placeholder="">
      <button class="inputboxBtn" type="submit">Bevestigen</button>
    </form>
  </my-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useBowling } from 'src/services/bowling.service';


export default defineComponent({
  name: 'TitleModal',
  props: {
    title: String,
    message: String,

  },
  setup(props, { emit }) {
    const gameName = ref('');
    const route = useRoute();
    const { id } = route.params;


    const submitGameName = () => {
  const postData = {
    _id: id,
    name: gameName.value,
    bowlingBall: {
      color: null
    },
    bowlingPins: {
      color: null
    },
    bowlingLane: {
      color: null
    },
    leaderboard: null
  };

  axios
    .put(`https://api.code-coaching.dev/eindwerken-2022-jaar-2/team_eevee_config/${id}`, postData)
    .then(response => {
      console.log(response);
      console.log(postData);


      emit('game-name-selected', gameName.value);
      gameName.value = '';
    })
    .catch(error => {
      console.error(error);
    });
};

    return {
      gameName,
      submitGameName
    };
  },
});
</script>

<style lang="scss" scoped>
.inputbox {
  margin: 1em;
  padding: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 0.3em;
  border-color: #efefef;
}

.inputboxBtn {
  background-color: plum;
  border-color: plum;
  color: #050505;
  margin: 1.5em;
  padding: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 0.7em;
}

.title {
  margin: 0.3em;
}
</style>
