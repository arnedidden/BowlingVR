<template>
  <my-modal
    :title="title"
    :message="message"
    @close="$emit('close')"
  />

  <h3>Kies jouw titel</h3>

  <q-input>Titel</q-input>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TitleModal',
  props: {
    title: String,
    message: String
  }
});
</script>
