<template>
  <div class="renderer">
    <el-tabs v-model="activeName" @tab-click="handleClick" tab-position="top">
      <el-tab-pane label="筛选渲染" name="filter">
        <vxe-table
            border
            :data="tableData"
            auto-resize
        >
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="文本筛选" :filters="[{data:null}]" :filter-render="{name: 'FilterInput'}"></vxe-column>
          <vxe-column field="role" title="实现条件的筛选" :filters="[{data: {type: 'has', name: ''}}]" :filter-render="{name: 'FilterComplex'}"></vxe-column>
          <vxe-column field="age"  title="实现内容的筛选" :filters="[{data: {vals: [], sVal: ''}}]" :filter-render="{name: 'FilterContent'}"></vxe-column>
          <vxe-column field="address" title="实现复杂的筛选" sortable :filters="[{data: {vals: [], sVal: '', fMenu: '', f1Type:'', f1Val: '', fMode: 'and', f2Type: '', f2Val: ''}}]" :filter-render="{name: 'FilterExtend'}"></vxe-column>
        </vxe-table>
      </el-tab-pane>
      <el-tab-pane label="单元格渲染" name="cell">
        <vxe-table
            border
            :data="tableData"
            auto-resize
        >
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name"  title="Name" :cell-render="{name: 'MyLink', events: {click: linkEvent}}"></vxe-column>
          <vxe-column field="sex"  title="sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
          <vxe-column field="address" title="Address"></vxe-column>
        </vxe-table>
      </el-tab-pane>
      <el-tab-pane label="可编辑渲染" name="edit">
        <vxe-table
            border
            auto-resize
            :data="tableData"
            :edit-config="{trigger: 'click', mode: 'row'}"
        >
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name" title="简单输入框" :edit-render="{name: 'MyInput'}"></vxe-column>
          <vxe-column field="role" title="下拉表格" :edit-render="{name: 'EditDownTable'}"></vxe-column>
          <vxe-column field="sex" title="弹窗表格" :edit-render="{name: 'EditPopupModal'}"></vxe-column>
          <vxe-column field="address" title="复杂渲染" :edit-render="{name: 'EditDownModal'}"></vxe-column>
        </vxe-table>
      </el-tab-pane>
      <el-tab-pane label="内容渲染" name="content">
        <vxe-table
            border
            :data="tableData"
            auto-resize
        >
          <vxe-column type="seq" width="60"></vxe-column>
          <vxe-column field="name"  title="Name" :cell-render="{name: 'MyLink', events: {click: linkEvent}}"></vxe-column>
          <vxe-column field="sex"  title="sex"></vxe-column>
          <vxe-column field="age" title="Age"></vxe-column>
          <vxe-column field="address" title="Address"></vxe-column>
        </vxe-table>
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
export default {
  name: "Renderer",
  data(){
    return{
      activeName: 'filter',
      tableData:[
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: '28', address: 'Shenzhen',url: 'https://www.baidu.com' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: '22', address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: '32', address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: '23', address: 'Shenzhen' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: '30', address: 'Shanghai' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: 'Women', age: '21', address: 'Shenzhen' },
        { id: 10007, name: 'Test7', role: 'Test', sex: 'Man', age: '29', address: 'Shenzhen' },
        { id: 10008, name: 'Test8', role: 'Develop', sex: 'Man', age: '35', address: 'Shenzhen' }
      ]
    }
  },
  methods:{
    handleClick(tab, event) {
      console.log(tab, event);
    },
    linkEvent ({ row }) {
      console.log(row.name)
      window.location.href=row.url
    }
  }
}
</script>

<style lang="less">
.renderer{
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
  .el-tabs__content{
    height: 500px;
    width: 1000px;
  }
  .icon-chexiao{
    font-size: 12px;
  }
}
</style>