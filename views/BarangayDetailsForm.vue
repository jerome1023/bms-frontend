<template>
  <div class="grid grid-row-3 sm:grid-cols-6 gap-3">
    <FormGroup
      label="Barangay Name"
      type="text"
      name="name"
      span="col-span-2"
      required
    />
    <div
      v-if="!open.logo && picture.logo"
      class="col-span-2 flex flex-col justify-center gap-3 mb-3 "
    >
    <img
            :src="picture.logo"
            class="h-56 w-56 md:h-60 md:w-60 m-auto object-cover rounded-full"
          />
      <Button
        @click="openImageUploader('logo')"
        icon="pi pi-upload"
        label="Upload New Logo"
        severity="info"
        size="small"
        class="m-auto"
      />
    </div>
    <FormGroup
      label="Logo"
      type="image"
      name="logo"
      :circle="true"
      span="col-span-2"
      :class="[open.logo || !picture.logo ? 'block' : 'hidden']"
    />
    <div
      v-if="!open.image && picture.image"
      class="col-span-2 flex flex-col justify-center gap-3 mb-3"
    >
      <img
        :src="picture.image"
        class="max-w-full max-h-60 md:max-h-64 m-auto object-scale-down"
      />
      <Button
        @click="openImageUploader('image')"
        icon="pi pi-upload"
        label="Upload New Background"
        severity="info"
        size="small"
        class="m-auto"
      />
    </div>
    <FormGroup
      label="Background Image"
      type="image"
      name="image"
      span="col-span-2"
      :class="[open.image || !picture.image ? 'block' : 'hidden']"
    />
  </div>
</template>

<script setup lang="ts">
const { value: imageFieldValue } = useField("image");
const { value: logoFieldValue } = useField("logo");
const barangayDetail = useBarangayDetailStore();
const config = useRuntimeConfig();
const baseURL = config.public.backendURL;

const open = ref({
  image: false,
  logo: false,
});

const picture = ref({
  image: "",
  logo: "",
});

watch(()=>barangayDetail.data.logo, (newLogo)=>{
  picture.value.logo = newLogo ? baseURL + newLogo : '';
  open.value.logo = false
})

watch(()=>barangayDetail.data.image, (newImage)=>{
  picture.value.image = newImage ? baseURL + newImage : '';
  open.value.image = false
})

onMounted(() => {
  if (imageFieldValue.value) {
    picture.value.image = baseURL + imageFieldValue.value;
  }
  if (logoFieldValue.value) {
    picture.value.logo = baseURL + logoFieldValue.value;
  }
});

const openImageUploader = (type: string) => {
  if (type == "image") {
    imageFieldValue.value = null;
    open.value.image = !open.value.image;
  } else {
    logoFieldValue.value = null;
    open.value.logo = !open.value.logo;
  }
};
</script>
