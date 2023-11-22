import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore(
  'counter',
  () => {
    const count = ref(0)
    const setCount = (newCount) => {
      count.value = newCount
    }
    return {
      count,
      setCount
    }
  },
  { persist: true }
)
