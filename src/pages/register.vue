<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const username = ref("");

const email = ref("");

const password = ref("");

const isFormValid = computed(() => {
  return username.value.trim() && email.value.trim() && password.value.trim;
});

const router = useRouter();

function registerUser() {
  const json = {
    username: trimmedLogin,
    email: trimmedEmail,
    password: trimmedPwd,
  };
  console.log(json);
  setTimeout(() => {
    router.push("/");
  }, 1000);
}
</script>
<template>
  <form class="container" @submit.prevent="registerUser">
    <h1>Créer un compte</h1>
    <input type="text" v-model="username" placeholder="Nom d'utilisateur" />
    <input type="email" v-model="email" placeholder="Email" />

    <input type="password" v-model="password" placeholder="Mot de passe" />

    <input type="submit" value="S'inscrire" :disabled="!isFormValid" class="btn" />
  </form>
</template>
<style scoped>
input {
  background: var(--color-bg-tertiary);
  border: none;
  border-radius: 10px;
  color: var(--color-text-primary);
  outline: none;
  padding: 1rem;
  margin-bottom: 1rem;
}
input:disabled {
  color: gray;
}
.btn {
  cursor: pointer;
}
</style>
