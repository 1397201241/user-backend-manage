<template>
  <div>
    <el-divider content-position="left"><span style="color: red;font-size: large;">单位凭证列表</span></el-divider>
    <el-card style="margin:0 0 0 5px; height: 410px;">
      <el-table
          ref="multipleTable"
          :data="myTableData.slice((current-1)*size,current*size)"
          tooltip-effect="dark"
          max-height="375"
          @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="单位代码">
                <span>{{ props.row.agencyCode }}</span>
              </el-form-item>
              <el-form-item label="总金额">
                <span>{{ props.row.totalAmount }}</span>
              </el-form-item>
              <el-form-item label="已付金额">
                <span>{{ props.row.paidAmount }}</span>
              </el-form-item>
              <el-form-item label="收款人名称">
                <span>{{ props.row.payeeAcctName }}</span>
              </el-form-item>
              <el-form-item label="收款人账号">
                <span>{{ props.row.payeeAcctNum }}</span>
              </el-form-item>
              <el-form-item label="收款人开户银行">
                <span>{{ props.row.payeeAcctBankName }}</span>
              </el-form-item>
              <el-form-item label="付款人名称">
                <span>{{ props.row.payAcctName}}</span>
              </el-form-item>
              <el-form-item label="付款人账号">
                <span>{{ props.row.payAcctNum }}</span>
              </el-form-item>
              <el-form-item label="付款人开户银行">
                <span>{{ props.row.payAcctBankName }}</span>
              </el-form-item>
            </el-form>
          </template>

        </el-table-column>
        <el-table-column
            label="指标文号"
            width="240">
          <template slot-scope="scope">{{ scope.row.indicatorPaperNumber }}</template>
        </el-table-column>
        <el-table-column
            prop="totalAmount"
            label="指标金额"
            width="180">
        </el-table-column>
        <el-table-column
            prop="paidAmount"
            label="已申请金额"
            width="180">
        </el-table-column>
        <el-table-column
            prop="payeeAcctName"
            label="收款人名称"
            width="180">
        </el-table-column>
        <el-table-column
            label="操作"
            width="320">
          <template slot-scope="scope">
<!--            <el-button type="primary"  @click="dialogVisible = true">进行申请</el-button>-->
            <el-button @click=viewPayVoucherDetail(scope.row)  type="primary">查看详情</el-button>
            <el-button style="width: 140px;">
              <a class="downloadStyle" :href=downloadUrl+scope.row.payAppNum >下载凭证回单</a> </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
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
    <el-dialog
        class="pvDialog"
        :visible.sync="dialogVisible"
        width="500px"
        ref="genTargetDialog">
      <div class="pvDialogTitle">申请支付</div>
      <el-form :model="formData" :rules="rules">
        <el-form-item prop="PAID_AMOUNT" label="申请金额" style="width:100%;">
          <el-input v-model="formData.PAID_AMOUNT"  style="width: 98%;left: 0;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="margin-top: -50px">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {get} from "../../../utils/request";
export default {
  name: "Payvoucher",
  data(){
    return{
      downloadUrl:'http://192.168.110.85:8001/payVoucher/downloadVoucher/',
      addPayUrl:"http://192.168.110.85:8001",
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
      url:"http://localhost:3000/pay_voucher",
      myTableData:[],
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
  },
  methods:{
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
    getVoucherDatas(){
      get(this.addPayUrl+"/payVoucher/listAll/"+this.$store.state.user_info.info.agencyCode).then(
          res => {
            console.log(res)
            this.myTableData = res.data
            this.totalNum = this.myTableData.length
          }
      )
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
.downloadStyle{
  &:visited{
    color: rgb(152, 122, 234);
  }
  &:link{
    color: rgb(108, 190, 229);
  }
  text-decoration: none;
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
