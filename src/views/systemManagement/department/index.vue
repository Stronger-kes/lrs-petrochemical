<template>
  <el-card class="box-card">
    <div class="store_container">
      <div class="store_header">
        <div class="item_box">
          创建时间：
          <el-date-picker
            v-model="datatime"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </div>
        <div>
          门店状态：
          <el-select v-model="status" placeholder="请选择门店状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="keyword">
          关键字查询：
          <el-input
            class="input_store"
            placeholder="门店名称"
            v-model="keyWord"
          >
          </el-input>
        </div>
      </div>
      <!-- 按钮 -->
      <div class="search_button">
        <el-button type="primary" @click="toAddStore">添加门店</el-button>
        <el-button type="primary" @click="searchClick">查询</el-button>
        <el-button type="primary" @click="cleanBoth">重置</el-button>
      </div>
      <!-- 表格 -->
      <div class="table_box">
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="id" label="门店编号" width="80">
          </el-table-column>
          <el-table-column prop="name" label="门店名称" width="180">
          </el-table-column>
          <el-table-column prop="createtime" label="创建时间" width="220">
          </el-table-column>
          <el-table-column prop="phone" label="电话" width="180">
          </el-table-column>
          <el-table-column prop="cityid" label="城市"> </el-table-column>
          <el-table-column prop="address" label="详细地址" width="240">
          </el-table-column>
          <el-table-column prop="principal" label="负责人"> </el-table-column>
          <el-table-column fixed="right" label="状态" width="100">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.state"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="switchHandle"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                    type="text"
                    size="small"
                    @click="toEditStore(scope.row)"
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
        <Page :countTotal="total" @PageSize="getPageSize" @PageNum="getPageNum" />
      </div>
    </div>
  </el-card>
</template>

<script>
import Page from '../../../components/common/Page'
import { storeList, deleteStore } from "@/api/http.js";

export default {
  components: {
    Page
  },
  data() {
    return {
      keyWord: "",
      time: "",
      status: "",
      datatime: "",
      pageNum: 1,
      pageSize: 10,
      total: 0,
      options: [
        // {
        //   value: "",
        //   label: "请选择门店状态",
        // },
        {
          value: "0",
          label: "禁用",
        },
        {
          value: "1",
          label: "有效",
        },
      ],
      tableData: [],
      allList: [],
    };
  },
  methods: {
    // 开关方法
    switchHandle(data){
        console.log('改变过后的状态',data)
    },
    // 删除方法   打开删除弹框
    openDelete(data) {
      this.$confirm("确定删除该字典?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var id = data.id;
        //   console.log("要删除的角色", id);
          deleteStore(id).then((res) => {
            if (res.reslut.data.code == 200) {
              this.getStoreList();
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
    getPageSize(data){
        console.log('页大小',data)
        this.pageSize = data
        this.getStoreList()
    },
    getPageNum(data){
        console.log('页码',data)
        this.pageNum = data
        this.getStoreList()
    },
    // 获取门店列表
    getStoreList() {
      let data = {
          pageNum:this.pageNum,
          pageSize:this.pageSize
      };
      storeList(data).then((res) => {
        //   console.log(123123123, res.reslut.data.code);
        if (res.reslut.data.code == 200) {
          this.tableData = res.reslut.data.data.rows;
          this.allList = res.reslut.data.data.rows;
          this.total = res.reslut.data.data.total;
        }
      });
    },
    // 开关
    switchClick(data) {
      console.log(data.state);
    },
    // 去添加门店页面
    toAddStore() {
      this.$router.push("/system/addstore");
    },
    //去编辑页面
    toEditStore(data) {
      console.log(data);
      this.$router.push({
        // path: "/system/editstore",
        name: 'EditStore',
        params: {
          data: data,
        },
      });
    },
    // 搜索
    searchClick() {
      var tempList = [];
      // 时间筛选
      if (this.datatime != "") {
        var timeMin = this.datatime[0].getTime();
        var timeMax = this.datatime[1].getTime();
        console.log("最小时间", timeMin);
        console.log("最大时间", timeMax);
        this.allList.forEach((item) => {
          var itemTime = new Date(item.createtime).getTime();
          console.log("单个时间", itemTime);
          if (itemTime > timeMin && itemTime < timeMax) {
            tempList.push(item);
          }
        });
        console.log("时间筛选", tempList);
        this.tableData = tempList;
      }
      // 门店名称关键词搜索
      if (this.keyWord != "") {
        this.allList.forEach((item) => {
          // ||item.phone.includes(this.keyWord)||item.id.includes(this.keyWord)
          if (item.name.includes(this.keyWord)) {
            tempList.push(item);
          }
        });
        this.tableData = tempList;
      }

      // if(this.datatime != '' || this.keyWord != '' || this.status != ''){
      //   // if()
      // }
    },
    cleanBoth() {
      this.datatime = "";
      this.keyWord = "";
    },
  },
  created() {
      this.getStoreList()
  },
};
</script>

<style scoped>
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
}
.search_button {
  margin-top: 20px;
}
.item_box {
  width: 460px;
  display: flex;
}
.item_box div {
  /* width: 500px; */
  line-height: 40px;
}
.keyword {
  margin-left: 20px;
}
.button_del {
  color: red;
}
</style>