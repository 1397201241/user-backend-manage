<template>
    <div id="pie"></div>
</template>

<script>
    export default {
        name: "Pie",
        data(){
            return {
                charts: '',
                opinion:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎'],
                opinionData:[
                    {value: 2048, name: '爱心小学'},
                    {value: 7352, name: '希望小学'},
                    {value: 5802, name: '公益小学'},
                    {value: 4842, name: '公办小学'},
                    {value: 3002, name: '单位小学'}
                ]
            }
        },
        mounted() {
            this.$nextTick(function() {
                this.drawPie('pie')
            });
        },
        activated() {
            console.log("再次进入")
        },
        methods:{
            drawPie(id){
                const myDom=document.getElementById(id);
                Object.defineProperty(myDom,'clientWidth',{get:function(){return 450;}})
                Object.defineProperty(myDom,'clientHeight',{get:function(){return 300;}})
                this.charts = this.$echarts.init(myDom);
                this.charts.setOption({
                    tooltip: {
                        trigger: 'item',
                        position:['-80%','13%']
                    },
                    legend: {
                        top: '25%',
                        left: 'right',
                        orient:'vertical'

                    },
                    series: [
                        {
                            name: '项目名称',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            itemStyle: {
                                borderRadius: 10,
                                borderColor: '#fff',
                                borderWidth: 2
                            },
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: false,
                                    fontSize: '40',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: this.opinionData
                        }
                    ]
                })

            }
        }
    }
</script>

<style scoped>

</style>
