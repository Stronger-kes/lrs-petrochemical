<template>
  <div class="reduced">
      <el-card class="box-card">
           <el-form :inline="true" :model="formInline" class="demo-form-inline">
             <div class="from-one">
                    <el-form-item label="券类型：">
                        <el-select @change="qType" v-model="discount.label" placeholder="请选择优惠券类型">
                            <el-option v-for="item in formDateList" :key="item.couponType" :label="item.coupon" :value="item.couponType"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="创建时间：">
                        <el-date-picker
                                v-model="createtime"
                                type="daterange"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-time="['00:00:00', '23:59:59']"
                            >
                            </el-date-picker>
                    </el-form-item>
                    <el-form-item label="劵状态：" style="margin-left:16px;">
                        <el-select @change="qState" v-model="formDateList.coupon" placeholder="请选择优惠券状态">
                            <el-option v-for="item in discount" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="from-tow">
                    <el-form-item label="关键字查询：" style="width: 30%;">
                        <el-input v-model="keyword" style="width: 108%;" placeholder="请输入优惠券查询"></el-input>
                    </el-form-item>
                    <el-form-item style="margin-left: 97px;">
                        <el-button type="primary" @click="submitForm">查询</el-button>
                        <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                </div>
           </el-form>
           <div class="shop-table">
                <el-row>
                    <el-button type="primary" @click="gedDiscountCoupon">添加优惠券</el-button>
                </el-row>
                <el-table :data="tableData" ref="multipleTable" style="width: 100%; margin-top: 20px;">
                    <el-table-column align="center" prop="couponNum" label="优惠券编号"></el-table-column>
                    <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
                    <el-table-column align="center" prop="couponName" label="优惠券名称" width="180"></el-table-column>
                    <el-table-column align="center" prop="makeConditionMoneyStr" label="使用条件"></el-table-column>
                    <el-table-column align="center" prop="preferentiaTrengthStr" label="面值" width="160"></el-table-column>
                    <el-table-column align="center" prop="periodValidityStr" label="有效期"></el-table-column>
                    <el-table-column align="center" prop="getNumber" label="领取数量"></el-table-column>
                    <el-table-column align="center" prop="useNumber" label="使用数量"></el-table-column>
                    <el-table-column align="center" label="状态">
                        <template slot-scope="scope">
                                <el-switch 
                                    v-model="scope.row.couponState"
                                    :active-value="1"
                                    :inactive-value="0"
                                     active-color="#13ce66"
                                    inactive-color="#ff4949"
                                    @change="switchChange(scope.row)"
                               ></el-switch>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="address" label="操作">
                        <template slot-scope="scope">
                                <!-- <el-switch v-model="value"  active-color="#13ce66" inactive-color="#ff4949"></el-switch>  couponNum-->
                                <el-button type="primary" icon="el-icon-edit" @click="removeShop(scope.row)" circle></el-button>
                                <el-button type="danger" v-show="scope.row.isDelete == 1? true : false" icon="el-icon-delete" @click="removeShop(scope.row)" circle></el-button>
                        </template>
                    </el-table-column>
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
import { getCouponPageList, getCouponUpdate, removerCouponUpdate } from '@/api/http.js';
  export default {
    name: 'reduced',
    data() {
      return {
          createtime: "", // 开始时间 结束时间
            tableData: [] ,
            formDateList: [
                {coupon: "折扣券",couponType: "1",},
                {coupon: "满减券",couponType: "2",},
            ],
            discount: [
                {label: "关闭", value: "0"},
                {label: "开启", value: "1"}
            ],
            keyword: "", // 关键字
            couponState:"",	// 劵状态 0：关闭；1：开启
            couponType: "", // 	优惠券类型：1：折扣券；2：满减券
            formInline: {
                user: '',
                region: '',
                date1: "",
                date2: "",
            },
            switchType: false,
            pageNum: 1,
            pageSize: 10,
            totalCount: 0,
            loading: true,
      }
    },
    created() {
        this.getCommitList();
        console.log("开始时间结束时间",this.createtime);
    },
    methods: {
       async getCommitList() {
                let data = {
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                    couponType:this.couponType, // 类型
                    couponState: this.couponState, // 状态
                    couponName: this.keyword // 关键字
                };
                const res =  await getCouponPageList(data);
                if(res.reslut.data.code && res.reslut.data.code === 200) {
                    console.log("list,",res.reslut.data.data.list)
                    this.tableData = res.reslut.data.data.list;
                    this.totalCount = res.reslut.data.data.total;
                }
            },
            // 查询接口
            submitForm() {this.getCommitList();},
            resetForm() {
                this.couponType = this.couponState = this.keyword = "";
                this.getCommitList();
            },
           async switchChange(row) {
                const data = {id: row.couponNum,couponState: row.couponState};
                const res = await getCouponUpdate(data);
                if (res.reslut.data.code === '200' || res.reslut.data.code === 200) {
                    this.getCommitList();
                } else {
                    this.$message.error("网络出现问题，请重试！");
                    this.getCommitList();
                }
            },
            // 删除列表页面的接口
           async removeShop(val) {
              const res = await removerCouponUpdate( val.couponNum);
              if(res.reslut.data.code === '200' || res.reslut.data.code === 200) {
                   this.getCommitList();
                   this.$message.success('删除成功!');
              }else if(res.reslut.data.code === 500) {
                  this.getCommitList();
                   this.$message.error(res.reslut.data.message);
              }else if(res.reslut.data.code === 403) {
                    this.getCommitList();
                   this.$message.error(res.reslut.data.message);
              }
              console.log(res);
            },
            //券类型
            qType(val) { this.couponType = val; },
            //劵状态：
            qState(val) { this.couponState = val; },
        // 跳转道添加优惠券的页面
        gedDiscountCoupon() {
            this.$router.push({path: "/manage/countCoupon"});
        },
        //分页的发放
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.getCommitList();
        },
        handleCurrentChange(val){
            console.log(`当前页: ${val}`);
            this.pageNum = val;
            this.getCommitList();
        },
    },
  }
</script>

<style lang="scss" scoped>

</style>