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
    <DashCard v-for="item in list" :content="item" />
    <Form
      @submit="searchDocs"
      v-slot="{ isSubmitting }"
      :initialValues="docs_initial"
    >
      <DashCard>
        <div class="flex gap-5 justify-between">
          <p class="font-bold text-3xl">
            ₱{{ document?.revenue ?? 0 }} ({{ document?.count ?? 0 }})
          </p>
          <FontAwesomeIcon :icon="faCoins" size="xl" class="text-base-green" />
        </div>
        <div class="w-44">
          <Field v-slot="{ field }" name="document">
            <select
              v-bind="field"
              class="rounded-sm border border-base-gray px-1 py-[2px] text-sm focus:ring-0 ring-0 text-base-gray cursor-pointer w-full"
            >
              <option
                v-for="doc in documentList"
                :key="doc.code"
                :value="doc.code"
              >
                {{ doc.name }}
              </option>
            </select>
          </Field>
          <div class="flex mt-1 gap-x-[7px]">
            <Field v-slot="{ field }" name="year_month">
              <input
                v-bind="field"
                type="month"
                class="px-1 text-xs border border-base-gray rounded-sm text-base-gray cursor-pointer w-[8.5rem]"
              />
            </Field>
            <button
              type="submit"
              class="rounded-sm border border-base-gray text-base-gray px-2 py-1 bg-white flex items-center"
            >
              <ProgressSpinner
                v-if="isSubmitting"
                style="width: 15px; height: 15px"
                strokeWidth="4"
              />
              <FontAwesomeIcon v-else :icon="faSearch" size="sm" />
            </button>
          </div>
        </div>
      </DashCard>
    </Form>
    <Form
      @submit="searchRevenue"
      v-slot="{ isSubmitting }"
      :initialValues="revenue_initial"
    >
      <DashCard color="green">
        <div class="flex gap-5 justify-between text-white">
          <div>
            <p class="font-bold text-3xl">₱{{ revenue || 0 }}</p>
            <p>Revenue</p>
          </div>
          <FontAwesomeIcon :icon="faCoins" size="xl" />
        </div>
        <div class="flex gap-x-[7px] mt-1">
          <Field v-slot="{ field }" name="year_month">
            <input
              v-bind="field"
              type="month"
              class="px-1 text-xs border border-base-gray rounded-sm text-base-gray w-[8.5rem]"
            />
          </Field>
          <button
            type="submit"
            class="rounded-sm border border-base-gray px-2 text-base-gray bg-white"
          >
            <ProgressSpinner
              v-if="isSubmitting"
              style="width: 15px; height: 15px"
              strokeWidth="4"
            />
            <FontAwesomeIcon v-else :icon="faSearch" size="sm" />
          </button>
        </div>
      </DashCard>
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
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import type { TDashboardList, TObjectLiteral, TOptions } from "~/types";

const pending = ref(true);
const list = ref<TDashboardList>();
const documentList = ref<TOptions>();
const docs_initial = ref<TObjectLiteral>();
const revenue_initial = ref<TObjectLiteral>();
const document = ref<TObjectLiteral>();
const revenue = ref<number>();

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
    documentList.value = response.document_list;

    const dateToday = new Date().toISOString().slice(0, 7);
    docs_initial.value = {
      document: response.document_list[0].code,
      year_month: dateToday,
    };
    revenue_initial.value = {
      year_month: dateToday,
    };

    document.value = {
      revenue: response.docs.revenue,
      count: response.docs.count,
    };
    revenue.value = response.revenue;

    pending.value = false;
  });
});

const searchDocs = async(values: any) => {
  await useFormSubmit("dashboard/search", values).then((response) => {
    document.value = {
      revenue: response.data.docs_revenue,
      count: response.data.docs_count,
    };
  });
};

const searchRevenue = async(values: any) => {
  await useFormSubmit("dashboard/search", values).then((response) => {
    revenue.value = response.data.revenue;
  });
};
</script>
