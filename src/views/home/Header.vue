<template>
  <div>
    <!-- 全屏显示 -->
    <div class="toggle-button">
      <div class="toggle-button" @click="collapseList">
        <i class="el-icon-s-fold ioionpnp" v-show="!collapse"></i>
        <i class="el-icon-s-unfold ioionpnp" v-show="collapse"></i>
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
            <el-dropdown-item divided @click.native="goLogOut"
              >退出登陆</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "../../bus";
export default {
  name: "Home",
  data(){
    return {
      collapse: false,
      fullscreen: false
    }
  },
  methods: {
    // 点击收缩
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
    // 推出登陆
    goLogOut() {
      localStorage.removeItem("token");
      this.$router.push({ path: "/" });
    },
    collapseList() {
      this.collapse = !this.collapse;
      Bus.$on('collapse', msg => {
          this.collapse = msg;
          Bus.$emit('collapse-content', this.collapse);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
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
.ioionpnp {
  font-size: 23px;
}
.el-menu-item.is-active {
     color: #fff !important;
}
.el-main{
  background-color: #F9F9F9 ;
}

.el-submenu:hover {
  border-right: 3px solid #409eff;
}
</style>