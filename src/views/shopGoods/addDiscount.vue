<template>
    <div class="discount">
        <el-card class="box-card">
            <!-- 头部 -->
            <div class="discount_header">
                <el-page-header @back="goBack" content="商品类型："></el-page-header>
            </div>
            <!-- center -->
            <div class="discount_main">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="商品类型：">
                        <el-select v-model="goodsType.lable" placeholder="请选择" class="ele-select">
                            <el-option  v-for="(item,index) in goodsType" :key="index" :label="item.lable" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品分类：">
                        <el-select v-model="formInline.region" placeholder="请选择" class="ele-select">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品品牌：">
                        <el-select v-model="formInline.brand" placeholder="请选择" class="ele-select">
                            <el-option label="统一" value="shanghai"></el-option>
                            <el-option label="怡宝" value="beijing"></el-option>
                            <el-option label="伊利" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品门店：" class="el-item-f">
                        <el-select v-model="formInline.region" placeholder="请选择" style="width:311%;">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品名称：">
                            <el-input class="ele-select" v-model="formInline.name" placeholder="审批人"></el-input>
                    </el-form-item>
                    <el-form-item label="商品单位：">
                            <el-input class="ele-select" v-model="formInline.unit" placeholder="审批人"></el-input>
                    </el-form-item>
                     <el-form-item label="商品排序：" class="el-item-f">
                        <el-input v-model="formInline.costPrice" placeholder="审批人" style="width:334%;"></el-input>
                    </el-form-item>
                    <!-- 上传商图片 -->
                     <el-form-item label="商品图片：" class="el-item-f">
                        <el-upload action="#" list-type="picture-card" :auto-upload="false">
                         <i slot="default" class="el-icon-plus"></i>
                            <div slot="file" slot-scope="{file}">
                                <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                                <span class="el-upload-list__item-actions">
                                    <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                                    <i class="el-icon-zoom-in"></i>
                                    </span>
                                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                                    <i class="el-icon-download"></i>
                                    </span>
                                    <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                                    <i class="el-icon-delete"></i>
                                    </span>
                                </span>
                            </div>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                        </el-dialog>
                    </el-form-item>
                    <!-------------------------- 规格信息： ------------------------->
                    <el-form-item class="lable-title el-item-f" label="商品信息："></el-form-item>
                    <el-form-item label="商品规格：" class="el-item-f">
                        <el-table :data="tableData1" border style="width: 100%">
                            <el-table-column align="center" prop="date" label="成本价" width="150">
                                <template>
                                    <el-input class="table-text" v-model="formInline.user" placeholder="审批人"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="name" label="商品售价" width="150">
                                <template>
                                    <el-input class="table-text" v-model="formInline.user" placeholder="审批人"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="address" label="划线价格" width="150">
                                <template>
                                    <el-input class="table-text" v-model="formInline.user" placeholder="审批人"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="address" label="库存数量" width="150">
                                <template>
                                    <el-input class="table-text" v-model="formInline.user" placeholder="审批人"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="address" label="库存预警" width="150">
                                <template>
                                    <el-input class="table-text" v-model="formInline.user" placeholder="审批人"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="address" label="虚拟销量" width="150">
                                <template>
                                    <el-input class="table-text" v-model="formInline.user" placeholder="审批人"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" prop="address" label="虚拟已购" width="150">
                                <template>
                                    <el-input class="table-text" v-model="formInline.user" placeholder="审批人"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <!-------------------------- 优惠卷： ------------------------->
                    <div>
                        <el-form-item class="" label="优惠券：">
                            <span class="titFont" @click="getDialog">添加商品优惠券<i class="el-icon-right"></i></span>
                        </el-form-item>
                        <el-dialog title="选择优惠卷" :visible.sync="show" width="70%" center>
                            <div class="dialog-cent">
                                <div class="header-feom">
                                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                                        <el-form-item label="劵类型：">
                                            <el-select v-model="formInline.region" placeholder="活动区域">
                                                <el-option label="区域一" value="shanghai"></el-option>
                                                <el-option label="区域二" value="beijing"></el-option>
                                            </el-select>
                                        </el-form-item>
                                        <el-form-item label="关键字查询：">
                                            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
                                        </el-form-item>
                                        <el-form-item>
                                            <el-button type="primary" icon="el-icon-search">查询</el-button>
                                        </el-form-item>
                                    </el-form>
                                </div>
                                <div class="table">
                                    <el-table ref="multipleTable" :data="tableData2" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                                        <el-table-column type="selection" width="55"></el-table-column>
                                        <el-table-column label="日期" width="120">
                                            <template slot-scope="scope">{{ scope.row.date }}</template>
                                        </el-table-column>
                                        <el-table-column
                                            prop="name"
                                            label="优惠劵名称"
                                            width="120">
                                        </el-table-column>
                                        <el-table-column
                                            prop="address"
                                            label="优惠劵类型"
                                            show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                            prop="address"
                                            label="门槛"
                                            show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                            prop="address"
                                            label="面值"
                                            show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                            prop="address"
                                            label="领取数量"
                                            show-overflow-tooltip>
                                        </el-table-column>
                                        <el-table-column
                                            prop="address"
                                            label="使用数量"
                                            show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                    <el-pagination
                                        background
                                        layout="prev, pager, next"
                                        :total="1000">
                                    </el-pagination>
                                </div>
                                
                            </div>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="show = false">取 消</el-button>
                                <el-button type="primary" @click="show = false">确 定</el-button>
                            </span>
                        </el-dialog>
                    </div>
                    <ComponentsModal middleTitle="老旧小区改造"></ComponentsModal>
                    
                    <!-------------------------- 其他设置： ------------------------->
                    <el-form-item class="lable-title el-item-f" label="其他设置："></el-form-item>
                    <el-form-item label="上架处理：" class="el-item-f">
                        <el-checkbox v-model="checked">发布直接上架</el-checkbox>
                        <el-checkbox v-model="checked">等待手动上架</el-checkbox>
                    </el-form-item>
                    <el-form-item label="热销商品：" class="el-item-f">
                        <el-switch @change="SwitchOff" v-model="flag" active-text="限购" :width="80"  inactive-text="不限购"></el-switch>
                    </el-form-item>
                </el-form>
                <!--------------------------- 商品限购 -------------------------------->
                <el-form>
                    <el-form-item label="商品限购：">
                        <el-switch @change="SwitchOff" v-model="flag" active-text="限购" :width="80"  inactive-text="不限购"></el-switch>
                    </el-form-item>
                    <div class="purchase" v-if="flag">
                        <div class style="width: 37%;">
                            <el-checkbox v-model="checked"></el-checkbox>
                            <el-form-item label="永久限购：" prop="activestate" class="purchasing">
                                <el-input class="table-text" v-model="formInline.user" placeholder="审批人"></el-input>
                            </el-form-item>
                        </div>
                        <div class="">
                            <el-checkbox style="top:12px;" size="medium" v-model="checked"></el-checkbox>
                            <el-form-item label="永久限购：" prop="activestate" class="purchasing">
                                <div class="itmeer" style="margin-left: -20px;">
                                    <el-date-picker type="date" placeholder="选择日期" v-model="formInline.date1" style="width: 100%;"></el-date-picker>
                                    <span style="font-size: 16px; margin-left: 36px;">-</span>
                                    <el-time-picker placeholder="选择时间" v-model="formInline.date2" style="width: 100%;"></el-time-picker>
                                </div>
                            </el-form-item>
                        </div>
                    </div>
                </el-form>
                 <!--------------------------- 赠送优惠 -------------------------------->
                 <el-form :inline="true" :model="formInline">
                     <el-form-item label="赠送优惠：">
                        <el-switch @change="SwitchOff" v-model="flag" active-text="限购" :width="80"  inactive-text="不限购"></el-switch>
                    </el-form-item>
                    <div v-for="(item,key) in GivePreferential" :key="key"> 
                        <el-checkbox v-model="checked" style="margin-top:12px;"></el-checkbox>
                        <el-form-item  style="width: 42%;margin-left: 20px;" label="限制赠送：">
                            <el-col :span="11">
                                <el-date-picker type="date" placeholder="选择日期" v-model="item.date1" style="width: 100%;"></el-date-picker>
                            </el-col>
                            <el-col class="line" :span="2">-</el-col>
                            <el-col :span="11">
                                <el-time-picker placeholder="选择时间" v-model="item.date2" style="width: 100%;"></el-time-picker>
                            </el-col>
                        </el-form-item>
                         <el-form-item  style="width: 22%;" label="优惠类型：">
                            <el-select v-model="item.perType" placeholder="活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  style="width: 21%;" label="赠送数量：">
                            <el-input v-model="item.perNum" placeholder="赠送数量"></el-input>
                        </el-form-item>
                        <el-form-item  style="width: 4%;">
                            <el-button icon="el-icon-plus" type="primary" @click="addSubmit"></el-button>
                        </el-form-item>
                    </div>
                     <el-form-item class="quill"  style="" label="优惠类型：">
                            <quill-editor ref="text" v-model="content" class="myQuillEditor" :options="editorOption" />
                            <el-button type="primary" @click="RichTextSubmit">提交</el-button>
                        </el-form-item>
                </el-form>
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
import { quillEditor } from 'vue-quill-editor'; // 导入富文本
import ComponentsModal from '../../components/common/ComponentsModal'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
    export default {
        components: {quillEditor,ComponentsModal},
        name: "addDiscount",
        data() {
            return {
        multipleSelection: [],
                goodsType:[
                    {value: "0",lable:"实物商品",},
                    {value: "1",lable:"优惠券",},
                    {value: "2",lable:"充值卡",}
                ],
                content: '',
                editorOption: {},
                flag:false,
                disabled: false,
                dialogVisible: false,
                dialogImageUrl: "",
                checked: true,
                formInline: {
                    name: '', // 商品名称
                    unit: '', // 
                    costPrice:'',// 商品排序
                    region: '',
                    date1: "",
                    date2:""
                },
                // 商品规格
                ShopsPecification:{
                    // 成本价
                    sellPrice: '',// 商品售价
                    crossedPrice: '',// 划线价格
                    stock: '', // 库存数量
                    stockWarn: '',// 库存预警
                    virtualSales:'', // 虚拟销量
                    // 虚拟已购
                },
                tableData1:[
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }
                ],
                tableData2:[
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金'
                    },
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金'
                    },
                    {
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区'
                    },
                ],
                // 赠送优惠 ++
                GivePreferential:[{date1: "",date2: "",perType: "",perNum: ""}],
                show: false, // 弹框开关
            }
        },
        created() {
            
        },
        methods:{
            // 返回商品管理
            goBack() {
                this.$router.push({path: '/shopGoods/listUI'});
            },
            SwitchOff(callback) {
                console.log(callback);
            },
            addSubmit() {
                let data = {
                    date1:this.GivePreferential.date1,
                    date2:this.GivePreferential.date2, 
                    perType: this.GivePreferential.perType,
                    perNum:this.GivePreferential.perNum
                }
                this.GivePreferential.push(data);
            },
            // 提交
            submitForm() {},
            // 重置按钮
            resetForm() {},
            // 富文本按钮
            RichTextSubmit() {
                console.log(this.$refs.text.value);
            },
            getDialog() {
                this.show = true;
            }
        }
    }
</script>

<style lang="scss" scoped>
.discount_main {margin-top: 30px;}
.el-form-item {width: 27%;}
.ele-select {width: 130%;}
.el-item-f {
    width: 100%;
    &>>>.el-form-item__content{
        width: 16%;
    }
}

::v-deep {
    .lable-title>.el-form-item__label{
        font-weight: 900;
        font-size: 20px;
    }
}

.el-table .el-table-column .el-input{
    width: 20%;
}

.table-text{
    width: 80px;
    height: 50px;
    line-height: 50px;
}

#el-form-itemzsc {width: 27%;}

.purchase{
    display: flex;
    align-items: center;
    div{
        width: 100%;
        display: flex;
        align-items: center;
        position: relative;
        left: 20px;
        .el-checkbox{
            position: absolute;
            top: 17px;
        }
    }
}

// 富文本的高
.quill {
    width: 100%; 
    margin-top: 20px; 
    height: 300px;
}

.titFont {
    font-size: 17px;
    font-weight: bold;
    cursor:pointer;
    i{
        font-size: 17px;
        font-weight: bold;
    }
}
//开关样式
::v-deep {
    .ql-container{
        height: 200px;
    }
    .el-switch__label--left {
        position: relative;
        left: 82px;
        color: #fff;
        z-index: -1111;
    }
    .el-switch__label--right {
        position: relative !important;
        right: 72px !important;
        color: #fff;
        z-index: -1111;
    }
    .el-switch__label--right.is-active {
        z-index: 1111;
        color: #fff !important;
    }
    .el-switch__label--left.is-active {
        z-index: 1111;
        color: #9c9c9c !important;
    }
    .el-switch__core {
        height: 30px;
        border-radius: 17px;
    }
    .el-switch__core:after {
        width: 25px;
        height: 25px;
        left: 3px;
    }
    .el-switch.is-checked .el-switch__core::after {
        left: 86%;
        margin-left: -16px;
    }
    .el-textarea__inner {
        min-height: 180px;
    }
}
</style>