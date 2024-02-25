<template>
    <Modal>
        <Form>
            <KeepAlive>
                <component :is="form.component" />
            </KeepAlive>
        </Form>
    </Modal>
</template>

<script setup lang="ts">
import type { TForm } from '~/types';

defineProps<{
    form: TForm
}>()
</script>