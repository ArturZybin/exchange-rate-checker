import React, { useEffect } from 'react'
import Chart from 'chart.js'


interface IProps {
   data: number[],
   base: string,
   currency: string
}

export const CurrencyChart: React.FC<IProps> = ({ data, base, currency }) => {
   useEffect(() => {
      const months: string[] = []

      for (let i = 6; i >=0; i--) {
         const date = new Date();
         date.setMonth(date.getMonth() - i)
         months.push(date.toLocaleString('default', { month: 'long' }))
      }

      drawChart(data, base, currency, months)
   }, [data, base, currency])

   return (
      <canvas id="chart" className="chart"></canvas>
   )
}


function drawChart(data: number[], base: string, currency: string, months: string[]) {
   const canvas: any = document.getElementById('chart')
   if (!canvas) return

   new Chart(canvas.getContext('2d'), {
      type: 'line',
      data: {
         labels: months,
         datasets: [{
            label: `${currency} in ${base}`,
            data,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            borderColor: '#4E4E4E',
            borderWidth: 3
         }]
      }
   })
}