<template>
  <el-dialog v-bind="$attrs" v-on="$listeners" :visible.sync="showDialog" @open="onOpen" @close="onClose" :title=title width="40%">
    <el-form ref="elForm" :model="formData" :rules="rules"  label-width="80px" style="margin-top: 0">
      <el-form-item label-width="18%" label="单位代码" prop="AGENCY_CODE">
        <el-input v-model="formData.AGENCY_CODE" placeholder="请输入单位代码" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label-width="18%" label="单位名称" prop="AGENCY_NAME">
        <el-input v-model="formData.AGENCY_NAME" placeholder="请输入单位名称" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-form-item label-width="18%" label="财政区划代码" prop="MOF_DIV_CODE">
        <el-input v-model="formData.MOF_DIV_CODE" placeholder="请输入财政区划" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      <el-container>
        <el-form-item label="负责人" prop="AGENCY_LEADER_PER_NAME">
         <el-input v-model="formData.AGENCY_LEADER_PER_NAME" placeholder="请输入单位负责人" clearable :style="{width: '80%'}">
                    </el-input>
        </el-form-item>
        <el-form-item label="单位简称" prop="AGENCY_ABBREVIATION">
          <el-input v-model="formData.AGENCY_ABBREVIATION" placeholder="单位简称" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-container>
        <el-form-item label="单位地址" >
            <el-select v-model="valueProvince"
                       placeholder="请选择省"
                       @change="changeProvince"
                       style="width:31%;margin-left: 12px">
              <el-option
                  v-for="item in provinceList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="valueCity"
                       placeholder="请选择市"
                       @change="changeCity"
                       style="width:31%;margin-left: 2px;">
              <el-option
                  v-for="item in cityOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="valueOrigin"
                       placeholder="请选择区"
                       @change="changeOrigin" style="width:31%;margin-left: 2px;">
              <el-option
                  v-for="item in originOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>

        <el-form-item  label="父节点ID" prop="PARENT_ID">
          <el-input v-model="formData.PARENT_ID" placeholder="请输入父节点ID" clearable :style="{width: '92%'}">
                    </el-input>
        </el-form-item>
      <el-container>
        <el-form-item label="是否启用" prop="IS_ENABLED">
          <!--          <el-input v-model="formData.IS_END" placeholder="请输入结束代码" clearable :style="{width: '80%'}">
                    </el-input>-->
          <el-select v-model="formData.IS_ENABLED" placeholder="请选择" :style="{width: '80%'}">
            <el-option
                v-for="item in [{label:0,value:0},{label:1,value:1}]"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="删除代码" prop="IS_DELETE">
          <!--          <el-input v-model="formData.IS_DELETED" placeholder="请输入删除代码" clearable :style="{width: '100%'}">
                    </el-input>-->
          <el-select v-model="formData.IS_DELETE" placeholder="请选择" :style="{width: '100%'}">
            <el-option
                v-for="item in [{label:0,value:0},{label:1,value:1}]"
                :key="item.value"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="单位ID" prop="AGENCY_ID">
        <el-input v-model="formData.AGENCY_ID" placeholder="请输入单位ID" clearable :style="{width: '80%'}"></el-input>
        </el-form-item>
        <el-form-item label="叶节点" prop="IS_LEAF">
        <el-input  v-model="formData.IS_LEAF" placeholder="请输入财政建议" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      </el-container>
      <el-container>
        <el-form-item label="启动时间" prop="START_DATE">
        <el-input  v-model="formData.START_AT" placeholder="请输入启动时间" clearable :style="{width: '80%'}">
        </el-input>
      </el-form-item>
        <el-form-item label="结束时间" prop="END_DATE">
        <el-input v-model="formData.END_AT" placeholder="请输入结束时间" clearable :style="{width: '100%'}">
        </el-input>
      </el-form-item>
      </el-container>
      <el-form-item label-width="24%" label="统一社会信用代码" prop="UNIFSOC_CRED_CODE">
        <el-input v-model="formData.UNIFSOC_CRED_CODE" placeholder="请输入统一社会信用代码" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label-width="24%" label="单位行政级别代码" prop="AGENCY_ADM_LEVEL_CODE">
        <el-input v-model="formData.AGENCY_ADM_LEVEL_CODE" placeholder="请输入行政级别代码" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label-width="12%" label="乐观锁" prop="IS_DELETE">
        <el-input v-model="formData.VERSION" placeholder="请输入乐观锁" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" style="margin-top: -50px">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="handelConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import data from '../../../server/china_address.json'
export default {
  name: "AgencyOp",
  props:{
    addOrUpdateVisible:{
      type: Boolean,
      default: false
    },
    title:{
      type: String,
      default: '项目操作'
    },
    opIndex:{
      type:Number,
      default:0
    },
    agency:{
      type:Object,
    }
  },
  data(){
    return{
      provinceList: [], // 省列表
      cityList: [], // 市列表
      originList: [], // 区列表
      valueProvince: '', // 所选的省
      valueCity: '', // 所选的市
      valueOrigin: '', // 所选的区
      nameProvince: '', // 所选的省
      nameCity: '', // 所选的市
      nameOrigin: '', // 所选的区
      cityOptions: [], // 市下拉框数据
      originOptions: [],// 区下拉框数据

      showDialog:false,
      formData:{
        AGENCY_ABBREVIATION:"博思",
        UNIFSOC_CRED_CODE:555,
        AGENCY_ADM_LEVEL_CODE:666,
        AGENCY_ID: "116",
        AGENCY_CODE: 1,
        AGENCY_NAME: "福建博思软件有限公司",
        MOF_DIV_CODE: 165,
        AGENCY_LEADER_PER_NAME: "陈航",
        AGENCY_ADD: "福建省福州市",
        PARENT_ID: "109",
        IS_LEAF: 1,
        START_AT: "2021-7-13",
        END_AT: "2022-8-16",
        IS_ENABLED: 1,
        IS_DELETE: 1,
        CREATE_TIME: "2021/7/13下午3:17:54",
        UPDATE_AT:"2021/7/13下午3:17:54",
        VERSION: "1.0.5"
      },
      rules: {},
      endOptions:[{label:0,value:0},{label:1,value:1}],
      deleteOptions:[{label:0,value:0},{label:1,value:1}],
    }
  },
  methods:{
    onOpen() {
      this._getJsonData()
      console.log(this.provinceList)

      if(this.opIndex === 2){
        this.formData = this.agency
        console.log("传过来的id是"+this.formData.id)}else{
        this.formData = {}
      }
    },
    onClose() {
      /*this.$refs['elForm'].resetFields()*/
      this.$emit('changeShow', 'false')
    },
    close() {
      console.log(this.pro)
      this.$emit('changeShow', 'false')

    },
    handelConfirm(){
      console.log(this.opIndex)
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        if(this.opIndex ===  1){
          this.$emit('addAgen',this.formData)
          this.$emit('changeShow', 'false')}
        else if(this.opIndex === 2){
          console.log("执行编辑函数！")
          this.$emit('editAgen',this.formData)
          this.$emit('changeShow', 'false')
        }
      })
    },
    _getJsonData() {
      this.provinceList = []
      this.cityList = []
      this.originList = []
      data.forEach((item) => {
        //将地址json中的数据存入省列表、市列表、县列表

        if (item.value.match(/0000$/)) {
          console.log("捕捉到"+item.value)
          this.provinceList.push({
            value: item.value,
            label: item.name,
            children: []
          })
        } else if (item.value.match(/00$/)) {
          this.cityList.push({
            value: item.value,
            label: item.name,
            children: []
          })
        } else {
          this.originList.push({
            value: item.value,
            label: item.name
          })
        }
      })
      for (let index in this.provinceList) {
        for (let index1 in this.cityList) {
          //把对应城市塞入对应省份
          if (this.provinceList[index].value.slice(0, 2) === this.cityList[index1].value.slice(0, 2)) {
            this.provinceList[index].children.push(this.cityList[index1])
          }
        }
      }
      for(let item1 in this.cityList) {
        for(let item2 in this.originList) {
          if (this.originList[item2].value.slice(0, 4) === this.cityList[item1].value.slice(0, 4)) {
            this.cityList[item1].children.push(this.originList[item2])
          }
        }
      }
    },
    // 选择省
    changeProvince(val) {
      // eslint-disable-next-line no-debugger
      this.provinceList.forEach((province, index) => {
        if (val.toString() === this.provinceList[index].value) {
          this.nameProvince = this.provinceList[index].label
          console.log(province)
          this.cityOptions = this.provinceList[index].children
          this.valueCity = ''
          this.originOptions = this.provinceList[index].children[0].children
          this.valueCity = ''
          this.valueOrigin = ''
          // 如果选中省之后想市区默认选中
          //this.valueCity = this.provinceList[index].children[0].value
          // this.valueOrigin = this.provinceList[index].children[0].children[0].value
        }
      })
    },
    // 选择市
    changeCity(val) {
      this.cityList.forEach((city, index) => {
        if (val.toString() === this.cityList[index].value) {
          this.nameCity = this.cityList[index].label
          this.originOptions = this.cityList[index].children
          this.valueOrigin = ''
          //如果选中市之后默认区选中
          //this.valueOrigin = this.cityList[index].children[0].value
        }
      })
    },
    // 选择区
    changeOrigin(val) {
      this.valueOrigin = val
      this.originList.forEach((origin, index) => {
        if(val.toString() === this.originList[index].value){
          this.nameOrigin = this.originList[index].label
        }
      })
      console.log(this.nameProvince + this.nameCity + this.nameOrigin)
      this.formData.AGENCY_ADD = this.nameProvince + this.nameCity + this.nameOrigin
    },
  },
  watch:{
    // 监听 addOrUpdateVisible 改变
    // eslint-disable-next-line no-unused-vars
    addOrUpdateVisible(oldVal,newVal){
      this.showDialog = this.addOrUpdateVisible
    },
  }
}
</script>

<style scoped>

</style>
