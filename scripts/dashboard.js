document.addEventListener('DOMContentLoaded', function() {
  // Set current date
  document.getElementById('current-date').textContent = 'May 15, 2025';

  // Initialize Charts
  initResultsChart();
  initPaymentsChart();

  // Chart filter event listeners
  document.getElementById('result-filter').addEventListener('change', function() {
      updateResultsChart(this.value);
  });

  document.getElementById('payment-filter').addEventListener('change', function() {
      updatePaymentsChart(this.value);
  });

  // Simulate notification click
  document.querySelector('.notifications').addEventListener('click', function() {
      alert('You have 2 new notifications');
      this.querySelector('.badge').style.display = 'none';
  });
});

function initResultsChart() {
  const ctx = document.getElementById('resultsChart').getContext('2d');
  
  window.resultsChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Spring 2023', 'Summer 2023', 'Fall 2023', 'Spring 2024', 'Summer 2024', 'Fall 2024', 'Spring 2025'],
          datasets: [{
              label: 'SGPA',
              data: [3.72, 3.68, 3.75, 3.81, 3.79, 3.76, 3.82],
              backgroundColor: '#1e88e5',
              borderColor: '#0d47a1',
              borderWidth: 1,
              borderRadius: 4
          }]
      },
      options: {
          responsive: true,
          plugins: {
              legend: {
                  display: false
              },
              tooltip: {
                  callbacks: {
                      label: function(context) {
                          return `${context.dataset.label}: ${context.raw}`;
                      }
                  }
              }
          },
          scales: {
              y: {
                  beginAtZero: false,
                  min: 3.5,
                  max: 4.0,
                  ticks: {
                      stepSize: 0.1
                  },
                  grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                  }
              },
              x: {
                  grid: {
                      display: false
                  }
              }
          }
      }
  });
}

function initPaymentsChart() {
  const ctx = document.getElementById('paymentsChart').getContext('2d');
  
  window.paymentsChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
              label: 'Payments (in ৳)',
              data: [12500, 19500, 15500, 18500, 21500, 19500, 22500, 24500, 21500, 18500, 15500, 12500],
              backgroundColor: 'rgba(30, 136, 229, 0.1)',
              borderColor: '#1565c0',
              borderWidth: 2,
              tension: 0.3,
              fill: true,
              pointBackgroundColor: '#0d47a1',
              pointBorderColor: '#ffffff',
              pointHoverRadius: 5
          }]
      },
      options: {
          responsive: true,
          plugins: {
              legend: {
                  display: false
              }
          },
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      callback: function(value) {
                          return '৳' + value/1000 + 'k';
                      }
                  },
                  grid: {
                      color: 'rgba(0, 0, 0, 0.05)'
                  }
              },
              x: {
                  grid: {
                      display: false
                  }
              }
          }
      }
  });
}

function updateResultsChart(type) {
  if (type === 'cgpa') {
      window.resultsChart.data.datasets[0].data = [3.72, 3.70, 3.71, 3.73, 3.74, 3.75, 3.76];
      window.resultsChart.data.datasets[0].label = 'CGPA';
      window.resultsChart.data.datasets[0].backgroundColor = '#42a5f5';
      window.resultsChart.options.scales.y.min = 3.5;
      window.resultsChart.options.scales.y.max = 4.0;
  } else {
      window.resultsChart.data.datasets[0].data = [3.72, 3.68, 3.75, 3.81, 3.79, 3.76, 3.82];
      window.resultsChart.data.datasets[0].label = 'SGPA';
      window.resultsChart.data.datasets[0].backgroundColor = '#1e88e5';
      window.resultsChart.options.scales.y.min = 3.5;
      window.resultsChart.options.scales.y.max = 4.0;
  }
  window.resultsChart.update();
}

function updatePaymentsChart(type) {
  if (type === 'year') {
      window.paymentsChart.data.labels = ['2022', '2023', '2024', '2025'];
      window.paymentsChart.data.datasets[0].data = [198000, 205000, 212000, 65000];
      window.paymentsChart.data.datasets[0].backgroundColor = 'rgba(30, 136, 229, 0.1)';
      window.paymentsChart.options.scales.y.ticks.callback = function(value) {
          return '৳' + value/1000 + 'k';
      };
  } else {
      window.paymentsChart.data.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      window.paymentsChart.data.datasets[0].data = [12500, 19500, 15500, 18500, 21500, 19500, 22500, 24500, 21500, 18500, 15500, 12500];
      window.paymentsChart.data.datasets[0].backgroundColor = 'rgba(30, 136, 229, 0.1)';
      window.paymentsChart.options.scales.y.ticks.callback = function(value) {
          return '৳' + value/1000 + 'k';
      };
  }
  window.paymentsChart.update();
}