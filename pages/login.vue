<template>
  <div class="flex justify-center items-center h-screen">
    <div
      class="lg:h-auto w-full max-w-md bg-base-gray-200 p-10 rounded-lg shadow-lg m-2"
    >
      <Form
        :validation-schema="LoginS"
        v-slot="{ isSubmitting }"
        @submit="login"
      >
        <div class="flex flex-col items-center mb-7">
          <h1 class="text-2xl lg:text-3xl">Welcome</h1>
        </div>
        <Alert
          v-if="alert"
          type="danger"
          title="Invalid Email or Password"
          parent-class="col-span-full"
        />
        <div>
          <FormGroup
            label="Email"
            type="text"
            name="email"
            placeholder="sample@email.com"
            span="col-span-2"
          />
          <FormGroup
            label="Password"
            type="password"
            name="password"
            placeholder="Enter Password"
            span="col-span-2"
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
        <h3 class="sm:text-lg">
          Don't have an account?
          <a href="/register" class="underline text-blue-100">Register Here</a>
        </h3>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuth } from "~/composables/auth";
import { LoginS } from "~/server/schema";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
const alert = ref();

const login = async (value: any) => {
  try {
    const response = (await useAuth(value, "login")) as any;
    const { token, status_code, id } = response;
    if (status_code === 200) {
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      await userStore.getUserDetails();
      userStore.user.role.name === "Administrator"
        ? navigateTo("/dashboard")
        : navigateTo("/announcement");
    } else {
      alert.value = true;
    }
  } catch (error: any) {
    useNuxtApp().$toast.error(error.message);
  }
};
</script>
