<template>
  <my-modal
    :title="Ad"
    :message="message"
    @close="$emit('close')"
  />

  <h3>Upload hier jouw reclame</h3>

</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdModal',
  props: {
    title: String,
    message: String
  }
});
</script>
