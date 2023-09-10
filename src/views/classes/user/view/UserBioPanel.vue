<script setup lang="ts">
import type { StudentProperties } from '@/@fake-db/types'
import { avatarText } from '@core/utils/formatters'

interface Props {
  studentData?: StudentProperties

}

const props = defineProps<Props>()

const standardPlan = {
  plan: 'Standard',
  price: 99,
  benefits: ['암기 단어 : 100단어 / 120단어', '과제 : 5회/8회', '결석 : 3회'],
}

const isUserInfoEditDialogVisible = ref(false)
const isUpgradePlanDialogVisible = ref(false)

// 👉 Status variant resolver
const resolveUserStatusVariant = (stat: string) => {
  if (stat === 'pending')
    return 'warning'
  if (stat === 'active')
    return 'success'
  if (stat === 'inactive')
    return 'secondary'

  return 'primary'
}

// 👉 Role variant resolver
const resolveUserRoleVariant = (role: string) => {
  if (role === 'subscriber')
    return { color: 'primary', icon: 'mdi-account-outline' }
  if (role === 'author')
    return { color: 'warning', icon: 'mdi-cog-outline' }
  if (role === 'maintainer')
    return { color: 'success', icon: 'mdi-database-outline' }
  if (role === 'editor')
    return { color: 'info', icon: 'mdi-pencil-outline' }
  if (role === 'admin')
    return { color: 'error', icon: 'mdi-dns-outline' }

  return { color: 'primary', icon: 'mdi-account-outline' }
}
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard v-if="props.studentData">
        <VCardText class="text-center pt-15">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded="sm"
            :size="120"
            :color="!props.studentData.avatar ? 'primary' : undefined"
            :variant="!props.studentData.avatar ? 'tonal' : undefined"
          >
            <VImg
              v-if="props.studentData.avatar"
              :src="props.studentData.avatar"
            />
            <span
              v-else
              class="text-5xl font-weight-medium"
            >
              {{ avatarText(props.studentData.name) }}
            </span>
          </VAvatar>

          <!-- 👉 User fullName -->
          <h6 class="text-h6 mt-4">
            {{ props.studentData.name }}
          </h6>

          <!-- 👉 Role chip -->
          <VChip
            label
            :color="resolveUserRoleVariant(props.studentData.role).color"
            density="comfortable"
            class="text-capitalize mt-4"
          >
            {{ props.studentData.role }}
          </VChip>
        </VCardText>

        <VCardText class="d-flex justify-space-between flex-wrap mt-1">
          <!-- 👉 Done task -->
          <div class="d-flex align-center">
            <VAvatar
              :size="44"
              rounded
              color="primary"
              variant="tonal"
              class="me-4"
            >
              <VIcon
                size="24"
                icon="mdi-check"
              />
            </VAvatar>

            <div>
              <h6 class="text-h6">
                2/3
              </h6>
              <span>10월 출석</span>
            </div>
          </div>

          <!-- 👉 Done Project -->
          <div class="d-flex align-center">
            <VAvatar
              :size="44"
              rounded
              color="primary"
              variant="tonal"
              class="me-4"
            >
              <VIcon
                size="24"
                icon="mdi-star-outline"
              />
            </VAvatar>

            <div>
              <h6 class="text-h6">
                1
              </h6>
              <span>10월 단어시험</span>
            </div>
          </div>
        </VCardText>

        <!-- 👉 Details -->
        <VCardText>
          <h6 class="text-h6">
            Details
          </h6>

          <VDivider class="my-4" />

          <!-- 👉 User Details list -->
          <VList class="card-list">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  이름 :
                  <span class="text-body-2">
                    {{ props.studentData.name }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  이메일 :
                  <span class="text-body-2">{{ props.studentData.email }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Status :
                  <VChip
                    label
                    density="comfortable"
                    :color="resolveUserStatusVariant(props.studentData.status)"
                    class="text-capitalize"
                  >
                    {{ props.studentData.status }}
                  </VChip>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  역할 :
                  <span class="text-capitalize text-body-2">{{ props.studentData.role }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  참여 수업 :
                  <span class="text-body-2">
                    {{ props.studentData.classcode }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  연락처 :
                  <span class="text-body-2">{{ props.studentData.contact }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  성별 :
                  <span class="text-body-2">{{ props.studentData.gender }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  Comment :
                  <span class="text-body-2">{{ props.studentData.comment }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText class="d-flex justify-center gap-4">
          <VBtn
            variant="elevated"
            @click="isUserInfoEditDialogVisible = true"
          >
            Edit
          </VBtn>
          <VBtn
            variant="outlined"
            color="yellow"
          >
            카카오톡 전송
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->

    <!-- SECTION Current Plan -->
    <VCol cols="12">
      <VCard
        flat
        class="current-plan"
      >
        <VCardText class="d-flex">
          <!-- 👉 Standard Chip -->
          <VChip
            label
            color="primary"
            density="comfortable"
          >
            10월 교육 내용
          </VChip>

          <VSpacer />

          <!-- 👉 Current Price  -->
          <div class="d-flex align-center">
            <sup class="text-primary text-sm font-weight-regular">출석</sup>
            <h3 class="text-h3 text-primary font-weight-regular">
              5회
            </h3>
            <sub class="mt-3"><h6 class="text-sm font-weight-regular">/ 8회</h6></sub>
          </div>
        </VCardText>

        <VCardText>
          <!-- 👉 Price Benefits -->
          <VList class="card-list">
            <VListItem
              v-for="benefit in standardPlan.benefits"
              :key="benefit"
            >
              <VIcon
                size="10"
                color="#E0E0E0"
                class="me-2"
                icon="mdi-checkbox-blank-circle"
              />
              <span>{{ benefit }}</span>
            </VListItem>
          </VList>

          <!-- 👉 Days -->
          <div class="my-6">
            <div class="d-flex mt-3 mb-2">
              <h6 class="text-sm font-weight-medium">
                Days
              </h6>
              <VSpacer />
              <h6 class="text-sm font-weight-medium">
                26 of 30 Days
              </h6>
            </div>

            <!-- 👉 Progress -->
            <VProgressLinear
              rounded
              :model-value="86"
              height="8"
              color="primary"
            />

            <p class="text-xs mt-2">
              4 days remaining
            </p>
          </div>

          <!-- 👉 Upgrade Plan -->
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>

  <!-- 👉 Edit user info dialog -->
  <!--
    <UserInfoEditDialog
    v-model:isDialogVisible="isUserInfoEditDialogVisible"
    :user-data="props.studentData"
    />
  -->

  <!-- 👉 Upgrade plan dialog -->
  <UserUpgradePlanDialog v-model:isDialogVisible="isUpgradePlanDialogVisible" />
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.75rem;
}

.current-plan {
  border: 2px solid rgb(var(--v-theme-primary));
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>
