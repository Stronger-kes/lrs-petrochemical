<template>
  <div class="wrapper">
    <div class="word_header">
      <!-- 类型输入框 -->
      <div class="header_left">
        <div class="store_header">
          <div class="keyword">
            用户名：
            <el-input
              class="input_store input_width"
              placeholder="用户名"
              v-model="userName"
            >
            </el-input>
          </div>
          <div class="item_box">
            创建时间：
            <el-date-picker
              v-model="createtime"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
          </div>
          <div>
            状态：
            <el-select
              v-model="statusText"
              placeholder="请选择状态"
              @change="changeStatusText"
            >
              <el-option
                v-for="item in optionsStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="store_header">
          <div class="keyword_phone">
            手机：
            <el-input class="input_store" placeholder="手机号" v-model="phone">
            </el-input>
          </div>
          <div class="header_vip_status">
            部门：
            <el-select
              v-model="branch"
              placeholder="请选择部门"
              @change="searchBranchVal"
            >
              <el-option
                v-for="(item, index) in branchListMes"
                :key="index"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div class="header_vip_status">
            性别：
            <el-select
              v-model="sexText"
              placeholder="请选择性别"
              @change="changeSexText"
            >
              <el-option
                v-for="item in optionsSex"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <!-- 右侧 -->
      <div class="header_right">
        <el-button type="primary"
          icon="el-icon-search"
          @click="searchClick"
        ></el-button>
        <el-button type="primary" icon="el-icon-refresh-right" @click="refreshBtn"></el-button>
        <el-dropdown trigger="click">
          <!-- <span class="el-dropdown-link"> -->
          <el-button type="primary" icon="el-icon-edit" class="edit_btn"></el-button>
          <!-- </span> -->
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="openAdd"
              >新增用户</el-dropdown-item
            >
            <el-dropdown-item @click.native="deleteHandle">删除用户</el-dropdown-item>
            <el-dropdown-item>密码重置</el-dropdown-item>
            <el-dropdown-item>导出Excel</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <!-- 新增用户弹框 -->
      <div>
        <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="role">
              <el-select
                v-model="ruleForm.role"
                placeholder="请选择角色"
                @change="roleVal"
              >
                <el-option
                  v-for="(item, index) in roleListMes"
                  :key="index"
                  :label="item.roleName"
                  :value="item.roleId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门" prop="branch">
              <el-select
                v-model="ruleForm.branch"
                placeholder="请选择部门"
                @change="branchVal"
              >
                <el-option
                  v-for="(item, index) in branchListMes"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="ruleForm.status" @change="changeStatus">
                <el-radio :label="1">有效</el-radio>
                <el-radio :label="0">锁定</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="ruleForm.sex" @change="changeSex">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
                <el-radio :label="2">保密</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >立即添加</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
      <!-- 修改用户弹框 -->
      <div>
        <el-dialog title="修改用户" :visible.sync="updataBox">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="用户名" prop="username">
              <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="手机" prop="phone">
              <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="角色" prop="role">
              <el-select
                v-model="ruleForm.role"
                placeholder="请选择角色"
                @change="roleVal"
              >
                <el-option
                  v-for="(item, index) in roleListMes"
                  :key="index"
                  :label="item.roleName"
                  :value="item.roleId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="部门" prop="branch">
              <el-select
                v-model="ruleForm.branch"
                placeholder="请选择部门"
                @change="branchVal"
              >
                <el-option
                  v-for="(item, index) in branchListMes"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="ruleForm.status" @change="changeStatus">
                <el-radio :label="1">有效</el-radio>
                <el-radio :label="0">锁定</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="ruleForm.sex" @change="changeSex">
                <el-radio :label="0">男</el-radio>
                <el-radio :label="1">女</el-radio>
                <el-radio :label="2">保密</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateClick('ruleForm')"
                >立即修改</el-button
              >
              <el-button @click="clearAdd">重置</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
      </div>
      <!-- 查看用户弹框 -->
      <div>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose"
        >
          <span>查看功能暂未开发</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false"
              >确 定</el-button
            >
          </span>
        </el-dialog>
        <!-- <el-dialog title="用户信息" :visible.sync="dialogFormVisible">

        </el-dialog> -->
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
        <el-table-column prop="username" label="用户名"> </el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            {{ scope.row.sex == 0 ? "男" : scope.row.sex == 1 ? "女" : "保密" }}
          </template>
        </el-table-column>
        <el-table-column prop="deptName" label="部门"> </el-table-column>
        <el-table-column prop="mobile" label="手机"> </el-table-column>
        <el-table-column prop="email" label="邮箱" width="200px">
        </el-table-column>
        <!-- <el-table-column prop="status" label="状态"> </el-table-column> -->
        <el-table-column
          prop="status"
          label="状态"
          width="100"
          :filters="[
            { text: '有效', value: 1 },
            { text: '锁定', value: 0 },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.status == 0 ? 'primary' : 'success'"
              disable-transitions
              >{{ scope.row.status == 0 ? "锁定" : "有效" }}</el-tag
            >
          </template>
        </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            sortable
            width="180"
            column-key="date"
          >
          </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="dialogVisible = true">
              <i class="el-icon-view button_green"></i>
            </el-button>
            <el-button type="text" size="small" @click="openUpdata(scope.row)">
              <i class="el-icon-s-tools"></i>
            </el-button>
            <el-button type="text" size="small" @click="openDelete(scope.row)">
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
  </div>
</template>

<script>
import {
  getUser,
  roleList,
  branchList,
  addUser,
  deleteUser,
  updateUser,
} from "@/api/http.js";
export default {
  data() {
    return {
      createtime: ["", ""],
      branch: "",
      sexText: "",
      statusText: "",
      phone: "",
      userName: "",
      pageSize: 10,
      pageNum: 1,
      totalCount: 0,
      tableData: [],
      roleListMes: [],
      branchListMes: [],
      updateId: -1,
      dialogVisible: false,
      dialogFormVisible: false,
      updataBox: false,
      ruleForm: {
        username: "",
        phone: "",
        email: "",
        role: "",
        branch: "",
        status: 1,
        sex: 2,
        desc: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          //   { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        role: [{ required: true, message: "请选择角色", trigger: "change" }],
        status: [{ required: true, message: "请选择状态", trigger: "change" }],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        // desc: [{ required: true, message: "请填写备注", trigger: "blur" }],
      },

      optionsSex: [
        {
          value: 2,
          label: "保密",
        },
        {
          value: 0,
          label: "男",
        },
        {
          value: 1,
          label: "女",
        },
      ],
      optionsStatus: [
        // {
        //   value: "",
        //   label: "全部",
        // },
        {
          value: 0,
          label: "锁定",
        },
        {
          value: 1,
          label: "有效",
        },
      ],
    };
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
      this.$confirm("确定删除选中用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteUser(tempDeleteMenu).then((res) => {
            if (res.reslut.data.code == 200) {
              this.getUserList();
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
    // 查看关闭
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    // 打开修改
    openUpdata(data) {
      console.log("修改对象", data);
      this.ruleForm.username = data.username;
      this.ruleForm.branch =
        data.deptId != null ? String(data.deptId) : data.deptId;
      this.ruleForm.email = data.email;
      this.ruleForm.phone = data.mobile;
      this.ruleForm.sex = parseInt(data.sex);
      this.ruleForm.role = parseInt(data.roleId);
      this.ruleForm.status = parseInt(data.status);
      this.ruleForm.desc = data.description;
      this.updataBox = true;
      this.updateId = data.id;
    },
    // 提交修改
    updateClick() {
      let data = {
        userId: this.updateId,
        username: this.ruleForm.username,
        deptId: this.ruleForm.branch,
        email: this.ruleForm.email,
        mobile: this.ruleForm.phone,
        sex: this.ruleForm.sex,
        roleId: this.ruleForm.role,
        status: this.ruleForm.status,
        description: this.ruleForm.desc,
      };
      updateUser(data).then((res) => {
        console.log("修改用户接口", res);
        if (res.reslut.data.code == 200) {
          this.clearAdd();
          this.updataBox = false;
          this.getUserList();
          this.$message({
            message: "修改用户成功",
            type: "success",
          });
        }
      });
    },
    // 打开删除弹框
    openDelete(data) {
      this.$confirm("确定删除该用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // console.log("要删除的用户", data.id);
          var id = data.id;
          deleteUser(id).then((res) => {
            console.log("删除用户接口", res);
          });
          this.getUserList();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 修改增加状态
    changeStatus(val) {
      console.log("修改增加状态", val);
      this.ruleForm.status = val;
    },
    // 修改增加性别
    changeSex(val) {
      console.log("修改增加性别", val);
      this.ruleForm.sex = val;
    },
    // 搜索状态选择
    changeStatusText(val) {
      console.log("搜索状态值", val);
      this.statusText = val;
    },
    changeSexText(val) {
      console.log("搜索性别值", val);
    },
    // 搜索部门选择
    searchBranchVal(val) {
      console.log("搜索部门值", val);
      this.branch = val;
    },
    roleVal(val) {
      console.log("角色值", val);
      this.ruleForm.role = val;
    },
    branchVal(val) {
      console.log("部门值", val);
      this.ruleForm.branch = val;
    },
    // 清空新增
    clearAdd() {
      this.ruleForm.username = "";
      this.ruleForm.branch = "";
      this.ruleForm.email = "";
      this.ruleForm.phone = "";
      this.ruleForm.sex = 2;
      this.ruleForm.role = "";
      this.ruleForm.status = 1;
      this.ruleForm.desc = "";
    },
    // 新增用户
    newAddUser() {
      let data = {
        username: this.ruleForm.username,
        deptId: this.ruleForm.branch,
        email: this.ruleForm.email,
        mobile: this.ruleForm.phone,
        sex: this.ruleForm.sex,
        roleId: this.ruleForm.role,
        status: this.ruleForm.status,
        description: this.ruleForm.desc,
      };
      console.log("新增接口传参", data);
      addUser(data).then((res) => {
        if (res.reslut.data.code == 200) {
          console.log("新增用户", res);
          this.dialogFormVisible = false;
          this.clearAdd();
          this.getUserList();
        } else {
          this.$message({
            message: res.reslut.data.message,
            type: "warning",
          });
        }
      });
    },
    // 获取部门列表
    getBranchList() {
      branchList().then((res) => {
        console.log("部门列表", res.reslut.data);
        if (res.status == 200) {
          // console.log('11111部门列表',res)
          this.branchListMes = res.reslut.data;
        }
      });
    },
    // 获取角色列表
    getRoleList() {
      roleList().then((res) => {
        console.log("角色列表", res.reslut.data.data);
        if (res.status == 200) {
          this.roleListMes = res.reslut.data.data.rows;
        }
      });
    },
    // 提交添加表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          //   alert("submit!");
          this.newAddUser();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 重置添加表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 打开添加用户
    openAdd() {
      this.dialogFormVisible = true;
    },
    // 添加用户
    AddClick() {},
    // 标签筛选
    filterTag(value, row) {
      console.log(row.status);
      return row.status == value;
    },
    // 创建时间排序
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    // 清空搜索项
    clearSearch() {
      this.userName = "";
      this.createtime[0] = "";
      this.createtime[1] = "";
      this.statusText = "";
      this.phone = "";
      this.branch = "";
      this.sexText = "";
    },
    // 获取用户列表
    getUserList() {
      let data = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        username: this.userName,
        createTimeFrom: this.createtime[0],
        createTimeTo: this.createtime[1],
        status: this.statusText,
        mobile: this.phone,
        deptId: this.branch,
        sex: this.sexText,
      };
      getUser(data).then((res) => {
        //   console.log("用户列表数据", res);
        if (res.status == 200) {
          console.log("用户列表数据", res);
          // console.log(res.data.data)
          this.tableData = res.reslut.data.data.rows;
          this.totalCount = res.reslut.data.data.total;
        }
      });
    },
    searchClick() {
      this.getUserList();
      // 将时间转换为时间戳
      // var itemTime1 = new Date(this.createtime[0]).getTime();
      // var itemTime2 = new Date(this.createtime[1]).getTime();
      // console.log('创建时间star',itemTime1)
      // console.log('创建时间end',itemTime2)
    },
    refreshBtn() {
      this.clearSearch();
      this.getUserList();
    },
    // 分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      //   this.$emit("getPageNum", val);
      this.getUserList();
    },
    // 表格全选
    handleSelectionChange(val) {
      // this.multipleSelection = val;
      var tempSelect = []
      val.forEach((item) => {
        tempSelect.push(item.id)
      });
      console.log('选中的门店id',tempSelect)
      this.multipleSelection = tempSelect;
    },
  },
  created() {
    this.getUserList();
    this.getRoleList();
    this.getBranchList();
  },
};
</script>

<style scoped>
.word_header {
  padding: 0px 30px;
  height: 120px;
}
.header_left {
  float: left;
  height: 120px;
}
.header_right {
  float: right;
}
.input_width {
  width: 200px;
  margin-right: 20px;
}
.keyword_phone {
  /* text-indent: 1em; */
  padding-left: 1em;
}
.edit_btn {
  margin-left: 10px;
}
.table_box {
  margin-top: 20px;
}
.input_store {
  width: 200px;
}
.store_header {
  display: flex;
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;
}
.search_button {
  margin-top: 20px;
}
.item_box {
  width: 460px;
  display: flex;
}
.item_box div {
  line-height: 40px;
}
.header_vip_status {
  margin-left: 20px;
}
.button_green {
  color: #52c41a;
}
.add_box {
  width: 100%;
}
.width_input {
  width: 90%;
}
.button_del {
  color: red;
}
</style>