<template>
  <my-modal :title="title" :message="message" @close="$emit('close')">
    <h3 class="title">Upload hier jouw reclame</h3>
    <input class="Uploadbtn" type="file" @change="handleFileInput($event.target.files)">
    <div v-if="imageUrl">
      <img class= "Image" :src="imageUrl" alt="Uploaded Image">
    </div>
  </my-modal>
</template>

<style lang="scss">
.Image {
  height: 40em;
  margin-top: 5em;
  margin: 1em;
}
.title{
  margin: 0.3em;
}
.Uploadbtn{
  margin: 1em;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AdModal',
  props: {
    title: String,
    message: String
  },
  data() {
    return {
      imageUrl: null as string | null
    };
  },
  methods: {
    handleFileInput(files: FileList) {
      const file = files.item(0);
      if (file) {
        this.imageUrl = URL.createObjectURL(file);
      }
    }
  },
  beforeUnmount() {
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }
  }
});
</script>
