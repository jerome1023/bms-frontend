<template>
  <Form
    @submit="submit"
    :initial-values="userStore.user"
    v-slot="{ isSubmitting }"
  >
    <Fieldset legend="Profile Information">
      <div class="flex flex-col">
        <div
          v-if="!open && image"
          class="col-span-full flex flex-col justify-center gap-3 mb-3"
        >
          <img
            :src="image"
            class="max-w-[18rem] max-h-60 md:max-w-lg md:max-h-64 m-auto object-scale-down"
          />
          <Button
            @click="openImageUploader"
            icon="pi pi-upload"
            label="Upload New Photo"
            severity="info"
            size="small"
            class="m-auto"
          />
        </div>
        <FormGroup
          label="Upload Image"
          type="image"
          name="image"
          span="col-span-full"
          :class="[open || !image ? 'block' : 'hidden']"
        />
        <UserForm />
        <Button
          :loading="isSubmitting"
          label="Save"
          severity="success"
          outlined
          type="submit"
          class="self-end"
        />
      </div>
    </Fieldset>
  </Form>
</template>
<script setup lang="ts">
const userStore = useUserStore();
const { value: fieldValue } = useField("image");
const config = useRuntimeConfig();
const baseURL = config.public.backendURL;

const open = ref(false);
const image = ref();

onMounted(() => {
  if (fieldValue.value) {
    image.value = baseURL + fieldValue.value;
  }
});

const openImageUploader = () => {
  fieldValue.value = null;
  open.value = !open.value;
};

const submit = async (values: any) => {
  const {
    id,
    fullname,
    image,
    image_base64,
    role,
    created_at,
    updated_at,
    ...rest
  } = values;
  await useFormSubmit(
    `users/update/${id}`,
    { image: image_base64, ...rest },
    "PUT"
  ).then((response) => {
    console.log(response);
  });
};
</script>
