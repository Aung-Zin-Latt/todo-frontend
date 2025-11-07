import { defineStore } from 'pinia'
import api from '@/api/axios'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    loading: false,
  }),

  actions: {
    // Fetch all tasks from backend
    async fetchTasks() {
      this.loading = true
      try {
        const res = await api.get('/todos')
        // assuming backend returns an array of todos
        this.tasks = res.data.data.map((todo) => ({
          _id: todo._id,
          title: todo.title,
          completed: todo.completed,
        }))
      } catch (error) {
        console.error('Error fetching tasks:', error)
      } finally {
        this.loading = false
      }
    },

    // Add a new task via POST request
    async addTask(title) {
      try {
        const res = await api.post('/todos', { title })
        const newTask = res.data.data

        this.tasks.unshift({
          _id: newTask._id,
          title: newTask.title,
          completed: newTask.completed,
        })
      } catch (error) {
        console.error('Error adding task:', error)
      }
    },

    // Mark task as completed (PUT request)
    async markCompleted(id) {
      try {
        const res = await api.put(`/todos/${id}`)
        const updated = res.data.data || res.data

        // update local state
        const index = this.tasks.findIndex((t) => t._id === id)
        if (index !== -1)
          this.tasks[index] = {
            ...this.tasks[index],
            completed: updated.completed,
          }
      } catch (error) {
        console.error('Error marking completed:', error)
      }
    },
  },
})
