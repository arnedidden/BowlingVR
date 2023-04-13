<template>
  <my-modal
    :title="Assets"
    :message="message"
    @close="$emit('close')"
  />

  <h3>Bowlingbaan</h3>
  <h3>Bowlingbal</h3>
  <h3>Kegels</h3>
  <h3>Hekjes</h3>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AssetsModal',
  props: {
    title: String,
    message: String
  }
});
</script>
