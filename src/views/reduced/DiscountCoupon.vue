<template>
    <div class="discount-coupon">
        <el-card class="box-card">
            <div class="discount-coupon_header">
                <el-page-header @back="goBack" content="创建优惠券"></el-page-header>
            </div>
            <div class="discount-coupon_main">
                <el-form ref="formDtaRef" :model="from" lable-width="100px">
                    <el-form-item label="优惠券名称：">
                        <el-input style="width: 40%;" v-model="from.name"></el-input>
                    </el-form-item>
                    <el-form-item label="有效期：">
                         <el-tabs v-model="activeName" @tab-click="handleClick">
                             <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                            <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                         </el-tabs>
                    </el-form-item>
                </el-form>
            </div>
            
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "DiscountCoupon",
        data() {
            return {
                from: {
                    name: "",
                    age: "",
                    del: ""
                }
            }
        },
        created(){},
        methods:{
            // 跳转到优惠券管理页面
            goBack() {
                this.$router.push({path: "/manage/reduced"});
            }
        }
    }
</script>

<style lang="scss" scoped>
.discount-coupon_main {
    margin-top: 40px;
}
</style>