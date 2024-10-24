<template>
  <div class="flex justify-center items-center lg:min-h-screen">
    <div
      class="lg:h-auto w-full max-w-3xl bg-base-gray-200 p-10 m-2 rounded-lg shadow-lg"
    >
      <Form
        :validation-schema="RegisterS"
        v-slot="{ isSubmitting }"
        @submit="register"
        :initial-values="{ role: 'User' }"
      >
        <div class="flex flex-col items-center mb-7">
          <h1 class="text-2xl sm:text-4xl">Create an account</h1>
          <h3 class="sm:text-lg">
            Already have an account?
            <NuxtLink to="/login" class="underline text-blue-100"
              >Login</NuxtLink
            >
          </h3>
        </div>
        <Alert
          v-if="alert.isShow"
          :type="alert.type"
          :title="alert.message"
          parent-class="col-span-full"
        />
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
          <FormGroup
            label="Email"
            type="text"
            name="email"
            span="col-span-3"
            required
          />
          <FormGroup
            label="Password"
            type="password"
            name="password"
            span="col-span-3"
            required
          />
          <FormGroup
            label="Confirm Password"
            type="password"
            name="confirm_password"
            span="col-span-3"
            required
          />
        </div>
        <div class="mt-5">
          <Button
            label="Register"
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

const alert = ref({
  isShow: false,
  type: "info",
  message: "",
});

const resetAlert = () => {
  alert.value = {
    isShow: false,
    type: "info",
    message: "",
  };
};

const register = async (value: any, actions: any) => {
  const { confirm_password, ...formData } = value;
  resetAlert()
  try {
    const response = (await useAuth({ ...formData }, "register")) as any;
    const { message, errors, status_code } = response;

    alert.value = {
      isShow: true,
      type: status_code === 201 ? "success" : "danger",
      message: status_code === 201 ? "Successfully Registered" : message,
    };

    if (status_code === 201) {
      actions.resetForm();
    } else {
      errors ? actions.setErrors(response.errors) : null;
    }
  } catch (error: any) {
    useNuxtApp().$toast.error(error.message);
  }
};
</script>
