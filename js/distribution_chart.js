
let dom = document.getElementById("ult_distribution");
let myChart = echarts.init(dom);
option = null;
let data = genData();

option = {
    title : {
        text: '当前ULT分配情况',
        subtext: '发行总量45亿',
        textStyle:{
            fontSize:24,
            fontWeight: 'bolder',
            color: '#fff'
        },
        subtextStyle:{
            fontSize:18,
            fontWeight: 'bolder',
            color: '#fff'
        },
        top: '10%',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        right: '20%',
        top: '10%',
        bottom: 20,
        data: data.legendData,
        selected: data.selected,
        textStyle:{
            fontSize:18,
            fontWeight: 'bolder',
            color: '#fff'
        }
    },
    series : [
        {
            name: '姓名',
            type: 'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data: data.seriesData,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};




function genData() {

    let legendData = ['Ultiledger','完全流通','冻结'];
    let seriesData = [{name:legendData[0],value:3888390368},{name:legendData[1],value:139345207},{name:legendData[2],value:472264425}];
    let selected = [{name:legendData[0],value:true},{name:legendData[1],value:true},{name:legendData[2],value:true}];

    return {
        legendData: legendData,
        seriesData: seriesData,
        selected: selected
    };
}
if (option && typeof option === "object") {
    myChart.setOption(option, true);
    window.addEventListener("resize",function(){
        myChart.resize();
    });
}