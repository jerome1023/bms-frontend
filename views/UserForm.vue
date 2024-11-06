<template>
  <div class="sm:grid grid-cols-6 gap-x-3">
    <FormGroup
      label="Firstname"
      type="text"
      name="firstname"
      span="col-span-3"
      required
    />
    <FormGroup
      label="Lastname"
      type="text"
      name="lastname"
      span="col-span-3"
      required
    />
    <FormGroup
      v-if="isShow"
      label="Address"
      type="text"
      name="address"
      span="col-span-full"
      required
    />
    <FormGroup
      v-if="isShow"
      label="Gender"
      type="select"
      :options="options"
      name="gender"
      span="col-span-3"
      required
    />
    <FormGroup
      label="Email"
      type="text"
      name="email"
      :span="isShow ? 'col-span-3' : 'col-span-full'"
      required
    />
    <FormGroup
      label="Change Password"
      type="password"
      name="password"
      span="col-span-3"
    />
    <FormGroup
      label="Confirm Password"
      type="password"
      name="confirm_password"
      span="col-span-3"
    />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const userStore = useUserStore();
const isShow = computed(() => {
  return userStore.user.role?.name == "User" || route.fullPath == '/resident/manage-account'}); 

const options = [
  {
    name: "Male",
    code: "Male",
  },
  {
    name: "Female",
    code: "Female",
  },
];
</script>
