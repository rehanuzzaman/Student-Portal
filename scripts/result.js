document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    document.getElementById('current-date').textContent = 'May 15, 2025';

    // Initialize Charts
    initCgpaChart();
    initGradeChart();

    // Event Listeners
    document.getElementById('cgpaFilter').addEventListener('change', updateCgpaChart);
    document.getElementById('gradeFilter').addEventListener('change', updateGradeChart);
    document.getElementById('historyFilter').addEventListener('change', filterResultHistory);
    document.querySelector('.print-btn').addEventListener('click', printTranscript);
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', viewSemesterDetails);
    });

    // Functions
    function initCgpaChart() {
        const ctx = document.getElementById('cgpaChart').getContext('2d');
        
        window.cgpaChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Spring 2023', 'Summer 2023', 'Fall 2023', 'Spring 2024', 'Summer 2024', 'Fall 2024', 'Spring 2025'],
                datasets: [{
                    label: 'CGPA',
                    data: [3.45, 3.52, 3.58, 3.63, 3.67, 3.68, 3.78],
                    backgroundColor: 'rgba(21, 101, 192, 0.1)',
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
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `CGPA: ${context.raw}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 3.0,
                        max: 4.0,
                        ticks: {
                            stepSize: 0.2
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

    function initGradeChart() {
        const ctx = document.getElementById('gradeChart').getContext('2d');
        
        window.gradeChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'F'],
                datasets: [{
                    data: [12, 8, 6, 4, 2, 1, 1, 0],
                    backgroundColor: [
                        '#16a34a',
                        '#22c55e',
                        '#84cc16',
                        '#facc15',
                        '#f59e0b',
                        '#ef4444',
                        '#dc2626',
                        '#991b1b'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw} courses`;
                            }
                        }
                    }
                }
            }
        });
    }

    function updateCgpaChart() {
        const filter = document.getElementById('cgpaFilter').value;
        let labels, data;
        
        switch(filter) {
            case 'all':
                labels = ['Spring 2023', 'Summer 2023', 'Fall 2023', 'Spring 2024', 'Summer 2024', 'Fall 2024', 'Spring 2025'];
                data = [3.45, 3.52, 3.58, 3.63, 3.67, 3.68, 3.78];
                break;
            case 'last4':
                labels = ['Spring 2024', 'Summer 2024', 'Fall 2024', 'Spring 2025'];
                data = [3.63, 3.67, 3.68, 3.78];
                break;
            case 'year':
                labels = ['Spring 2024', 'Summer 2024', 'Fall 2024', 'Spring 2025'];
                data = [3.63, 3.67, 3.68, 3.78];
                break;
        }
        
        window.cgpaChart.data.labels = labels;
        window.cgpaChart.data.datasets[0].data = data;
        window.cgpaChart.update();
    }

    function updateGradeChart() {
        const filter = document.getElementById('gradeFilter').value;
        let data;
        
        if (filter === 'current') {
            data = [3, 2, 1, 0, 0, 0, 0, 0]; // Current semester grades
        } else {
            data = [12, 8, 6, 4, 2, 1, 1, 0]; // All courses grades
        }
        
        window.gradeChart.data.datasets[0].data = data;
        window.gradeChart.update();
    }

    function filterResultHistory() {
        const year = this.value;
        const cards = document.querySelectorAll('.semester-card');
        
        cards.forEach(card => {
            const cardYear = card.querySelector('h4').textContent.split(' ')[1];
            if (year === 'all' || cardYear === year) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function printTranscript() {
        alert('Opening print preview for academic transcript...');
        // In a real app, this would open the browser's print dialog
    }

    function viewSemesterDetails() {
        const semester = this.closest('.semester-card').querySelector('h4').textContent;
        alert(`Viewing detailed results for ${semester}\nThis would open a detailed view in a real app.`);
    }
});