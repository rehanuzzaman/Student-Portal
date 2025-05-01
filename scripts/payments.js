document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    document.getElementById('current-date').textContent = 'May 15, 2025';

    // Initialize Payment History Chart
    const paymentCtx = document.getElementById('paymentHistoryChart').getContext('2d');
    
    window.paymentChart = new Chart(paymentCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Payments (৳)',
                data: [5000, 20000, 1000, 0, 25000, 0, 0, 0, 0, 0, 0, 0],
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
                            return '৳' + context.raw.toLocaleString();
                        }
                    }
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

    // Time period filter
    document.getElementById('timePeriod').addEventListener('change', function() {
        const period = this.value;
        let labels, data;
        
        switch(period) {
            case 'year':
                labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                data = [5000, 20000, 1000, 0, 25000, 0, 0, 0, 0, 0, 0, 0];
                break;
            case 'semester':
                labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
                data = [5000, 20000, 1000, 0, 25000];
                break;
            case 'all':
                labels = ['2022', '2023', '2024', '2025'];
                data = [185000, 192000, 198000, 51500];
                break;
        }
        
        window.paymentChart.data.labels = labels;
        window.paymentChart.data.datasets[0].data = data;
        window.paymentChart.update();
    });

    // Make payment button
    document.querySelector('.make-payment-btn').addEventListener('click', function() {
        alert('Redirecting to payment gateway...');
        // In a real app, this would redirect to payment page
    });

    // View receipt buttons
    document.querySelectorAll('.action-btn.view').forEach(btn => {
        btn.addEventListener('click', function() {
            const receiptNo = this.closest('tr').querySelector('td').textContent;
            alert(`Viewing receipt ${receiptNo}\nThis would open a receipt viewer in a real app.`);
        });
    });

    // Download receipt buttons
    document.querySelectorAll('.action-btn.download').forEach(btn => {
        btn.addEventListener('click', function() {
            const receiptNo = this.closest('tr').querySelector('td').textContent;
            alert(`Downloading receipt ${receiptNo}\nThis would download a PDF in a real app.`);
        });
    });

    // Payment method buttons
    document.querySelectorAll('.method-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const method = this.closest('.method-card').querySelector('h4').textContent;
            alert(`Initiating ${method} payment...\nThis would open a payment modal in a real app.`);
        });
    });

    // Search functionality
    document.querySelector('.search-box input').addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const rows = document.querySelectorAll('.payment-table tbody tr');
        
        rows.forEach(row => {
            const rowText = row.textContent.toLowerCase();
            row.style.display = rowText.includes(searchTerm) ? '' : 'none';
        });
    });
});