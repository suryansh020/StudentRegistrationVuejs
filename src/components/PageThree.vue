<template>
  <div class="page-container">
    <h2>Review and Submit</h2>
    
    <div class="summary-section">
      <h3>Student Information</h3>
      <div class="summary-grid">
        <div class="summary-item">
          <strong>Name:</strong> 
          {{ studentData.firstName }} {{ studentData.lastName }}
        </div>
        <div class="summary-item">
          <strong>Grade:</strong> 
          {{ studentData.grade }}
        </div>
        <div class="summary-item">
          <strong>Date of Birth:</strong> 
          {{ formatDate(studentData.dateOfBirth) }}
        </div>
        <div class="summary-item">
          <strong>Parent/Guardian:</strong> 
          {{ studentData.parentName }}
        </div>
        <div class="summary-item">
          <strong>Email:</strong> 
          {{ studentData.email }}
        </div>
        <div class="summary-item">
          <strong>Phone:</strong> 
          {{ studentData.phone }}
        </div>
        <div class="summary-item full-width">
          <strong>Address:</strong> 
          {{ studentData.address }}, {{ studentData.city }}, 
          {{ studentData.state }} {{ studentData.zipCode }}
        </div>
      </div>
    </div>

    <div class="summary-section">
      <h3>Course Details</h3>
      <div class="summary-grid">
        <div class="summary-item">
          <strong>Course:</strong> 
          {{ courseData.courseName }}
        </div>
        <div class="summary-item">
          <strong>Instructor:</strong> 
          {{ courseData.instructorName }}
        </div>
        <div class="summary-item">
          <strong>Start Date:</strong> 
          {{ formatDate(courseData.startDate) }}
        </div>
        <div class="summary-item">
          <strong>End Date:</strong> 
          {{ formatDate(courseData.endDate) }}
        </div>
        <div class="summary-item">
          <strong>Price:</strong> 
          ${{ courseData.price }}
        </div>
      </div>
    </div>

    <div class="additional-section">
      <h3>Additional Comments</h3>
      <textarea 
        v-model="extraData.comments" 
        placeholder="Optional: Add any additional comments or special requirements"
        rows="4"
      ></textarea>
    </div>

    <div class="agreement-section">
      <label class="checkbox-container">
        <input 
          type="checkbox" 
          v-model="extraData.agreement"
          required
        >
        <span class="checkmark"></span>
        I agree to the terms and conditions of Mobile ICU
      </label>
      <span v-if="!extraData.agreement && submitted" class="error-message">
        You must agree to the terms and conditions
      </span>
    </div>

    <div class="button-group">
      <button type="button" class="btn secondary" @click="goBack">Back</button>
      <button 
        type="button" 
        class="btn primary" 
        @click="submitForm"
        :disabled="!extraData.agreement"
      >
        Submit Registration
      </button>
    </div>

    <div v-if="submissionStatus" class="submission-modal">
      <div class="modal-content" :class="submissionStatus.type">
        <h3>{{ submissionStatus.title }}</h3>
        <p>{{ submissionStatus.message }}</p>
        <button 
          class="btn primary" 
          @click="resetForm"
        >
          {{ submissionStatus.type === 'success' ? 'Start New Registration' : 'Try Again' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const studentData = computed(() => store.getters.getStudentData)
const courseData = computed(() => store.getters.getCourseData)

const extraData = ref({
  comments: '',
  agreement: false
})

const submitted = ref(false)
const submissionStatus = ref(null)

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const goBack = () => {
  router.push('/page-two')
}

const submitForm = async () => {
  submitted.value = true

  if (!extraData.value.agreement) {
    return
  }

  try {
    // Combine all form data
    const completeRegistration = {
      student: studentData.value,
      course: courseData.value,
      extra: extraData.value
    }

    // Dispatch final submission
    await store.dispatch('submitForm', completeRegistration)

    // Show success modal
    submissionStatus.value = {
      type: 'success',
      title: 'Registration Successful!',
      message: `Thank you, ${studentData.value.firstName}! Your registration for ${courseData.value.courseName} has been received.`
    }
  } catch (error) {
    // Show error modal
    submissionStatus.value = {
      type: 'error',
      title: 'Submission Failed',
      message: 'There was an issue submitting your registration. Please try again.'
    }
  }
}

const resetForm = () => {
  store.dispatch('resetForm')
  submissionStatus.value = null
  submitted.value = false
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

.summary-section {
  background-color: var(--light-gray);
  border-radius: 4px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.summary-item.full-width {
  grid-column: 1 / -1;
}

.additional-section {
  margin-bottom: 1.5rem;
}

textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  resize: vertical;
  min-height: 100px;
}

.agreement-section {
  position: relative;
  margin-bottom: 1.5rem;
}

.checkbox-container {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  user-select: none;
}

.checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: white;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.checkbox-container:hover input ~ .checkmark {
  background-color: var(--light-gray);
}

.checkbox-container input:checked ~ .checkmark {
  background-color: var(--primary-color);
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox-container input:checked ~ .checkmark:after {
  display: block;
}

.checkbox-container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  transform: rotate(45deg);
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.submission-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  max-width: 500px;
  width: 90%;
}

.modal-content.success {
  border-top: 5px solid var(--success-color);
}

.modal-content.error {
  border-top: 5px solid var(--error-color);
}

@media (max-width: 768px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}
</style>
