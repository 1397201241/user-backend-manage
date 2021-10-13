<template>
    <el-container id="navigation_bar">
        <a-input-search
            placeholder="username"
            enter-button="搜索"
            v-model="username"
            size="large"
            style="text-align: left;width: 280px"
            @search="$emit('searchBtnClick',username)"
        />
        <el-button size="mini" type="primary" icon="el-icon-refresh" @click="refresh">刷新</el-button>
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="$emit('addBtnClick')">新增</el-button>
<!--        <el-button size="mini" type="primary">
            <i class="iconfont icon-xiugai"></i>
            修改
        </el-button>-->
        <el-button size="mini" type="danger" :disabled="deleteButtonDisabled" icon="el-icon-delete" @click="$emit('deleteBtnClick')">批量删除</el-button>
    </el-container>
</template>

<script>

    export default {
        name: "ActionBar",
        props:{
          deleteButtonDisabled: {
            type: Boolean,
            default: false
          },
        },
        data(){
            return {
                span_select: false,
                username:''
            }
        },
        methods:{
          onSearch(){
            this.$emit('searchBtnClick',this.username)
          },
          refresh() {
            this.username=''
            this.$emit('searchBtnClick','')
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
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        span{
            line-height: 27px;
            margin-right: 10px;
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
