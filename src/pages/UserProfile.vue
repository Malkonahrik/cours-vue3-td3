<script setup>
import { useRoute } from "vue-router";
const title = "user profile";
const { params, path } = useRoute();
const username = params.username;
</script>

<template>
  <h1>{{ title }}</h1>
  <h2>{{ $route.params.username }}</h2>
  <h2>{{ username }}</h2>
</template>
