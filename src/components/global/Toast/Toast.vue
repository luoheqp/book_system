<template>
  <div class="toast-wrap" ref="toast" v-if="isToastShow">{{ content }}</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Toast extends Vue {
  private isToastShow: boolean = false;
  private content: string = "";
}
</script>

<style lang="less">
.toast-wrap {
  position: fixed;
  left: 50%;
  z-index: 999;
  transform: translate(-50%);
  padding: 5px 15px;
  box-shadow: 0px 0px 10px 1px #ccc;
  background: #fff;
  border-radius: 10px;
  animation: fade 1.5s linear forwards;
}

@keyframes fade {
  0%,
  100% {
    top: 20%;
    opacity: 0;
  }
  10%,
  90% {
    top: 25%;
    opacity: 1;
  }
}
</style>
