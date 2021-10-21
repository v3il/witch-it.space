<template>
  <div class="canvas-wrap">
    <canvas id="canvas" width="100" height="100" />
    <span id="procent" />
  </div>
</template>

<script>
export default {
    name: 'CircleProgressBar',

    props: {

    },

    mounted () {
        // window.onload = function() {
        const can = this.$el.querySelector('#canvas')
        const spanProcent = this.$el.querySelector('#procent')
        const c = can.getContext('2d')

        const posX = can.width / 2
        const posY = can.height / 2
        const fps = 200 / 60
        let procent = 0
        const oneProcent = 360 / 100
        const result = oneProcent * 21

        // c.lineCap = 'round'
        arcMove()

        function arcMove () {
            let deegres = 0
            const acrInterval = setInterval(function () {
                deegres += 1
                c.clearRect(0, 0, can.width, can.height)
                procent = deegres / oneProcent

                spanProcent.innerHTML = procent.toFixed()

                c.beginPath()
                c.arc(posX, posY, can.width / 2 - 10, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + 360))
                c.strokeStyle = 'rgb(242, 242, 242)'
                c.lineWidth = '10'
                c.stroke()

                c.beginPath()
                c.strokeStyle = 'rgb(2, 164, 153)'
                // c.lineCap = 'butt'
                c.lineWidth = '10'
                c.arc(posX, posY, can.width / 2 - 10, (Math.PI / 180) * 270, (Math.PI / 180) * (270 + deegres))
                c.stroke()
                if (deegres >= result) { clearInterval(acrInterval) }
            }, fps)
        }

        // }
    }
}
</script>

<style scoped>
:root {
    background: #fff;
}

span#procent {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    font-size: 20px;
    transform: translate(-50%, -50%);
    color: red;
}

span#procent::after {
    content: '%';
}

.canvas-wrap {
    position: relative;
    width: 100px;
    height: 100px;
}
</style>
