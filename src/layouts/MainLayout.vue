<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated></q-header>

    <q-page-container class="padding">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  setup() {
    return {};
  },
});
</script>
<style>
  .padding{
    padding: 1rem;
  }
</style>
