<template>
  <div>
    <el-dialog
      :title="middleTitle"
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      :show="show"
    >
      <span>this is a dialog</span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ComponentsModal",
  data() {
    return {
      visible: this.show
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    leftTitle: {
      type: String,
      default: ''
    }
  },
  watch: {
    show() {
      this.visible = this.show;
	},
	title() {

	}
  },
};
</script>

<style lang="scss" scoped>
.el-main {
  padding: 15px;
  background-color: #fff;
}
</style>