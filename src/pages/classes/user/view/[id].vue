<script setup lang="ts">
import { useUserListStore } from '@/views/classes/user/useUserListStore'
import UserBioPanel from '@/views/classes/user/view/UserBioPanel.vue'
import UserTabBillingsPlans from '@/views/classes/user/view/UserTabBillingsPlans.vue'
import UserTabConnections from '@/views/classes/user/view/UserTabConnections.vue'
import UserTabNotifications from '@/views/classes/user/view/UserTabNotifications.vue'
import UserTabOverview from '@/views/classes/user/view/UserTabOverview.vue'
import UserTabSecurity from '@/views/classes/user/view/UserTabSecurity.vue'

// 👉 Store
const userListStore = useUserListStore()

const route = useRoute()
const studentData = ref()
const userTab = ref(null)

const tabs = [
  { icon: 'mdi-account-outline', title: '수업 요약' },
  { icon: 'mdi-lock-outline', title: '비밀번호 변경' },
  { icon: 'mdi-bell-outline', title: '카카오톡 전송' },

  { icon: 'mdi-bookmark-outline', title: '설정' },
  { icon: 'mdi-link-variant', title: 'Connections' },
]

// userListStore.fetchUser(Number(route.params.id)).then(response => {
//  userData.value = response.data
// })

userListStore.fetchStudent(Number(route.params.id)).then(response => {
  studentData.value = response.data
  console.log (studentData)
  console.log (response)
})
</script>

<template>
  <VRow v-if="studentData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <UserBioPanel :student-data="studentData" />
    </VCol>
    <!-- 우상단 시작 -->

    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <VTabs
        v-model="userTab"
        class="v-tabs-pill"
      >
        <VTab
          v-for="tab in tabs"
          :key="tab.icon"
        >
          <VIcon
            start
            :icon="tab.icon"
          />

          <span>{{ tab.title }}</span>
        </VTab>
      </VTabs>

      <VWindow
        v-model="userTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <VWindowItem>
          <UserTabOverview />
        </VWindowItem>

        <VWindowItem>
          <UserTabSecurity />
        </VWindowItem>

        <VWindowItem>
          <UserTabBillingsPlans />
        </VWindowItem>

        <VWindowItem>
          <UserTabNotifications />
        </VWindowItem>

        <VWindowItem>
          <UserTabConnections />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
</template>
