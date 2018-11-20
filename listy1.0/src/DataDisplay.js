import React, { Component } from 'react';
import {PieChart, Pie, Tooltip} from 'recharts';


export default class SimpleBarChart extends Component {

	render () {
    const data02 = [
      {name: 'Group A', value: 2400}, {name: 'Group B', value: 4567},
      {name: 'Group C', value: 1398}, {name: 'Group D', value: 9800},
      {name: 'Group E', value: 3908}, {name: 'Group F', value: 4800}
    ];

  	return (
    	<PieChart width={800} height={400}>
        <Pie data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d"/>
        <Tooltip/>
       </PieChart>
    );
  }
}
