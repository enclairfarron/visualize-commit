import { groupBy } from 'lodash'
import color from './color'

export const bar = (data) => {
  let legendData = []
  let commitData = []
  let averageData = []

  data.forEach(item => {
    legendData.push(item.author)
    commitData.push(item.commit)
    averageData.push(item.average)
  })

  console.log('commit data', commitData)
  return {
    title: {
      text: 'commit 贡献',
      x: 'center',
      top: 0
    },
    color,
    legend: {
      type: 'scroll',
      data: ['commit 贡献数量', 'commit 平均贡献行数'],
      width: '80%',
      bottom: 0
    },
    tooltip : {
      trigger: 'item',
      showDelay: 20,
      formatter (param) {
        let tip

        // 平均贡献行数
        if (param.seriesIndex === 1) {
          tip = ' commit 平均贡献行数'
        } else {
          tip = '贡献 commit 数量'
        }
        return  `${param.name} <br /> ${tip}：${param.data}`
      }
    },
    xAxis: {
      type: 'category',
      data: legendData,
      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#d0d3da'
        }
      },
      axisLabel: {
        color: '#909399'
      },
      splitLine: {
          lineStyle: {
              color: '#909939',
              type: 'solid'
          }
      }
    },
    yAxis: [
      {
        name: 'commit 贡献数量',
        type: 'value',
        axisLabel: {
          color: '#909399'
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#d0d3da'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          lineStyle: {
              color: '#ebeef5'
          }
        }
      },
      {
        name: 'commit平均贡献行数',
        type: 'value',
        axisLabel: {
          color: '#909399'
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#d0d3da'
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false,
          lineStyle: {
              color: '#ebeef5'
          }
        }
      }
    ],
    series : [
      {
          name: 'commit 贡献数量',
          data: commitData,
          type: 'bar',
          barMaxWidth: '48px',
          barMinHeight: 4
      },
      {
        name: 'commit 平均贡献行数',
        data: averageData,
        type: 'bar',
        barMaxWidth: '48px',
        barMinHeight: 4,
        yAxisIndex: 1
      }
    ]
  }
}

export const commitTimeBar = data => {
  if (!data.length) return

  const week = groupBy(
    // 先转为毫秒数
    data.map(time => Number(time + '000')),
    time => new Date(time).getDay(),
  )
  let weekData = [0, 0, 0, 0, 0, 0, 0].map((item, index) => week[index] ? week[index].length : item)

  weekData = [...weekData.slice(1), weekData[0]]
  return {
    title: {
      text: '一周每天贡献',
      x: 'center',
      top: 0
    },
    color,
    legend: {
      type: 'scroll',
      data: ['commit 贡献数量'],
      width: '80%',
      bottom: 0
    },
    tooltip: {
      trigger: 'item',
      showDelay: 20,
    },
    xAxis: {
      type: 'category',
      data: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#d0d3da'
        }
      },
      axisLabel: {
        color: '#909399'
      },
      splitLine: {
        lineStyle: {
          color: '#909939',
          type: 'solid'
        }
      }
    },
    yAxis: {
      name: 'commit 贡献数量',
      type: 'value',
      axisLabel: {
        color: '#909399'
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#d0d3da'
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        lineStyle: {
          color: '#ebeef5'
        }
      }
    },
    series: [
      {
        name: 'commit 贡献数量',
        data: weekData,
        type: 'bar',
        barMaxWidth: '48px',
        barMinHeight: 4
      },
    ]
  }
}
