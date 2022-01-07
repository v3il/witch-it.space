<template>
  <Card>
    <template #title>
      {{ label }}
    </template>

    <TextEditor :content="content" @input="$emit('input', $event)" />
  </Card>
</template>

<script>
import Card from '@/components/basic/Card.vue'
import TextEditor from '@/components/basic/TextEditor.vue'

export default {
    name: 'NoteEditor',

    components: {
        Card,
        TextEditor
    },

    props: {
        content: {
            type: String,
            required: true
        },

        label: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
