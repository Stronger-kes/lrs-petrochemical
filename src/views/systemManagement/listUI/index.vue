<template>
  <div class="wrapper">
    <div class="word_header">
      <!-- 类型输入框 -->
      <div class="header_left">
        类型：
        <el-input
          v-model="typeInput"
          placeholder="请输入类型"
          class="type_input"
        ></el-input>
      </div>
      <!-- 右侧 -->
      <div class="header_right">
        <el-button
          type="primary"
          icon="el-icon-search"
          @click="typeClick"
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
            <el-dropdown-item icon="el-icon-circle-plus" @click.native="openAdd"
              >新增用户</el-dropdown-item
            >
            <el-dropdown-item
              icon="el-icon-delete-solid"
              @click.native="deleteHandle"
              >删除用户</el-dropdown-item
            >
          </el-dropdown-menu>
        </el-dropdown>
        <!-- 新增用户弹框 -->
        <el-dialog title="新增字典" :visible.sync="dialogFormVisible">
          <div class="add_box">
            键值：
            <el-input
              class="width_input"
              v-model="keyText"
              placeholder="请输入类型"
            ></el-input>
          </div>
          <div class="add_box">
            标签：
            <el-input
              class="width_input"
              v-model="labelText"
              placeholder="请输入类型"
            ></el-input>
          </div>
          <div class="add_box">
            类型：
            <el-input
              class="width_input"
              v-model="typeText"
              placeholder="请输入类型"
            ></el-input>
          </div>
          <div class="add_box">
            排序：
            <el-input
              class="width_input"
              v-model="sortText"
              placeholder="请输入类型"
            ></el-input>
          </div>
          <div class="add_box">
            描述：
            <el-input
              type="textarea"
              class="width_input"
              v-model="descText"
            ></el-input>
          </div>

          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="AddClick" :plain="true"
              >提交</el-button
            >
          </div>
        </el-dialog>
        <!-- 修改字典 -->
        <el-dialog title="修改字典" :visible.sync="updataBox">
          <div class="add_box">
            键值：
            <el-input
              class="width_input"
              v-model="keyText"
              placeholder="请输入类型"
            ></el-input>
          </div>
          <div class="add_box">
            标签：
            <el-input
              class="width_input"
              v-model="labelText"
              placeholder="请输入类型"
            ></el-input>
          </div>
          <div class="add_box">
            类型：
            <el-input
              class="width_input"
              v-model="typeText"
              placeholder="请输入类型"
            ></el-input>
          </div>
          <div class="add_box">
            排序：
            <el-input
              class="width_input"
              v-model="sortText"
              placeholder="请输入类型"
            ></el-input>
          </div>
          <div class="add_box">
            描述：
            <el-input
              type="textarea"
              class="width_input"
              v-model="descText"
            ></el-input>
          </div>

          <div slot="footer" class="dialog-footer">
            <el-button @click="updataBox = false">取 消</el-button>
            <el-button type="primary" @click="updateClick" :plain="true"
              >提交</el-button
            >
          </div>
        </el-dialog>
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
        <el-table-column label="类型">
          <template slot-scope="scope">{{ scope.row.type }}</template>
        </el-table-column>
        <el-table-column prop="label" label="标签"> </el-table-column>
        <el-table-column prop="description" label="描述" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="value" label="数值"> </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
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
import { getWordList, addWord, deleteWord, updateWord } from "@/api/http.js";
export default {
  components: {
    // Page,
  },
  data() {
    return {
      typeInput: "",
      keyText: "",
      labelText: "",
      typeText: "",
      sortText: "",
      descText: "",
      updateId: -1,
      totalCount: 0,
      tableData: [],
      multipleSelection: [],
      pageNum: 1,
      pageSize: 10,
      updataBox: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
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
      this.$confirm("确定删除选中字典?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteWord(tempDeleteMenu).then((res) => {
            if (res.reslut.data.code == 200) {
              this.getList();
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
    // 打开删除弹框
    openDelete(data) {
      this.$confirm("确定删除该字典?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          console.log("要删除的字典", data.id);
          var id = data.id;
          deleteWord(id).then((res) => {
            console.log(res);
          });
          this.getList();
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
    // 清空表单
    cleanForm() {
      this.keyText = "";
      this.labelText = "";
      this.typeText = "";
      this.sortText = "";
      this.descText = "";
    },
    // 打开修改
    openUpdata(data) {
      // console.log('修改对象',data)
      this.updateId = data.id;
      this.keyText = data.value;
      this.labelText = data.label;
      this.typeText = data.type;
      this.sortText = data.sort;
      this.descText = data.description;
      this.updataBox = true;
    },
    // 提交修改
    updateClick() {
      let data = {
        id: this.updateId,
        value: this.keyText,
        label: this.labelText,
        type: this.typeText,
        mobile: "",
        description: this.descText,
        sort: this.sortText,
      };
      updateWord(data).then((res) => {
        console.log("修改字典接口", res);
        if (res.reslut.data.code == 200) {
          this.cleanForm();
          this.updataBox = false;
          this.getList();
          this.$message({
            message: "修改字典成功",
            type: "success",
          });
        }
      });
    },
    openAdd() {
      console.log(123123);
      this.dialogFormVisible = true;
    },
    // 添加字典方法
    AddClick() {
      let data = {
        value: this.keyText,
        label: this.labelText,
        type: this.typeText,
        mobile: "",
        description: this.descText,
        sort: this.sortText,
      };
      addWord(data).then((res) => {
        console.log("添加字典接口", res);
        if (res.reslut.data.code == 200) {
          this.cleanForm();
          this.dialogFormVisible = false;
          this.getList();
          this.$message({
            message: "添加字典成功",
            type: "success",
          });
        }
      });
    },
    // 搜索按钮
    typeClick() {
      this.getList();
    },
    // 刷新按钮
    refreshBtn() {
      this.typeInput = "";
      this.getList();
    },
    // 分页方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      //   this.$emit("getPageNum", val);
      this.getList();
    },
    // 表格全选
    handleSelectionChange(val) {
      // console.log('选中表格元素',val)
      var tempSelect = []
      val.forEach((item) => {
        tempSelect.push(item.id)
      });
      // console.log('选中的门店id',tempSelect)
      this.multipleSelection = tempSelect;
    },
    // 获取字典列表
    getList() {
      let data = {
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        type: this.typeInput,
      };
      getWordList(data).then((res) => {
        this.totalCount = res.reslut.data.data.total;
        this.tableData = res.reslut.data.data.rows;
      });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style scoped>
.wrapper {
  background-color: #fff;
  /* height: 100%; */
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
.block {
  margin: 20px 0;
  height: 50px;
}
.edit_btn {
  margin-left: 10px;
}
.add_box {
  width: 100%;
  /* height: 200px; */
  /* background-color: orange; */
}
.width_input {
  width: 90%;
}
.button_del {
  color: red;
}
</style>