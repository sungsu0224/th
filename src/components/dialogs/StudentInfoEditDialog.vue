<script setup lang="ts">
import type { StudentProperties } from '@/@fake-db/types'

interface UserData {
  id: number
  name: string
  role: string
  contact: string
  parent_contact: string
  email: string
  gender: string
  status: string
  comment: string
  last_login: string
}

interface Props {
  studentData?: StudentProperties
  userData?: UserData
  isDialogVisible: boolean
}

interface Emit {
  (e: 'submit', value: StudentProperties): void
  (e: 'submit', value: UserData): void
  (e: 'update:isDialogVisible', val: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  studentData: () => ({
    id: 0,
    avatar: 'assets/images/avatars/avatar-1.png',
    classcode: '1',
    name: '김xx',
    role: '학생',
    contact: '010-1234-5678',
    parent_name: '이xx',
    parent_contact: '010-9765-4123',
    email: 'rlatjdtn1014@naver.com',
    gender: '남',
    status: 'active',
    comment: '영단어 위주',
    last_login: '2023-05-19',
  }),
})

const emit = defineEmits<Emit>()

const studentData = ref<StudentProperties>(structuredClone(toRaw(props.studentData)))
const isUseAsBillingAddress = ref(false)

watch(props, () => {
  studentData.value = structuredClone(toRaw(props.studentData))
})

const onFormSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('submit', studentData.value)
}

const onFormReset = () => {
  studentData.value = structuredClone(toRaw(props.studentData))

  emit('update:isDialogVisible', false)
}

const dialogVisibleUpdate = (val: boolean) => {
  emit('update:isDialogVisible', val)
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 900 "
    :model-value="props.isDialogVisible"
    @update:model-value="dialogVisibleUpdate"
  >
    <VCard class="pa-sm-9 pa-5">
      <!-- 👉 dialog close btn -->
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="onFormReset"
      />

      <VCardItem class="text-center">
        <VCardTitle class="text-h5 mb-6">
          학생 등록하기
        </VCardTitle>
        <VCardSubtitle>
          신규 학생을 추가합니다.
        </VCardSubtitle>
      </VCardItem>

      <VCardText>
        <!-- 👉 Form -->
        <VForm
          class="mt-6"
          @submit.prevent="onFormSubmit"
        >
          <VRow>
            <!-- 👉 Full Name -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="studentData.name"
                label="학생 이름"
              />
            </VCol>

            <!-- 👉 Username -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="studentData.gender"
                label="성별"
              />
            </VCol>

            <!-- 👉 Billing Email -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="studentData.email"
                label="이메일"
              />
            </VCol>

            <!-- 👉 avatar -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="studentData.avatar"
                label="학교"
              />
            </VCol>

            <!-- 👉 전화번호 -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="studentData.contact"
                label="전화번호"
              />
            </VCol>

            <!-- 👉 Contact -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="studentData.parent_name"
                label="부모님 이름"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="studentData.parent_contact"
                label="부모님 전화번호"
              />
            </VCol>

            <!-- 👉 Language -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="studentData.classcode"
                label="참여 수업"
              />
            </VCol>

            <!-- 👉 Comment -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="studentData.comment"
                label="Comment"
              />
            </VCol>

            <!-- 👉 Switch -->
            <VCol cols="12">
              <VSwitch
                v-model="isUseAsBillingAddress"
                density="compact"
                label="등록이 확정된 학생입니까?"
              />
            </VCol>

            <!-- 👉 Submit and Cancel -->
            <VCol
              cols="12"
              class="d-flex flex-wrap justify-center gap-4"
            >
              <VBtn type="submit">
                등록하기
              </VBtn>

              <VBtn
                color="secondary"
                variant="tonal"
                @click="onFormReset"
              >
                취소하기
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
