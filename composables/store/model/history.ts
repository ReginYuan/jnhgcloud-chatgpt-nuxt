import { defineStore } from 'pinia'
export const historyStrore = defineStore('user', {
  state: () => {
    return []
  },
  actions: {
    setHistory(value: string[]) {
      this.$state = value
      window.localStorage.setItem('History', JSON.stringify(value))
    }
  },
  // 开启数据持久化
  persist: true
})
