<template>
    <div class="shop-goods">
        <el-card class="box-card">
            <el-row :gutter="20" class="ele-row">
                <el-col :span="2"><div class="grid-content bg-purple">全部商品(100)</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">上架商品(10)</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">下架商品(20)</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">已售罄商品(20)</div></el-col>
                <el-col :span="2"><div class="grid-content bg-purple">库存预警(20)</div></el-col>
            </el-row>
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
                    <el-button type="primary" @click="addShopGoods">添加商品</el-button>
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
import {getPageList} from '@/api/http.js';
    export default {
        name: "shopGoods",
        data() {
            return {
                totalCount: 0,
                formInline: {
                    user: '',
                    region: '',
                    date1: "",
                    date2: "",
                },
                // Table
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                    }] ,
                pageSize: 1,
                pageNum: 10,
            }
        },
        created() {
            this.getCountList();
        },
        methods: {
            // List渲染
           async getCountList() {
               let data = {pageSize: this.pageSize,pageNum: this.pageNum}
               const res =  await getPageList(data);
               console.log(res,"8888888888888888888888888888888888888");
            },
            // 分页方法
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getList();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageNum = val;
                //   this.$emit("getPageNum", val);
                this.getList();
            },
            // 跳转道商品添加页面
            addShopGoods(){
                this.$router.push({path: "/shopGoods/addcount"})
            }
        }
    }
</script>

<style lang="scss" scoped>
.shop-goods {
    height: 100vh;
    .box-card{
        height: 100vh;
    }
}

.ele-row{
    text-align: center;
}
.el-row {
    margin-bottom: 20px;

    line-height: 20px;
    &:last-child {
      margin-bottom: 0;
      
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple:hover{
      background-color: #409EFF;
      cursor:pointer;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px;
    font-weight: 600;
  }
</style>