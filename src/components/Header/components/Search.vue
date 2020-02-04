<template>
  <div class="search-wrap">
    <div :class="['main', isActive ? 'active' : '']">
      <i
        class="iconfont icon-search search-btn"
        v-show="!isActive"
        @click="toggleActive"
      ></i>
      <i
        class="iconfont icon-Cancelcontrol search-btn"
        v-show="isActive"
        @click="toggleActive"
      ></i>
      <input
        type="text"
        v-model="searchKey"
        @input="handleSearch"
        @blur="() => toggleContent(1)"
        @focus="() => toggleContent()"
        :autofocus="isActive"
        class="search-input"
      />
    </div>
    <div class="content" v-show="searchRes && searchContentState">
      <span class="empty" v-if="isSearchEmpty">RESULT EMPTY.</span>
      <div class="book">
        <ul class="book-list">
          <li class="item" v-for="book in searchRes.bookRes" :key="book._id">
            <router-link @click="resetSearch" :to="`/reader/${book._id}`">
              <div class="cover">
                <img :src="book.cover" />
              </div>
              <div class="info">
                <p class="name">{{ book.name }}</p>
                <p class="author">{{ book.author }}</p>
                <p class="press">{{ book.press }}</p>
                <span class="tag" v-for="tag in book.tag" :key="tag._id">
                  {{ tag.tagName }}
                </span>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Action } from "vuex-class";

@Component({})
export default class Search extends Vue {
  private isActive: boolean = false;
  private time: any = null;
  private searchKey: string = "";
  private searchRes: any = "";
  private searchContentState: boolean = false;
  private isSearchEmpty: boolean = false;

  @Action("normal/search") search!: Function;

  private toggleActive() {
    let { isActive } = this;

    if (isActive) {
      this.resetSearch();
    }

    this.isActive = !this.isActive;
  }

  private resetSearch() {
    this.isActive = false;
    this.searchKey = "";
    this.searchRes = "";
  }

  private handleSearch(e: any) {
    let { searchKey } = this;

    if (!searchKey) {
      this.searchRes = "";
      return false;
    }

    if (this.time !== null) {
      clearTimeout(this.time);
    }
    this.time = setTimeout(() => {
      let key = searchKey.split(" ");

      this.search(key).then((res: any) => {
        if (!res.bookRes.length) {
          this.isSearchEmpty = true;
        } else {
          this.isSearchEmpty = false;
        }
        this.searchRes = res;
      });
    }, 1000);
  }

  private toggleContent(type: number) {
    if (type) {
      this.resetSearch();
    }

    let { searchContentState } = this;
    this.searchContentState = !searchContentState;
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/styles/index.less";

.search-wrap {
  position: relative;

  .main {
    display: flex;
    justify-content: center;
    border-radius: 15px;
    box-sizing: border-box;
    overflow: hidden;

    &:hover {
      border-color: #333;
    }

    .search-btn {
      .flex-center();
      width: 23px;
      height: 23px;
      border-radius: 50%;
      font-size: 12px;
      cursor: pointer;
    }

    .search-input {
      outline: none;
      width: 0;
      border: none;
      box-sizing: border-box;
      transition: width 0.2s linear;
    }

    &.active {
      .search-btn {
        background: #333;
        color: #fff;
      }

      .search-input {
        width: 300px;
        padding: 0 10px 0 5px;
        border-bottom: 1px solid #333;
      }
    }
  }

  .content {
    width: 100%;
    max-height: 400px;
    overflow-y: auto;
    position: absolute;
    background: #fff;
    box-shadow: 0 0 10px 0 #ccc;
    border-radius: 15px;
    margin-top: 5px;
    box-sizing: border-box;
    background: #fff;
    z-index: 3;

    .empty {
      display: inline-block;
      padding: 10px;
    }

    .book {
      .book-list {
        .item {
          padding: 5px 10px;
          &:hover {
            background: #ccc;
          }

          a {
            display: flex;
            align-items: stretch;

            .cover {
              width: 60px;
              height: 80px;
              margin-right: 10px;

              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
            }

            .info {
              overflow: hidden;
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              box-sizing: border-box;

              p {
                .one-line();
              }

              .name {
                font-size: 26px;
                margin-bottom: 3px;
              }

              .press {
                font-size: 12px;
              }

              .tag {
                width: fit-content;
                background: #41b883;
                padding: 2px 5px;
                font-size: 12px;
                font-weight: bold;
                letter-spacing: 1px;
                color: #fff;
                border-radius: 5px;
                display: flex;

                &::before {
                  content: "#";
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
