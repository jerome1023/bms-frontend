<template>
  <Form
    @submit="submit"
    :initial-values="initialVal"
    v-slot="{ isSubmitting, setFieldValue }"
  >
    <Fieldset legend="Profile Information">
      <div class="flex flex-col">
        <div
          v-if="!open && image"
          class="col-span-full flex flex-col justify-center gap-3 mb-3"
        >
          <!-- <img
            :src="image"
            class="h-56 w-56 md:h-72 md:w-72 m-auto object-cover rounded-full object-top"
          /> -->
          <div class="flex justify-center m-auto">
            <Image
              :src="image"
              imageClass="w-56 h-56 md:h-72 md:w-72 object-cover object-top rounded-full"
              preview
            />
          </div>
          <Button
            @click="openImageUploader(), setFieldValue('image', null)"
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
          :circle="true"
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
const config = useRuntimeConfig();
const baseURL = config.public.backendURL;
const toast = useToast();

const initialVal = userStore.user;
const open = ref(false);
const image = ref();

onMounted(() => {
  if (userStore.user.image) {
    image.value = baseURL + userStore.user.image;
  }
});

watch(
  () => userStore.user.image,
  (newImage) => {
    image.value = newImage ? baseURL + newImage : null;
  }
);

const openImageUploader = () => {
  open.value = !open.value;
};

const submit = async (values: any, actions: any) => {
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
  let updatedImage = image_base64 || undefined;
  if (userStore.user.image === image) {
    updatedImage = image;
  }
  await useFormSubmit(
    "users/update-profile",
    { image: updatedImage, ...rest },
    "PUT"
  ).then(async (response) => {
    if (response.status) {
      await userStore.getUserDetails();
      toast.add({
        severity: "success",
        summary: "Success",
        detail: response.message,
        life: 3000,
      });
      if (updatedImage) {
        open.value = false;
      }
      actions.resetForm({
        values: response.data,
      });
    } else {
      actions.setErrors(response.errors);
    }
  });
};
</script>
