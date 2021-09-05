<template>
  <div>
    <MarketSettings :market-settings="settings" class="wit-offset-bottom--sm" @change="onSettingsChange" />
    <NoteEditor :content="settings.marketNote" label="Market" class="wit-offset-bottom--sm" @input="onMarketNoteChange" />
    <NoteEditor :content="settings.wishlistNote" label="Wishlist" @input="onWishlistNoteChange" />
  </div>
</template>

<script>
import MarketSettings from '@/components/settings/MarketSettings'
import NoteEditor from '@/components/settings/NoteEditor'

export default {
    components: {
        MarketSettings,
        NoteEditor
    },

    props: {
        settings: {
            required: true,
            type: Object
        },

        user: {
            required: true,
            type: Object
        }
    },

    methods: {
        onSettingsChange (settings) {
            this.$emit('settingsChange', settings)
        },

        onMarketNoteChange (note) {
            this.$emit('settingsChange', {
                ...this.settings,
                marketNote: note
            })
        },

        onWishlistNoteChange (note) {
            this.$emit('settingsChange', {
                ...this.settings,
                wishlistNote: note
            })
        }
    }
}
</script>
