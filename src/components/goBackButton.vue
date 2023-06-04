<template>
    <span class="go-back">
      <button @click="goBack">
        <i class="fa-solid fa-circle-chevron-left"></i>
        Back
      </button>
    </span>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  
  
  
  
  export default defineComponent({
    name: 'BackButton',
    setup(){
      const router = useRouter()
  
      function goBack() {
        window.history.length > 1 ? router.go(-1) : router.push('/')
      }
      return {
        goBack
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