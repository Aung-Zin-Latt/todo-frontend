<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <div
      class="w-full max-w-lg mx-auto mt-10 bg-white/90 backdrop-blur-md shadow-lg rounded-3xl p-8 border border-gray-100"
    >
      <!-- Header -->
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">My Todo List</h1>

      <!-- Add Task Form -->
      <form @submit.prevent="addNewTask" class="flex items-start gap-2 mb-4 flex-nowrap">
        <!-- Input wrapper -->
        <div class="flex-1 min-w-0">
          <BaseInput
            v-model="newTask"
            type="text"
            placeholder="Enter a new task..."
            :error="!newTask && showError ? 'Please enter a task.' : ''"
            class="w-full"
          />
        </div>

        <!-- Button stays aligned -->
        <BaseButton class="whitespace-nowrap mt-[2px]">Add Task</BaseButton>
      </form>

      <!-- Task List -->
      <div
        v-if="store.tasks.length"
        class="space-y-3 max-h-[420px] overflow-y-auto pr-1 transition-all"
      >
        <transition-group name="fade" tag="div">
          <div
            v-for="task in store.tasks"
            :key="task._id"
            class="flex justify-between items-center px-4 py-3 bg-gray-50 rounded-xl border border-gray-100 hover:bg-gray-100 transition transform hover:scale-[1.01]"
          >
            <span
              class="font-medium text-gray-800 text-base truncate"
              :class="{ 'line-through text-gray-400': task.completed }"
            >
              {{ task.title }}
            </span>

            <div>
              <button
                v-if="!task.completed"
                @click="store.markCompleted(task._id)"
                class="text-green-600 hover:text-green-800 transition"
                title="Mark as completed"
              >
                ✅
              </button>
              <span v-else class="text-gray-400 text-sm italic">Done</span>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center mt-10 text-gray-500">
        <img
          src="https://cdn-icons-png.flaticon.com/512/4072/4072301.png"
          alt="Empty list"
          class="w-24 mx-auto mb-4 opacity-70"
        />
        <p>No tasks yet. Start by adding one above!</p>
      </div>

      <!-- Loading -->
      <p v-if="store.loading" class="text-center text-blue-500 mt-4 animate-pulse">
        Loading tasks...
      </p>
    </div>
  </div>
</template>

<!-- Simple fade animation -->
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/taskStore'
import BaseInput from '@/components/common/BaseInput.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const newTask = ref('')
const store = useTaskStore()

const showError = ref(false)

async function addNewTask() {
  if (!newTask.value.trim()) {
    showError.value = true
    return
  }
  showError.value = false
  await store.addTask(newTask.value)
  newTask.value = ''
}

onMounted(() => store.fetchTasks())
</script>
