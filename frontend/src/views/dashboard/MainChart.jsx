import React, { useEffect, useRef } from 'react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const MainChart = () => {
  const chartRef = useRef(null)

  useEffect(() => {
    const handleColorSchemeChange = () => {
      if (chartRef.current) {
        setTimeout(() => {
          const chart = chartRef.current

          chart.options.scales.x.grid.color = getStyle(
            '--cui-border-color-translucent',
          )
          chart.options.scales.x.ticks.color = getStyle('--cui-body-color')

          chart.options.scales.y.grid.color = getStyle(
            '--cui-border-color-translucent',
          )
          chart.options.scales.y.ticks.color = getStyle('--cui-body-color')

          chart.update()
        })
      }
    }

    document.documentElement.addEventListener(
      'ColorSchemeChange',
      handleColorSchemeChange,
    )

    return () => {
      document.documentElement.removeEventListener(
        'ColorSchemeChange',
        handleColorSchemeChange,
      )
    }
  }, [])

  return (
    <CChartLine
      ref={chartRef}
      style={{ height: '300px', marginTop: '20px' }}
      data={{
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],

        datasets: [
          {
            label: 'Sales',
            backgroundColor: `rgba(${getStyle('--cui-primary-rgb')}, .15)`,
            borderColor: getStyle('--cui-primary'),
            pointBackgroundColor: getStyle('--cui-primary'),
            pointHoverBackgroundColor: getStyle('--cui-primary'),
            borderWidth: 3,

            data: [
              8500,
              10200,
              7800,
              12500,
              14300,
              18900,
              16500,
            ],

            fill: true,
          },

          {
            label: 'Orders',
            backgroundColor: `rgba(${getStyle('--cui-success-rgb')}, .05)`,
            borderColor: getStyle('--cui-success'),
            pointBackgroundColor: getStyle('--cui-success'),
            pointHoverBackgroundColor: getStyle('--cui-success'),
            borderWidth: 2,

            data: [
              32,
              41,
              29,
              45,
              52,
              68,
              59,
            ],

            fill: false,
          },
        ],
      }}

      options={{
        maintainAspectRatio: false,

        plugins: {
          legend: {
            display: true,
            position: 'top',
          },

          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },

        scales: {
          x: {
            grid: {
              color: getStyle('--cui-border-color-translucent'),
              drawOnChartArea: false,
            },

            ticks: {
              color: getStyle('--cui-body-color'),
            },
          },

          y: {
            beginAtZero: true,

            grid: {
              color: getStyle('--cui-border-color-translucent'),
            },

            ticks: {
              color: getStyle('--cui-body-color'),
            },
          },
        },

        elements: {
          line: {
            tension: 0.4,
          },

          point: {
            radius: 3,
            hitRadius: 10,
            hoverRadius: 5,
            hoverBorderWidth: 3,
          },
        },
      }}
    />
  )
}

export default MainChart