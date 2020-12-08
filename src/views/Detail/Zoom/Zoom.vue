<template>
  <div class="spec-preview">
    <img :src="imgUrl" />
    <div class="event" @mousemove="mousemove"></div>
    <div class="big">
      <img :src="bigImgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: {
    imgUrl: String,
    bigImgUrl: String,
  },
  /**
   * 实现一个图片放大镜效果
   * 鼠标移动时获取鼠标的坐标----e.offsetX, e.offsetY
   * 将鼠标坐标赋值给蒙板定位
   * 获取蒙板定位-----this.$refs.mask.style.left
   * 判断蒙板不能超出
   * 为了保证鼠标始终在蒙板的中心，蒙板的定位应该为鼠标坐标减去蒙板长宽的一半
   * 蒙板的定位是带单位的字符串，鼠标坐标是数值
   * 大图定位于蒙板定位相关
   * 大图定位是蒙板定位的两倍
   * 大图定位与蒙板定位相反
   */
  methods: {
    mousemove(e) {
      /* 计算小图定位 */
      const { offsetX, offsetY } = e;
      const position = {
        x: offsetX - 100,
        y: offsetY - 100,
      };
      if (position.x < 0) {
        position.x = 0;
      }
      if (position.x > 200) {
        position.x = 200;
      }
      if (position.y < 0) {
        position.y = 0;
      }
      if (position.y > 200) {
        position.y = 200;
      }
      this.$refs.mask.style.left = `${position.x}px`;
      this.$refs.mask.style.top = `${position.y}px`;
      /* 计算大图定位 */
      this.$refs.bigImg.style.left = `-${2 * position.x}px`;
      this.$refs.bigImg.style.top = `-${2 * position.y}px`;
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>