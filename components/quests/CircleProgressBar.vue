<template>
  <div class="wit-circle-progressbar wit-position--relative">
    <canvas id="canvas" :width="canvasSize" :height="canvasSize" />
    <div class="wit-position--absolute wit-circle-progressbar__data wit-flex wit-flex--center">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
    name: 'CircleProgressBar',

    props: {
        radius: {
            required: true,
            type: Number
        },

        strokeWidth: {
            required: true,
            type: Number
        },

        value: {
            required: true,
            type: Number
        },

        filledPartColor: {
            required: false,
            type: String,
            default: 'rgb(2, 164, 153)'
        },

        emptyPartColor: {
            required: false,
            type: String,
            default: 'rgb(242, 242, 242)'
        }
    },

    computed: {
        canvasSize () {
            return this.radius * 2
        }
    },

    watch: {
        value () {
            this.animateArc()
        }
    },

    mounted () {
        this.animateArc()
    },

    methods: {
        animateArc () {
            const canvasEl = this.$el.querySelector('#canvas')
            const ctx = canvasEl.getContext('2d')

            const centerX = canvasEl.width / 2
            const centerY = canvasEl.height / 2
            const fps = 100 / 60
            const percent = 360 / 100
            const result = percent * this.value
            const circleRadius = this.radius - this.strokeWidth / 2

            let frame = 0

            const acrInterval = setInterval(() => {
                frame++
                const degrees = this.value / 50 * frame

                // todo: animate only value diff
                ctx.clearRect(0, 0, canvasEl.width, canvasEl.height)

                ctx.beginPath()
                ctx.arc(centerX, centerY, circleRadius, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + 360))
                ctx.strokeStyle = this.emptyPartColor
                ctx.lineWidth = this.strokeWidth
                ctx.stroke()

                ctx.beginPath()
                ctx.strokeStyle = this.filledPartColor
                ctx.arc(centerX, centerY, circleRadius, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + degrees))
                ctx.stroke()

                if (degrees >= result) {
                    clearInterval(acrInterval)
                }
            }, fps)
        }
    }
}
</script>

<style scoped>
.wit-circle-progressbar__data {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    flex-direction: column;
    font-size: 16px;
}
</style>
