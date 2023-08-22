<script lang="ts" setup>
import { useRoute } from 'vue-router'
import UserProfileHeader from '@/views/pages/class-profile/UserProfileHeader.vue'
import UserConnections from '@/views/pages/class-profile/connections/index.vue'
import UserProfile from '@/views/pages/class-profile/profile/index.vue'
import UserProjects from '@/views/pages/class-profile/projects/index.vue'
import UserTeam from '@/views/pages/class-profile/team/index.vue'

const route = useRoute()

const activeTab = ref(route.params.tab)

// tabs
const tabs = [
  { title: '요약', icon: 'mdi-account-outline', tab: 'profile' },
  { title: '수업 내용', icon: 'mdi-account-group-outline', tab: 'teams' },
  { title: '과제', icon: 'mdi-view-grid-outline', tab: 'projects' },
  { title: '학생 정보', icon: 'mdi-link', tab: 'connections' },
]
</script>

<template>
  <div>
    <UserProfileHeader class="mb-6" />

    <VTabs
      v-model="activeTab"
      class="v-tabs-pill"
    >
      <VTab
        v-for="item in tabs"
        :key="item.icon"
        :value="item.tab"
        :to="{ name: 'pages-class-profile-tab', params: { tab: item.tab } }"
      >
        <VIcon
          size="20"
          start
          :icon="item.icon"
        />
        {{ item.title }}
      </VTab>
    </VTabs>

    <VWindow
      v-model="activeTab"
      class="mt-6 disable-tab-transition"
      :touch="false"
    >
      <!-- Profile -->
      <VWindowItem value="profile">
        <UserProfile />
      </VWindowItem>

      <!-- Teams -->
      <VWindowItem value="teams">
        <UserTeam />
      </VWindowItem>

      <!-- Projects -->
      <VWindowItem value="projects">
        <UserProjects />
      </VWindowItem>

      <!-- Connections -->
      <VWindowItem value="connections">
        <UserConnections />
      </VWindowItem>
    </VWindow>
  </div>
</template>

<route lang="yaml">
meta:
  navActiveLink: pages-class-profile-tab
</route>
