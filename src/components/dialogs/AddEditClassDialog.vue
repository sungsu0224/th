<script setup lang="ts">
import type { StudentProperties } from '@/@fake-db/types'

interface ClassData {
  className: string
  comment: string
  book: string
  vocaBook: string
}

interface Props {

  classData?: ClassData
  isDialogVisible: boolean
}

interface Emit {
  (e: 'submit', value: StudentProperties): void
  (e: 'submit', value: ClassData): void
  (e: 'update:isDialogVisible', val: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  classData: () => ({
    className: '',
    comment: '',
    book: '',
    vocaBook: '',
  }),
})

const emit = defineEmits<Emit>()

const classData = ref<ClassData>(structuredClone(toRaw(props.classData)))
const isUseAsBillingAddress = ref(false)

watch(props, () => {
  classData.value = structuredClone(toRaw(props.classData))
})

const onFormSubmit = () => {
  emit('update:isDialogVisible', false)
  emit('submit', classData.value)
}

const onFormReset = () => {
  classData.value = structuredClone(toRaw(props.classData))

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
                v-model="classData.className"
                label="학생 이름"
              />
            </VCol>

            <!-- 👉 Username -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="classData.className"
                label="성별"
              />
            </VCol>

            <!-- 👉 Billing Email -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="classData.className"
                label="이메일"
              />
            </VCol>

            <!-- 👉 avatar -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="classData.className"
                label="학교"
              />
            </VCol>

            <!-- 👉 전화번호 -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="classData.className"
                label="전화번호"
              />
            </VCol>

            <!-- 👉 Contact -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="classData.className"
                label="부모님 이름"
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="classData.className"
                label="부모님 전화번호"
              />
            </VCol>

            <!-- 👉 Language -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="classData.className"
                label="참여 수업"
              />
            </VCol>

            <!-- 👉 Comment -->
            <VCol
              cols="12"
              md="6"
            >
              <VTextField
                v-model="classData.comment"
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
