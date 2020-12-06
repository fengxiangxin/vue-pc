<template>
  <div class="pagination">
    <!-- 上一页 -->
    <button :disabled="myCurrentPage <= 1" @click="myCurrentPage--">
      上一页
    </button>
    <!-- 第一页，总页数大于指定按钮数量时渲染 -->
    <button
      v-if="pages > pagerCount"
      :class="{ active: myCurrentPage === 1 }"
      @click="myCurrentPage = 1"
    >
      1
    </button>
    <!-- 左折叠，当前页码不小于起始页码加偏移量时展示，点击时页码减少pagerCount - 2 -->
    <button
      v-show="!(myCurrentPage <= 1 + (pagerCount - 1) / 2)"
      @click="
        myCurrentPage =
          myCurrentPage - (pagerCount - 2) < 1
            ? 1
            : myCurrentPage - (pagerCount - 2)
      "
    >
      ···
    </button>
    <!-- 遍历展示中间部分按钮 -->
    <button
      :class="{ active: item === myCurrentPage }"
      v-for="item in mapBtnCount"
      :key="item"
      @click="myCurrentPage = item"
    >
      {{ item }}
    </button>
    <!-- 右折叠 -->
    <button
      v-show="!(myCurrentPage >= pages - (pagerCount - 1) / 2)"
      @click="
        myCurrentPage =
          myCurrentPage + (pagerCount - 2) > pages
            ? pages
            : myCurrentPage + (pagerCount - 2)
      "
    >
      ···
    </button>
    <!-- 最后一页 -->
    <button
      v-show="pages > pagerCount"
      :class="{ active: myCurrentPage === pages }"
      @click="myCurrentPage = pages"
    >
      {{ pages }}
    </button>
    <!-- 下一页 -->
    <button :disabled="myCurrentPage >= pages" @click="myCurrentPage++">
      下一页
    </button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
      myCurrentPage: this.currentPage,
    };
  },
  props: {
    /* 当前页码 */
    currentPage: {
      type: Number,
      default: 1,
    },
    /* 每页数据条数 */
    pageSize: {
      type: Number,
      default: 10,
    },
    /* 数据总条数 */
    total: {
      type: Number,
      default: 0,
    },
    /* 按钮数量 */
    pagerCount: {
      type: Number,
      validator(val) {
        return val >= 5 && val <= 21 && val % 2 === 1;
      },
      default: 7,
    },
  },
  computed: {
    pages() {
      /* 总页数必须为整数，向上取整 */
      const { total, pageSize } = this;
      return Math.ceil(total / pageSize);
    },
    /* 计算动态展示的页码按钮，依赖于当前页码 */
    mapBtnCount() {
      /* 解构出当前页面和总页数 */
      const { myCurrentPage, pages } = this;
      /* 要遍历展示的按钮数量为指定按钮数量减去开头和结尾的两个按钮 */
      const count = this.pagerCount - 2;
      /* 用于保存按钮的数组 */
      const btnCount = [];
      /* 计算偏移量 */
      const offsetCount = (this.pagerCount - 1) / 2; //3
      /* 计算数组中间值，默认以当前页码为基准 */
      let base = myCurrentPage;
      /* 如果页数小于指定按钮数量，则直接展示对应总页数的按钮 */
      if (pages <= this.pagerCount) {
        return pages;
      }
      /* 如果当前页码较小，则以起始页码加偏移量为基准 */
      if (myCurrentPage <= 1 + offsetCount) {
        base = 1 + offsetCount;
      }
      /* 如果当前页码较大，则以末尾页码减偏移量为基准 */
      if (myCurrentPage >= pages - offsetCount) {
        base = pages - offsetCount;
      }
      /* 先给数组中加入当前基准值 */
      btnCount.push(base);
      /* 同时向数组前面和后面添加对应页码 */
      for (let i = 1; i < count / 2; i++) {
        btnCount.unshift(base - i);
        btnCount.push(base + i);
      }
      return btnCount;
    },
  },
  watch: {
    myCurrentPage(newVal) {
      this.$emit("current-change", newVal);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  white-space: nowrap;
  font-weight: 700;
  button {
    margin: 0 5px;
    padding: 0 4px;
    font-size: 13px;
    min-width: 30px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: none;
    outline: none;
    display: block;
    background-color: #f4f4f5;
    color: #606266;
    border-radius: 2px;
  }
}

button.active {
  background-color: #409eff;
  color: #fff;
}
</style>
