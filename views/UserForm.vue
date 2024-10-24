<template>
  <div class="sm:grid grid-cols-6 gap-x-3">
    <FormGroup
      label="Firstname"
      type="text"
      name="firstname"
      span="col-span-3"
      required
    />
    <FormGroup label="Lastname" type="text" name="lastname" span="col-span-3" required/>
    <FormGroup
      label="Address"
      type="text"
      name="address"
      span="col-span-full"
      required
    />
    <FormGroup
      label="Gender"
      type="select"
      :options="options"
      name="gender"
      span="col-span-3"
      required
    />
    <FormGroup label="Email" type="text" name="email" span="col-span-3" required/>
    <FormGroup
      label="Password"
      type="password"
      name="password"
      placeholder="Password"
      span="col-span-3"
    />
    <FormGroup
      label="Confirm Password"
      type="password"
      placeholder="Confirm Password"
      name="confirm_password"
      span="col-span-3"
    />
  </div>
</template>

<script setup lang="ts">
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
