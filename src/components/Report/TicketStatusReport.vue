<template>
  <div class="row">
    <!-- Open -->
    <div class="col-6 col-sm-4 col-md">
      <CardInfo
        bg="light-warning"
        color="warning"
        :total="total_open"
        label="OPEN TICKETS"
        :isFailed="isFailed"
        @fallbackError="fallbackError"
      >
        <template v-slot:icon>
          <IconExclamation v-if="!isFailed" color="warning" :size="3" />
          <IconClose v-else color="warning" :size="3" />
        </template>
      </CardInfo>
    </div>

    <!-- Pending -->
    <div class="col-6 col-sm-4 col-md mt-0">
      <CardInfo
        bg="light-danger"
        color="danger"
        :total="total_pending"
        label="PENDING TICKETS"
        :isFailed="isFailed"
        @fallbackError="fallbackError"
      >
        <template v-slot:icon>
          <IconPending v-if="!isFailed" color="danger" :size="3" />
          <IconClose v-else color="danger" :size="3" />
        </template>
      </CardInfo>
    </div>

    <!-- Unassigned -->
    <div class="col-6 col-sm-4 col-md mt-8 mt-sm-0">
      <CardInfo
        bg="light-success"
        color="success"
        :total="total_unassigned"
        label="UNASSIGNED TICKETS"
        :isFailed="isFailed"
        @fallbackError="fallbackError"
      >
        <template v-slot:icon>
          <IconTasks v-if="!isFailed" color="success" :size="3" />
          <IconClose v-else color="success" :size="3" />
        </template>
      </CardInfo>
    </div>

    <!-- Closed -->
    <div class="col-6 col-sm-6 col-md mt-8 mt-md-0">
      <CardInfo
        bg="light-primary"
        color="primary"
        :total="total_closed"
        label="CLOSED TICKETS"
        :isFailed="isFailed"
        @fallbackError="fallbackError"
      >
        <template v-slot:icon>
          <IconClosedTicket v-if="!isFailed" color="primary" :size="3" />
          <IconClose v-else color="primary" :size="3" />
        </template>
      </CardInfo>
    </div>

    <!-- Total -->
    <div class="col-12 col-sm-6 col-md mt-8 mt-md-0">
      <CardInfo
        bg="light-info"
        color="info"
        :total="total_ticket"
        label="TOTAL TICKETS"
        :isFailed="isFailed"
        @fallbackError="fallbackError"
      >
        <template v-slot:icon>
          <IconTicket v-if="!isFailed" color="info" :size="3" />
          <IconClose v-else color="info" :size="3" />
        </template>
      </CardInfo>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import CardInfo from '@/components/CardInfo.vue';
import IconExclamation from '@/components/Icons/IconExclamation.vue';
import IconPending from '@/components/Icons/IconPending.vue';
import IconTasks from '@/components/Icons/IconTasks.vue';
import IconClosedTicket from '@/components/Icons/IconClosedTicket.vue';
import IconTicket from '@/components/Icons/IconTicket.vue';
import IconComponent from '@/components/Icons/IconComponent.vue';
import IconClose from '@/components/Icons/IconClose.vue';

@Component({
  components: {
    CardInfo,
    IconExclamation,
    IconPending,
    IconTasks,
    IconClosedTicket,
    IconTicket,
    IconComponent,
    IconClose
  }
})
export default class TicketStatusReport extends Vue {
  @Prop(Number) readonly total_open!: number;
  @Prop(Number) readonly total_pending!: number;
  @Prop(Number) readonly total_unassigned!: number;
  @Prop(Number) readonly total_closed!: number;
  @Prop(Number) readonly total_ticket!: number;
  @Prop(Boolean) readonly isFailed!: boolean;

  fallbackError() {
    this.$emit('fallbackError');
  }
}
</script>
