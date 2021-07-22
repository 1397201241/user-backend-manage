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
        :page-sizes="[5, 10, 20, 30]"
        :page-size="size"
        layout="total,sizes,prev,pager,next,jumper"
        :total="totalNum">
    </el-pagination>

  </div>
</template>

<script>
import {get} from "../../../utils/request";
export default {
  name: "Payvoucher",
  data(){
    return{
      dialogVisible:false,
      formData:{
        PAY_CERT_ID: 13225945966,
        PAY_CERT_NUM: 35052619980622,
        TOTAL_AMOUNT: "",
        PAID_AMOUNT: "",
        PAYEE_ACCT_NAME: "Qin Li",
        PAYEE_ACCT_NUM: "450923199901022444",
        PAYEE_ACCT_BANK_NAME: "湖南省建设银行",
        PAY_ACCT_NAME: "Qin Li",
        PAY_ACCT_NUM: "450923199901022444",
        PAY_ACCT_BANK_NAME: "湖南省建设银行",
        CREATE_AT: "2021/7/14下午2:40:18",
        UPDATE_AT: "2021/7/14下午2:40:18",
        IS_DELETE: 0,
        VERSION: "1.0.3"
      },
      bgtURL:"http://192.168.110.182:8004/audit",
      myTableData:[],
      noticeData:[],
      totalNum:5,
      current:1,
      size:6,
      rules: {
        PAID_AMOUNT: [{
          required: true, message: '请输入申请金额', trigger: 'blur'
        }]
      }
    }
  },
  created() {
    this.getVoucherDatas()
    this.getPayVoucherList()
  },
  methods:{
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
    send(data){
      console.log(data)
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
                this.noticeData=myJson.data
                console.log(myJson.data)

              }).catch(err=>{
        console.log(err)
      })
    },
    close() {
      this.dialogVisible=false;
      let BigDecimal = require('js-big-decimal')
      console.log(new BigDecimal("0.09"))
    },
    handleConfirm() {
      this.dialogVisible=false;
    },
    viewPayVoucherDetail(data){
      console.log(data)
      this.$router.push(
          {path:'/pay_voucher_detail',
            query:{name:"data",data:JSON.stringify(data)}})
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection)
    },
    handleSizeChange(val){
      //赋值，然后重新查询
      this.size=val;
      /*this.getUserList()*/
    },
    handleCurrentChange(val){
      console.log(this.current)
      this.current=val;
      /*this.getUserList()*/
    },
    async getVoucherDatas(){
      await get(this.url).then(myJson=>{
        this.myTableData = myJson
        this.totalNum = this.myTableData.length
      })
    }
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
