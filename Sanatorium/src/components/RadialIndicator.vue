<template>
  <div class="radial-indicator-container" :style="{'width':size+'px','height':size+'px'}">
    <div class="percentloop">
      <div class="circle-left" :style="{ backgroundColor: color}">
        <div :style="{ backgroundColor: backgroundColor}" ref="leftcontent"></div>
      </div>
      <div class="circle-right" :style="{ backgroundColor: color}">
        <div :style="{ backgroundColor: backgroundColor}" ref="rightcontent"></div>
      </div>
      <div class="content-wrap">
        <!-- <icon :name="icon" width="28" :style="{ 'fill': color }" /> -->
        <span class="content-number" :title="percent+'%'">{{percent}}%</span>
        <span class="content-text" :title="content">{{content}}</span>
      </div>
    </div>
  </div>
</template>
 
<script>
// Events: animationFinished
 
export default {
  name: 'RadialIndicator',
 
  props: {
    size: {
      type: [String, Number],
      default: 155
    },
    icon: {
      type: String,
      default: 'mail'
    },
    content: String,
    color: {
      type: String,
      default: '#00b3ef'
    },
    backgroundColor: {
      type: String,
      default: '#7fd9f7'
    },
    percentNum: {
      type: [String, Number],
      default: 0
    },
    speed: {
      // suggest 1~3
      type: [String, Number],
      default: 1
    }
  },
 
  data () {
    return {
      percent: 0,
      initDeg: 0,
      timeId: null,
      animationing: false
    }
  },
 
  created () {
    this.goRotate(this.transformToDeg(this.percentNum))
  },
 
  watch: {
    'percentNum': function (val) {
      if (this.animationing) return
      this.goRotate(this.transformToDeg(val))
    }
  },
 
  methods: {
    // transformToDeg (percent) {
    //   let deg = 0
    //   if (percent >= 100) {
    //     deg = 360
    //   } else {
    //     deg = parseInt(360 * percent / 100)
    //   }
    //   return deg
    // },
 
    // transformToPercent (deg) {
    //   let percent = 0
    //   if (deg >= 360) {
    //     percent = 100
    //   } else {
    //     percent = parseInt(100 * deg / 360)
    //   }
    //   return percent
    // },
 
    // //  > 180
    // rotateLeft (deg) {
    //   this.$refs.leftcontent.style.transform = 'rotate(' + (deg - 180) + 'deg)'
    // },
 
    // //  < 180
    // rotateRight (deg) {
    //   this.$refs.rightcontent.style.transform = 'rotate(' + deg + 'deg)'
    // },
 
    // goRotate (deg) {
    //   this.animationing = true
    //   this.timeId = setInterval(() => {
    //     if (deg > this.initDeg) {
    //       this.initDeg += Number(this.speed)
    //       if (this.initDeg >= 180) {
    //         this.rotateLeft(this.initDeg)
    //         this.rotateRight(180)
    //       } else {
    //         this.rotateRight(this.initDeg)
    //       }
    //     } else {
    //       this.initDeg -= Number(this.speed)
    //       if (this.initDeg >= 180) {
    //         this.rotateLeft(this.initDeg)
    //       } else {
    //         this.rotateLeft(180)
    //         this.rotateRight(this.initDeg)
    //       }
    //     }
    //     this.percent = this.transformToPercent(this.initDeg)
    //     const remainer = Number(deg) - this.initDeg
    //     if (Math.abs(remainer) < this.speed) {
    //       this.initDeg += remainer
    //       if (this.initDeg > 180) {
    //         this.rotateLeft(deg)
    //       } else {
    //         this.rotateRight(deg)
    //       }
    //       this.animationFinished()
    //     }
    //   }, 10)
    // },
 
    // animationFinished () {
    //   this.percent = this.percentNum
    //   this.animationing = false
    //   clearInterval(this.timeId)
    //   this.$emit('animationFinished')
    // }
    transformToDeg (percent) {
      let deg = 0
      if (percent >= 100) {
        deg = 360
      } else {
        deg = parseInt(360 * percent / 100)
      }
      return deg
    },
    transformToPercent (deg) {
      let percent = 0
      if (deg >= 360) {
        percent = 100
      } else {
        percent = parseInt(100 * deg / 360)
      }
      return percent
    },
    rotateLeft (deg) { // 大于180时，执行的动画
      this.$refs.leftcontent.style.transform = 'rotate(' + (deg - 180) + 'deg)'
    },
    rotateRight (deg) { // 小于180时，执行的动画
      this.$refs.rightcontent.style.transform = 'rotate(' + deg + 'deg)'
    },
    goRotate (deg) {
      this.animationing = true
      this.timeId = setInterval(() => {
        if (deg > this.initDeg) { // 递增动画
          this.initDeg += Number(this.speed)
          if (this.initDeg >= 180) {
            this.rotateLeft(this.initDeg)
            this.rotateRight(180) // 为避免前后两次传入的百分比转换为度数后的值不为步距的整数，可能出现的左右转动不到位的情况。
          } else {
            this.rotateRight(this.initDeg)
          }
        } else { // 递减动画
          this.initDeg -= Number(this.speed)
          if (this.initDeg >= 180) {
            this.rotateLeft(this.initDeg)
          } else {
            this.rotateLeft(180) // 为避免前后两次传入的百分比转换为度数后的值不为步距的整数，可能出现的左右转动不到位的情况。
            this.rotateRight(this.initDeg)
          }
        }
        this.percent = this.transformToPercent(this.initDeg) // 百分比数据滚动动画
        const remainer = Number(deg) - this.initDeg
        if (Math.abs(remainer) < this.speed) {
          this.initDeg += remainer
          if (this.initDeg > 180) {
            this.rotateLeft(deg)
          } else {
            this.rotateRight(deg)
          }
          this.animationFinished()
        }
      }, 10)
    },
    animationFinished () {
      this.percent = this.percentNum // 百分比数据滚动动画
      this.animationing = false
      clearInterval(this.timeId)
      this.$emit('animationFinished') // 动画完成的回调
    }
  },
  created () {
    this.goRotate(this.transformToDeg(this.percentNum))
  },
  watch: {
    'percentNum': function (val) {
      if (this.animationing) return
      this.goRotate(this.transformToDeg(val))
    }
  }  
}
</script>
 
<style>
.radial-indicator-container .percentloop {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}
 
.radial-indicator-container .circle-left,
.radial-indicator-container .circle-right {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
}
 
.radial-indicator-container .circle-left>div,
.radial-indicator-container .circle-right>div {
  width: 100%;
  height: 100%;
  transform-origin: right center;
  /* transition: all .5s linear; */
}
 
.radial-indicator-container .circle-right {
  left: 50%;
}
 
.radial-indicator-container .circle-right>div {
  transform-origin: left center;
}
 
.radial-indicator-container .content-wrap {
  position: absolute;
  top: 9%;
  bottom: 9%;
  left: 9%;
  right: 9%;
  background-color: #fff;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000;
}
 
.radial-indicator-container .content-wrap .content-number {
  font-size: 30px;
  padding: 5px 0 7px 0;
  cursor: pointer;
}
 
.radial-indicator-container .content-wrap .content-text {
  display: inline-block;
  max-width: 90px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
}
</style>