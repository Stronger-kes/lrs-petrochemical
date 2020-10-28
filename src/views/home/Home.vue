<template>
  <div class="home">
    <el-container>
      <Sidebar :onShow="isCollapse"></Sidebar>
      <el-container>
        <el-header>
          <Header></Header>
          <!-- <Tages></Tages> -->
        </el-header>
        <div class="box-card">
          sdadad
        </div>
        <el-main>
          <div class="content">
                <transition name="move" mode="out-in">
                    <keep-alive>
                        <router-view></router-view>
                    </keep-alive>
                </transition>
                <el-backtop target=".content"></el-backtop>
            </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
// import Tages from "@/components/common/Tages";
import Sidebar from "../home/Sidebar";
import Header from "../home/Header"
// import Bus from '../../bus';
export default {
  name: "Home",
  components: {Sidebar,Header},
  data() {
    return {
      collapse: false,
      isCollapse: false,
      fullscreen: false,
      getList: []
    };
  },
  created() {},
  methods: {},
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
.el-header {
  height: 50px !important;
  border-bottom: 1px solid #ccc;
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
  padding: 15px;
}

.el-submenu:hover {
  border-right: 3px solid #409eff;
}
</style>