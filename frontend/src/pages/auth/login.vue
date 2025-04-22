<template>
  <v-container>
    <v-form ref="form" @submit.prevent="handleLogin">
      <v-text-field
        v-model="email"
        label="Email"
        required
        :rules="[rules.required]"
        type="email"
        variant="solo"
      />
      <v-text-field
        v-model="password"
        label="Password"
        required
        :rules="[rules.required]"
        type="password"
      />
      <v-btn block :loading="authStore.loading" type="submit" variant="tonal">
        Login
      </v-btn>
      <v-alert v-if="authStore.error" type="error">
        {{ authStore.error }}
      </v-alert>
    </v-form>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';
  import { useMessagesStore } from '@/stores/messages';

  const router = useRouter();
  const messages = useMessagesStore()

  const form = ref();
  const authStore = useAuthStore();
  const email = ref('');
  const password = ref('');

  const rules = {
    required: (value: string) => !!value || 'Field is required',
  }

  const handleLogin = async () => {
    const { valid } = await form.value.validate()
    if (!valid) {
      messages.add({
        color: 'error',
        text: 'Please fill in all fields',
      })
      return
    }

    const success = await authStore.login({
      email: email.value,
      password: password.value,
    });

    if (success) {
      router.push('/')
    }
  };
</script>
