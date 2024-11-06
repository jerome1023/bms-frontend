<template>
  <div class="sm:grid grid-cols-6 gap-x-3">
    <FormGroup
      label="Fullname"
      type="text"
      name="fullname"
      placeholder="e.g., Doe, John A."
      span="col-span-3"
    />
    <FormGroup label="Age" type="text" name="age" span="col-span-3" />
    <FormGroup
      label="Sitio"
      type="text"
      name="sitio_name"
      span="col-span-3"
    />
    <FormGroup
      label="Document"
      type="text"
      name="document_name"
      span="col-span-3"
    />
    <FormGroup
      label="Purpose"
      type="text"
      name="purpose"
      span="col-span-3"
    />
    <FormGroup
      v-if="purposeValue == 'Business' && documentNameValue.includes('Business Clearance')"
      label="Income"
      type="text"
      name="income"
      span="col-span-3"
    />
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate/";
const { value: purposeValue } = useField("purpose");
const { value: documentNameValue } = useField("document_name") as any;
</script>