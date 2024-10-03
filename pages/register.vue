<template>
  <div class="flex justify-center items-center lg:h-screen">
    <div
      class="lg:h-auto w-full max-w-3xl bg-base-gray-200 p-10 m-2 rounded-lg shadow-lg"
    >
      <Form
        :validation-schema="RegisterS"
        v-slot="{isSubmitting}"
        @submit="register"
        :initial-values="{ role: 'User' }"
      >
        <div class="flex flex-col items-center mb-7">
          <h1 class="text-2xl sm:text-4xl">Create an account</h1>
          <h3 class="sm:text-lg">
            Already have an account?
            <a href="/login" class="underline text-blue-100">Login</a>
          </h3>
        </div>
        <Alert
          v-if="status.alert.isShow"
          :type="status.alert.type"
          :title="status.alert.message"
          parent-class="col-span-full"
        />
        <div class="sm:grid grid-cols-6 gap-x-3">
          <FormGroup
            label="Firstname"
            type="text"
            name="firstname"
            span="col-span-3"
          />
          <FormGroup
            label="Lastname"
            type="text"
            name="lastname"
            span="col-span-3"
          />
          <FormGroup
            label="Address"
            type="text"
            name="address"
            span="col-span-full"
          />
          <FormGroup
            label="Gender"
            type="select"
            :options="options"
            name="gender"
            span="col-span-3"
          />
          <FormGroup label="Email" type="text" name="email" span="col-span-3" />
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
        <div class="mt-5">
          <Button
            label="Login"
            :loading="isSubmitting"
            class="w-full bg-base-green hover:bg-green-700"
            type="submit"
          />
        </div>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/auth";
import { RegisterS } from "~/server/schema";

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

const status = ref({
  alert: {
    isShow: false,
    type: "info",
    message: "",
  },
  loading: false,
});

const register = async (value: any, { resetForm }: any) => {
  const { confirm_password, ...formData } = value;
  status.value.loading = true;
  try {
    const response = (await useAuth({ ...formData }, "register")) as any;
    const { message, errors, status_code } = response;
    if (status_code === 201) {
      status.value.alert.isShow = true;
      status.value.alert.type = "success";
      status.value.alert.message = "Successfully Registered";
      resetForm();
    } else {
      if (errors.email) {
        status.value.alert.isShow = true;
        status.value.alert.type = "danger";
        status.value.alert.message = errors.email[0];
      }
    }
  } catch (error: any) {
    useNuxtApp().$toast.error(error.message);
  }
  status.value.loading = false;
};
</script>
