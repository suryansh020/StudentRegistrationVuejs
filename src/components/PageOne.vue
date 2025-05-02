<template>
  <div class="page-container">
    <h2>Student Information</h2>
    <form @submit.prevent="handleSubmit" class="form-grid">
      <div class="form-group">
        <label for="firstName">First Name*</label>
        <input 
          id="firstName"
          v-model="formData.firstName"
          type="text"
          required
          placeholder="Enter first name"
        >
        <span v-if="errors.firstName" class="error-message">{{ errors.firstName }}</span>
      </div>

      <div class="form-group">
        <label for="lastName">Last Name*</label>
        <input 
          id="lastName"
          v-model="formData.lastName"
          type="text"
          required
          placeholder="Enter last name"
        >
        <span v-if="errors.lastName" class="error-message">{{ errors.lastName }}</span>
      </div>

      <div class="form-group">
        <label for="grade">Grade Level*</label>
        <select 
          id="grade"
          v-model="formData.grade"
          required
        >
          <option value="">Select Grade</option>
          <option value="9">Grade 9</option>
          <option value="10">Grade 10</option>
          <option value="11">Grade 11</option>
          <option value="12">Grade 12</option>
        </select>
        <span v-if="errors.grade" class="error-message">{{ errors.grade }}</span>
      </div>

      <div class="form-group">
        <label for="dateOfBirth">Date of Birth*</label>
        <input 
          id="dateOfBirth"
          v-model="formData.dateOfBirth"
          type="date"
          required
        >
        <span v-if="errors.dateOfBirth" class="error-message">{{ errors.dateOfBirth }}</span>
      </div>

      <div class="form-group">
        <label for="parentName">Parent/Guardian Name*</label>
        <input 
          id="parentName"
          v-model="formData.parentName"
          type="text"
          required
          placeholder="Enter parent/guardian name"
        >
        <span v-if="errors.parentName" class="error-message">{{ errors.parentName }}</span>
      </div>

      <div class="form-group">
        <label for="email">Email*</label>
        <input 
          id="email"
          v-model="formData.email"
          type="email"
          required
          placeholder="Enter email address"
        >
        <span v-if="errors.email" class="error-message">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="phone">Phone Number*</label>
        <input 
          id="phone"
          v-model="formData.phone"
          type="tel"
          required
          placeholder="Enter phone number"
        >
        <span v-if="errors.phone" class="error-message">{{ errors.phone }}</span>
      </div>

      <div class="form-group full-width">
        <label for="address">Address*</label>
        <input 
          id="address"
          v-model="formData.address"
          type="text"
          required
          placeholder="Enter street address"
        >
        <span v-if="errors.address" class="error-message">{{ errors.address }}</span>
      </div>

      <div class="form-group">
        <label for="city">City*</label>
        <input 
          id="city"
          v-model="formData.city"
          type="text"
          required
          placeholder="Enter city"
        >
        <span v-if="errors.city" class="error-message">{{ errors.city }}</span>
      </div>

      <div class="form-group">
        <label for="state">State*</label>
        <input 
          id="state"
          v-model="formData.state"
          type="text"
          required
          placeholder="Enter state"
        >
        <span v-if="errors.state" class="error-message">{{ errors.state }}</span>
      </div>

      <div class="form-group">
        <label for="zipCode">ZIP Code*</label>
        <input 
          id="zipCode"
          v-model="formData.zipCode"
          type="text"
          required
          placeholder="Enter ZIP code"
          pattern="[0-9]{5}"
        >
        <span v-if="errors.zipCode" class="error-message">{{ errors.zipCode }}</span>
      </div>

      <div class="button-group">
        <button type="submit" class="btn primary">Next</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const formData = ref({
  firstName: '',
  lastName: '',
  grade: '',
  dateOfBirth: '',
  parentName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zipCode: ''
})

const errors = ref({})

const validateForm = () => {
  errors.value = {}
  let isValid = true

  if (!formData.value.firstName.trim()) {
    errors.value.firstName = 'First name is required'
    isValid = false
  }

  if (!formData.value.lastName.trim()) {
    errors.value.lastName = 'Last name is required'
    isValid = false
  }

  if (!formData.value.grade) {
    errors.value.grade = 'Grade level is required'
    isValid = false
  }

  if (!formData.value.dateOfBirth) {
    errors.value.dateOfBirth = 'Date of birth is required'
    isValid = false
  }

  if (!formData.value.email.trim()) {
    errors.value.email = 'Email is required'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = 'Please enter a valid email address'
    isValid = false
  }

  if (!formData.value.phone.trim()) {
    errors.value.phone = 'Phone number is required'
    isValid = false
  }

  if (!formData.value.zipCode.trim()) {
    errors.value.zipCode = 'ZIP code is required'
    isValid = false
  } else if (!/^\d{5}$/.test(formData.value.zipCode)) {
    errors.value.zipCode = 'Please enter a valid 5-digit ZIP code'
    isValid = false
  }

  return isValid
}

const handleSubmit = () => {
  if (validateForm()) {
    store.dispatch('updateStudentData', formData.value)
    router.push('/page-two')
  }
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
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}
</style>
