<template>
    <div class="discount-coupon">
        <el-card class="box-card">
            <div class="discount-coupon_header">
                <el-page-header @back="goBack" content="创建优惠券"></el-page-header>
            </div>
            <div class="discount-coupon_main">
                <el-form ref="formDtaRef" :model="from" lable-width="100px">
                    <el-form-item label="优惠券名称：">
                        <el-input style="width: 40%;" v-model="from.couponName" placeholder="请输入优惠券名称"></el-input>
                    </el-form-item>
                    <!-- 有效期 -->
                    <el-form-item label="有效期：">
                         <el-tabs v-model="activeName" @tab-click="handleClick">
                             <el-tab-pane label="固定时间" id="1" name="1">
                                 <div class="time-oicker">
                                    <el-date-picker
                                        @change="formatTime"
                                        v-model="periodValidity"
                                        type="daterange"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        value-format="yyyy-MM-dd HH:mm"
                                        :default-time="['00:00:00', '23:59:59']"
                                    ></el-date-picker>
                                 </div>
                             </el-tab-pane>
                            <el-tab-pane label="固定天数" name="2">
                                <div class="num-box">
                                    <div class="stat-placeholder">
                                        <span>领取</span>
                                        <input type="number" v-model.number="fixation.day" placeholder="请输入" />
                                        <span>天后生效</span>
                                    </div>
                                    <div class="end-placeholder">
                                        <span>有效期</span>
                                        <input type="number" v-model.number="fixation.effectTime" placeholder="请输入"/>
                                        <span>天</span>
                                    </div>
                                </div>
                            </el-tab-pane>
                         </el-tabs>
                    </el-form-item>
                    <!-- 优惠券类型 -->
                    <el-form-item label="优惠券类型：">
                        <el-radio-group v-model="radio" @change="getright">
                            <el-radio v-model="radio" label="2">满减券</el-radio>
                            <el-radio v-model="radio" label="1">折扣券</el-radio>
                        </el-radio-group>
                        <div class="coupon-box">
                            <div class="fullfCutCoupons" style="padding-left: 30px;" v-if="radio == 2">
                                <el-form-item label="使用条件：" style="margin-top: 10px;">
                                    <div class="pons-top">
                                        <el-input class="pons-top_input" v-model="makeConditionMoney" placeholder="请输入触发金额"></el-input>
                                        <span>元</span>
                                    </div>
                                </el-form-item>
                                <el-form-item label="免减金额：" style="margin-top: 20px;">
                                    <div class="pons-top">
                                        <el-input class="pons-top_input" v-model="preferentiaTrength" placeholder="请输入减免金额"></el-input>
                                        <span>元</span>
                                    </div>
                                </el-form-item>
                            </div>
                            <div class="discountCoupon" style="padding-left: 30px;" v-if="radio == 1">
                                <el-form-item label="使用条件：" style="margin-top: 10px;">
                                    <div class="pons-top">
                                        <el-input class="pons-top_input" v-model="makeConditionMoney" placeholder="请输入触发金额"></el-input>
                                        <span>元</span>
                                    </div>
                                </el-form-item>
                                <el-form-item label="折扣面值：" style="margin-top: 20px;">
                                    <div class="pons-top">
                                        <el-input class="pons-top_input" v-model="preferentiaTrength" placeholder="请输入折扣面值"></el-input>
                                        <span>折</span>
                                    </div>
                                </el-form-item>
                                <el-form-item label="优惠上线：" style="margin-top: 20px;">
                                    <div class="pons-top">
                                        <el-input class="pons-top_input" v-model="limitPreferential" placeholder="请输入最大优惠上线"></el-input>
                                        <span>元</span>
                                    </div>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form-item>
                </el-form> 
                <!-- 发放数量 -->
                <el-form :inline="true" :model="from">
                    <el-form-item class="from-re" label="发放数量：">
                        <div class="from-one">
                            <el-input v-model="totalQuantityLimit" placeholder="请输入发放数量"></el-input>
                            <span>张</span>
                        </div>
                    </el-form-item>
                    
                    <el-form-item label="使用限制：">
                        <div class="from-one">
                            <el-input v-model="everyoneQuantityLimit" placeholder=请输入使用限制时间></el-input>
                            <span>1天/张</span>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
            <div class="usable-range"><h2>使用范围</h2></div>
            <div class="usable-range-main">
                <el-form ref="formDtaRef" :model="from" lable-width="100px">
                    <el-form-item label="使用范围：">
                            <el-checkbox v-model="checked">全部商品</el-checkbox>
                            <el-checkbox v-model="checked">部分商品参与</el-checkbox>
                            <el-checkbox v-model="checked">部分商品不参与</el-checkbox>
                    </el-form-item>
                    <el-form-item> 
                         <el-button type="primary" @click="Openthebounced">选择商品</el-button>
                    </el-form-item>
                    <el-form-item>
                        <!------------------------------- 弹框 ----------------------------------->
                        <div class="bounced">
                            <el-dialog title="添加商品" :visible.sync="onShow" width="70%" center>
                                <div class="bounced-box">
                                    <el-form :inline="true" :model="from" class="demo-form-inline">
                                        <el-form-item label="商品门店：">
                                            <el-select v-model="from.region" placeholder="活动区域">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="商品分类：">
                                            <el-select v-model="from.region" placeholder="活动区域">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                            </el-select>
                                        </el-form-item>
                                         <el-form-item label="关键字查询：">
                                            <el-input v-model="from.user" placeholder="请输入商品名称或者是编号"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" @click="onSubmit">搜索</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                                <div class="bounced-table">
                                    <el-table ref="multipleTable" :data="tableData2" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                                        <el-table-column type="selection" width="55"></el-table-column>
                                        <el-table-column prop="name" label="商品图片" width="120"></el-table-column>
                                        <el-table-column prop="name" label="商品名称" width="120"></el-table-column>
                                        <el-table-column prop="address" label="商品分类" show-overflow-tooltip></el-table-column>
                                        <el-table-column prop="address" label="价格" show-overflow-tooltip></el-table-column>
                                        <el-table-column prop="address" label="库存" show-overflow-tooltip></el-table-column>
                                        <el-table-column prop="address" label="销量" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" lazy :load="load" sortable show-overflow-tooltip></el-table-column>
                                    </el-table>
                                    <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
                                </div>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="show = false">取 消</el-button>
                                    <el-button type="primary" @click="show = false">确 定</el-button>
                                </span>
                            </el-dialog>
                        </div>
                    </el-form-item>
                    <el-form-item label="优惠卷规则：">
                         <el-input type="textarea" style="width: 39%;" class="text-tare" v-model="couponUseRule"></el-input>
                         <br>
                         <span style="color: #ccc; margin-left: 96px;">请输入优惠卷规则</span>
                    </el-form-item>
                </el-form>
            </div>
            <div style="height: 50px; margin-top:30px;">
                <el-row class>
                    <div style="float: right;">
                        <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </div>
                </el-row>
            </div>
        </el-card>
    </div>
</template>

<script>
import {addCouponUpdate} from  "@/api/http.js";
    export default {
        name: "DiscountCoupon",
        data() {
            return {
                from: {
                    name: "",
                    age: "",
                    del: "",
                    user: ""
                },
                checked: false,
                periodValidity: "", // 有效期的tab开始时间结束时间
                activeName: "1", // 有效期tab的默认选中
                validityType: "", // 有效期类型：1：固定时间；
                fixation: {
                    day:'', 
                    effectTime:''
                } ,   // 2：固定天数
                radio: '1',
                couponType: "", // 优惠券类型：1：折扣券；2：满减券
                makeConditionMoney: "", // 优惠券使用条件
                limitPreferential:"0", // 优惠上限，默认0，无上限
                totalQuantityLimit: "", // 发放的总数量限制
                everyoneQuantityLimit: "", // 每人领取数量限制
                couponUseRule:"", // 优惠券适用规则
                onShow:false,
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
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }],
                multipleSelection: [],
                tableData2:[
                    {
                        
                    }
                ]
            }
        },
        created(){},
        methods:{
            // 跳转到优惠券管理页面
            goBack() {
                this.$router.push({path: "/manage/reduced"});
            },
            Openthebounced() {
                this.onShow = true;
            },
            load(tree, treeNode, resolve) {
                setTimeout(() => {
                    resolve([
                        {
                        id: 31,
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                        }, {
                        id: 32,
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                        }
                    ])
                }, 1000)
            },
            
            handleSelectionChange(){},
            // 弹框搜索
            onSubmit() {},
            // 发布
           async submitForm() {
                let data = {

                };
               const res = await addCouponUpdate(data);
               console.log(res,"提交成功！！！！！");
            },
             // 获取有效时间
            handleClick(val){
                this.validityType = val;
            },
            // 获取tab的有效期类型：1：固定时间；2：固定天数
            formatTime(val) {
                this.validityType = val.name;
            },
            // 获取优惠券类型的值 优惠券类型：1：折扣券；2：满减券
            getright(val) {
                this.couponType = val;
            },

        }
    }
</script>

<style lang="scss" scoped>
.discount-coupon_main {
    margin-top: 40px;
}
.time-oicker,.num-box,.coupon-box{
    padding-left: 67px;
}
.num-box {
    display: flex;
    font-size: 13px;
}
.stat-placeholder{
    width: 300px;
    height: 40px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span{
        display: block;
        color: #666666;
        background-color: #EEEEEE;
        border: 1px solid #ccc;
    }
    span:nth-of-type(1) {
        width: 30px;
        height: 100%;
    }
    input {
        width: 67%;
        height: 88%;
        border: none;
        outline:none;
    }

    span:nth-of-type(2) {
        width: 59px;
        height: 100%;
        text-align: center;
    }
}
.end-placeholder{
    width: 300px;
    height: 40px;
    border: 1px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 37px;
    span{
        display: block;
        color: #666666;
        background-color: #EEEEEE;
        border: 1px solid #ccc;
    }
    span:nth-of-type(1) {
        width: 46px;
        height: 100%;
    }
    input {
        width: 67%;
        height: 88%;
        border: none;
        outline:none;
    }
    span:nth-of-type(2) {
        width: 59px;
        height: 100%;
        text-align: center;
    }
}
.fullfCutCoupons {
    width: 31%;
    height: 117px;
    border: 1px solid #000;
}
.pons-top_input{
    width: 60%;
}
.pons-top{
    display: flex;
    span{
        width: 61px;
        height: 39px;
        text-align: center;
        align-items: center;
        display: block;
        background-color: #EEEEEE;
        margin-left: 5px;
    }
}
.discountCoupon {
    width: 31%;
    height: 187px;
    border: 1px solid #000;
}
.from-re {
    width: 28%;
}
.from-one{
    display: flex;
    span{
         width: 61px;
        height: 39px;
        text-align: center;
        align-items: center;
        display: block;
        background-color: #EEEEEE;
        margin-left: 5px;
    }
}
.usable-range{ 
    width: 100%;
    height: 50px;
    background-color: #eee;
    line-height: 50px;
    font-weight: bolder;
    padding-left: 10px;
}
::v-deep{
    textarea {
        height: 111px;
    }
}
</style>