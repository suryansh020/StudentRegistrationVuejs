<template>
  <div class="page-container">
    <h2>Course Selection</h2>
    <form @submit.prevent="handleSubmit" class="form-grid">
      <div class="form-group full-width">
        <label for="courseName">Select Course*</label>
        <select 
          id="courseName"
          v-model="selectedCourse"
          required
          @change="updateCourseDetails"
        >
          <option value="">Choose a course</option>
          <option v-for="course in availableCourses" 
                  :key="course.name" 
                  :value="course">
            {{ course.name }}
          </option>
        </select>
        <span v-if="errors.courseName" class="error-message">{{ errors.courseName }}</span>
      </div>

      <div v-if="selectedCourse" class="course-details">
        <div class="detail-item">
          <strong>Instructor:</strong> {{ selectedCourse.instructor }}
        </div>
        <div class="detail-item">
          <strong>Duration:</strong> {{ selectedCourse.duration }}
        </div>
        <div class="detail-item">
          <strong>Price:</strong> ${{ selectedCourse.price }}
        </div>
        <div class="detail-item full-width">
          <strong>Description:</strong> {{ selectedCourse.description }}
        </div>
      </div>

      <div class="form-group">
        <label for="startDate">Start Date*</label>
        <input 
          id="startDate"
          v-model="formData.startDate"
          type="date"
          required
          :min="minStartDate"
        >
        <span v-if="errors.startDate" class="error-message">{{ errors.startDate }}</span>
      </div>

      <div class="form-group">
        <label for="endDate">End Date*</label>
        <input 
          id="endDate"
          v-model="formData.endDate"
          type="date"
          required
          :min="formData.startDate"
        >
        <span v-if="errors.endDate" class="error-message">{{ errors.endDate }}</span>
      </div>

      <div class="button-group">
        <button type="button" class="btn secondary" @click="goBack">Back</button>
        <button type="submit" class="btn primary">Next</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const availableCourses = [
  {
    name: 'Mathematics Advanced',
    instructor: 'Dr. Sarah Johnson',
    price: 450,
    duration: '1 semester',
    description: 'Advanced mathematics including Algebra, Calculus, and Trigonometry.'
  },
  {
    name: 'Science Package',
    instructor: 'Prof. Michael Brown',
    price: 550,
    duration: '1 semester',
    description: 'Comprehensive science package including Physics, Chemistry, and Biology.'
  },
  {
    name: 'English Literature',
    instructor: 'Ms. Emily Davis',
    price: 400,
    duration: '1 semester',
    description: 'Advanced English literature, composition, and critical analysis.'
  },
  {
    name: 'Computer Science',
    instructor: 'Mr. John Smith',
    price: 500,
    duration: '1 semester',
    description: 'Programming fundamentals, web development, and computer concepts.'
  },
  {
    name: 'History & Social Studies',
    instructor: 'Dr. Robert Wilson',
    price: 400,
    duration: '1 semester',
    description: 'World History, Geography, and Social Studies curriculum.'
  }
]

const selectedCourse = ref(null)
const formData = ref({
  courseName: '',
  instructorName: '',
  startDate: '',
  endDate: '',
  price: 0
})

const errors = ref({})

const minStartDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const updateCourseDetails = () => {
  if (selectedCourse.value) {
    formData.value.courseName = selectedCourse.value.name
    formData.value.instructorName = selectedCourse.value.instructor
    formData.value.price = selectedCourse.value.price
  }
}

const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (!selectedCourse.value) {
    errors.value.courseName = 'Please select a course'
    isValid = false
  }

  if (!formData.value.startDate) {
    errors.value.startDate = 'Start date is required'
    isValid = false
  }

  if (!formData.value.endDate) {
    errors.value.endDate = 'End date is required'
    isValid = false
  } else if (formData.value.endDate < formData.value.startDate) {
    errors.value.endDate = 'End date must be after start date'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (validateForm()) {
    store.dispatch('updateCourseData', formData.value)
    router.push('/page-three')
  }
}

const goBack = () => {
  router.push('/page-one')
}
</script>

<style scoped>
.page-container {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.course-details {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  padding: 1.5rem;
  background-color: var(--light-gray);
  border-radius: 4px;
  margin: 1rem 0;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-item.full-width {
  grid-column: 1 / -1;
}

label {
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input, select {
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
}

input:focus, select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.button-group {
  grid-column: 1 / -1;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }

  .course-details {
    grid-template-columns: 1fr;
  }
}
</style>
