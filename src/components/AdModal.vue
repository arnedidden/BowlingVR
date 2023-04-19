<template>
  <my-modal :title="title" :message="message" @close="$emit('close')">
    <h3 class="title">Upload hier jouw reclame</h3>
    <input class="Uploadbtn" type="file" @change="handleFileInput($event.target.files)">
    <div v-if="imageUrl">
      <img class="Image" :src="imageUrl" alt="Uploaded Image">
    </div>
    <h6 class="Errormessage" v-if="errorMessage">{{ errorMessage }}</h6>
  </my-modal>
</template>

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
      imageUrl: null as string | null,
      errorMessage: '' as string
    };
  },
  methods: {
    handleFileInput(files: FileList) {
      const file = files.item(0);
      if (file) {
        // Check file size
        if (file.size > 1000000) {
          this.errorMessage = 'Bestandsgrootte mag niet groter zijn dan 1MB.';
          this.imageUrl = null;
          return;
        }

        // Check file type
        const allowedTypes = ['image/png', 'image/svg+xml', 'image/jpeg'];
        if (!allowedTypes.includes(file.type)) {
          this.errorMessage = 'Alleen bestanden van het type PNG, SVG en JPEG/JPG zijn toegestaan.';
          this.imageUrl = null;
          return;
        }

        // Set image URL and reset error message
        this.imageUrl = URL.createObjectURL(file);
        this.errorMessage = '';
      }
    }
  },
  beforeUnmount() {
    // Clean up the URL created for the image to avoid memory leaks
    if (this.imageUrl) {
      URL.revokeObjectURL(this.imageUrl);
    }
  }
});
</script>

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
.Errormessage{
  font-size: 1em;
  margin: 1em;
  color: darkred;
}
</style>
