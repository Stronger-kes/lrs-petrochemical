<template>
  <el-card class="box-card">
    <!-- 头部 -->
    <div class="discount_header">
      <el-page-header @back="goBack" content="编辑门店："></el-page-header>
    </div>
    <div class="store_wrapper">
      <div class="line_box">
        <div class="line_title">店铺等级</div>
        <div class="input_box">
          <el-select
            v-model="select"
            placeholder="请选择创建店铺等级"
            @change="OnSelectGrade"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <!-- 门店名称 -->
      <div class="line_box">
        <div class="line_title">门店名称</div>
        <div class="input_box">
          <el-input v-model="shopname" placeholder="请输入门店名称"></el-input>
        </div>
      </div>
      <!-- 门店电话 -->
      <div class="line_box">
        <div class="line_title">门店电话</div>
        <div class="input_box">
          <el-input v-model="shopphone" placeholder="请输入门店电话"></el-input>
        </div>
      </div>
      <!-- 所在省份 -->
      <div class="line_box">
        <div class="line_title">所在省份</div>
        <div class="input_box">
          <v-distpicker
            province="省"
            city="市"
            area="区"
            @selected="onSelected"
          ></v-distpicker>
        </div>
      </div>
      <!-- 详细地址 -->
      <div class="line_box">
        <div class="line_title">详细地址</div>
        <div class="input_box">
          <el-input v-model="address" placeholder="请输入详细地址"></el-input>
        </div>
      </div>
      <!-- 门店logo -->
      <div class="line_box">
        <div class="line_title">门店logo</div>
        <div class="input_box">
          <!-- <el-input v-model="shopname" placeholder="请输入详细地址"></el-input> -->
        </div>
      </div>
      <!-- 门店展示 -->
      <div class="line_box">
        <div class="line_title">门店展示</div>
        <div class="input_box">
          <!-- <el-input v-model="shopname" placeholder="请输入详细地址"></el-input> -->
        </div>
      </div>
      <!-- 按钮 -->
      <div class="line_box">
        <div class="line_title"></div>
        <div class="input_box leftk">
          <el-button type="primary" @click="publishStore">发布</el-button>
          <el-button type="primary" @click="resetButton">重置</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import VDistpicker from "v-distpicker";
import { updateStore } from "@/api/http.js";

export default {
  components: {
    VDistpicker,
  },
  data() {
    return {
      shopname: "",
      select: "",
      shopphone: "",
      address: "",
      options: [
        {
          value: 1,
          label: "一级店铺",
        },
        {
          value: 2,
          label: "二级店铺",
        },
      ],
    };
  },
  created() {
    console.log("编辑页面数据", this.$route.params);
    var editData = this.$route.params.data;
    this.shopname = editData.name;
    this.select = editData.gradeid;
    this.shopphone = editData.phone;
    this.address = editData.address;
  },
  methods: {
    // 返回门店列表
    goBack() {
      this.$router.push({ path: "/system/dept" });
    },
    // 省市区
    onSelected(data) {
      console.log(123123123, data);
      this.address.province = data.province.value;
      this.address.city = data.city.value;
      this.address.county = data.area.value;
    },
    // 店铺等级
    OnSelectGrade(grade) {
      // console.log(parseInt(grade))
      this.select = parseInt(grade);
    },
    // 发布
    publishStore() {
      if (this.shopname != "") {
        let data = {
          id: this.$route.params.data.id,
          name: this.shopname,
          gradeid: this.select,
          phone: this.shopphone,
          address: this.address,
        };
        updateStore(data).then((res) => {
          console.log("修改接口", res);
          if (res.reslut.data.code == 200) {
            this.$router.push({ path: "/system/dept" });
            this.$message({
              type: "success",
              message: "修改成功!",
            });
          }else {
            this.$message({
              type: "error",
              message: "修改成功!",
            });
          }
        });
      }
    },
    // 重置按钮
    resetButton() {
      (this.shopname = ""),
        // this.select
        (this.shopphone = ""),
        (this.address = "");
    },
  },
};
</script>

<style scoped>
.store_wrapper {
  width: 1200px;
  margin-left: 50px;
  margin-top: 50px;
}
.line_box {
  width: 100%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  height: 50px;
}
.input_box {
  width: 50%;
  margin-left: 30px;
  /* height: 50px; */
}
.leftk {
  margin-left: 100px;
}
.leftk button {
  margin: 0 50px;
}
.line_title {
  font-weight: 700;
  font-size: 16px;
}
.count_box {
  margin-left: 30px;
  width: 27%;
}
.img_box {
  margin-left: 30px;
  font-size: 14px;
  /* button {
      margin-top: 5px;
    } */
}
</style>