<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div
        v-for="carouser in carouserList"
        :key="carouser.id"
        class="swiper-slide"
      >
        <img v-lazy="carouser.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
/* 引入swiper */
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/swiper-bundle.min.css";
/* swiper默认只有核心轮播图功能，要使用其它功能需要先加载 */
Swiper.use([Navigation, Pagination, Autoplay]);

export default {
  name: "Carouser",
  props: {
    carouserList: {
      type: Array,
      required: true,
    },
  },
  watch: {
    /**
     * 实现轮播图功能的new Swiper()必须满足以下两点
     * 1. 必须已经获取到轮播图数据
     *   - 使用watch监视数据变化，可以保证已经获取到轮播图数据
     * 2. 必须已经渲染完成轮播图DOM元素
     *   - 使用nextTick异步任务保证new Swiper()在DOM元素更新完成后执行
     *   - DOM元素更新是异步微任务
     *   - nextTick()只会在DOM元素更新完成后执行
     */
    carouserList() {
      /* 如果swiper已经存在，则不允许重复new */
      if (this.swiper) return;
      this.$nextTick(() => {
        this.initSwiper();
      });
    },
  },
  methods: {
    initSwiper() {
      /* $refs选中DOM元素 */
      /* 使用this.$refs.swiper防止复用的轮播图组件选中到同一个轮播图元素 */
      this.swiper = new Swiper(this.$refs.swiper, {
        /* 循环模式 */
        loop: true,
        /* 自动播放 */
        autoplay: {
          /* 间隔时间 */
          delay: 2000,
          /* 当用户点击下一页后，继续自动播放 */
          disableOnInteraction: false,
        },
        /* 分页器 */
        pagination: {
          /* 分页器元素 */
          el: ".swiper-pagination",
          /* 是否允许点击 */
          clickable: true,
        },
        /* 导航按钮 */
        navigation: {
          /* 下一张 */
          nextEl: ".swiper-button-next",
          /* 上一张 */
          prevEl: ".swiper-button-prev",
        },
      });
    },
  },
  mounted() {
    /**
     * 这个组件挂载时有两种情况
     * 1. 挂载时已经有数据，则需要立即new Swiper()
     * 2. 挂载时没有数据，则需要等待watch监视到数据变化才new Swiper()
     */
    /* 如果没有数据则使用watch */
    if (!this.carouserList.length) return;
    this.initSwiper();
  },
};
</script>

<style lang="less" scoped>
</style>
