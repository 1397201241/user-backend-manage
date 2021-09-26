import VXETable from "vxe-table";

// region 单元格渲染
// 创建一个简单的超链接渲染
VXETable.renderer.add('MyLink', {
    // 默认显示模板
    renderDefault (h, renderOpts, params) {
        let { row, column } = params
        let { events } = renderOpts
        return [
            <a class="my-link" onClick={ () => events.click(params) }>{row[column.property]}</a>
        ]
    },
    // 导出模板，例如导出插槽中自定义的内容
    exportMethod (params) {
        const { row, column } = params
        console.log(row)
        console.log(column)
        return '自定义内容'
    }
})
// endregion