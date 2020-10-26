<template>
  <div class="home">
    <el-container>
      <!-- 左侧侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'" style="cursor: pointer">
        <div class="img_login">
          <img v-show="!isCollapse" src="../../assets/image/logo.png" alt />
        </div>
        <div class="home-menu">
          <el-menu
            default-active="1-4-1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
            background-color="#333"
            text-color="#fff"
            active-text-color="#333"
            :router="true"
            menu-trigger="hove"
            :unique-opened="true"
          >
            <el-submenu :index="item.id + ''" v-for="(item, index) in menuList" :key="index">
              <template slot="title">
                <i class="el-icon-s-order"></i>
                <span index="">{{ item.title }}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item :index="v.href" v-for="(v, i) in item.childs" :key="i">
                <template slot="title">
                  <span>{{ v.title }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <!-- 全屏显示 -->
          <div class="toggle-button">
            <div class="toggle-button" @click="collapseList">
              <i class="el-icon-s-fold ioionpnp" v-show="!isCollapse"></i>
              <i class="el-icon-s-unfold ioionpnp" v-show="isCollapse"></i>
            </div>
          </div>
          <div class="but-right">
            <div class="btn-fullscreen" @click="handleFullScreen">
              <el-tooltip
                effect="dark"
                :content="fullscreen ? `取消全屏` : `全屏`"
                placement="bottom"
              >
                <i class="el-icon-rank"></i>
              </el-tooltip>
            </div>
            <div class="dropdown" style="cursor: pointer">
              <el-dropdown>
                <span class="el-dropdown-link">
                  <span class="headp-portrait"></span>
                  <span class="user-name">yamgming</span>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item>密码修改</el-dropdown-item>
                  <el-dropdown-item>项目地址</el-dropdown-item>
                  <el-dropdown-item divided @click.native="goLogOut">退出登陆</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="tabs-v">
            
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { getMenu } from "@/api/http.js";
export default {
  name: "Home",
  data() {
    return {
      userClass: "el-icon-s-fold",
      menuList: [],
      collapse: false,
      fullscreen: false,
      isCollapse: false,
    };
  },
  created() {
    this.getMenuList();
    // this.getBus();
  },
  methods: {
    getMenuList() {
      getMenu().then((res) => {
        if (res.status && res.status === 200) {
          this.menuList = res.reslut.data.data.childs;
        }
      });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    // 点击收缩
    collapseList() {
      this.isCollapse = !this.isCollapse;
    },
    // 推出登陆
    goLogOut() {
      // //清除token
      localStorage.removeItem("token");
      //返回到登录页
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100vh;
  padding: 0;
  margin: 0;
  width: 100vw;
}
.el-header {
  color: #333;
  text-align: center;
  line-height: 60px;
}
.img_login {
  height: 45px;
  width: 100%;
  padding-top: 15px;
}
.img_login img {
  width: 75%;
  display: block;
  margin: 0 auto;
}

.home-menu {
  margin-top: 29px;
  overflow: hidden;
}

.ioionpnp {
  font-size: 27px;
}
.el-aside {
  background-color: #333;
}
.is-opened {
  width: 254px !important;
}

.toggle-button,
.btn-fullscreen {
  float: left;
}
.btn-fullscreen {
  margin-left: 32px;
}
.but-right {
  width: 15%;
  float: right;
  height: 59px;
}
.user-name {
  float: right;
}
.el-dropdown {
  height: 59px;
  width: 120px;
  line-height: 59px;
}
.dropdown {
  float: right;
  width: 120px;
  height: 59px;
}

.el-header {
  height: 70px;
  border-bottom: 1px solid #ccc;
}

.btn-fullscreen {
  transform: rotate(41deg);
  font-size: 26px;
  color: #dcdfe6;
  font-weight: 300;
}

.el-menu {
  border: none;
}

.headp-portrait {
  width: 30px;
  height: 30px;
  display: block;
  border: 1px solid #333333;
  border-radius: 100%;
  float: left;
  margin-top: 13px;
  cursor: pointe;
}

.el-menu-item.is-active {
     color: #fff !important;
}
.el-main{
  background-color: #F9F9F9 ;
}
</style>