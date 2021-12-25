<template>
  <b-field>
    <b-input :value="content" maxlength="200" type="textarea" @input="$emit('input', $event)" />
  </b-field>
</template>

<script>
export default {
    name: 'TextEditor',

    props: {
        content: {
            type: String,
            required: true
        }
    }
}
</script>
