import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const BarChart = props => {
  const [dailyCases, setDailyCases] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    axios
      .get('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
      .then(res => {
        let cases = Object.values(res.data.cases);

        let calc = cases.map((data, i) => {
          if (i === 0) {
            return data;
          } else {
            return data - cases[i - 1];
          }
        });

        let days = Object.keys(res.data.cases);

        days.shift();
        setDates(days);

        calc.shift();
        setDailyCases(calc);
      });
  }, []);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Daily Cases',
        backgroundColor: 'rgba(51,204,255,0.2)',
        borderColor: 'rgba(51,204,255,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(51,204,255,0.4)',
        hoverBorderColor: 'rgba(51,204,255,1)',
        data: dailyCases,
      },
    ],
  };

  return (
    <div>
      <Bar
        data={data}
        width={100}
        height={75}
        options={{
          scales: {
            xAxes: [
              {
                type: 'time',
                time: {
                  displayFormats: {
                    month: 'MMM YYYY',
                  },
                },
                distribution: 'series',
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default BarChart;
