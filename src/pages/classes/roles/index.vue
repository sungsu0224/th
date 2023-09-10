<script setup lang="ts">
import ClassCards from '@/views/classes/roles/ClassCards.vue'
import UserList from '@/views/classes/roles/UserList.vue'
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h5 class="text-h5 mb-1">
        두유의 Class List
      </h5>
      <p class="text-sm mb-0">
        선생님은 여기에서 자유롭게 수정이 가능합니다!
      </p>
    </VCol>

    <!-- 👉 Roles Cards -->
    <VCol cols="12">
      <ClassCards />
    </VCol>

    <VCol cols="12">
      <h5 class="text-h5 mt-5 mb-1">
        학생 List
      </h5>
      <p class="text-sm mb-6">
        학생들에 대한 상세 정보 확인 가능합니다.
      </p>

      <!-- 👉 User List  -->
      <UserList />
    </VCol>
  </VRow>
</template>
