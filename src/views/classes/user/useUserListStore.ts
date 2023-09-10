import type { AxiosResponse } from 'axios'
import { defineStore } from 'pinia'
import type { StudentProperties, UserProperties } from '@/@fake-db/types'
import type { StudentParams, UserParams } from '@/views/classes/user/types'
import axios from '@axios'

// import type { AxiosResponse } from 'axios'
// import { defineStore } from 'pinia'
// import type { UserProperties } from '@/@fake-db/types'
// import type { UserParams } from '@/views/classes/user/types'
// import axios from '@axios'

export const useUserListStore = defineStore('UserListStore', {
  actions: {

    // 👉 Fetch users data
    fetchUsers(params: UserParams) {
      console.log(`param:${params}`)

      return axios.get('/classes/users/list', { params })
    },

    fetchStudents(studentParams: StudentParams) {
      console.log('동기화 시작')
      console.log(studentParams)

      return axios.get(
        'http://127.0.0.1:8080/student',
        {
          params: {
            query: studentParams.q,
            classCode: studentParams.classCode,

            // a: userParams.options,r
          },

        },
      )
    },

    addStudent(studentProperties: StudentProperties) {
      console.log('학생 추가 시작')
      console.log(studentProperties)

      return axios.post(
        'http://127.0.0.1:8080/student/add',
        JSON.stringify(studentProperties),
        {
          headers: {
            'content-Type': 'application/json',
          },
        },
      )
    },

    // 👉 Add User
    addUser(userData: UserProperties) {
      return new Promise((resolve, reject) => {
        axios.post('/classes/users/user', userData).then(response => resolve(response))
          .catch(error => reject(error))
      })
    },

    // 👉 fetch single user
    fetchUser(id: number) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        axios.get(`/classes/users/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
    fetchStudent(id: number) {
      return new Promise<AxiosResponse>((resolve, reject) => {
        axios.get(`http://127.0.0.1:8080/student/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },

    // 👉 Delete User
    deleteUser(id: number) {
      return new Promise((resolve, reject) => {
        axios.delete(`/classes/users/${id}`).then(response => resolve(response)).catch(error => reject(error))
      })
    },
  },
})
