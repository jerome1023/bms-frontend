<template>
  <div>
    <NuxtLoadingIndicator estimatedProgress="100" :height="5" />
    <NuxtLayout :name="layout" v-if="isLoading">
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const layout = ref('auth')
const isLoading = ref();
onMounted(()=>{

})

const checkLocalStorage = () => {
  if (process.client) {
    const storedValue = localStorage.getItem('token');
    const isAuthenticated = storedValue !== null;
    layout.value = isAuthenticated ? 'default' : 'auth';
    isLoading.value = true; 
  }
};

const router = useRouter()
watch(
  ()=>router.currentRoute.value.path,
  ()=>{
    checkLocalStorage();
})

onMounted(() => {
  checkLocalStorage();
});
</script>
