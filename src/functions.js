import Chart from '../node_modules/chart.js/dist/Chart.js';

export const randomCircleColors = () => {
  // generates a random bright color for a circle's body, and a corresponding darker color for its border
  const rgb = `rgba(${~~(255 * Math.random())}, ${~~(255 * Math.random())}, ${~~(255 * Math.random())}, <ALPHA>)`;

  return {
    input: rgb.replace('<ALPHA>', 0.4), // for input fields background color
    body: rgb.replace('<ALPHA>', 0.6), // for generic background color
    border: rgb.replace('<ALPHA>', 0.8), // for border color
  };
};

export const scatterplot = (params) => {
  // uses Chart.js to generate a scatterplot given a short list of parameters

  /*
  params.happiness & params.productivity = {
    id: 'happiness',
    data: [{ x: #, y: # }, ... ],
    label: 'Happiness Ratings',
    x: {
      label: 'Day',
      min: 0,
      max: 50,
      step: 5,
    },
    y: {
      label: 'Happiness',
      min: 0,
      max: 100,
      step: 10,
    },
  };
  */

  let happinessChart;
  let productivityChart;
  
  [happinessChart, productivityChart].forEach((chart, index) => {
    const { id, data, label, x, y } = index === 0 ? params.happiness : params.productivity;
    chart = new Chart(document.getElementById(id).getContext('2d'), {
      type: 'scatter',
      data: {
        datasets: [{
          label,
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
          ],
        }]
      },
      options: {
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: x.label,
            },
            type: 'linear',
            position: 'bottom',
            ticks: {
              min: x.min,
              max: x.max,
              stepSize: x.step,
            },
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: y.label,
            },
            type: 'linear',
            position: 'left',
            ticks: {
              min: y.min,
              max: y.max,
              stepSize: y.step,
            },
          }],
        },
      },
    });  
  })
};
