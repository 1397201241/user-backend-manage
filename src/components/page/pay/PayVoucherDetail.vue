<template>
<div>
  <el-container>
    <div class="my-charts" ref="myChart"></div>
    <div style="width: 40%;">
      <el-card style="height: 460px;width: 100%">
        <el-form   class="demo-table-expand">
          <el-form-item label="付款人名字">
            <span>{{ this.showData.payAcctName }}</span>
          </el-form-item>
            <el-form-item label="付款人账号">
              <span>{{ this.showData.payAcctNum }}</span>
            </el-form-item>
            <el-form-item label="付款人开户银行">
              <span>{{ this.showData.payAcctBankName }}</span>
            </el-form-item>
            <el-form-item label="收款人名字">
              <span>{{ this.showData.payeeAcctName }}</span>
            </el-form-item>
            <el-form-item label="收款人账号">
              <span>{{ this.showData.payeeAcctNum }}</span>
            </el-form-item>
            <el-form-item label="收款人开户银行">
              <span>{{ this.showData.payeeAcctBankName }}</span>
            </el-form-item>
        </el-form>
      </el-card>
    </div>
  </el-container>

</div>
</template>

<script>
export default {
  data() {
    return {
      showData:[],
    };
  },
  created() {
    this.getQuery()
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    getQuery(){
      this.showData =JSON.parse(this.$route.query.data)
      console.log(this.showData)
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart);
      // 绘制图表
      let option = {
        title: {//标题组件
          textStyle: {
            color: "rgba(75,33,189,0.81)",
            fontSize: 12,
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)",
          textStyle:{    //图例文字的样式
            color:'#fff',  //文字颜色
            fontSize:10    //文字大小
          }
        },
        graphic:[
          {
            type: 'text',
            top: '40%',
            left: 'center',
            style: {
              text: this.showData.totalAmount,
              fill: '#333333',
              fontSize: 20,
              fontWeight: 'normal'
            }
          },{
            type: 'text',
            top: '53%',
            left: 'center',
            style: {
              text: '金额占比',
              fill: '#A6A8B6',
              fontSize: 12,
              fontWeight: 'normal'
            }
          },
        ],
        //圆环的颜色
        color:['#f3ef28','#11abff','#ffdf6f','#968ade'],
        // 图例
        legend: {
          // 图例选择的模式，控制是否可以通过点击图例改变系列的显示状态。默认开启图例选择，可以设成 false 关闭。
          selectedMode: true,
          /* orient: 'vertical', */
          /*  x : 'right',   //图例显示在右边
               y: 'center',  */  //图例在垂直方向上面显示居中
          bottom:0,
          itemWidth:10,  //图例标记的图形宽度
          itemHeight:10, //图例标记的图形高度
          data:['已用金额','剩余金额'],
          textStyle:{    //图例文字的样式
            color:'#A6A8B6',  //文字颜色
            fontSize:10    //文字大小
          }
        },
        series: [
          {
            name:'所用金额占比图',//代表a的值，系列名称
            type:'pie',
            center:['50%','45%'], //饼图的中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标。
            radius: ['42%', '60%'],//饼图的半径，数组的第一项是内半径，第二项是外半径。[ default: [0, '75%'] ]
            avoidLabelOverlap: false,
            /*  animation: false, */  //是否禁用动画效果
            label: {
              normal: {
                show: true,//是否显示标签标签的位置。'outside'饼图扇区外侧，通过视觉引导线连到相应的扇区。'inside','inner' 同 'inside',饼图扇区内部。'center'在饼图中心位置。
                position: 'left',
                //显示的标签的内容
                //a（系列名称），b（数据项名称），c（数值）, d（百分比）
                formatter: "{a},{b}:{c}（{d}%）",   //![在这里插入图片描述](https://img-blog.csdn.net/2018101313580390?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM5MzI3NDE4/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

              },
              emphasis: {
                //鼠标放在圆环上显示的标签样式
                show: true,
                textStyle: {
                  fontSize: '12',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: true,//是否显示引导线
                length:10,  //百分比引导线
                length2:20    //视觉引导项第二段的长度。
              }
            },
            itemStyle: {
              normal: {
                borderColor: "#FFFFFF",
                borderWidth: 1,
                label:{
                  show:true,
                  formatter:'{d}%'
                },
              }
            },
            // 系列中的数据内容数组。
            data:[
              {value:this.showData.paidAmount, name:'已用金额'},
              {value:this.showData.totalAmount-this.showData.paidAmount, name:'剩余金额'}
            ]
          }
        ]
      }
      myChart.setOption(option);
    }
  }
};
</script>

<style lang="less" scoped>
.my-charts{
  height: 400px;
  width: 60%;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
  font-size: small;
span{
  color: #5908b1;
}
}
</style>
