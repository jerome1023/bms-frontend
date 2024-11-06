<template>
  <div class="sm:grid grid-cols-6 gap-x-3">
    <FormGroup
      label="Firstname"
      type="text"
      name="firstname"
      span="col-span-2"
      required
    />
    <FormGroup
      label="Middlename"
      type="text"
      name="middlename"
      span="col-span-2"
      required
    />
    <FormGroup
      label="Lastname"
      type="text"
      name="lastname"
      span="col-span-2"
      required
    />
    <FormGroup
      label="Gender"
      type="select"
      name="gender"
      :options="genderOptions"
      span="col-span-3"
      required
    />
    <FormGroup
      label="Birthdate"
      type="date"
      name="birthdate"
      span="col-span-3"
      required
    />
    <FormGroup
      label="Birthplace"
      type="text"
      name="birthplace"
      span="col-span-full"
      required
    />
    <FormGroup
      label="Civil Status"
      type="select"
      name="civil_status"
      :options="civilStatusOptions"
      span="col-span-3"
      required
    />
    <FormGroup
      label="Religion"
      type="select"
      name="religion"
      :options="religionOptions"
      span="col-span-3"
      required
    />
    <FormGroup
      label="Educational Attainment"
      type="select"
      name="educational_attainment"
      :options="educationOptions"
      span="col-span-3"
      required
    />
    <FormGroup
      label="Sitio"
      type="select"
      name="sitio"
      :options="sitioOptions"
      span="col-span-3"
      required
    />
    <FormGroup
      label="House Number"
      type="text"
      name="house_number"
      span="col-span-3"
      required
    />
    <FormGroup
      label="Occupation"
      type="text"
      name="occupation"
      span="col-span-3"
      required
    />
    <FormGroup
      label="Nationality"
      type="text"
      name="nationality"
      span="col-span-3"
      required
    />
    <FormGroup
      label="Voter Status"
      type="select"
      name="voter_status"
      :options="voterOptions"
      span="col-span-3"
      required
    />
  </div>
</template>

<script setup lang="ts">
import type { TOptions } from "~/types";

const genderOptions = <TOptions>[
  {
    code: "Male",
    name: "Male",
  },
  {
    code: "Female",
    name: "Female",
  },
];
const civilStatusOptions = <TOptions>[
  {
    code: "single",
    name: "Single",
  },
  {
    code: "married",
    name: "Married",
  },
  {
    code: "divorced",
    name: "Divorced",
  },
  {
    code: "separated",
    name: "Separated",
  },
  {
    code: "widowed",
    name: "Widowed",
  },
];

const religionOptions = <TOptions>[
  {
    code: "roman catholic",
    name: "Roman Catholic",
  },
  {
    code: "islam",
    name: "Islam",
  },
  {
    code: "inglesia ni cristo",
    name: "Inglesia Ni Cristo",
  },
  {
    code: "buddhists",
    name: "Buddhists",
  },
  {
    code: "other",
    name: "Other",
  },
];

const educationOptions = <TOptions>[
  {
    code: "none",
    name: "No schooling completed",
  },
  {
    code: "elementary",
    name: "Elementary",
  },
  {
    code: "junior high undergrad",
    name: "Junior High School Undergrad",
  },
  {
    code: "junior high graduate",
    name: "Junior High School Graduate",
  },
  {
    code: "senior high undergrad",
    name: "Senior High School Undergrad",
  },
  {
    code: "senior high graduate",
    name: "Senior High School Graduate",
  },
  {
    code: "college undergrad",
    name: "College Undergrad",
  },
  {
    code: "vocational",
    name: "Vocational",
  },
  {
    code: "bachelor",
    name: "Bachelor’s Degree",
  },
  {
    code: "masteral",
    name: "Master’s Degree",
  },
  {
    code: "doctorate",
    name: "Doctorate Degree",
  },
];

const sitioOptions = ref<TOptions>([]);

const voterOptions = <TOptions>[
  {
    code: "Voter",
    name: "Voter",
  },
  {
    code: "Non Voter",
    name: "Non Voter",
  },
];

onMounted(async () => {
  await useGetData("sitio/list").then((response) => {
    sitioOptions.value = response.map((item: any) => ({
      code: item.id,
      name: item.name,
    }));
  });
});
</script>
