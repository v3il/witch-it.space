<template>
  <b-taglist>
    <b-tag v-for="tag in tags" :key="tag" type="is-primary">
      {{ tag }}
    </b-tag>
  </b-taglist>
</template>

<script>
import { eventsManager, raritiesManager, slotsManager } from '@/shared'

export default {
    name: 'ItemTags',

    props: {
        item: {
            type: Object,
            required: true
        },

        onlyPrimary: {
            type: Boolean,
            required: false,
            default: false
        }
    },

    computed: {
        tags () {
            const characterTag = this.getCharacterTag()
            const eventTag = this.getEventTag()
            const rarityTag = this.getRarityTag()
            const isTradeableTag = this.getIsTradeableTag()
            const slotTag = this.getSlotTag()

            if (this.onlyPrimary) {
                const tags = [
                    rarityTag,
                    slotTag
                ]

                if (eventTag) {
                    tags.push(eventTag.label)
                }

                return tags
            }

            const tags = [
                rarityTag,
                isTradeableTag,
                slotTag
            ]

            if (eventTag) {
                tags.push(eventTag.label)
            }

            if (characterTag) {
                tags.push(characterTag)
            }

            return tags
        }
    },

    methods: {
        getRarityTag () {
            return raritiesManager.find(this.item.rarity).label
        },

        getIsTradeableTag () {
            return this.item.isTradable ? 'Tradeable' : 'Not Tradeable'
        },

        getSlotTag () {
            return slotsManager.find(this.item.slot).label
        },

        getEventTag () {
            return eventsManager.find(this.item.event)
        },

        getCharacterTag () {
            if (!this.item.character) {
                return
            }

            return this.item.character === 'hunter' ? 'Hunter' : 'Witch'
        }
    }
}
</script>

<style scoped>

</style>
