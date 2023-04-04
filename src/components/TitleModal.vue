<template>
  <my-modal
    :title="title"
    :message="message"
    @close="$emit('close')"
  >
  <h3 class="title">Kies de naam van het spel</h3>
  <input class="inputbox" type="text" v-model="gameName" placeholder="">
    <button class="inputboxBtn" @click="submitGameName">Bevestigen</button>
</my-modal>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TitleModal',
  props: {
    title: String,
    message: String
  },
  setup(props, { emit }) {
    const gameName = ref('');

    const submitGameName = () => {
      if (gameName.value.trim() !== '') {
        emit('game-name-selected', gameName.value.trim());
        gameName.value = '';
      }
    };

    return { gameName, submitGameName };
  }
});
</script>

<style lang ="scss" scoped>
.inputbox{
  margin: 1em;
  padding: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 0.3em;
  border-color: #efefef;

}
.inputboxBtn{
  background-color: plum;
  border-color: plum;
  color: #050505;
  margin: 1.5em;
  padding: 0.5em;
  padding-left: 1em;
  padding-right: 1em;
  border-radius: 0.7em;
}
.title{
  margin: 0.3em;
}
</style>
