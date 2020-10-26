
<template>
  <div id="login">
    <div class="login">
      <div class="login-title">
        <img src="../../assets/image/erp.png" alt="" />
      </div>
      <div class="login-con">
        <div class="logon-conbox"></div>
        <div class="login-conL">
          <img class="con-logo" src="../../assets/image/logo.png" alt />
          <div class="con-name">龙瑞森后台管理系统</div>
        </div>
        <div class="login-conR">
          <!-- 表单区域 -->
          <div class="form-box">
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px">
              <!-- 用户名 -->
              <el-form-item prop="userName">
                <el-input v-model="loginForm.userName" prefix-icon="el-icon-user-solid"></el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item prop="passWord">
                <el-input type="password" v-model="loginForm.passWord" prefix-icon="el-icon-lock"></el-input>
              </el-form-item>
              <div class="verify_box">
                <div class="input_verify">
                  <el-form-item prop="code">
                    <el-input type="text" placeholder="图形验证码" v-model="loginForm.verifyCode"></el-input>
                  </el-form-item>
                </div>
                <img class="verify" :src="imgUrl" :alt="imgUrl" @click="changeVerify" />
              </div>
              <!-- 按钮区域 -->
              <el-form-item style="width: 100%">
                <el-button type="primary" style="width: 100%" @click="submitButton()" >立即登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { lrsLogin } from "../../api/http";
export default {
  name: "Login",
  data() {
    return {
      // 这是表单数据登录的数据绑定对象
      imgUrl: "",
      loginForm: {
        userName: "yangming",
        passWord: "1234qwer",
        verifyCode: "",
      },
      // 这是表单验证
      loginFormRules: {
        userName: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 6 个字符", trigger: "blur" },
        ],
        passWord: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getVerifyCode();
  },
  methods: {
    // 表单重置按钮
    resetButton() {
      this.$refs.loginFormRef.resetFields();
    },
    // 获取验证码
    getVerifyCode() {
      axios
        .get("/API/images/captcha?data=1603099616023", { responseType: "blob" })
        .then((res) => {
          this.imgUrl = window.URL.createObjectURL(res.data);
        });
    },
    // 点击更换验证码
    changeVerify() {
      this.getVerifyCode();
    },
    //表单提交按钮
    submitButton() {
      this.$refs.loginFormRef.validate((valid) => {
        if (!valid) return;
        lrsLogin(
          this.loginForm.userName,
          this.loginForm.passWord,
          this.loginForm.verifyCode
        ).then(
          (res) => {
            console.log(res)
            if (res.flag !== 1) {
              this.$message.error("登录失败");
            } else {
              localStorage.setItem("token", res.reslut.data.data);
              console.log(this.$route.query.redirect)
              this.$router.push({
                 path:"/index"
              });
            }
          },
          (err) => {
            console.log(err);
          }
        );
      });
    },
  },
};
</script>>

<style>
#login {
  height: 100%;
  background-image: url(../../assets/image/bg.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding-top: 1px;
  margin-top: -1px;
}

.demo_name {
  width: 264px;
  height: 44px;
  margin-bottom: 40px;
  background-color: saddlebrown;
  position: absolute;
  top: 50%;
  left: 300px;
}

.login {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
}

.login-title {
  width: 13.75%;
  height: auto;
  margin: 10% 0 3.5%;
}

.login-title img {
  width: 100%;
  height: auto;
}

.login-con {
  width: 38%;
  height: 40%;
  display: flex;
  flex-direction: row;
  position: relative;
}

.logon-conbox {
  width: 42.7%;
  height: 100%;
  background-color: white;
  opacity: 0.5;
}

.login-conL {
  width: 45%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.con-logo {
  width: 80%;
  height: auto;
  margin: 40% 0 8%;
}

.con-name {
  font-size: 9px;
  color: #013b96;
  font-family: PingFang SC;
  font-weight: bold;
}

.login-conR {
  width: 45%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 3%;
}

.form-box{
  margin-top: 30px;
}
</style>
