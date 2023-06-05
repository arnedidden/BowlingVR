
<template>
  <template v-if="user">
    <h1>Admin</h1>
    <p>
      User: <strong>{{ user.github.username }}</strong>
    </p>
    <form @submit.prevent="submitGame">
      <div class="gameCreation">
        <div class="gameCreationItem">
          <h3 class="title">Kies de naam van het spel</h3>
          <input type="text" v-model="gameName" placeholder="" />
        </div>
        <div class="gameCreationItem">
          <h3 class="title">Kies de kleuren van het spel</h3>
          <div class="choicesOfColor">
            <div class="colorchoice">
              <h5>Ball</h5>
              <select v-model="ball">
                <option value="GREEN" selected>GREEN</option>
                <option value="YELLLOW">YELLLOW</option>
                <option value="RED">RED</option>
                <option value="BLUE">BLUE</option>
              </select>
            </div>
            <div class="colorchoice">
              <h5>Pins</h5>
              <select v-model="pins">
                <option value="GREEN" selected>GREEN</option>
                <option value="YELLLOW">YELLLOW</option>
                <option value="RED">RED</option>
                <option value="BLUE">BLUE</option>
              </select>
            </div>
            <div class="colorchoice">
              <h5>Lane</h5>
              <select v-model="Lane">
                <option value="GREEN" selected>GREEN</option>
                <option value="YELLLOW">YELLLOW</option>
                <option value="RED">RED</option>
                <option value="BLUE">BLUE</option>
              </select>
            </div>
          </div>
        </div>
        <div class="gameCreationItem">
          <h3 class="title">Upload je reclame</h3>
          <input
            class="Uploadbtn"
            type="file"
            @change="handleFileInput($event.target.files)"
          />
          <div v-if="imageUrl">
            <img class="Image" :src="imageUrl" alt="Uploaded Image" />
          </div>
        </div>
      </div>
    </form>
    <div class="buttonDiv">
      <button type="submit" @click="submitGame()">Creëer spel configuratie</button>
    </div>
  </template>
  <template v-else>
    <p>This page is only accessible to users that are logged in.</p>
  </template>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useAuth } from 'src/services/auth.service';

export default defineComponent({
  props: {
    title: String,
    message: String,
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
  },
  setup() {
    const { user } = useAuth();
    const gameName = ref('');
    const ball = ref('');
    const pins = ref('');
    const Lane = ref('');
    const submitGame = () => {
      const title = gameName.value;
      const bowlingBalColor = ball.value;
      const pinsColor = pins.value;
      const laneColor = Lane.value;
      const game = {
      name: title,
      bowlingBall: {
          color: bowlingBalColor
      },
      bowlingPins: {
          color: pinsColor
      },
      bowlingLane: {
          color: laneColor
      },
      leaderboard: []
    };
    console.log(game);
    
    }
    return { user, submitGame, gameName, ball, pins, Lane };
  },
});
</script>
<style>
.gameCreation {
  display: flex;
  justify-content: space-around;
}

.gameCreationItem {
  width: 30%;
}
.choicesOfColor {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.colorchoice {
  display: flex;
  justify-content: space-around;
  gap: 1rem;
}
select {
  width: 50%;
  height: 50%;
  align-self: center;
}
.buttonDiv {
  display: flex;
  justify-content: center;
}
</style>
