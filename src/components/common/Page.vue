<template>
  <div class="block">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageNum"
      :page-sizes="[5, 10, 20, 30, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="countTotal"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    countTotal: Number,
  },
  data() {
    return {
      pageSize: 10,
      pageNum: 1,
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$emit("PageSize", val);
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.$emit("PageNum", val);
    },
  },
};
</script>

<style scoped>
.block {
  margin-top: 20px;
}
</style>