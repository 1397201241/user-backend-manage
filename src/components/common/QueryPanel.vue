<!--
 * @Author: your name
 * @Date: 2020-11-18 21:25:40
 * @LastEditTime: 2020-12-07 21:05:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sd365-tms-omp-front-end\src\components\SD365UI\PayApply.vue
-->
<template>
    <!--设置标签宽度-->
    <el-form :model="queryModel" :label-width="labelWidth">
        <el-row type="flex" style="padding: 10px;">
            <slot/>
            <el-form-item>
                <el-button
                        id="queryBtn"
                        v-loading="queryLoading"
                        type="primary"
                        icon="el-icon-search"
                        @click="handleBtnQueryClick"
                >查询
                </el-button>
            </el-form-item>
        </el-row>
    </el-form>
</template>
<script>
    export default {
        name:'QueryPaney',
        props: {
            queryModel: { type: Object, required: true },
            labelWidth: { type: String, default: '40px' }
        },
        data() {
            return {
                queryLoading: false
            }
        },
        methods: {
            handleBtnQueryClick() {
                this.queryLoading = true;
                this.$emit('QueryButtonClick');
                this.queryLoading = false
            }
        }
    }
</script>


