<template>
    <Card>
        <template #title>
            {{ label }}
        </template>

        <!--        <Textarea v-model="value" rows="5" cols="30" />-->

        <Textarea :model-value="content" @update:modelValue="emit('input', $event)" />
    </Card>
</template>

<script setup>
defineProps({
    content: {
        type: String,
        required: true
    },

    label: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['input'])

// import Card from '@/components/basic/Card.vue'
// import TextEditor from '@/components/basic/TextEditor.vue'
//
// export default {
//     name: 'NoteEditor',
//
//     components: {
//         Card,
//         TextEditor
//     },
//
//     props: {
//         content: {
//             type: String,
//             required: true
//         },
//
//         label: {
//             type: String,
//             required: true
//         }
//     }
// }
</script>
