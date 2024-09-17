<template>
    <div class="sm:grid grid-cols-6 gap-x-3">
        <FormGroup label="Lastname" type="text" name="lastname" span="col-span-2" />
        <FormGroup label="Firstname" type="text" name="firstname" span="col-span-2" />
        <FormGroup label="Middlename" type="text" name="middlename" span="col-span-2" />
        <FormGroup label="Gender" type="select" :options="options" name="gender" span="col-span-3" />
        <FormGroup label="Position" type="select" :options="optionPositions" name="position" span="col-span-3" />
        <FormGroup label="Birthdate" type="date" name="birthdate" span="col-span-3" />
        <FormGroup label="Start Term" type="date" name="start_term" span="col-span-3" />
        <FormGroup label="End Term" type="date" name="end_term" span="col-span-3" />
    </div>
</template>

<script setup lang="ts">
const options = [
    {
        name: 'Male',
        code: 'male'
    },
    {
        name: 'Female',
        code: 'female'
    }
]

const optionPositions = [
    {
        name: 'Barangay Captain',
        code: 'captain'
    },
    {
        name: 'Konsehal',
        code: 'konsehal'
    }
]
</script>