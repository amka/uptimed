<template>
  <v-app-bar class="px-3" density="compact" flat>
    <v-avatar
      class="hidden-md-and-up"
      color="grey-darken-1"
      size="32"
    />

    <v-spacer />

    <v-tabs align-tabs="center" color="grey-darken-2">
      <v-tab v-for="link in links" :key="link" :text="link" />
    </v-tabs>
    <v-spacer />

    <v-menu
      transition="slide-y-transition"
    >
      <template #activator="{ props }">
        <v-btn
          class="hidden-sm-and-down"
          v-bind="props"
        >{{ authStore.user?.name }}
        </v-btn>
      </template>

      <v-card class="rounded-lg" min-width="300">
        <v-list>
          <v-list-item
            :prepend-avatar="authStore.userAvatar"
            :subtitle="authStore.user?.email"
            :title="authStore.user?.name"
          >
            <template #append>
              <v-btn
                icon="mdi-logout"
                title="Logout"
                variant="text"
                @click="handleLogout"
              />
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/auth';

  const authStore = useAuthStore();
  const router = useRouter();

  const links = [
    'Dashboard',
    'Messages',
    'Profile',
    'Updates',
  ]

  const handleLogout = async () => {
    await authStore.logout();
    router.replace('/auth/login')
  }
</script>
