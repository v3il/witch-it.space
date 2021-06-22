<template>
  <b-taglist>
    <b-tag v-for="tag in tags" :key="tag" type="is-primary">
      {{ tag }}
    </b-tag>
  </b-taglist>
</template>

<script>
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
                this.getPartTag()
            ]

            if (eventTag) {
                tags.push(eventTag)
            }

            if (characterTag) {
                tags.push(characterTag)
            }

            return tags
        }
    },

    methods: {
        getRarityTag () {
            return {
                veryrare: 'Very rare',
                whimsical: 'Whimsical',
                rare: 'Rare',
                common: 'Common',
                uncommon: 'Uncommon',
                unlock: 'Unlock',
                promo: 'Promo',
                eventrarity: 'Event'
            }[this.item.rarity]
        },

        getIsTradeableTag () {
            return this.item.isTradeable ? 'Tradeable' : 'Not Tradeable'
        },

        getPartTag () {
            return {
                'upper body': 'Upper Body',
                'lower body': 'Lower Body',
                'melee weapon': 'Melee Weapon',
                'skin color': 'Skin Color',
                'player icon': 'Player Icon',
                ingredient: 'Ingredient',
                hat: 'Hat',
                head: 'Head',
                body: 'Body',
                projectile: 'Projectile',
                broom: 'Broom'
            }[this.item.slot]
        },

        getEventTag () {
            return {
                'mystic sands': 'Mystic Sands',
                'winterdream witch': 'Winter Dream Witch',
                'chinese newyear': 'Chinese New Year',
                summerevent: 'Summer Event',
                halloween: 'Halloween',
                winterdream: 'Winter Dream',
                winterdream2018: 'Winter Dream 2018',
                winterdream2019: 'Winter Dream 2019',
                winterdream2020: 'Winter Dream 2020',
                theater: 'Theater',
                springfever: 'Spring Fever',
                plunderparty: 'Plunder Party',
                halloween2018: 'Halloween 2018',
                halloween2019: 'Halloween 2019',
                halloween2020: 'Halloween 2020',
                witchforest: 'Witch Forest'
            }[this.item.event]
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
