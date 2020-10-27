<template>
  <div class="discount">
    <el-card class="box-card">
        <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="门店名称：" prop="name">
                <el-input v-model="ruleForm.name" class="labw-input1"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="商品类型：" class="fome">
                <el-select v-model="ruleForm.name" placeholder="请选择活动区域" class="lab-Wid">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品分类：" label-width="490px" class="fome">
                <el-select v-model="ruleForm.name" placeholder="请选择活动区域" class="lab-Wid">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <br>
             <el-form-item label="商品名称：" prop="name">
                <el-input v-model="ruleForm.name" class="labw-input"></el-input>
            </el-form-item>
             <el-form-item label="商品单位：" label-width="507px" prop="name">
                <el-input v-model="ruleForm.name" class="labw-input"></el-input>
            </el-form-item>
            <br>
             <el-form-item label="商品排序：" prop="name">
                <el-input v-model="ruleForm.name" class="labw-input"></el-input>
            </el-form-item>
             <el-form-item label="商品品牌：" label-width="507px" prop="name">
                <el-input v-model="ruleForm.name" class="labw-input"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="上传图片">
                <el-button type="primary">商品图片上传</el-button>
                <div class="up-img">
                    <p class="up-img_title">预览图</p>
                    <div class="up-box">
                        <el-upload
                            class="avatar-uploader"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        </el-upload>
                    </div>
                </div>
            </el-form-item>
        </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "reduced",
  data() {
    return {
      ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        // 校验
        rules:[
            
        ],
        imageUrl: ''
    };
  },
  async created() {},
  mounted: {
       handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
    }
  },
};
</script>

<style lang="scss" scoped>
.lab-Wid {
    width: 230%;
}
.labw-input {
    width: 247%;
}
.labw-input1 {
    width: 597%;
}
// 上传图片
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
.up-img {
    width: 800px;
    height: 300%;
    margin-top: 25px;
    border-left: 8px solid #F6F6F6;
    border-bottom: 1px solid #F6F6F6;
    border-top: 1px solid #F6F6F6;
    border-right: 1px solid #F6F6F6;
    border-radius: 4px;
    padding-left: 20px;
    p {
        font-size: 17px;
        color: #000;
    }
    .up-box {
        height: 300%;
    }
}
</style>