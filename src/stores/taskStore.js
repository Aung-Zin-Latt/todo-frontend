import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    loading: false,
  }),

  actions: {
    // Fetch tasks from dummy JSON API
    async fetchTasks() {
      this.loading = true
      try {
        const res = await fetch('https://dummyjson.com/todos')
        const data = await res.json()
        // dummyjson returns { todos: [...] }
        this.tasks = data.todos.map((todo) => ({
          _id: todo.id, // match your frontend id field
          title: todo.todo, // match your frontend title field
          completed: todo.completed,
        }))
      } catch (error) {
        console.error('Error fetching tasks:', error)
      } finally {
        this.loading = false
      }
    },

    // Add task (fake, just push to local state)
    async addTask(title) {
      const newTask = {
        _id: Date.now(), // temporary unique ID
        title,
        completed: false,
      }
      this.tasks.unshift(newTask)
    },

    // Mark completed (fake, just update local state)
    async markCompleted(id) {
      const index = this.tasks.findIndex((t) => t._id === id)
      if (index !== -1) this.tasks[index].completed = true
    },
  },
})
