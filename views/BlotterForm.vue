<template>
  <div class="sm:grid grid-cols-6 gap-x-3">
    <FormGroup
      label="Complainant"
      type="text"
      name="complainant"
      span="col-span-3"
      required
    />
    <FormGroup
      label="Complainant Age"
      type="text"
      name="complainant_age"
      span="col-span-3"
      required
    />
    <FormGroup
      label="Complainant Address"
      type="text"
      name="complainant_address"
      span="col-span-3"
      required
    />
    <FormGroup
      label="Complainant Contact Number"
      type="text"
      name="complainant_contact_number"
      span="col-span-3"
      required
    />
    <Divider class="col-span-full" />
    <FormGroup
      label="Complainee"
      type="text"
      name="complainee"
      span="col-span-3"
      required
    />
    <FormGroup
      label="Complainee Age"
      type="text"
      name="complainee_age"
      span="col-span-3"
      required
    />
    <FormGroup
      label="Complainee Address"
      type="text"
      name="complainee_address"
      span="col-span-3"
      required
    />
    <FormGroup
      label="Complainee Contact Number"
      type="text"
      name="complainee_contact_number"
      span="col-span-3"
      required
    />
    <Divider class="col-span-full" />
    <FormGroup
      label="Date"
      type="date"
      name="date"
      span="col-span-3"
      required
    />
    <FormGroup
      label="Complain"
      type="text"
      name="complain"
      span="col-span-3"
      required
    />
    <!-- <FormGroup
      label="Agreement"
      type="textarea"
      name="agreement"
      span="col-span-3"
    />
    <FormGroup
      label="Namagitan"
      type="text"
      name="namagitan"
      span="col-span-3"
    />
    <FormGroup
      label="Witness"
      type="textarea"
      name="witness"
      span="col-span-full"
    /> -->
    
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from "~/stores/modal";
const useModal = useModalStore();

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
</script>
