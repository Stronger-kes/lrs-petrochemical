<template>
  <div class="left">
    <el-aside :width="collapse ? '64px' : '200px'" style="cursor: pointer">
      <div class="img_login">
        <img v-show="!collapse" src="../../assets/image/logo.png" alt />
      </div>
      <div class="home-menu">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="collapse"
          background-color="#333"
          text-color="#fff"
          active-text-color="#333"
          :router="true"
          menu-trigger="hove"
          :unique-opened="true"
        >
          <el-submenu :index="item.id + ''" v-for="(item, index) in menuList" :key="index">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <template v-for="(item2 ,key) in item.childs">
                <el-submenu  :index="item2.href + ''" :key="key">
                    <template slot="title">{{ item2.title }}</template>
                <el-menu-item :index="item3.href + ''" v-for="(item3,i) in item2.childs" :key="i">{{item3.title}}</el-menu-item>
                <el-menu-item v-if="!item2.childs" :index="item2.href + ''" :key="key">{{ item2.title }}</el-menu-item>
                </el-submenu>
            </template>
          </el-submenu>
        </el-menu>
      </div>
    </el-aside>
  </div>
</template>

<script>
import { getMenu } from "@/api/http.js";
import Bus from '../../bus';
export default {
  name: "Sidebar",
  props: ["onShow"],
  data() {
    return {
      collapse: false,
      userClass: "el-icon-s-fold",
      menuList: [],
    };
  },
  computed: {
    onRoutes() {
      return console.log(this.$route.path.replace("/", ""));
    },
  },
  created() {
    this.getMenuList();
    Bus.$on('collapse-content', msg => {
             this.collapse = msg;
            Bus.$emit('collapse-content', msg);
            
      });
  },
  methods: {
   async getMenuList() {
        let res = await getMenu().then((res));
        if (res.status && res.status === 200) {
          this.menuList = res.reslut.data.data.childs;
        }
    },
    handleOpen(key, keyPath) {
      this.$router.push({ path: keyPath[1] });
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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
.el-aside,
.left {
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
.el-main {
  background-color: #f9f9f9;
}

.el-submenu:hover {
  border-right: 3px solid #409eff;
}
</style>