<script setup>
import { TrashIcon, HandThumbUpIcon, HandThumbDownIcon } from "@heroicons/vue/24/outline";

defineProps(["post"]);
defineEmits(["delete", "like"]);
</script>
<template>
  <article class="card">
    <header>
      <img :src="post.author.avatarUrl" alt="avatar" height="36" width="36" class="avatar" />
      <RouterLink :to="{ name: 'user', params: { username: post.author.username } }">{{
        post.author.username
      }}</RouterLink>
    </header>
    <p>{{ post.content }}</p>
    <footer>
      <button class="btn-icon" @click="$emit('delete', post.id)">
        <TrashIcon />
      </button>
      <button class="btn-icon" @click="$emit('like', post.id)">
        <div v-if="post.liked"><HandThumbUpIcon /></div>
        <div v-if="!post.liked"><HandThumbDownIcon /></div>
      </button>
    </footer>
  </article>
</template>
