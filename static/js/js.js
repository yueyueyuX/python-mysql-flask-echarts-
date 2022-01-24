/*   */
 $(window).load(function(){
             $(".loading").fadeOut()
            })  
$(function () {
    echarts_1();
	echarts_2();
	echarts_3();
	echarts_4();
	echarts_5();
	zb1();
	zb2();
	zb3();
    function echarts_1() {
        Chart1 = echarts.init(document.getElementById('echart1'));
        ec_1_option = {
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b} : {c} %"
                    },

                    series: [{
        type: 'wordCloud',
        gridSize: 1,
        sizeRange: [12, 55],  //画布范围，如果设置太大会出现少词（溢出屏幕）
        rotationRange: [-45, 0, 45, 90],  //数据翻转范围
        textStyle: {
            normal: {
                color: function () { // 添加随机颜色
                    return 'rgb(' +
                        Math.round(Math.random() * 155) +
                        ',' + Math.round(100+Math.random() * (250-100)) +
                        ',' + Math.round(100+Math.random() * (250-100)) + ')'
                }
            }
        },
        right: null,
        bottom: null,
        data: []

    }]
                };

        // 使用刚指定的配置项和数据显示图表。
        Chart1.setOption(ec_1_option);
        window.addEventListener("resize",function(){
            Chart1.resize();
        });
    }

function echarts_2() {
Chart2 = echarts.init(document.getElementById('echart2'));
ec_2_option ={
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%'
  },
  series: [
    {
      name: '领涨股',
      type: 'funnel',
color: ['#00C5CD', '#00B2EE', '#104E8B', '#3A5FCD', '#00BFFF', '#000080', '#00CED1', '#009ACD', '#1E90FF','#4F94CD'],
      top: 1,
      bottom: 1,
      width: '80%',
      left: '10%',
      sort: 'descending',
      gap: 2,
      label: {
        show: true,
        position: 'inside'
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: 'solid'
        }
      },
      itemStyle: {
        borderColor: '#fff',
        borderWidth: 1
      },
      emphasis: {
        label: {
          fontSize: 20
        }
      },
      data: []
    }
  ]
};

        // 使用刚指定的配置项和数据显示图表。
        Chart2.setOption(ec_2_option);
        window.addEventListener("resize",function(){
            Chart2.resize();
        });
    }
function echarts_3() {
        Chart3 = echarts.init(document.getElementById('echart3'));
        const colors = ['#5470C6', '#91CC75', '#EE6666'];
ec_3_option = {
  color: colors,
  grid: {
    right: '20%'
  },

  legend: {
    data: ['成交额', '成交量', '涨跌幅'],
    textStyle: {
       color: '#aaa'
       }
  },
  dataZoom: [
    {
      show: true,
      type: 'inside',
      type: 'slider',
      start: 99.8,
      end: 100
    }
  ],
  xAxis: [
    {
      type: 'category',
      axisLabel : {
       textStyle: {
       color: '#aaa'
       }},
      axisTick: {
        alignWithLabel: true
      },
      data: []
    }
  ],
  yAxis: [
    {
      type: 'value',
      name: '成交额(万元)',
      position: 'right',
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[0]
        }
      },

    },
    {
      type: 'value',
      name: '成交量(万股)',
      position: 'right',
      offset: 80,
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[1]
        }
      },
    },
    {
      type: 'value',
      name: '涨跌幅',
      position: 'left',
      axisLine: {
        show: true,
        lineStyle: {
          color: colors[2]
        }
      },
      axisLabel: {
        formatter: '{value} %'
      }
    }
  ],
  series: [
    {
      name: '成交额',
      type: 'bar',
      data: [

      ]
    },
    {
      name: '成交量',
      type: 'bar',
      yAxisIndex: 1,
      data: []
    },
    {
      name: '涨跌幅',
      type: 'line',
      yAxisIndex: 2,
      data: []
    }
  ]
};
        // 使用刚指定的配置项和数据显示图表。
        Chart3.setOption(ec_3_option);
        window.addEventListener("resize",function(){
            Chart3.resize();
        });
    }


function echarts_4() {
    Chart4 = echarts.init(document.getElementById('echart4'));
const upColor = '#EE6666';
const upBorderColor = '#8A0000';
const downColor = '#00da3c';
const downBorderColor = '#008F28';
// Each item: open，close，lowest，highest
data0 = splitData(mydata);
function splitData(rawData) {
  const categoryData = [];
  const values = [];
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0]);
    values.push(rawData[i]);
  }
  return {
    categoryData: categoryData,
    values: values
  };
}
function calculateMA(dayCount) {
  var result = [];
  for (var i = 0, len = data0.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += +data0.values[i - j][1];
    }
    result.push((sum / dayCount).toFixed(3));
  }

  return result
}

ec_4_option = {
  title: {
    text: '上证指数 000001',
    textStyle: {
       color: '#aaa'
       },
    left: 0
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    right:60,
    align:'right',
    data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30'],
    textStyle: {
       color: '#aaa'
       }
  },
  grid: {
    left: '10%',
    right: '10%',
    bottom: '15%'
  },
  xAxis: {
    type: 'category',
    axisLabel : {
       textStyle: {
       color: '#aaa'
       }
     },
    data: data0.categoryData,
    scale: true,
    boundaryGap: false,
    axisLine: { onZero: false },
    splitLine: { show: false },
    min: 'dataMin',
    max: 'dataMax'
  },
  yAxis: {
    scale: true,
    axisLabel : {
       textStyle: {
       color: '#aaa'
       }
     },
    splitArea: {
      show: true
    }
  },
  dataZoom: [
    {
      type: 'inside',
      start: 98,
      end: 100
    },
    {
      show: false,
      type: 'inside',
      type: 'slider',
      top: '90%',
      start: 98,
      end: 100
    }
  ],
  series: [
    {
      name: '日K',
      type: 'candlestick',
      data: data0.values,
      itemStyle: {
        color: upColor,
        color0: downColor,
        borderColor: upBorderColor,
        borderColor0: downBorderColor
      },
      markPoint: {
        label: {
          formatter: function (param) {
            return param != null ? Math.round(param.value) + '' : '';
          }
        },
        data: [
          {
            name: 'Mark',
            coord: ['2013/5/31', 2300],
            value: 2300,
            itemStyle: {
              color: 'rgb(41,60,85)'
            }
          },
          {
            name: 'highest value',
            type: 'max',
            valueDim: 'highest'
          },
          {
            name: 'lowest value',
            type: 'min',
            valueDim: 'lowest'
          },
          {
            name: 'average value on close',
            type: 'average',
            valueDim: 'close'
          }
        ],
        tooltip: {
          formatter: function (param) {
            return param.name + '<br>' + (param.data.coord || '');
          }
        }
      },
      markLine: {
        symbol: ['none', 'none'],
        data: [
          [
            {
              name: 'from lowest to highest',
              type: 'min',
              valueDim: 'lowest',
              symbol: 'circle',
              symbolSize: 10,
              label: {
                show: false
              },
              emphasis: {
                label: {
                  show: false
                }
              }
            },
            {
              type: 'max',
              valueDim: 'highest',
              symbol: 'circle',
              symbolSize: 10,
              label: {
                show: false
              },
              emphasis: {
                label: {
                  show: false
                }
              }
            }
          ],
          {
            name: 'min line on close',
            type: 'min',
            valueDim: 'close'
          },
          {
            name: 'max line on close',
            type: 'max',
            valueDim: 'close'
          }
        ]
      }
    },
    {
      name: 'MA5',
      type: 'line',
      data: calculateMA(5),
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: 'MA10',
      type: 'line',
      data: calculateMA(10),
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: 'MA20',
      type: 'line',
      data: calculateMA(20),
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    },
    {
      name: 'MA30',
      type: 'line',
      data: calculateMA(30),
      smooth: true,
      lineStyle: {
        opacity: 0.5
      }
    }
  ]
};
        // 使用刚指定的配置项和数据显示图表。
        Chart4.setOption(ec_4_option);
        window.addEventListener("resize",function(){
            Chart4.resize();
        });
    }


function echarts_5() {
         Chart5 = echarts.init(document.getElementById('echarts_5'));
// 颜色
var lightBlue = {
	type: 'linear',
	x: 0,
	y: 0,
	x2: 0,
	y2: 1,
	colorStops: [{
		offset: 0,
		color: 'rgba(41, 121, 255, 1)'
	}, {
		offset: 1,
		color: 'rgba(0, 192, 255, 1)'
	}],
	globalCoord: false
}

ec_5_option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [
    {
      type: 'value',
      axisLabel : {
      show: false,
       textStyle: {
       color: '#aaa'
       }
     },
    }
  ],
  yAxis: [
    {
      type: 'category',
      axisLabel : {
       textStyle: {
       color: '#aaa'
       }
     },
      axisTick: {
        show: false
      },
      data:[]
         }
  ],
  dataZoom: [

        {
          show: true,
          yAxisIndex: 0,
          filterMode: 'empty',
          width: 30,
          height: '80%',
          showDataShadow: false,
          left: '93%',
          type: 'inside',
          start: 100,
          end: 99
        }
      ],
  series: [
    {
      name: '成交额',
      type: 'bar',
      stack: 'Total',
      label: {
        show: false
      },
      emphasis: {
        focus: 'series'
      },
      data: [],
      itemStyle: {color:'#3A5FCD'},
    },
  ]
};
        // 使用刚指定的配置项和数据显示图表。
        Chart5.setOption(ec_5_option);
        window.addEventListener("resize",function(){
            Chart5.resize();
        });
}
	

function zb1() {
Chartzb1 = echarts.init(document.getElementById('zb1'));
v4 = v1+v2+v3
zb1option = {

title: {
    text: '上海A股',
    textStyle: {
       color: '#aaa'
       },
    left: 'center'
  },
    series: [{
		
        type: 'pie',
        radius: ['60%', '70%'],
        color:'#49bcf7',
        label: {
            normal: {
                position: 'center'
            }
        },
        data: [{
            value: v1,
            name: '上海',
            label: {
                normal: {
                    formatter: v1 +'',
                    textStyle: {
                        fontSize: 16,
						color:'#fff',
                    }
                }
            }
        }, {
            value: v2+v3,
            name: '京深',
            label: {
                normal: {
                 formatter : function (params){
                return '占比'+((v1/v4).toFixed(7)*100)+ '%'
            },
                    textStyle: {
                        color: '#aaa',
                        fontSize: 12
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgba(255,255,255,.2)'
                },
                emphasis: {
                    color: '#fff'
                }
            },
        }]
    }]
};
        Chartzb1.setOption(zb1option);
        window.addEventListener("resize",function(){
            Chartzb1.resize();
        });
    }
function zb2() {
        var Chartzb2 = echarts.init(document.getElementById('zb2'));

zb2option = {

title: {
    text: '深圳A股',
    textStyle: {
       color: '#aaa'
       },
    left: 'center'
  },
    series: [{

        type: 'pie',
        radius: ['60%', '70%'],
        color:'#cdba00',
        label: {
            normal: {
                position: 'center'
            }
        },
        data: [{
            value: v2,
            name: '深圳',
            label: {
                normal: {
                    formatter: v2 +'',
                    textStyle: {
                        fontSize: 16,
						color:'#fff',
                    }
                }
            }
        }, {
            value: v1+v3,
            name: '深京',
            label: {
                normal: {
                 formatter : function (params){
                return '占比'+((v2/v4).toFixed(7)*100)+ '%'
            },
                    textStyle: {
                        color: '#aaa',
                        fontSize: 12
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgba(255,255,255,.2)'
                },
                emphasis: {
                    color: '#fff'
                }
            },
        }]
    }]
};
        Chartzb2.setOption(zb2option);
        window.addEventListener("resize",function(){
            Chartzb2.resize();
        });
    }

function zb3() {
        var Chartzb3 = echarts.init(document.getElementById('zb3'));

zb3option = {

title: {
    text: '北京A股',
    textStyle: {
       color: '#aaa'
       },
    left: 'center'
  },
    series: [{

        type: 'pie',
       radius: ['60%', '70%'],
        color:'#62c98d',
        label: {
            normal: {
                position: 'center'
            }
        },
        data: [{
            value: v3,
            name: '北京',
            label: {
                normal: {
                    formatter: v3 +'',
                    textStyle: {
                        fontSize: 16,
						color:'#fff',
                    }
                }
            }
        }, {
            value: v1+v2,
            name: '沪深',
            label: {
                normal: {
                 formatter : function (params){
                return '占比'+((v3/v4).toFixed(7)*100)+ '%'
            },
                    textStyle: {
                        color: '#aaa',
                        fontSize: 12
                    }
                }
            },
            itemStyle: {
                normal: {
                    color: 'rgba(255,255,255,.2)'
                },
                emphasis: {
                    color: '#fff'
                }
            },
        }]
    }]
};
        Chartzb3.setOption(zb3option);
        window.addEventListener("resize",function(){
            Chartzb3.resize();
        });
    }
})



		
		
		


		









