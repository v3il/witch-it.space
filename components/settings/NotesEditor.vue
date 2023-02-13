<template>
    <Card>
        <template #title>
            <h2 class="wit-font-size--sm wit-offset-bottom--sm">
                {{ $t('Settings_Preferences') }}
            </h2>
        </template>

        <b-field class="wit-offset-bottom--sm" :label="$t('Market')">
            <TextEditor
                :content="settings.marketNote"
                @input="emitEvent({ marketNote: $event })"
            />
        </b-field>

        <b-field :label="$t('Wishlist')">
            <TextEditor
                :content="settings.wishlistNote"
                @input="emitEvent({ wishlistNote: $event })"
            />
        </b-field>
    </Card>
</template>

<script setup>
const props = defineProps({
    settings: {
        required: true,
        type: Object
    }
})

function emitEvent (changedSettings) {
    // this.$emit('change', {
    //     ...this.marketSettings,
    //     ...changedSettings
    // })
}

const { $t } = useTranslate()

// import Card from '@/components/basic/Card.vue'
// import TextEditor from '@/components/basic/TextEditor.vue'
//
// export default {
//     name: 'NotesEditor',
//
//     components: {
//         Card,
//         TextEditor
//     },
//
//     props: {
//         settings: {
//             required: true,
//             type: Object
//         }
//     },
//
//     methods: {
//         emitEvent (changedSettings) {
//             this.$emit('change', {
//                 ...this.marketSettings,
//                 ...changedSettings
//             })
//         }
//     }
// }
</script>
