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
        }
    },

    computed: {
        canvasSize () {
            return this.radius * 2// + this.strokeWidth
        }
    },

    mounted () {
        // window.onload = function() {
        const can = this.$el.querySelector('#canvas')
        // const spanProcent = this.$el.querySelector('#procent')
        const c = can.getContext('2d')

        const posX = can.width / 2
        const posY = can.height / 2
        const fps = 100 / 60
        // let procent = 0
        const oneProcent = 360 / 100
        const result = oneProcent * this.value

        // c.lineCap = 'round'

        const r = this.radius - this.strokeWidth / 2
        const sw = this.strokeWidth

        console.log(this.strokeWidth, this.radius - this.strokeWidth)

        const arcMove = () => {
            let deegres = 0
            const acrInterval = setInterval(function () {
                deegres += 1
                c.clearRect(0, 0, can.width, can.height)
                // procent = deegres / oneProcent

                // spanProcent.innerHTML = procent.toFixed()

                c.beginPath()
                c.arc(posX, posY, r, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + 360))
                c.strokeStyle = 'rgb(242, 242, 242)'
                c.lineWidth = sw
                c.stroke()

                c.beginPath()
                c.strokeStyle = 'rgb(2, 164, 153)'
                // c.lineWidth = this.strokeWidth
                c.arc(posX, posY, r, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + deegres))
                c.stroke()
                if (deegres >= result) { clearInterval(acrInterval) }
            }, fps)
        }

        arcMove()

        // }
    }
}
</script>

<style scoped>
#canvas {
    /*border: 1px solid red;*/
}

.wit-circle-progressbar__data {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    flex-direction: column;
    font-size: 16px;
}
</style>
