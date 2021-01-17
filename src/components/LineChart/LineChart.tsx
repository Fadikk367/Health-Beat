import React, { useRef, useState, useEffect } from 'react';
import { Chart } from 'chart.js';

import { Measurement } from 'interfaces';

import { Canvas } from './LineChart.css';

interface LineChartProps {
  measurements: Measurement[];
}

const LineChart: React.FC<LineChartProps> = ({ measurements }) => {
  const [chart, setChart] = useState<Chart>();
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      setChart(new Chart(chartRef.current, { 
        type: 'line',
        data: {
          labels: measurements.map(measurement => measurement.date),
          datasets: [{
            label: 'systolic',
            data: measurements.map(measurement => measurement.systolic)
          }, {
            label: 'diastolic',
            data: measurements.map(measurement => measurement.diastolic)
          }]
        }
      }));
    }
  }, []); 

  useEffect(() => {
    if (chart) {
      chart.data.labels = measurements.map(measurement => measurement.date);
      if (chart.data.datasets) {
        chart.data.datasets[0].data = measurements.map(measurement => measurement.systolic);
        chart.data.datasets[1].data = measurements.map(measurement => measurement.diastolic);
      }
      chart.update();
    }
  }, [measurements, chart])

  return (
    <>
      <Canvas ref={chartRef}/>
    </>
  )
}

export default LineChart
