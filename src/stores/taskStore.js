import { defineStore } from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    loading: false,
  }),

  actions: {
    async fetchTasks() {
      this.loading = true
      //   try {
      //     const res = await axios.get('http://localhost:5000/api/tasks')
      //     this.tasks = res.data
      //   } catch (error) {
      //     console.error('Error fetching tasks:', error)
      //   } finally {
      //     this.loading = false
      //   }
      try {
        // Temporary mock data
        this.tasks = [
          { _id: 1, title: 'Frontend UI Design', completed: false },
          { _id: 2, title: 'Integrate API', completed: false },
          { _id: 3, title: 'Prepare Assessment', completed: true },
          { _id: 4, title: 'Frontend UI Design', completed: false },
          { _id: 5, title: 'Integrate API', completed: false },
          { _id: 6, title: 'Prepare Assessment', completed: true },
        ]
      } finally {
        this.loading = false
      }
    },

    async addTask(title) {
      try {
        const res = await axios.post('http://localhost:5000/api/tasks', { title })
        this.tasks.unshift(res.data) // add to top of list
      } catch (error) {
        console.error('Error adding task:', error)
      }
    },

    async markCompleted(id) {
      try {
        const res = await axios.patch(`http://localhost:5000/api/tasks/${id}`, {
          completed: true,
        })
        // Update local state
        const index = this.tasks.findIndex((t) => t._id === id)
        if (index !== -1) this.tasks[index] = res.data
      } catch (error) {
        console.error('Error marking completed:', error)
      }
    },
  },
})
