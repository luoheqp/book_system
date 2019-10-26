<template>
  <div class="home-wrap">
    <div class="home">
      <div class="book-list">
        <div class="book-item">
          <div class="pic">200 * 200</div>
          <div class="info">
            <p class="name">一本书读懂销售心理学（畅销书）</p>
            <p class="detail">
              <span class="author">李昊轩著</span>
              <span class="date">2012-10-01</span>
              <span class="press">中国商业出版社</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.home-wrap {
  background-color: #fff;

  .home {
    .book-list {
      .book-item {
        padding: @defMargin;
        height: 230px;
        box-sizing: border-box;
        display: flex;

        .pic {
          .flex-center();
          width: 200px;
          height: 200px;
          background-color: #eee;
          margin-right: @defMargin;
        }
        .info {
          .name {
          }
          .detail {
            .author {
            }
            .date {
            }
            .press {
            }
          }
        }
      }
    }
  }
}
</style>
