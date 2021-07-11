<template>
    <el-container id="navigation_bar">
        <span :class="{span_select:span_select}" @click="span_select=true">单位信息明细列表</span>
        <el-button size="mini" type="primary" icon="el-icon-refresh">刷新</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus">新增</el-button>
        <el-button size="mini" type="primary">
            <i class="iconfont icon-xiugai"></i>
            修改
        </el-button>
        <el-button size="mini" type="primary" icon="el-icon-delete">删除</el-button>
        <el-button size="mini" type="primary" icon="el-icon-open">启用</el-button>
        <el-button size="mini" type="primary" icon="el-icon-turn-off">停用</el-button>
    </el-container>
</template>

<script>

    export default {
        name: "NavigationBar",
        data(){
            return {
                span_select: false
            }
        }
    }
</script>

<style scoped lang="less">
    /*font-class方式导入阿里图标*/
    @import "https://at.alicdn.com/t/font_2666070_9sqbmj98x8t.css?spm=a313x.7781069.1998910419.40&file=font_2666070_9sqbmj98x8t.css";
    /*通用图标大小*/
    .iconfont{
        font-size: 12px;
    }
    #navigation_bar{
        display: flex;
        padding: 5px;
        height: 100%;
        width: 100%;
        border: 1px solid #22ccdd;
        background: #c6e2ff;
        span{
            line-height: 27px;
            margin-right: 200px;
            text-align: center;
            font-size: 16px;
            &:hover{
                color: #22ccdd;
                cursor: pointer;
            }
        }
        .span_select{
            color: #22ccdd;
            border-bottom: 1px solid #22ccdd;
        }
    }

</style>
