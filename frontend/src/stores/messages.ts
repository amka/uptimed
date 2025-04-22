import type { SnackbarMessage } from 'vuetify/lib/components/VSnackbarQueue/VSnackbarQueue.mjs'

export const useMessagesStore = defineStore('messages', () => {
  const queue = ref<SnackbarMessage[]>([])
  function add (message: SnackbarMessage) {
    queue.value.push(message)
  }

  function discard (index: number) {
    queue.value.splice(index, 1)
  }

  return { queue, add, discard }
})
