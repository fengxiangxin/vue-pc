<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-show="options.keyword" @click="delKeyword">
              关键字：{{ options.keyword }}<i>×</i>
            </li>
            <li
              class="with-x"
              v-show="options.categoryName"
              @click="delCategory"
            >
              分类名称：{{ options.categoryName }}<i>×</i>
            </li>
            <li class="with-x" v-show="options.trademark" @click="delTrademark">
              品牌：{{ options.trademark }}<i>×</i>
            </li>
            <li
              v-for="(prop, index) in options.props"
              :key="index"
              class="with-x"
              @click="delProps(index)"
            >
              {{ prop }}<i>×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector :addTrademark="addTrademark" @add-props="addProps" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="{ active: options.order.indexOf('1') > -1 }"
                  @click="setOrder('1')"
                >
                  <a
                    >综合
                    <span
                      :class="[
                        'iconfont',
                        order1 === 'desc' ? 'icon-down' : 'icon-up',
                      ]"
                    ></span>
                  </a>
                </li>
                <li>
                  <a
                    >销量
                    <span class="iconfont icon-down"></span>
                  </a>
                </li>
                <li>
                  <a
                    >新品
                    <span class="iconfont icon-down"></span>
                  </a>
                </li>
                <li>
                  <a
                    >评价
                    <span class="iconfont icon-down"></span>
                  </a>
                </li>
                <li
                  :class="{ active: options.order.indexOf('2') > -1 }"
                  @click="setOrder('2')"
                >
                  <a
                    >价格
                    <i
                      :class="[
                        'iconfont',
                        'icon-arrow-up-filling',
                        order2 !== 'asc' &&
                          options.order.indexOf('2') > -1 &&
                          'deactive',
                      ]"
                    ></i>
                    <i
                      :class="[
                        'iconfont',
                        'icon-arrow-down-filling',
                        order2 !== 'desc' &&
                          options.order.indexOf('2') > -1 &&
                          'deactive',
                      ]"
                    ></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a target="_blank">
                      <img :src="goods.defaultImg" />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a target="_blank" class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            background
            layout="prev, pager, next, total, sizes, jumper"
            :total="total"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="5"
          >
          </el-pagination> -->
          <Pagination
            :total="total"
            :page-size="5"
            :current-page="options.pageNo"
            @size-change="sizeChange"
            @current-change="currentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import TypeNav from "@components/TypeNav";
import Pagination from "@components/Pagination";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      options: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        props: [],
        trademark: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 5,
      },
      order1: "desc",
      order2: "desc",
    };
  },
  computed: {
    ...mapGetters(["goodsList", "total"]),
  },
  watch: {
    $route() {
      this.updateProductList();
    },
  },
  methods: {
    ...mapActions(["getProductList"]),
    updateProductList() {
      const { searchText: keyword } = this.$route.params;
      const options = {
        ...this.options,
        keyword,
        ...this.$route.query,
      };
      /* 直接给options赋值也可以触发响应式 */
      this.options = options;
      this.getProductList(options);
    },
    /* 删除关键字 */
    delKeyword() {
      this.options.keyword = "";
      this.$router.replace({
        name: "search",
        query: this.$route.query,
      });
    },
    /* 删除分类 */
    delCategory() {
      this.options.category1Id = "";
      this.options.category2Id = "";
      this.options.category3Id = "";
      this.options.categoryName = "";
      this.$router.replace({
        name: "search",
        params: this.$route.params,
      });
    },
    /* 添加品牌，从子组件中获取数据 */
    addTrademark(trademark) {
      this.options.trademark = trademark;
      /* 每次筛选信息改变都需要重新发送请求 */
      this.updateProductList();
    },
    /* 删除品牌 */
    delTrademark() {
      this.options.trademark = "";
      this.updateProductList();
    },
    /* 添加属性，使用自定义事件传参 */
    addProps(prop) {
      this.options.props.push(prop);
      this.updateProductList();
    },
    /* 删除属性 */
    delProps(index) {
      this.options.props.splice(index, 1);
      this.updateProductList();
    },
    /* 设置排序方式 */
    setOrder(order) {
      /* 从options中获取到当前的排序方式 */
      let orderNum = this.options.order.split(":")[0];
      // let orderType = this["order" + order];
      /* 如果当前排序方式与点击的按钮相同，即为第二次点击，改变升降序 */
      if (orderNum === order) {
        this["order" + order] =
          this["order" + order] === "desc" ? "asc" : "desc";
      } else if (order === "2") {
        /* 如果第一次点击的是按价格排序，则初始化为升序 */
        this.order2 = "asc";
      }
      this.options.order = order + ":" + this["order" + order];
      this.updateProductList();
    },
    /* 当每页条数变化时，触发函数会自动传递一个参数 */
    sizeChange(pageSize) {
      this.options.pageSize = pageSize;
      this.updateProductList();
    },
    /* 当页码发生变化时 */
    currentChange(pageNo) {
      this.options.pageNo = pageNo;
      this.updateProductList();
    },
  },
  mounted() {
    this.updateProductList();
  },
  components: {
    TypeNav,
    SearchSelector,
    Pagination,
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;
              width: 69.55px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
                position: relative;

                i:first-child {
                  position: absolute;
                  top: 7px;
                  right: 16px;
                  font-size: 12px;
                }
                i:last-child {
                  position: absolute;
                  bottom: 7px;
                  right: 16px;
                  font-size: 12px;
                  margin-right: 0;
                }
                i.deactive {
                  opacity: 0.5;
                }
                span {
                  font-size: 12px;
                }
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>