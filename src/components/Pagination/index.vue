<template>
  <div class="pagination">
    <button>上一页</button>
    <button
      :class="{ active: item === myCurrentPage }"
      v-for="item in mapBtnCount"
      :key="item"
      @click="setCurrentPage(item)"
    >
      {{ item }}
    </button>
    <button>下一页</button>
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
    mapBtnCount() {
      const { total, pageSize, myCurrentPage } = this;
      /* 计算页数 */
      const pages = total / pageSize;
      /* 如果页数小于8 */
      if (pages <= 8) {
        return pages;
      } else {
        if (myCurrentPage <= 4) {
          return [1, 2, 3, 4, 5, 6, "...", pages];
        } else if (myCurrentPage >= pages - 3) {
          return [
            1,
            "...",
            pages - 5,
            pages - 4,
            pages - 3,
            pages - 2,
            pages - 1,
            pages,
          ];
        } else {
          return [
            1,
            "...",
            myCurrentPage - 2,
            myCurrentPage - 1,
            myCurrentPage,
            myCurrentPage + 1,
            myCurrentPage + 2,
            "...",
            pages,
          ];
        }
      }
    },
  },
  methods: {
    setCurrentPage(item) {
      if (item !== "...") {
        this.myCurrentPage = item;
      }
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
