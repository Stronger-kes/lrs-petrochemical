<template>
    <div class="shop-goods">
        <el-card class="box-card">
            <el-row :gutter="20" class="ele-row">
                <el-col :span="3"><div class="grid-content bg-purple">全部商品(100)</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple">上架商品(10)</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple">下架商品(20)</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple">已售罄商品(20)</div></el-col>
                <el-col :span="3"><div class="grid-content bg-purple">库存预警(20)</div></el-col>
            </el-row>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <div class="from-one">
                    <el-form-item label="所属门店：">
                        <el-select v-model="formInline.name" placeholder="请选择商品所属门店" @change="hopoutlet">
                            <el-option :label="item.name" :value="item.id" v-for="item in outlet" :key="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品分类：">
                        <el-select v-model="formInline.isEntityGoods" placeholder="请选择商品分类" @change="GoodsOfType">
                            <el-option :label="item.isEntityGoods" v-for="item in GoodsType" :key="item.id" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品品牌：">
                       <el-select v-model="formInline.brand" placeholder="请选择商品品牌">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="from-tow">
                    <el-form-item label="商品状态：">
                        <el-select v-model="formInline.onShelf" placeholder="强选择商品状态" @change="onShop">
                            <el-option v-for="item in shopUp" :key="item.id" :label="item.onShelf" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="margin-left: 100px;">
                        <el-button type="primary" @click="submitForm">查询</el-button>
                        <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                </div>
            </el-form>
            <div class="shop-table">
                <el-row>
                    <el-button type="primary" @click="addShopGoods">添加商品</el-button>
                </el-row>
                <el-table :data="tableData" ref="multipleTable"  style="width: 100%; margin-top: 20px;">
                    <!-- <el-table-column align="center" prop="date" label="商品编号" width="80"></el-table-column> -->
                    <el-table-column align="center" prop="storeName" label="门店" width="80"></el-table-column>
                    <el-table-column align="center" prop label="商品图片" width="100">
                        <template slot-scope="scope">
                            <img :src="scope.row.images" alt="">
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="" label="商品类型">
                        <template slot-scope="scope">
                            {{scope.row.isEntityGoods |shopType() }}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="name" label="商品名称"></el-table-column>
                    <el-table-column align="center" prop="brand" label="品牌"></el-table-column>
                    <el-table-column align="center" prop="sort" label="排序"></el-table-column>
                    <el-table-column align="center" prop="stock" label="库存"></el-table-column>
                    <el-table-column align="center" prop="address" label="销售数量"></el-table-column>
                    <el-table-column align="center" prop="sellPrice" label="销售价格"></el-table-column>
                    <el-table-column align="center" prop="costPrice" label="成本价"></el-table-column>
                    <el-table-column align="center" prop="onShelf" label="上下架">
                        <template slot-scope="scope">
                             <el-switch 
                                v-model="scope.row.onShelf"
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
                            <el-button type="primary" icon="el-icon-edit" circle></el-button>
                            <el-button  type="danger" icon="el-icon-delete" @click="removeShop(scope.row)" circle></el-button>
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
import {getPageList,updatedTheGoods,deleteTheGoods,getFindUnameByUid,brandIdentity} from '@/api/http.js';
    export default {
        name: "shopGoods",
        data() {
            return {
                totalCount: 0,
                formInline: {
                    storeId: "", // 商店id
                    isEntityGoods: '', //商品类型 1虚拟商品 2实物商品
                    brand: '', // 商品品牌
                    onShelf: '' // 商品上下架 0未上架 1上架 
                },
                formInput:{
                    storeId: "", // 商店id
                    isEntityGoods: '', //商品类型 1虚拟商品 2实物商品
                    brand: '', // 商品品牌
                    onShelf: '' // 商品上下架 0未上架 1上架 
                },
                // 商品类型
                GoodsType:[
                   {isEntityGoods: "全部",id: ""},
                    {isEntityGoods: "虚拟商品",id: "1"},
                    {isEntityGoods: "实物商品", id: "2"}
                ],
                // 商品上下架 
                shopUp:[
                    {onShelf: "全部",id: ""},
                    {onShelf: "已下架",id: "0"},
                    {onShelf: "上架中", id: "1"}
                ],
                // Table
                tableData: [] ,
                pageNum: 1,
                pageSize: 10,
                outlet: []    // select门店
            }
        },
        created() {
            this.getFindBy();
            this.getCountList();
            this.getFindUnameByUId();
        },
        methods: {
           async getFindUnameByUId() {
                let username = JSON.parse(localStorage.getItem("user")); 
                let { reslut:{data: {code,data}}} = await getFindUnameByUid(username.userId);
                if(code === 200) {
                    this.outlet = data;
                }   
            },
            async getFindBy() {
                let username = JSON.parse(localStorage.getItem("user"));
               let res =  await brandIdentity(username.userId)
                console.log(res,"adasdsadsadad");
            },
            // 获取门店name
            hopoutlet(val){
                this.formInput.storeId = val;
            },
            // 商品类型
            GoodsOfType(val) {
               this.formInput.isEntityGoods = val;
            },
             // 商品上下架
            onShop(val) {
                this.formInput.onShelf = val;
                console.log(this.formInput);
            },
            // 查询
            async submitForm(){
               await this.getCountList();
            },
            // 重置
            async resetForm() {
                this.formInput = {};
                this.formInline = {};
                await this.getCountList();
            },
            // List渲染
           async getCountList() {
               let data = {
                    pageSize: this.pageSize,
                    pageNum: this.pageNum,
                    storeId: this.formInput.storeId,
                    isEntityGoods: this.formInput.isEntityGoods,
                    brand: this.formInput.brand,
                    onShelf:this.formInput.onShelf
               };
               let {reslut: {data:{code, data: {rows, total}}}} = await getPageList(data);
               if(code === 200) {
                  this.tableData = rows;
                  this.totalCount = total;
               }
            },
            // 删除
           async removeShop(val) {
               let data = {id: val.id};
               let {reslut: { data: { code } } } = await deleteTheGoods(data);
               if(code === '200' || code === 200) {
                   this.$message.success("删除成功！");
                   this.getCountList();
               }else {
                    this.$message.error("删除失败！");
                    this.getCountList();
               }
            },
            // 分页方法
            handleSizeChange(val) {
                this.pageSize = val;
                this.getCountList();
            },
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getCountList();
            },
            // 跳转道商品添加页面
            addShopGoods(){
                this.$router.push({path: "/shopGoods/addcount"});
            },
           async switchChange(onff) {
               let data = {id: onff.id,onShelf:onff.onShelf}
               let {reslut: {data: {code}}} = await updatedTheGoods(data);
               if (code === '200' || code === 200) {
                   this.$message.success("修改成功!");
                    this.getCountList();
                } else {
                    this.$message.error("网络出现问题,请重试！");
                    this.getCountList();
                }
            }
        },
        filters:{
           shopType(v){
               let shopText = '';
               switch (v) {
                   case 1:
                    shopText = "虚拟商品";
                    break;
                    case 2:
                    shopText = "实物商品";
                    break;
               }
               return shopText;
           }

        }
    }
</script>

<style lang="scss" scoped>
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
      color: #fff;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    line-height: 36px;
    font-weight: 600;
  }
</style>