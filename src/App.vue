<template>
  <div class="app">
    <header class="header">
      <div class="header-content">
        <h1>Mobile ICU</h1>
        <p>Student Registration Portal</p>
      </div>
    </header>

    <div class="progress-bar">
      <div class="progress-step" :class="{ active: currentPage >= 1 }">
        <div class="step-number">1</div>
        <div class="step-label">Student Information</div>
      </div>
      <div class="progress-step" :class="{ active: currentPage >= 2 }">
        <div class="step-number">2</div>
        <div class="step-label">Course Selection</div>
      </div>
      <div class="progress-step" :class="{ active: currentPage >= 3 }">
        <div class="step-number">3</div>
        <div class="step-label">Review & Submit</div>
      </div>
    </div>

    <main class="main-content">
      <router-view></router-view>
    </main>

    <footer class="footer">
      <p>&copy; 2025 Sunshine Academy. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const currentPage = computed(() => store.getters.getCurrentPage)
</script>

<style>
:root {
  --primary-color: #4CAF50;
  --secondary-color: #2c3e50;
  --accent-color: #f1c40f;
  --error-color: #ff4444;
  --success-color: #4CAF50;
  --text-color: #333;
  --light-gray: #f5f5f5;
  --border-color: #ddd;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--light-gray);
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: var(--secondary-color);
  color: white;
  padding: 2rem 0;
  text-align: center;
}

.header-content h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.header-content p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.progress-bar {
  display: flex;
  justify-content: center;
  padding: 2rem;
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 0 2rem;
}

.progress-step:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 1.5rem;
  right: -50%;
  width: 100%;
  height: 2px;
  background-color: var(--border-color);
  z-index: 1;
}

.progress-step.active .step-number {
  background-color: var(--primary-color);
  color: white;
}

.progress-step.active:not(:last-child)::after {
  background-color: var(--primary-color);
}

.step-number {
  width: 3rem;
  height: 3rem;
  background-color: var(--light-gray);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-bottom: 0.5rem;
  z-index: 2;
}

.step-label {
  font-size: 0.9rem;
  color: var(--secondary-color);
}

.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.footer {
  background-color: var(--secondary-color);
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}

/* Global form styles */
.btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: opacity 0.3s;
}

.btn.primary {
  background-color: var(--primary-color);
  color: white;
}

.btn.secondary {
  background-color: var(--secondary-color);
  color: white;
}

.btn:hover {
  opacity: 0.9;
}

.error-message {
  color: var(--error-color);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

/* Responsive design */
@media (max-width: 768px) {
  .header-content h1 {
    font-size: 2rem;
  }

  .progress-bar {
    padding: 1rem;
  }

  .progress-step {
    padding: 0 1rem;
  }

  .step-label {
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .header-content h1 {
    font-size: 1.5rem;
  }

  .progress-step {
    padding: 0 0.5rem;
  }

  .step-number {
    width: 2.5rem;
    height: 2.5rem;
  }

  .step-label {
    display: none;
  }
}
</style>