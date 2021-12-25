<template>
  <Card>
    <template #title>
      {{ label }}
    </template>

    <TextEditor :content="content" @input="$emit('input', $event)" />
  </Card>
</template>

<script>
import Card from '@/components/Card'
import TextEditor from '@/components/TextEditor'

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
