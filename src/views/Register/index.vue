<template>
  <div class="register-wrap">
    <div class="register">
      <div class="cropper-wrap">
        <img src="@/assets/images/slk.jpg" ref="cropper" />
      </div>
      <!-- <input ref="input" type="file" accept="image/*" @change="setImage" /> -->
      <div id="preview"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

// vue-cropperjs
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

@Component({
  components: {}
})
export default class Register extends Vue {
  public imgSrc: string = "@/assets/images/slk.jpg";
  public cropper!: any;

  private created() {}

  private mounted() {
    this.cropper = new Cropper(this.$refs.cropper as HTMLCanvasElement, {
      aspectRatio: 1 / 1,
      viewMode: 1,
      dragMode: "move",
      preview: "#preview",
      crop(event) {}
    });
  }
}
</script>

<style lang="less" scoped>
@import "../../assets/styles/index.less";

.register-wrap {
  .flex-center();
  position: absolute;
  height: 100%;
  width: 100%;
  min-height: 600px;

  .register {
    .cropper-wrap {
      width: 500px;
      height: 500px;
    }

    #preview {
      width: 100px;
      height: 100px;
      overflow: hidden;
    }
  }
}
</style>
