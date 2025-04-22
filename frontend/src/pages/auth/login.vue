<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center">
      <v-col cols="12" lg="4" md="6" sm="8">
        <h1 class="text-h1 gradient-text text-center">Uptimed</h1>

        <v-card class="elevation-12 rounded-lg mt-8">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>

          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <v-text-field
                v-model="form.email"
                :error-messages="errors.email"
                flat
                label="Email"
                prepend-inner-icon="mdi-email"
                required
                type="email"
                variant="solo-filled"
              />

              <v-text-field
                v-model="form.password"
                counter
                :error-messages="errors.password"
                flat
                label="Password"
                prepend-inner-icon="mdi-lock"
                required
                type="password"
                variant="solo-filled"
              />

              <v-btn
                block
                class="mt-2"
                color="primary"
                :loading="isSubmitting"
                type="submit"
                variant="flat"
              >
                Login
              </v-btn>
            </v-form>
          </v-card-text>

          <v-card-actions class="justify-center">
            <p>
              Don't have an account?
              <router-link :to="{ name: '/auth/register' }">Sign Up</router-link>
            </p>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';
  import { useMessagesStore } from '@/stores/messages';
  import type { LoginParams } from '@/types/auth';

  interface FormErrors {
    email?: string[];
    password?: string[];
  }

  const form = reactive<LoginParams>({
    email: '',
    password: '',
  });

  const router = useRouter();
  const messagesStore = useMessagesStore();

  const errors = reactive<FormErrors>({});
  const isSubmitting = ref(false);
  const authStore = useAuthStore();

  const validateForm = (): boolean => {
    let isValid = true;
    errors.email = [];
    errors.password = [];

    if (!form.email) {
      errors.email = ['Email is required'];
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = ['Email is invalid'];
      isValid = false;
    }

    if (!form.password) {
      errors.password = ['Password is required'];
      isValid = false;
    } else if (form.password.length < 8) {
      errors.password = ['Password must be at least 8 characters'];
      isValid = false;
    }

    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    isSubmitting.value = true;

    try {
      const success = await authStore.login({
        email: form.email,
        password: form.password,
      });

      if (success) {
        messagesStore.add({ text: 'Welcome back!', color: 'success' });
        router.push('/')
      } else {
        throw Error(authStore.error)
      }
    } catch (error) {

      if (error instanceof Error) {
        messagesStore.add({ text: error.message, color: 'error' });
      } else {
        messagesStore.add({
          text: 'An unexpected error occurred',
          color: 'error',
        });
      }
    } finally {
      isSubmitting.value = false;
    }


  };
</script>

<route lang="yaml">
meta:
  layout: outer
  public: true
</route>
