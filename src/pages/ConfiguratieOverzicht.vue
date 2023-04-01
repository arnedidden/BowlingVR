<template>
  <H1 class='optionTitle'>Options</H1>
  <div class='configurationbuttons'>
    <button @click="Title = true; Assets = false; Ads = false;">Titel</button>
    <button @click="Title = false; Assets = true; Ads = false;">Spelassets</button>
    <button @click="Title = false; Assets = false; Ads = true;">Reclame</button>
  </div>

<TitleModal
v-if="Title"
title="Title"
message="Declare your title."
@close="Title = false"
/>

<AssetsModal
v-if="Assets"
title="Spelassets"
message="Choose your assets."
@close="Assets = false"
/>

<AdModal
v-if="Ads"
title="Reclame"
message="Choose your ads."
@close="Ads = false"
/>

</template>
<script lang="ts">
import { defineComponent } from 'vue';
import TitleModal from 'components/TitleModal.vue';
import AssetsModal from 'components/AssetsModal.vue';
import AdModal from 'components/AdModal.vue';

export default defineComponent({
  name: 'App',
  components: { TitleModal, AssetsModal, AdModal },
  data() {
    return {
      Title: false,
      Assets: false,
      Ads: false,
    };
  }
});
</script>

<style>
.configurationbuttons button {
  background-color: plum;
  border-color: plum;
  color: #050505;
  margin: 1.5em;
  padding: 0.5em;
  padding-left: 1em ;
  padding-right: 1em;
  border-radius: 0.7em;
}

.configurationbuttons  {
  display: flex;
  justify-content: center;
}

.optionTitle {
  display: flex;
  justify-content: center;
}

</style>
