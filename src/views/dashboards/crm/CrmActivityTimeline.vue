<script setup lang="ts">
import avatar2 from '@images/avatars/avatar-2.png'
</script>

<template>
  <VCard title="Activity Timeline">
    <VCardText>
      <VTimeline
        density="compact"
        align="start"
        line-inset="8"
        truncate-line="both"
      >
        <VTimelineItem
          dot-color="error"
          size="x-small"
        >
          <div class="d-flex justify-space-between align-center flex-wrap">
            <h4 class="app-timeline-title me-1 mb-2">
              8 Invoices have been paid
            </h4>
            <small class="app-timeline-meta text-no-wrap">Wednesday</small>
          </div>
          <p class="mb-0 app-timeline-text">
            Invoices have been paid to the company.
          </p>
          <span class="d-flex align-center mt-2">
            <VIcon
              color="error"
              icon="mdi-file-pdf-box"
              class="me-1"
            />
            <span class="font-weight-medium text-sm">invoice.pdf</span>
          </span>
        </VTimelineItem>

        <VTimelineItem
          dot-color="primary"
          size="x-small"
        >
          <div class="d-flex justify-space-between align-center flex-wrap">
            <h4 class="app-timeline-title me-1 mb-2">
              Create a new project for client 😎
            </h4>
            <small class="app-timeline-meta text-no-wrap">April, 18</small>
          </div>

          <p class="mb-1 app-timeline-text">
            Invoices have been paid to the company.
          </p>

          <div class="d-flex align-center mt-3">
            <VAvatar
              size="24"
              class="me-2"
              :image="avatar2"
            />
            <div>
              <p class="font-weight-medium mb-0">
                John Doe (Client)
              </p>
            </div>
          </div>
        </VTimelineItem>

        <VTimelineItem
          dot-color="info"
          size="x-small"
        >
          <div class="d-flex justify-space-between align-center flex-wrap">
            <h4 class="app-timeline-title me-1 mb-2">
              Order #37745 from September
            </h4>
            <small class="app-timeline-meta text-no-wrap">January, 10</small>
          </div>
          <p class="mb-0 app-timeline-text">
            Invoices have been paid to the company.
          </p>
        </VTimelineItem>

        <VTimelineItem
          dot-color="warning"
          size="x-small"
        >
          <div class="d-flex justify-space-between align-center flex-wrap">
            <h4 class="app-timeline-title me-1">
              Public Meeting
            </h4>
            <small class="app-timeline-meta text-no-wrap">September, 30</small>
          </div>
        </VTimelineItem>
      </VTimeline>
    </VCardText>
  </VCard>
</template>
