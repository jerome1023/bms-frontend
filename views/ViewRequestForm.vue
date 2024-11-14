<template>
  <div class="sm:grid grid-cols-6 gap-x-3">
    <FormGroup
      label="Fullname"
      type="readonly"
      name="fullname"
      span="col-span-3"
    />
    <FormGroup label="Age" type="readonly" name="age" span="col-span-3" />
    <FormGroup
      label="Sitio"
      type="readonly"
      name="sitio_name"
      span="col-span-3"
    />
    <FormGroup
      label="Document"
      type="readonly"
      name="document_name"
      span="col-span-3"
    />
    <FormGroup
      label="Purpose"
      type="readonly"
      name="purpose"
      span="col-span-3"
    />
    <FormGroup
      v-if="
        purposeValue == 'Business' &&
        documentNameValue.includes('Business Clearance')
      "
      label="Income"
      type="readonly"
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
