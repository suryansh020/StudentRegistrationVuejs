import { createStore } from 'vuex'

export default createStore({
  state: {
    currentPage: 1,
    studentData: {
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
      zipCode: '',
      previousSchool: ''
    },
    courseData: {
      courseName: '',
      instructorName: '',
      startDate: '',
      endDate: '',
      price: 0
    },
    extraData: {
      comments: '',
      agreement: false
    }
  },
  mutations: {
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page
    },
    UPDATE_STUDENT_DATA(state, data) {
      state.studentData = { ...state.studentData, ...data }
    },
    UPDATE_COURSE_DATA(state, data) {
      state.courseData = { ...state.courseData, ...data }
    },
    UPDATE_EXTRA_DATA(state, data) {
      state.extraData = { ...state.extraData, ...data }
    },
    RESET_FORM(state) {
      state.currentPage = 1
      state.studentData = {
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
        zipCode: '',
        previousSchool: ''
      }
      state.courseData = {
        courseName: '',
        instructorName: '',
        startDate: '',
        endDate: '',
        price: 0
      }
      state.extraData = {
        comments: '',
        agreement: false
      }
    }
  },
  actions: {
    setCurrentPage({ commit }, page) {
      commit('SET_CURRENT_PAGE', page)
    },
    updateStudentData({ commit }, data) {
      commit('UPDATE_STUDENT_DATA', data)
    },
    updateCourseData({ commit }, data) {
      commit('UPDATE_COURSE_DATA', data)
    },
    updateExtraData({ commit }, data) {
      commit('UPDATE_EXTRA_DATA', data)
    },
    submitForm({ state }) {
      // In a real application, you would send this data to a backend server
      console.log('Form submitted:', {
        student: state.studentData,
        course: state.courseData,
        extra: state.extraData
      })
    },
    resetForm({ commit }) {
      commit('RESET_FORM')
    }
  },
  getters: {
    getCurrentPage: state => state.currentPage,
    getStudentData: state => state.studentData,
    getCourseData: state => state.courseData,
    getExtraData: state => state.extraData
  }
})
