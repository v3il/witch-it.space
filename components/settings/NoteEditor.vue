<template>
  <Card>
    <b-field label="Message">
      <b-input maxlength="200" type="textarea" />
    </b-field>
  </Card>
</template>

<script>
// import VueTrix from 'vue-trix'
import Card from '@/components/Card'

export default {
    components: {
        Card
    },

    data: () => ({
        cont: 'test'
    })
}
</script>
