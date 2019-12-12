<template>
  <div class="commend">
    <h2>Commend For You</h2>
    <ol class="commend-list">
      <li class="item" v-for="(item, index) in 10" :key="index">
        <div class="order">{{ 10 > ++index ? `0${index}` : index }}</div>
        <div class="content">
          <h3>
            How My Startup Got Acquired After Six Months
          </h3>
          <p class="info"><span>Leoljustsave</span>in<span>Flipe</span></p>
          <p class="time">Dec 3 · 13 min</p>
        </div>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Commend extends Vue {}
</script>

<style lang="less" scoped>
.commend {
  h2 {
    font-size: 24px;
    font-weight: 600;
    margin: 32px 32px 0 32px;
    padding-bottom: 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
    font-family: marat !important;
  }

  .commend-list {
    padding: 32px;

    .item {
      display: flex;

      &:not(:last-child) {
        margin-bottom: 24px;
      }

      .order {
        font-size: 34px;
        color: rgba(0, 0, 0, 0.15);
      }
      .content {
        flex: 1;
        margin-left: 16px;
        font-size: 15px;
        line-height: 20px;

        h3 {
          font-size: 16px;
          font-weight: bold;
          text-transform: capitalize;
          margin-bottom: 4px;
        }

        .info {
          color: rgba(0, 0, 0, 0.84);
        }

        .time {
          color: rgba(0, 0, 0, 0.54);
        }
      }
    }
  }
}
</style>
