<template>
  <Fieldset legend="Barangay Details">
    <Form @submit="submit" v-slot="{ isSubmitting }">
      <div class="text-end">
        <div class="xl:grid grid-cols-6 gap-x-3 mb-5">
          <FormGroup
            label="Barangay Name"
            type="text"
            name="name"
            span="col-span-2"
          />
          <FormGroup label="Logo" type="image" name="logo" span="col-span-2" />
          <FormGroup
            label="Background Image"
            type="image"
            name="image"
            span="col-span-2"
          />
        </div>
        <Button :loading="isSubmitting" label="Save" severity="contrast" outlined type="submit"/>
      </div>
    </Form>
  </Fieldset>
  <Fieldset legend="Document">
    <Form @submit="submit" v-slot="{ isSubmitting }">
      <div class="text-end">
        <div class="xl:grid grid-cols-6 gap-x-3 mb-5">
          <FormGroup
            label="Name"
            type="text"
            name="name"
            span="col-span-2"
          />
          <FormGroup
            label="Price"
            type="text"
            name="name"
            span="col-span-2"
          />
        </div>
        <Button :loading="isSubmitting" label="Save" severity="contrast" outlined type="submit"/>
      </div>
    </Form>
  </Fieldset>
  <Fieldset legend="Sitio">
    <Form @submit="submit" v-slot="{ isSubmitting }">
      <div class="text-end">
        <div class="xl:grid grid-cols-6 gap-x-3 mb-5">
          <FormGroup
            label="Name"
            type="text"
            name="name"
            span="col-span-2"
          />
        </div>
        <Button :loading="isSubmitting" label="Save" severity="contrast" outlined type="submit"/>
      </div>
    </Form>
  </Fieldset>
</template>

<script setup lang="ts">
const submit = () => {
  console.log("here");
};
</script>
