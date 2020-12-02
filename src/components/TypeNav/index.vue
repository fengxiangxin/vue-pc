<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="isShowSort = false">
        <h2 @mouseenter="isShowSort = true" class="all">全部商品分类</h2>

        <div class="sort" v-show="isShowSort || isInHome">
          <!-- 使用事件委托做点击跳转功能 -->
          <div class="all-sort-list2" @click.prevent="goSearch">
            <div
              v-for="category in categoryList"
              :key="category.categoryId"
              class="item bo"
            >
              <h3>
                <!-- 一级分类 -->
                <!-- 使用自定义属性保存跳转数据 -->
                <a
                  :data-categoryName="category.categoryName"
                  :data-categoryId="category.categoryId"
                  :data-categoryType="1"
                  href=""
                  >{{ category.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl
                    v-for="child in category.categoryChild"
                    :key="child.categoryId"
                    class="fore"
                  >
                    <!-- 二级分类 -->
                    <dt>
                      <a
                        :data-categoryName="child.categoryName"
                        :data-categoryId="child.categoryId"
                        :data-categoryType="2"
                        href=""
                        >{{ child.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <!-- 三级分类 -->
                      <em
                        v-for="grandChild in child.categoryChild"
                        :key="grandChild.categoryId"
                      >
                        <a
                          :data-categoryName="grandChild.categoryName"
                          :data-categoryId="grandChild.categoryId"
                          :data-categoryType="3"
                          href=""
                          >{{ grandChild.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// import { reqBaseCategoryList } from "@api/home";
import { mapState, mapActions } from "vuex";
export default {
  name: "TypeNav",
  data() {
    return {
      isInHome: this.$route.path === "/",
      isShowSort: false,
    };
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
  methods: {
    ...mapActions(["getCategoryList"]),
    goSearch(e) {
      // console.dir(e.target.dataset);
      /* 如果点击a标签，则可以获取到这些属性值，这里的属性名必须是小写 */
      const { categoryname, categoryid, categorytype } = e.target.dataset;
      /* 判断如果不是a标签则不处理 */
      if (!categoryid) return;

      this.$router[this.$route.name === "search" ? "replace" : "push"]({
        name: "search",
        params: this.$route.params,
        query: {
          categoryName: categoryname,
          [`category${categorytype}Id`]: categoryid,
        },
      });
      this.isShowSort = false;
    },
  },
  mounted() {
    /* 判断vuex如果有数据，则不再发送请求 */
    if (this.categoryList.length) return;
    this.getCategoryList();
  },
};
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      position: relative;
      top: 2px;
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
      // border-bottom: 2px solid #e1251b;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 47px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
