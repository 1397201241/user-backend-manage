<template>
  <div>
    <el-divider content-position="left"><span style="color: red;font-size: large;">可申请凭证列表</span></el-divider>
    <el-table
            ref="multipleTable"
            :data="myTableData.slice((current-1)*size,current*size)"
            tooltip-effect="dark"
            max-height="375"
            @selection-change="handleSelectionChange">
      <el-table-column
              type="selection"
              width="50">
      </el-table-column>
      <el-table-column
              prop="payCertNum"
              label="支付凭证号"
              width="160">
      </el-table-column>
      <el-table-column
              prop="totalAmount"
              label="总金额"
              width="120">
        <template slot-scope="scope">$ {{ scope.row.totalAmount }}</template>
      </el-table-column>
      <el-table-column
              prop="paidAmount"
              label="已付金额"
              width="120">
        <template slot-scope="scope">$ {{ scope.row.paidAmount }}</template>
      </el-table-column>
      <el-table-column
              prop="payeeAcctName"
              label="收款人名称"
              width="120">
      </el-table-column>
      <el-table-column
              prop="payeeAcctNum"
              label="收款人名称"
              width="120">
      </el-table-column>
      <el-table-column
              prop="payAcctBankName"
              label="收款人名称">
      </el-table-column>
      <!--<el-table-column
              label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="send(scope.row)">进行申请</el-button>
          <el-button type="primary" size="mini" @click=viewPayVoucherDetail(scope.row)>查看详情</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <div style="margin-top: 10px">
      <el-button type="primary" size="mini" @click="send()" disabled>下载通知单</el-button>
      <el-button type="primary" size="mini" @click="send()">发送清算银行</el-button>
    </div>
    <el-divider content-position="left"><span style="color: red;font-size: large;">通知单</span></el-divider>
    <el-table
            ref="multipleTable"
            :data="noticeData.slice((current-1)*size,current*size)"
            tooltip-effect="dark"
            max-height="375"
            @selection-change="handleSelectionChange">
      <el-table-column
              type="selection"
              width="50">
      </el-table-column>
      <el-table-column
              prop="payCertNum"
              label="清算凭证号">
      </el-table-column>
      <el-table-column
              prop="paidAmount"
              label="已付金额">
        <template slot-scope="scope">$ {{ scope.row.paidAmount }}</template>
      </el-table-column>

      <!--<el-table-column
              label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="send(scope.row)">进行申请</el-button>
          <el-button type="primary" size="mini" @click=viewPayVoucherDetail(scope.row)>查看详情</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <el-pagination
        style="padding-top: 15px;margin-left: 0;"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        background
        :current-page.sync="current"
        :page-sizes="[2, 3, 4, 5]"
        :page-size="size"
        layout="total,sizes,prev,pager,next,jumper"
        :total="totalNum">
    </el-pagination>

  </div>
</template>

<script>

export default {
  name: "PayVoucher",
  data(){
    return{
      dialogVisible:false,
      bgtURL:"http://192.168.110.182:8004/audit",
      myTableData:[],
      noticeData:[],
      totalNum:5,
      current:1,
      size:6,
    }
  },
  created() {
    this.getPayVoucherList()
  },
  methods:{
    /**
     * @description 获取支付凭证回单列表
     */
    getPayVoucherList(){
      fetch(this.bgtURL+"/getAll",{
        method:'GET',
        headers:{
          "Content-Type":"application/json"
        },
        mode:'cors'
      })
              .then(res=>res.json())
              .then(myJson=>{
                this.myTableData = myJson.data
              }).catch(err=>{
        console.log(err)
      })
    },
    /**
     * @description 发送清算银行，下载获取通知单
     * @param data {Array} 支付凭证回单列表
     */
    send(){
      //todo {封装}
      fetch(this.bgtURL+"/addQuotaNotice",{
        method:'POST',
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(this.myTableData),
        mode:'cors'
      })
              .then(res=>res.json())
              .then(myJson=>{
                this.noticeData=myJson.data;
                this.totalNum=myJson.data.length;
              }).catch(err=>{
        console.log(err)
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    handleSizeChange(val){
      this.size=val;
    },
    handleCurrentChange(val){
      this.current=val;
    },

  },
}
</script>

<style lang="less" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
span{
  color: #5908b1;
}
}
.pvDialog .el-form-item__label{
  font-weight: bolder;
  font-family: 幼圆;
  font-size: 18px;
  color: #000;
}
.pvDialogTitle{
  width: 100%;
  background-color: #efefef;
  font-family: 幼圆;
  font-size: 26px;
  font-weight: bolder;
  margin-top: -20px;
  color: black;
}
.pvTitle{
  opacity: 1;
  font-size: 40px;
  font-family: 华文彩云;
  color: #181717;
  margin-left: -160px;
  position:absolute;
  z-index: 1;
}
</style>
