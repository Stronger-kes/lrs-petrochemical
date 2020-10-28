<template>
  <div class="discount">
    <el-card class="box-card">
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100" class="demo-ruleForm">
            <el-form-item label="门店名称：" prop="name">
                <el-input v-model="ruleForm.name" class="labw-input1"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="商品类型：" class="fome">
                <el-select v-model="ruleForm.name" placeholder="请选择活动区域" class="lab-Wids">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品分类：" label-width="335px" class="fome">
                <el-select v-model="ruleForm.name" placeholder="请选择活动区域" class="lab-Wid">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <br>
             <el-form-item label="商品名称：" prop="name">
                <el-input v-model="ruleForm.name" class="labw-input"></el-input>
            </el-form-item>
             <el-form-item label="商品单位：" label-width="340px" prop="name">
                <el-input v-model="ruleForm.name" class="labw-input"></el-input>
            </el-form-item>
            <br>
             <el-form-item label="商品排序：" prop="name">
                <el-input v-model="ruleForm.name" class="labw-input"></el-input>
            </el-form-item>
             <el-form-item label="商品品牌：" label-width="340px" prop="name">
                <el-input v-model="ruleForm.name" class="labw-input"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="上传图片">
                <div class="up_img" style="height: 40px;"></div>
                <div class="up-cont" style="margin: 20px;">
                    <el-upload action="#" list-type="picture-card" :auto-upload="false">
                        <el-button slot="default" class="getup-btn"  type="primary">点击上传</el-button>
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
                </div>
            </el-form-item>
            <br>
            <el-form-item label="成本价：" prop="name">
                <el-input v-model="ruleForm.name" ></el-input>
            </el-form-item>
            <el-form-item label="商品售价：" label-width="100px" prop="name">
              <el-input v-model="ruleForm.name" ></el-input>
            </el-form-item>
            <el-form-item label="划线价格：" label-width="100px" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="库存数量:" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="库存预警：" label-width="100px" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="虚拟销量：" label-width="100px" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <br>
            <!-- Switch开关 -->
            <el-form-item label="上架处理：" prop="activestate">
                <el-switch v-model="ruleForm.nam" active-text="限购" :width="80"  inactive-text="不限购"></el-switch>
            </el-form-item>
            <el-form-item label="热销商品：" prop="activestate" style="margin-left: 112px;">
                <el-switch v-model="ruleForm.mame" active-text="限购" :width="80"  inactive-text="不限购"></el-switch>
            </el-form-item>
            <br>
            <!--       限购       -->
            <el-form-item label="限购：" prop="activestate" style="margin-left: 26px;">
                <el-switch @change="SwitchOff" v-model="flag" active-text="限购" :width="80"  inactive-text="不限购"></el-switch>
            </el-form-item>
            <!--       赠送优惠       -->
        </el-form>
        <!-- 限购类型 -->
        <el-form class="">
          <el-form-item label="限购类型" prop="activestate" class="purchasing" v-if="flag">
              <el-tabs v-model="activeName" @tab-click="handleClick" class="number-up">
                <el-tab-pane label="永久限购" name="second">
                  <el-form-item label="" style="padding-left: 70px;">
                      <el-input v-model="input" placeholder="请输入限购次数" style="width: 44%;"></el-input>
                  </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="周期限购" name="third" class="diosopt"  style="padding-left: 79px;">
                    <el-form-item label="">
                        <el-select v-model="options" placeholder="请选择" style="width: 185%;">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" class="item_lable">
                      <el-input v-model="input" placeholder="请输入限制次数" class="xzcs"></el-input>
                    </el-form-item>
                </el-tab-pane>
              </el-tabs>
            </el-form-item>
        </el-form>
        <el-form>
           <el-form-item label="赠送优惠：" prop="activestate">
            <el-switch @change="SwitchOff" v-model="flag" active-text="限购" :width="80"  inactive-text="不限购"></el-switch>
          </el-form-item>

          <el-form-item label="限购类型" prop="activestate" class="purchasing" v-if="flag">
              <el-tabs v-model="activeName" @tab-click="handleClick" class="number-up">
                <el-tab-pane label="永久限购" name="second"> 
                  <el-form-item label="" style="padding-left: 70px;">
                      <el-input v-model="input" placeholder="请输入限购次数" style="width: 18%;"></el-input>
                  </el-form-item>
                </el-tab-pane>
                <el-tab-pane label="周期限购" name="third" class="diosopt"  style="padding-left: 79px;">
                    <el-form-item label="">
                        <el-select v-model="options" placeholder="请选择" class="xzcs">
                          <el-option label="区域一" value="shanghai"></el-option>
                          <el-option label="区域二" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label=""  class="item_lable" style="margin-left:414px;">
                      <el-input v-model="input" placeholder="请输入限制次数" class="xzcs"></el-input>
                    </el-form-item>
                </el-tab-pane>
                <el-from-item class="diosopt diosopt_top" >
                    <el-form-item label="赠送类型：" class="swiert">
                      <el-select v-model="options" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="赠送商品：" class="swiert">
                      <el-select v-model="options" placeholder="活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="商品数量：" class="swiert">
                      <el-input v-model="options" placeholder="审批人" style="width: 61.5%;"></el-input>
                    </el-form-item>
                  </el-from-item>
                </el-tabs>
            </el-form-item>
        </el-form>
        <!-- 商品介绍 -->
        <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="活动形式：" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc" :rows="4" class="rule"></el-input>
            </el-form-item>
        </el-form>
        <div style="height: 100px;">
          <el-row class="row-el">
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-row>
        </div>
    </el-card>
  </div>
</template>

<script>
// import {UnploadPictures} from '@/api/http.js';
export default {
  name: "reduced",
  data() {
    return {
      flag: false,
      options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
      ruleForm: {
          couponName: "", 
        },
        // 校验
        rules:{
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        },
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false
    };
  },
  created() {},
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log("============================>")
    },  
    handleDownload(file) {
      console.log(file);
    },
    SwitchOff(callback) {
        console.log(callback);
    }
  },
};
</script>

<style lang="scss" scoped>
.lab-Wid {width: 181%;}
.lab-Wids {width: 185%;}
.labw-input {width: 194%;}
.labw-input1 {width: 464%;}
// 上传图片
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {border-color: #409EFF;}
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
.getup-btn {
  position: absolute;
  top: 2px;
  left: 0px;
}
.xzcs{width: 181%; }
.swiert{width: 26%;}
.diosopt {display: flex;}
.diosopt_top{ margin-top: 30px;}
.item_lable {margin-left: 414px;}
.rule {height: 110px !important;width: 50%; }
.row-el {float: right; margin-top: 32px;margin-right: 100px; }
//开关样式
  ::v-deep {
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