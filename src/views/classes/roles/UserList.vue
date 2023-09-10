<script setup lang="ts">
import { VDataTableServer } from 'vuetify/labs/VDataTable'
import type { StudentProperties } from '@/@fake-db/types'
import { paginationMeta } from '@/@fake-db/utils'
import { useUserListStore } from '@/views/classes/user/useUserListStore'
import type { Options } from '@core/types'
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'

// 👉 Store
const userListStore = useUserListStore()
const searchQuery = ref('')
const selectedClass = ref()
const isUserInfoEditDialogVisible = ref(false)
const selectedPlan = ref()
const selectedStatus = ref()

// const totalPage = ref(1)
const totalUsers = ref(0)

// const users = ref<UserProperties[]>([])
const students = ref<StudentProperties[]>([])

const options = ref<Options>({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
})

const headers = [
  { title: '이름', key: 'name' },
  { title: 'email', key: 'email' },
  { title: '전화번호', key: 'contact' },
  { title: '부모님 전화번호', key: 'parent_contact' },
  { title: '역할', key: 'role' },
  { title: '참여 수업', key: 'classcode' },
  { title: '상태', key: 'status' },
  { title: 'ACTION', key: 'actions', sortable: false },
]

// 👉 test
const fetchStudents = () => {
  userListStore.fetchStudents({
    q: searchQuery.value,
    status: selectedStatus.value,
    plan: selectedPlan.value,
    classCode: selectedClass.value,
    options: options.value,
  }).then(response => {
    students.value = response.data.students
    console.log(students)
  }).catch(error => {
    console.error(error)
  })
}

const addNewStudent = (studentData: StudentProperties) => {
  console.log(studentData)
  userListStore.addStudent(studentData)

  fetchStudents()
}

watchEffect(fetchStudents)

// 👉 search filters
const roles = [
  { title: '1', value: '1' },
  { title: '2', value: '2' },
  { title: '월/수 7시', value: 'editor' },
  { title: '화/목 3시', value: 'maintainer' },
  { title: '화/목 5시', value: 'subscriber' },
]

const resolveUserRoleVariant = (role: string) => {
  const roleLowerCase = role.toLowerCase()

  if (roleLowerCase === 'subscriber')
    return { color: 'primary', icon: 'mdi-account-outline' }
  if (roleLowerCase === 'author')
    return { color: 'warning', icon: 'mdi-cog-outline' }
  if (roleLowerCase === 'maintainer')
    return { color: 'success', icon: 'mdi-chart-donut' }
  if (roleLowerCase === 'editor')
    return { color: 'info', icon: 'mdi-pencil-outline' }
  if (roleLowerCase === 'admin')
    return { color: 'error', icon: 'mdi-laptop' }

  return { color: 'primary', icon: 'mdi-account-outline' }
}

const resolveUserStatusVariant = (stat: string) => {
  const statLowerCase = stat.toLowerCase()
  if (statLowerCase === 'pending')
    return 'warning'
  if (statLowerCase === 'active')
    return 'success'
  if (statLowerCase === 'inactive')
    return 'secondary'

  return 'primary'
}

// const isAddNewUserDrawerVisible = ref(false)
</script>

<template>
  <section>
    <VCard>
      <VCardText class="d-flex flex-wrap gap-4">
        <!-- 👉 Export button -->
        <VBtn
          variant="outlined"
          color="disabled"
          prepend-icon="mdi-tray-arrow-up"
          @click="fetchStudents"
        >
          동기화
        </VBtn>
        <VBtn @click="isUserInfoEditDialogVisible = !isUserInfoEditDialogVisible">
          학생 등록
          <VIcon
            end
            icon="mdi-checkbox-marked-circle-outline"
          />
        </VBtn>

        <VSpacer />

        <div class="app-user-search-filter d-flex align-center gap-6">
          <!-- 👉 Search  -->
          <VTextField
            v-model="searchQuery"
            placeholder="Search Student"
            density="compact"
            style="width: 8rem;"
          />

          <!-- 👉 Add user button -->
          <VSelect
            v-model="selectedClass"
            label="참여 수업 선택"
            :items="roles"
            density="compact"
            clearable
            clear-icon="mdi-close"
            style="width: 6rem;"
          />
        </div>
      </VCardText>

      <!-- SECTION datatable -->
      <VDataTableServer
        v-model:items-per-page="options.itemsPerPage"
        v-model:page="options.page"
        :items="students"
        :items-length="totalUsers"
        :headers="headers"
        show-select
        class="text-no-wrap rounded-0"
        @update:options="options = $event"
      >
        <!-- User -->
        <template #item.name="{ item }">
          <div class="d-flex">
            <VAvatar
              size="34"
              :variant="!item.raw.avatar ? 'tonal' : undefined"
              :color="!item.raw.avatar ? resolveUserRoleVariant(item.raw.role).color : undefined"
              class="me-3"
            >
              <VImg :src="~item.raw.avatar ? avatar1 : avatar2" />
            </VAvatar>

            <div class="d-flex flex-column">
              <h6 class="text-sm font-weight-medium">
                <RouterLink
                  :to="{ name: 'classes-user-view-id', params: { id: item.raw.id } }"
                  class="font-weight-medium user-list-name"
                >
                  {{ item.raw.name }}
                </RouterLink>
              </h6>

              <span class="text-xs text-medium-emphasis">{{ item.raw.last_login }}</span>
            </div>
          </div>
        </template>

        <!-- Role -->
        <template #item.role="{ item }">
          <div class="d-flex gap-2">
            <VIcon
              :icon="resolveUserRoleVariant(item.raw.role).icon"
              :color="resolveUserRoleVariant(item.raw.role).color"
            />

            <span class="text-capitalize">{{ item.raw.role }}</span>
          </div>
        </template>

        <!-- email -->
        <template #item.email="{ item }">
          <span class="text-sm">{{ item.raw.email }}</span>
        </template>

        <!-- Plan -->
        <template #item.plan="{ item }">
          <span class="text-capitalize text-high-emphasis">{{ item.raw.currentPlan }}</span>
        </template>

        <!-- Status -->
        <template #item.status="{ item }">
          <VChip
            :color="resolveUserStatusVariant(item.raw.status)"
            density="comfortable"
            class="text-capitalize"
          >
            {{ item.raw.status }}
          </VChip>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <VBtn
            icon
            variant="text"
            size="small"
            color="medium-emphasis"
            :to="{ name: 'classes-user-view-id', params: { id: item.raw.id } }"
          >
            <VIcon
              size="24"
              icon="mdi-eye-outline"
            />
          </VBtn>
        </template>

        <!-- Pagination -->
        <template #bottom>
          <VDivider />

          <div class="d-flex justify-end gap-x-6 pa-2 flex-wrap">
            <div class="d-flex align-center gap-x-2 text-sm">
              Rows Per Page:
              <VSelect
                v-model="options.itemsPerPage"
                class="per-page-select text-high-emphasis"
                variant="plain"
                density="compact"
                :items="[10, 20, 25, 50, 100]"
              />
            </div>

            <span class="d-flex align-center text-sm me-2 text-high-emphasis">{{ paginationMeta(options, totalUsers) }}</span>

            <div class="d-flex gap-x-2 align-center me-2">
              <VBtn
                icon="mdi-chevron-left"
                class="flip-in-rtl"
                variant="text"
                density="comfortable"
                color="default"
                :disabled="options.page <= 1"
                @click="options.page <= 1 ? options.page = 1 : options.page--"
              />

              <VBtn
                class="flip-in-rtl"
                icon="mdi-chevron-right"
                density="comfortable"
                variant="text"
                color="default"
                :disabled="options.page >= Math.ceil(totalUsers / options.itemsPerPage)"
                @click="options.page >= Math.ceil(totalUsers / options.itemsPerPage) ? options.page = Math.ceil(totalUsers / options.itemsPerPage) : options.page++ "
              />
            </div>
          </div>
        </template>
      </VDataTableServer>
      <!-- SECTION -->
    </VCard>

    <!-- 👉 Add New User -->
    <!--
      <AddNewUserDrawer
      v-model:isDrawerOpen="isAddNewUserDrawerVisible"
      @user-data="addNewUser"
      />
    -->
    <StudentInfoEditDialog
      v-model:isDialogVisible="isUserInfoEditDialogVisible"
      @submit="addNewStudent"
    />
  </section>
</template>

<style lang="scss">
.app-user-search-filter {
  inline-size: 24.0625rem;
}

.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>
