import React, { useContext, useState } from 'react';
import status from '../jsonbase/status-card-data.json'
import '../style/dashboard.css';
import ReactApexChart from 'react-apexcharts'
import { contextArea } from '../components/Context';

function Dashboard() {

  const {state}=useContext(contextArea)

  const [diogram,setDiogram]=useState({
    series: [{
      name: 'series1',
      data: [31, 40, 28, 51, 42, 109, 100]
    }, {
      name: 'series2',
      data: [11, 32, 45, 32, 34, 52, 41]
    }],
    options: {
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        },
      },
    },
  })

 

  return (
    <div className='con'>
      <h2 className='mx-4 mb-5'>Dashboard</h2>
      <div className='con '>
      <div className='data row main-row '>
        <div className='col-lg-6 col-md-12 col-sm-12 col-left' >
        <div className='row justify-content-center align-items-center'>
          {status.map((item)=>(
            <div className={`${state.class} ff board col-md-4 col-sm-12 d-flex justify-content-start align-items-center`}>
              <i className={`${item.icon} dashboard-icons`}/>
              <div>
              <h3 className='dashboard-items-header'>{item.count}</h3>
              <p>{item.title}</p>
              </div>
            </div>
          ))}
           </div>
        </div>
        <div className='col-lg-6 col-md-12 innner'>
            <div className='col-lg-12 col-sm-12 '>
              <ReactApexChart options={diogram.options} series={diogram.series} type="area" height={350} />
            </div>
           
          
          
          
        </div>
      </div>
      </div>
    </div>
  )
}

export default Dashboard

