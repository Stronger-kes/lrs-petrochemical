<template>
  <div class="reduced">
      <el-card class="box-card">
           <el-form :inline="true" :model="formInline" class="demo-form-inline">
             <div class="from-one">
                    <el-form-item label="活动区域：">
                        <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动区域：">
                        <el-select v-model="formInline.region" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="活动时间：">
                        <el-col :span="11">
                            <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 100%;"></el-date-picker>
                        </el-col>
                        <el-col class="line" :span="1.8">-</el-col>
                        <el-col :span="11">
                            <el-time-picker placeholder="选择时间" v-model="formInline.date2" style="width: 100%;"></el-time-picker>
                        </el-col>
                    </el-form-item>
                </div>
                <div class="from-tow">
                    <el-form-item label="劵状态：" style="margin-left:16px;">
                        <el-select v-model="formInline.region" placeholder="活动区域">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="审批人：" style="margin-left:15px;">
                        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-left: 97px;">
                        <el-button type="primary" @click="submitForm('ruleForm')">查询</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </div>
           </el-form>
           <div class="shop-table">
                <el-row>
                    <el-button type="primary" @click="gedDiscountCoupon">添加优惠券</el-button>
                </el-row>
                <el-table :data="tableData" ref="multipleTable" height="400" style="width: 100%; margin-top: 20px;">
                    <el-table-column align="center" prop="date" label="商品编号"></el-table-column>
                    <el-table-column align="center" prop="name" label="门店"></el-table-column>
                    <el-table-column align="center" prop="address" label="商品图片" width="180"></el-table-column>
                    <el-table-column align="center" prop="address" label="商品类型"></el-table-column>
                    <el-table-column align="center" prop="address" label="商品名称" width="160"></el-table-column>
                    <el-table-column align="center" prop="address" label="品牌"></el-table-column>
                    <el-table-column align="center" prop="address" label="排序"></el-table-column>
                    <el-table-column align="center" prop="address" label="库存"></el-table-column>
                    <el-table-column align="center" prop="address" label="销售数量"></el-table-column>
                    <el-table-column align="center" prop="address" label="销售价格"></el-table-column>
                    <el-table-column align="center" prop="address" label="成本价"></el-table-column>
                    <el-table-column align="center" prop="address" label="上下架"></el-table-column>
                    <el-table-column align="center" prop="address" label="操作"></el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="block">
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="pageNum"
                        :page-sizes="[5, 10, 20, 30, 50, 100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="totalCount"
                    >
                    </el-pagination>
                </div>
            </div>
      </el-card>
  </div>
</template>

<script>
  export default {
    name: 'reduced',
    data() {
      return {
       formInline: {
          user: '',
          region: '',
          date1: "",
          date2: "",
        },
      }
    },
    created() {},
    methods: {
      // 跳转道添加优惠券的页面
      gedDiscountCoupon() {
        this.$router.push({path:""})
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>