<template>
  <v-snackbar-queue v-model="messages.queue">
    <template #actions="{ props }">
      <v-btn
        variant="text"
        @click="() => props.onClick()"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar-queue>
  <router-view />
</template>

<script lang="ts" setup>
  import { useMessagesStore } from '@/stores/messages';
  const messages = useMessagesStore()
</script>
