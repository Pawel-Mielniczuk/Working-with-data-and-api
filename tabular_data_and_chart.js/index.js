//
//CHART.JS 
//
chartIt();
async function chartIt() {
  const data = await getData();
  const ctx = document.getElementById('chart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: data.xs,
        datasets: [{
            label: 'Global average temperature',
            data: data.ys,
            fill:false,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
      scales: {
          yAxes: [{
              ticks: {
                  // Include a dollar sign in the ticks
                  callback: function(value, index, values) {
                      return value + '°'
                  }
              }
          }]
      }
  }
});
};


//
//METHODS
//

async function getData() {
  const xs = [];
  const ys = [];

  const response = await fetch('ZonAnn.csv');
  const data = await response.text();

  //split on line break with array and slice first row
  const table = data.split('\n').slice(1);

  table.forEach(row => {
    const columns = row.split(',');
    const year = columns[0];
    xs.push(year);
    const temp = columns[1];
    ys.push(parseFloat(temp) + 14);
    console.log(year, temp);
  });
    return { xs, ys };
};
