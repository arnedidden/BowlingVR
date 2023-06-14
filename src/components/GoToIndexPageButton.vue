<template>
    <span class="go-back">
      <button @click="goToIndexPage">
        Return to Games Page
      </button>
    </span>
  </template>
  
  <script lang="ts">
  import { ROUTE_NAMES } from 'src/router/routes';
import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  export default defineComponent({
    setup(){
      const router = useRouter();
      const goToIndexPage = (): void => {
      void router.push({
        name: ROUTE_NAMES.HOME
      });
    };
      return {
        goToIndexPage
      }
    }
  
  })
  </script>
  
  <style lang="scss" scoped>
  .back-button {
    background-color: transparent;
    border: none;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    :hover{
        cursor: pointer;
    }
  }
  
  .back-button i {
    margin-right: 5px;
  }
  </style>