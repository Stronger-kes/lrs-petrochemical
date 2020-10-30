<template>
  <div class="role">
    <!-- <el-card class="box-card"> -->
    <el-row :gutter="10">
      <el-col :xs="24" :sm="14" :md="14" :lg="14" :xl="14">
        <el-card class="grid-content bg-purple box-card">
          <div class="word_header">
            <!-- 类型输入框 -->
            <div class="header_left">
              角色名称：
              <el-input
                v-model="roleInput"
                placeholder="请输入角色名称"
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
                  <el-dropdown-item icon="el-icon-delete-solid"
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
          <!-- 表格 -->
          <div class="table_wrapper">
            <el-table
              stripe
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection"> </el-table-column>
              <el-table-column label="角色名称" width="120px">
                <template slot-scope="scope">{{ scope.row.roleName }}</template>
              </el-table-column>
              <el-table-column
                prop="remark"
                label="角色描述"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间" width="200px">
              </el-table-column>
              <el-table-column fixed="right" label="操作" width="80px">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click="updateHandle(scope.row)"
                  >
                    <i class="el-icon-s-tools"></i>
                  </el-button>
                  <el-button
                    type="text"
                    size="small"
                    @click="openDelete(scope.row)"
                  >
                    <i class="el-icon-delete button_del"></i>
                  </el-button>
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
      </el-col>
      <el-col :xs="24" :sm="10" :md="10" :lg="10" :xl="10">
        <el-card class="grid-content bg-purple-light box-card">
          <div class="right_header">{{ this.roleTitle }}</div>
          <!-- 右侧表单 -->
          <div class="right_main">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="角色名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
              </el-form-item>
              <el-form-item label="角色描述" prop="desc">
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
              </el-form-item>
              <el-form-item label="角色权限" prop="type">
                <el-tree
                  :data="dataTree"
                  :props="props"
                  accordion
                  show-checkbox
                  node-key="id"
                  updateKeyChildren=""
                  @check-change="handleCheckChange"
                >
                  <!-- :default-checked-keys="defaultCheck" -->
                </el-tree>
              </el-form-item>
              <el-form-item>
                <el-button
                  type="primary"
                  @click="
                    roleTitle == '新增角色'
                      ? submitForm('ruleForm')
                      : submitUpdate('ruleForm')
                  "
                  >{{ roleTitle }}</el-button
                >
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
              </el-form-item>
            </el-form>
          </div>
        </el-card></el-col
      >
    </el-row>
    <!-- </el-card> -->
  </div>
</template>

<script>
import {
  getRoleList,
  menuTree,
  addRole,
  deleteRole,
  updateRole,
} from "@/api/http.js";

export default {
  name: "Role",
  data() {
    return {
      roleInput: "",
      totalCount: 0,
      tableData: [],
      allList: [],
      multipleSelection: [],
      pageNum: 1,
      pageSize: 10,
      dataTree: [],
      rolePower: [],
      roleString: "",
      defaultCheck: [],
      updateId: -1,
      props: {
        // roleId:"roleId",
        children: "childs",
        label: "title",
      },
      roleTitle: "新增角色",
      ruleForm: {
        name: "",
        desc: "",
        type: [],
      },
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  async created() {
    this.getRole();
    this.getMenuList();
  },
  methods: {
    // 全选删除操作
    deleteHandle() {
      console.log(this.multipleSelection);
      var tempDeleteMenu = "";
      if (this.multipleSelection != []) {
        tempDeleteMenu = this.multipleSelection.join(",");
      } else {
        tempDeleteMenu = "";
      }
      console.log("删除数据", tempDeleteMenu);
      this.$confirm("确定删除选中角色?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteRole(tempDeleteMenu).then((res) => {
            if (res.reslut.data.code == 200) {
              this.getRole();
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
    // 提交修改
    submitUpdate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   alert("submit!");
          var sendRole = "";
          if (this.rolePower != []) {
            sendRole = this.rolePower.join(",");
          } else {
            sendRole = "";
          }
          console.log('发送的权限',sendRole)
          let data = {
            roleId: this.updateId,
            roleName: this.ruleForm.name,
            remark: this.ruleForm.desc,
            menuIds: sendRole
          };
          updateRole(data).then((res) => {
            console.log("修改", res);
            if(res.reslut.data.code){
              this.clearForm()
              this.getRole()
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //表格修改按钮
    updateHandle(data) {
      console.log(data);
      // window.location.reload()

      if (data.menuIds) {
        var tempArr = data.menuIds.split(",");
        this.defaultCheck = tempArr;
        this.rolePower = tempArr;
        // this.defaultCheck = Object.assign([], this.defaultCheck, tempArr);
      }
      this.updateId = data.roleId;
      this.roleTitle = "修改用户";
      this.ruleForm.name = data.roleName;
      this.ruleForm.desc = data.remark;
    },
    // 删除方法   打开删除弹框
    openDelete(data) {
      this.$confirm("确定删除该字典?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("要删除的角色", data.roleId);
          var id = data.roleId;
          deleteRole(id).then((res) => {
            if (res.reslut.data.code == 200) {
              this.getRole();
              this.$message({
                type: "success",
                message: "删除成功!",
              });
            }
            // console.log(res);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 清空添加修改输入框
    clearForm() {
      (this.ruleForm.name = ""),
        (this.ruleForm.desc = ""),
        (this.rolePower = []);
      this.defaultCheck = [];
      this.roleInput = "";
    },
    // 添加角色
    addRoleHandle() {
      // console.log(this.rolePower.join(','))
      var sendRole = "";
      if (this.rolePower != []) {
        sendRole = this.rolePower.join(",");
      } else {
        sendRole = "";
      }
      let data = {
        roleName: this.ruleForm.name,
        remark: this.ruleForm.desc,
        menuIds: sendRole,
        // createTime:"",
        // modifyTime:""
      };
      addRole(data).then((res) => {
        console.log("添加接口", res);
        if (res.reslut.data.code == 200) {
          this.clearForm();
          this.getRole();
          this.$message({
            message: "添加成功",
            type: "success",
          });
        } else {
          this.$message.error("添加失败");
        }
      });
    },
    // 获取树形列表
    getMenuList() {
      menuTree().then((res) => {
        if (res.reslut.data.code == 200) {
          console.log("菜单列表", res.reslut.data.data);
          this.dataTree = res.reslut.data.data;
        }
      });
    },
    // 树形方法_点击节点
    handleNodeClick(data) {
      console.log(data);
    },
    // 树形方法_复选框
    handleCheckChange(data) {
      // console.log("选中", data.id);
      var id = data.id;
      var index = this.rolePower.findIndex((item) => {
        return item == id;
      });
      // console.log('findIndex',index)
      // console.log('findIndex',id)
      if (index == -1) {
        this.rolePower.push(id);
      } else {
        this.rolePower.splice(index, 1);
      }
      // this.rolePower.splice(',')
      console.log(this.rolePower);
    },
    openAdd() {
      (this.roleTitle = "新增角色"), this.clearForm();
    },
    // 搜索按钮
    searchClick() {
      var tempList = [];
      this.allList.forEach((item) => {
        if (item.roleName.includes(this.roleInput)) {
          tempList.push(item);
        }
      });
      this.tableData = tempList;
    },
    // 刷新按钮
    refreshBtn() {
      this.clearForm();
      console.log(this.defaultCheck);
      this.getRole();
    },
    // 获取角色列表
    getRole() {
      let data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      };
      getRoleList(data).then((res) => {
        console.log("角色列表", res.reslut.data.data);
        if (res.reslut.data.code == 200) {
          this.tableData = res.reslut.data.data.rows;
          this.allList = res.reslut.data.data.rows;
          this.totalCount = res.reslut.data.data.total;
        }
      });
    },
    // 分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getRole();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      //   this.$emit("getPageNum", val);
      this.getRole();
    },
    // 表格全选
    handleSelectionChange(val) {
      // this.multipleSelection = val;
      console.log('选中的门店id',val)
      var tempSelect = []
      val.forEach((item) => {
        tempSelect.push(item.roleId)
      });
      console.log('选中的门店id',tempSelect)
      this.multipleSelection = tempSelect;
    },
    // 表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   alert("submit!");
          this.addRoleHandle();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
  // height: 600px;
  border-radius: 4px;
  // overflow-y: scroll;
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
.button_del {
  color: red;
}
.right_header {
  // width: 100%;
  // height: 45px;
  // line-height: 45px;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.right_main {
  margin-top: 20px;
}
.block {
  margin-top: 10px;
}
</style>