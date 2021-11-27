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
        }
    },

    computed: {
        tags () {
            const characterTag = this.getCharacterTag()
            const eventTag = this.getEventTag()

            const tags = [
                this.getRarityTag(),
                this.getIsTradeableTag(),
                this.getSlotTag()
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
            return this.item.isTradeable ? 'Tradeable' : 'Not Tradeable'
        },

        getSlotTag () {
            console.log(this.item.slot)
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
