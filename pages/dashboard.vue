<template>
  <div class="h-full w-full flex items-center" v-if="pending">
    <ProgressSpinner
      style="width: 100px; height: 100px"
      strokeWidth="4"
      animationDuration="1s"
      aria-label="Custom ProgressSpinner"
    />
  </div>
  <div
    v-else
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
  >
    <DashboardCard v-for="item in list" :content="item" />
    <Form
      @submit="searchDocs"
      v-slot="{ isSubmitting }"
      :initialValues="docs_initial"
    >
      <DashboardCard>
        <div class="flex gap-5 justify-between">
          <p class="font-bold text-3xl">
            ₱{{ document?.revenue ?? 0 }} ({{ document?.count ?? 0 }})
          </p>
          <FontAwesomeIcon :icon="faCoins" size="xl" class="text-base-green" />
        </div>
        <div class="w-[11.5rem]">
          <Field v-slot="{ field }" name="document">
            <select
              v-bind="field"
              class="rounded-sm border border-base-gray px-1 py-[2px] text-sm focus:ring-0 ring-0 text-base-gray cursor-pointer w-full"
            >
              <option
                v-for="doc in document.list"
                :key="doc.code"
                :value="doc.code"
              >
                {{ doc.name }}
              </option>
            </select>
          </Field>
          <div class="flex mt-1 gap-x-[7px] justify-between">
            <DashboardYearMonthPicker name="year_month" />
            <DashboardSearchButton :isSubmitting="isSubmitting" />
          </div>
        </div>
      </DashboardCard>
    </Form>
    <Form
      @submit="searchRevenue"
      v-slot="{ isSubmitting }"
      :initialValues="revenue_initial"
    >
      <DashboardCard color="green">
        <div class="flex gap-5 justify-between text-white">
          <div>
            <p class="font-bold text-3xl">₱{{ total_revenue || 0 }}</p>
            <p>Revenue</p>
          </div>
          <FontAwesomeIcon :icon="faCoins" size="xl" />
        </div>
        <div class="flex justify-between gap-x-[7px] mt-1 w-[11.5rem]">
          <DashboardYearMonthPicker name="year_month" />
          <DashboardSearchButton :isSubmitting="isSubmitting" />
        </div>
      </DashboardCard>
    </Form>
  </div>
</template>
<script setup lang="ts">
import { Field } from "vee-validate/";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUsers,
  faFileLines,
  faFileCircleCheck,
  faCircleExclamation,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import type {
  TDashboardDocument,
  TDashboardList,
  TObjectLiteral,
} from "~/types";

const pending = ref(true);
const list = ref<TDashboardList>();
const docs_initial = ref<TObjectLiteral>();
const revenue_initial = ref<TObjectLiteral>();
const document = ref<TDashboardDocument>({
  list: [],
  revenue: 0,
  count: 0,
});
const total_revenue = ref<number>();

onMounted(async () => {
  useGetData("dashboard/list").then((response) => {
    list.value = [
      {
        label: "Resident",
        value: response.resident,
        icon: faUsers,
        href: "resident/list",
      },
      {
        label: "Pending Request",
        value: response.pending,
        icon: faFileLines,
        href: "request/pending",
      },
      {
        label: "Approved Request",
        value: response.approved,
        icon: faFileCircleCheck,
        href: "request/approved",
      },
      {
        label: "Blotter",
        value: response.blotter,
        icon: faCircleExclamation,
        href: "blotter",
      },
    ];

    const dateToday = new Date().toISOString().slice(0, 7);
    docs_initial.value = {
      document: response.docs.list[0].code,
      year_month: dateToday,
    };
    revenue_initial.value = {
      year_month: dateToday,
    };

    document.value = {
      list: response.docs.list,
      revenue: response.docs.revenue,
      count: response.docs.count,
    };
    total_revenue.value = response.total_revenue;

    pending.value = false;
  });
});

const searchDocs = async (values: any) => {
  await useFormSubmit("dashboard/search", values).then((response) => {
    document.value.revenue = response.data.docs.revenue;
    document.value.count = response.data.docs.count;
  });
};

const searchRevenue = async (values: any) => {
  await useFormSubmit("dashboard/search", values).then((response) => {
    total_revenue.value = response.data.revenue;
  });
};
</script>
