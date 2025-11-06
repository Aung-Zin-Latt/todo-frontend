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
      try {
        const res = await fetch('https://dummyjson.com/todos/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            todo: title,
            completed: false,
            userId: 5, // just a dummy userId
          }),
        })
        const data = await res.json()
        // Add the new task to local state
        this.tasks.unshift({
          _id: data.id,
          title: data.todo,
          completed: data.completed,
        })
      } catch (error) {
        console.error('Error adding task:', error)
        // Fallback: add locally if API fails
        this.tasks.unshift({
          _id: Date.now(),
          title,
          completed: false,
        })
      }
    },

    // Mark completed (fake, just update local state)
    async markCompleted(id) {
      const index = this.tasks.findIndex((t) => t._id === id)
      if (index !== -1) this.tasks[index].completed = true
    },
  },
})
