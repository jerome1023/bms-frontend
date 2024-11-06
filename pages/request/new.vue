<template>
  <Form @submit="submit" v-slot="{ isSubmitting }">
    <Fieldset legend="Create Request">
      <div class="flex flex-col gap-2">
        <NewRequestForm />
        <Alert
          v-if="alert.title"
          :type="alert.type"
          :title="alert.title"
          parent-class="col-span-full mt-5"
        />
        <Button
          :loading="isSubmitting"
          type="submit"
          label="Save"
          size="small"
          severity="success"
          outlined
          class="self-end"
        />
      </div>
    </Fieldset>
  </Form>
</template>

<script setup lang="ts">
import type { TAlert } from "~/types";

const alert = ref<TAlert>({
  type: "info",
  title: "",
});
const submit = async (values: any, actions: any) => {
  await useFormSubmit("request/create", values).then((response) => {
    alert.value = {
      type: response.alert.type,
      title: response.alert.title,
    };
    if (response.status) {
      actions.resetForm();
    } else {
      response.errors ? actions.setErrors(response.errors) : null;
    }
  });
};
</script>
