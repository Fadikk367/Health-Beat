import React, { useRef, useState, useEffect } from 'react';
import { Chart } from 'chart.js';

import { Measurement } from 'interfaces';

import { Canvas } from './LineChart.css';

interface LineChartProps {
  measurements: Measurement[];
}

const extractDataSeries = (measurements: Measurement[]) => {
  const dates: string[] = [];
  const systolics: number[] = [];
  const diastolics: number[] = [];

  const orderedMeasurements = measurements.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  orderedMeasurements.forEach(measurement => {
    dates.push(measurement.date);
    systolics.push(measurement.systolic);
    diastolics.push(measurement.diastolic);
  });

  return { dates, systolics, diastolics };
}

const LineChart: React.FC<LineChartProps> = ({ measurements }) => {
  const [chart, setChart] = useState<Chart>();
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const { dates, systolics, diastolics } = extractDataSeries(measurements);

    if (chartRef.current) {
      setChart(new Chart(chartRef.current, { 
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: 'systolic',
            data: systolics
          }, {
            label: 'diastolic',
            data: diastolics
          }]
        },
        options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero: true
                  }
              }]
          }
        }
      }));
    }

    return () => {
      if (chart) {
        chart.destroy();
      }
    }
  }, []); 

  useEffect(() => {
    if (chart) {
      const { dates, systolics, diastolics } = extractDataSeries(measurements);

      chart.data.labels = dates;
      if (chart.data.datasets) {
        chart.data.datasets[0].data = systolics;
        chart.data.datasets[1].data = diastolics;
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
