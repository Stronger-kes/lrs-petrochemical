<template>
  <div class="menu-management">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="grid-content bg-purple">
          <div class="word_header">
            <!-- 类型输入框 -->
            <div class="header_left">
              菜单名称：
              <el-input
                v-model="menuInput"
                placeholder="请输入菜单名称"
                class="type_input"
              ></el-input>
            </div>
            <!-- 右侧 -->
            <div class="header_right">
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="searchClick"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-refresh-right"
                @click="refreshBtn"
              ></el-button>
              <el-dropdown trigger="click">
                <!-- <span class="el-dropdown-link"> -->
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  class="edit_btn"
                ></el-button>
                <!-- </span> -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    icon="el-icon-circle-plus"
                    @click.native="openAdd"
                    >新增用户</el-dropdown-item
                  >
                  <el-dropdown-item
                    icon="el-icon-delete-solid"
                    @click.native="deleteHandle"
                    >删除用户</el-dropdown-item
                  >
                  <el-dropdown-item icon="el-icon-delete-solid"
                    >导出Excel</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
          <div class="left_main">
            <el-tree
              :data="dataTree"
              :props="props"
              accordion
              show-checkbox
              node-key="id"
              updateKeyChildren=""
              @node-click="handleNodeClick"
              @check-change="handleCheckChange"
            >
              <!-- :default-checked-keys="defaultCheck" -->
            </el-tree>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
        <div class="grid-content bg-purple-light box-card">
          <div class="right_main">
            <div class="right_header">{{ this.menuTitle }}</div>
            <div class="right_content">
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="上级ID" prop="id">
                  <el-input v-model="ruleForm.id" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                  <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                  <el-radio-group v-model="ruleForm.type" @change="changeType">
                    <el-radio :label="'0'">菜单</el-radio>
                    <el-radio :label="'1'">按钮</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item
                  label="图标"
                  prop="icon"
                  v-if="ruleForm.type == '0'"
                >
                  <!-- <el-input v-model="ruleForm.icon"></el-input> -->
                  <e-icon-picker v-model="ruleForm.icon" :options="options" />
                </el-form-item>
                <el-form-item
                  label="URL"
                  prop="href"
                  v-if="ruleForm.type == '0'"
                >
                  <el-input v-model="ruleForm.href"></el-input>
                </el-form-item>
                <el-form-item label="权限" prop="perms">
                  <el-input v-model="ruleForm.perms"></el-input>
                </el-form-item>
                <el-form-item
                  label="排序"
                  prop="sort"
                  v-if="ruleForm.type == '0'"
                >
                  <el-input v-model="ruleForm.sort"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">{{
                    menuTitle
                  }}</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { menuTree, addMenu, updateMenu, deleteMenu } from "@/api/http.js";

export default {
  name: "Menu",
  data() {
    return {
      options: {
        FontAwesome: false,
        ElementUI: true,
        addIconList: [],
        removeIconList: [],
      },
      menuInput: "",
      menuTitle: "新增菜单",
      dataTree: [],
      allMenu: [],
      updateId: "",
      selectMenu: [],
      props: {
        // roleId:"roleId",
        children: "childs",
        label: "title",
      },
      ruleForm: {
        id: "",
        name: "",
        type: "0",
        icon: "",
        href: "",
        perms: "",
        sort: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        type: [
          {
            type: "string",
            required: true,
            message: "请至少选择一个类型",
            trigger: "change",
          },
        ],
      },
    };
  },
  async created() {
    this.getMenuList();
  },
  methods: {
    openAdd() {
      this.menuTitle = "新增菜单";
    },
    deleteHandle() {
      var tempDeleteMenu = "";
      if (this.selectMenu != []) {
        tempDeleteMenu = this.selectMenu.join(",");
      } else {
        tempDeleteMenu = "";
      }
      console.log("删除数据", tempDeleteMenu);
      this.$confirm("确定删除该字典?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //   console.log("要删除的角色", data.roleId);
          //   var id = data.roleId;
          deleteMenu(tempDeleteMenu).then((res) => {
            if (res.reslut.data.code == 200) {
              this.getMenuList();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 单选类型改变
    changeType(data) {
      this.ruleForm.type = data;
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let data = {
            menuId: this.updateId,
            parentId: this.ruleForm.id,
            menuName: this.ruleForm.name,
            url: this.ruleForm.href,
            perms: this.ruleForm.perms,
            icon: this.ruleForm.icon,
            type: this.ruleForm.type,
            orderNum: this.ruleForm.sort,
          };
          console.log("修改菜单", this.menuTitle);
          if (this.menuTitle == "新增菜单") {
            addMenu(data).then((res) => {
              //   console.log(res)
              if (res.reslut.data.code == 200) {
                this.getMenuList();
                this.clearData();
                this.$message({
                  message: "添加菜单成功",
                  type: "success",
                });
              }
            });
          } else {
            updateMenu(data).then((res) => {
              console.log(res);
              if (res.reslut.data.code == 200) {
                this.getMenuList();
                this.clearData();
                this.$message({
                  message: "修改菜单成功",
                  type: "success",
                });
              }
            });
            console.log("修改传参", data);
          }
        } else {
          alert("error submit!!");
          return false;
        }
      });
    },
    // 清空数据
    clearData() {
      this.selectMenu = [];
      this.menuTitle = "新增菜单";
      this.updateId = "";
      this.menuInput = "";
      this.ruleForm.id = "";
      this.ruleForm.name = "";
      this.ruleForm.href = "";
      this.ruleForm.perms = "";
      this.ruleForm.icon = "";
      (this.ruleForm.type = "0"), (this.ruleForm.sort = "");
    },
    // 搜索
    searchClick() {
      var tempMenu = [];
      this.allMenu.forEach((item) => {
        if (item.title.includes(this.menuInput)) {
          tempMenu.push(item);
        }
        this.dataTree = tempMenu;
      });
    },
    refreshBtn() {
      this.clearData();
      this.getMenuList();
    },
    // 获取树形列表
    getMenuList() {
      menuTree().then((res) => {
        if (res.reslut.data.code == 200) {
          console.log("菜单列表", res.reslut.data.data);
          this.dataTree = res.reslut.data.data;
          this.allMenu = res.reslut.data.data;
        }
      });
    },
    // 树形方法_点击节点
    handleNodeClick(data) {
      console.log(data);
      this.menuTitle = "修改菜单";
      this.updateId = data.data.menuId;
      this.ruleForm.id = data.data.parentId;
      this.ruleForm.name = data.data.menuName;
      this.ruleForm.href = data.data.url;
      this.ruleForm.icon = data.data.icon;
      this.ruleForm.type = data.data.type;
      this.ruleForm.sort = data.data.orderNum;
    },
    // 树形方法_复选框
    handleCheckChange(data) {
      console.log("选中", data.id);
      var id = data.id;
      var index = this.selectMenu.findIndex((item) => {
        return item == id;
      });
      // console.log('findIndex',index)
      // console.log('findIndex',id)
      if (index == -1) {
        this.selectMenu.push(id);
      } else {
        this.selectMenu.splice(index, 1);
      }
      // this.selectMenu.splice(',')
      // this.deleteMenuArr = this.selectMenu.splice(',')
      // console.log(11111,this.deleteMenuArr);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-col {
  border-radius: 10px;
}
.grid-content {
  background-color: #fff;
  border-radius: 4px;
}
.word_header {
  padding: 0px 30px;
  height: 60px;
  line-height: 60px;
}
.type_input {
  width: 200px;
}
.header_left {
  float: left;
}
.header_right {
  float: right;
}
.edit_btn {
  margin-left: 10px;
}
.left_main {
  padding: 20px;
}
.right_header {
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.right_content {
  padding: 30px 30px;
}
</style>