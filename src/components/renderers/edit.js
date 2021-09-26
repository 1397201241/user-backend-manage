import VXETable from "vxe-table";
import Vue from "vue";

import EditDownTable from "./components/EditDownTable";
import EditDownModal from "./components/EditDownModal";
import EditPopupModal from "./components/EditPopupModal";

// 全局组件注册
Vue.component(EditDownTable.name,EditDownTable)
Vue.component(EditPopupModal.name,EditPopupModal)
Vue.component(EditDownModal.name,EditDownModal)

// region 筛选渲染
// 创建一个简单输入框渲染
VXETable.renderer.add('MyInput', {
    // 可编辑激活模板
    renderEdit (h, renderOpts, { row, column }) {
        return [
            <vxe-input prefix-icon="iconfont icon-chexiao" type="text" clearable={true} v-model={ row[column.property] } />
        ]
    },
    // 可编辑显示模板
    renderCell (h, renderOpts, { row, column }) {
        return [
            <span>{ row[column.property] }</span>
        ]
    },
    // 导出模板，例如导出插槽中自定义的内容
    exportMethod (params) {
        const { row, column } = params
        console.log(row,column)
        return '自定义内容'
    }
})

// 创建一个下拉表格渲染
VXETable.renderer.add('EditDownTable', {
    autofocus: '.vxe-input--inner',
    renderEdit (h, renderOpts, params) {
        return [
            <edit-down-table params={ params }></edit-down-table>
        ]
    }
})

// 创建一个弹窗渲染
VXETable.renderer.add('EditPopupModal', {
    autofocus: '.vxe-input--inner',
    renderEdit (h, renderOpts, params) {
        return [
            <edit-popup-modal params={ params }></edit-popup-modal>
        ]
    }
})

// 创建一个复杂的组合渲染
VXETable.renderer.add('EditDownModal', {
    autofocus: '.vxe-input--inner',
    renderEdit (h, renderOpts, params) {
        return [
            <edit-down-modal params={ params }></edit-down-modal>
        ]
    }
})
// endregion