<script setup>
import { ref, computed } from "vue";
import PostCard from "@/components/PostCard.vue";

const text = ref("");
const trimmedText = computed(() => text.value.trim());

const posts = ref([]);
const sortedPost = computed(() => posts.value.toSorted((a, b) => b.createdAt - a.createdAt));

function addPost() {
  const newPost = {
    id: Math.random().toString(36).substring(2),
    content: trimmedText.value,
    createdAt: new Date(),
    liked: false,
    author: {
      id: Math.random().toString(36).substring(2),
      username: "STONKS",
      avatarUrl:
        "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIADgAOAMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAAABgcFBAED/8QAMhAAAQMCAwQIBgMBAAAAAAAAAQACAwQRBRIhBhMxQQcUIlFhcYGRFjJCUqHBI8LRFf/EABgBAQEBAQEAAAAAAAAAAAAAAAMCAAQB/8QAGxEAAgMBAQEAAAAAAAAAAAAAAAECESESMQP/2gAMAwEAAhEDEQA/ALiuXEa6LD6Z08tzbRrRxce4LqSttBVRyYhuZHWZELep1P69lM5cqyoR6dCrtBitfib3dYlcyHlBG6zAPHv9Vh0lHHNUatBAW/jElI2I7rUrFwqS7pjfgue29HpLDepN/h2SSiqZIT9rXdk+beBT1gWKtxSkLy0MnjOWVg5HvHgVMosUFRMynbBMAHEb0gWv3HW49Uw7J4tT/E3UY8+8lp3B3ZOUlpB48LjVX8206Jmk1Y/IQhOACk+0eIH/AK1YwnVs7x7OKrCjO31O+k2prG/TLlmZ5OGv5DlH0VouD04Kmrzc+S8wSq3NaXciFjSTkOsSunDpQJm3PNFWCXo4ieF7HMiijjzkudkFsx7107MRx/FFE6KNu/cHbx9tcga79n8pXxGp3MIyVIp3k6POlhz1Td0ZUzpsSrK175JWwwiJssjbZi43Nh5NHutBaabwoyEIXQACn3SpQBz8PrWjXtQu8fqb/b3VBSd0mdrC6Jg+brV7eGR3+qZeFR9I/X0xbILc1n9cfRyWlDsv3AJlq6dxsbLNqqZ8rhFE273GwRJiNGtg2OUjmNZK6N7yRu2kXLncrDmVZtnsPGG4XFEW2lk/kmJ4l54+3DyAXLsVQw0WyuEwxsbdtMwl1tS4i7j6klbiSMUtDlJvAQhCskEm9ItPXujoqmko56uCHOJWQNzvbe1nZRq7gRpcrxC8atUep0IRxnDhIYpy6KVvzRysLXN8weC+1DNhfWnup5utVMgIZDAwvdbwaNShCLhXQnbqyq7LwVFNgVLFVsLJQD2DxaCSQD42stVCEwQIQhYx/9k=",
    },
  };
  posts.value.push(newPost);
  text.value = "";
}

function deletePost(postId) {
  posts.value = posts.value.filter((post) => post.id !== postId);
}

function likePost(postId) {
  posts.value.forEach((post) => {
    if (post.id == postId) {
      post.liked = !post.like;
    }
  });
}
const loading = ref(false);
const apiPosts = ref([]);
function fetchPosts() {
  loading.value = true;
  const result = fetch("https://posts-crud-api.vercel.app/posts");
  result
    .then((response) => response.json())
    .then((data) => {
      apiPosts.value = data;
      loading.value = false;
    });
}
fetchPosts();
</script>

<template>
  <main>
    <div class="container">
      <form class="card" @submit.prevent="addPost">
        <textarea
          name="post"
          id="post"
          placeholder="Quoi de neuf ?"
          v-model="text"
          maxlength="512"
        ></textarea>
        <button type="submit" :disabled="!trimmedText.length">Publier</button>
      </form>

      <p v-if="loading">Chargement . . .</p>
      <p v-else-if="!apiPosts.length">Pas de post pour le moment.</p>

      <PostCard
        v-for="(post, index) in apiPosts"
        :key="index"
        :post="post"
        @delete="deletePost"
        @like="likePost"
      />

      <!--<article v-for="(post, index) in sortedPost" :key="index" class="card">
        <div class="post-header">
          <img
            :src="post.author.avatarUrl"
            alt="avatar"
            height="36"
            width="36"
            class="user-image"
          />
          <a>{{ post.author.username }}</a>
        </div>

        <p>{{ post.content }}</p>
      </article>>-->
    </div>
  </main>
</template>
