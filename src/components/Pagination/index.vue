<template>
  <div class="pagination">
    <!-- 上一页 -->
    <button :disabled="myCurrentPage <= 1" @click="myCurrentPage--">
      上一页
    </button>
    <!-- 第一页 -->
    <button :class="{ active: myCurrentPage === 1 }" @click="myCurrentPage = 1">
      1
    </button>
    <!-- 左跳转 -->
    <button
      v-show="!(myCurrentPage <= 4)"
      @click="myCurrentPage = myCurrentPage - 5 < 1 ? 1 : myCurrentPage - 5"
    >
      ···
    </button>
    <button
      :class="{ active: item === myCurrentPage }"
      v-for="item in mapBtnCount"
      :key="item"
      @click="myCurrentPage = item"
    >
      {{ item }}
    </button>
    <!-- 右跳转 -->
    <button
      v-show="!(myCurrentPage >= pages - 3)"
      @click="
        myCurrentPage = myCurrentPage + 5 > pages ? pages : myCurrentPage + 5
      "
    >
      ···
    </button>
    <!-- 最后一页 -->
    <button
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
    mapBtnCount() {
      const { myCurrentPage, pages } = this;
      /* 如果页数小于8 */
      if (pages <= 8) {
        return pages;
      } else {
        if (myCurrentPage <= 4) {
          return [2, 3, 4, 5, 6];
        } else if (myCurrentPage >= pages - 3) {
          return [pages - 5, pages - 4, pages - 3, pages - 2, pages - 1];
        } else {
          return [
            myCurrentPage - 2,
            myCurrentPage - 1,
            myCurrentPage,
            myCurrentPage + 1,
            myCurrentPage + 2,
          ];
        }
      }
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
