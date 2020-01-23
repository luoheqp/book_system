<template>
  <Popup @toggleShowState="togglePopState" :title="title">
    <div class="catalog-wrap">
      <ul class="main-list">
        <li v-for="(main, index) in catalogInfo.toc" :key="index">
          <p class="cp" @click="jumpTo(main.href)">{{ main.label }}</p>
          <ul class="sub-list" v-if="main.subitems.length">
            <li
              class="cp"
              v-for="(sub, index) in main.subitems"
              :key="index"
              @click="jumpTo(sub.href)"
            >
              {{ sub.label }}
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </Popup>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import Popup from "@/components/common/Popup.vue";

@Component({
  components: {
    Popup
  }
})
export default class CatalogPop extends Vue {
  @Prop({
    default: () => {
      return [];
    }
  })
  catalogInfo!: string[];
  public title: string = "Catalog";

  togglePopState() {
    this.$emit("togglePopState");
  }

  jumpTo(href: string) {
    this.$emit("jumpTo", href);
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/styles/index.less";

.catalog-wrap {
  max-height: 500px;
  max-width: 500px;
  overflow-y: scroll;

  .main-list {
    padding-right: @doubleMargin;
    & > li {
      & > p {
        font-size: 20px;
        font-weight: bold;
        padding-bottom: 5px;
        margin-bottom: 10px;
        width: fit-content;
        box-sizing: border-box;
        border-bottom: 2px solid transparent;

        &:hover {
          border-bottom: 2px solid @mainColor;
        }
      }
      .sub-list {
        margin-left: @defMargin;

        & > li {
          padding-bottom: 5px;
          margin-bottom: 10px;
          width: fit-content;
          box-sizing: border-box;
          border-bottom: 2px solid transparent;

          &:hover {
            border-bottom: 2px solid @mainColor;
          }
        }
      }
    }
  }
}
</style>
