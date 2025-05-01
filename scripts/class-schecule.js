document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', options);

    // Sample schedule data for calendar view (0=Saturday to 6=Friday)
    const scheduleData = {
        spring2025: {
            // Saturday (0)
            0: [],
            // Sunday (1)
            1: [
                { time: '9:00 AM - 10:30 AM', course: 'SE 321', title: 'Software Engineering Web Application', room: 'AB4 611', faculty: 'Mr. Mujahidul Islam' },
                { time: '2:00 PM - 3:30 PM', course: 'SE 333', title: 'Artificial Intelligence', room: 'AB4 811', faculty: 'Dr. Mohammad Azam Khan' },
                { time: '4:00 PM - 5:30 PM', course: 'SE 544', title: 'Introduction to Machine Learning', room: 'AB4 612', faculty: 'Mr. Md. Sohel Arman' }
            ],
            // Monday (2)
            2: [
                { time: '8:00 AM - 9:30 AM', course: 'SE 334', title: 'Artificial Intelligence Lab', room: 'AB4 613', faculty: 'Dr. Mohammad Azam Khan' },
                { time: '11:00 AM - 12:30 PM', course: 'SE 322', title: 'Software Engineering Web Application Lab', room: 'AB4 614', faculty: 'Mr. Mujahidul Islam' }
            ],
            // Tuesday (3)
            3: [
                { time: '9:00 AM - 10:30 AM', course: 'SE 321', title: 'Software Engineering Web Application', room: 'AB4 611', faculty: 'Mr. Mujahidul Islam' },
                { time: '2:00 PM - 3:30 PM', course: 'SE 333', title: 'Artificial Intelligence', room: 'AB4 811', faculty: 'Dr. Mohammad Azam Khan' },
                { time: '4:00 PM - 5:30 PM', course: 'SE 544', title: 'Introduction to Machine Learning', room: 'AB4 612', faculty: 'Mr. Md. Sohel Arman' }
            ],
            // Wednesday (4)
            4: [],
            // Thursday (5)
            5: [
                { time: '10:00 AM - 1:00 PM', course: 'SE 422', title: 'Management Information System', room: 'AB4 611', faculty: 'Dr. Imran Mahmud' }
            ],
            // Friday (6)
            6: []
        }
    };

    // Time slots
    const timeSlots = [
        '8:00 AM - 9:30 AM',
        '9:30 AM - 11:00 AM',
        '11:00 AM - 12:30 PM',
        '12:30 PM - 2:00 PM',
        '2:00 PM - 3:30 PM',
        '3:30 PM - 5:00 PM',
        '5:00 PM - 6:30 PM'
    ];

    // Initialize calendar view
    renderCalendarView('spring2025');

    // View toggle functionality
    document.getElementById('list-view-btn').addEventListener('click', function() {
        document.querySelector('.course-list-view').style.display = 'block';
        document.querySelector('.calendar-view').style.display = 'none';
        this.classList.add('active');
        document.getElementById('calendar-view-btn').classList.remove('active');
    });

    document.getElementById('calendar-view-btn').addEventListener('click', function() {
        document.querySelector('.course-list-view').style.display = 'none';
        document.querySelector('.calendar-view').style.display = 'block';
        this.classList.add('active');
        document.getElementById('list-view-btn').classList.remove('active');
    });

    // Drop button functionality
    document.querySelectorAll('.btn-drop').forEach(btn => {
        btn.addEventListener('click', function() {
            const courseCode = this.closest('tr').querySelector('td:first-child').textContent;
            if(confirm(`Are you sure you want to drop ${courseCode}?`)) {
                this.closest('tr').style.opacity = '0.5';
                this.disabled = true;
                this.textContent = 'Dropped';
            }
        });
    });

    // Print button event
    document.getElementById('print-schedule').addEventListener('click', function() {
        window.print();
    });

    // Notification click
    document.querySelector('.notifications').addEventListener('click', function() {
        alert('You have 2 new notifications');
        this.querySelector('.badge').style.display = 'none';
    });

    function renderCalendarView(semester) {
        const tbody = document.getElementById('schedule-body');
        tbody.innerHTML = '';

        timeSlots.forEach(time => {
            const row = document.createElement('tr');
            
            // Time cell
            const timeCell = document.createElement('td');
            timeCell.textContent = time;
            row.appendChild(timeCell);

            // Day cells (Saturday to Friday)
            for (let day = 0; day < 7; day++) {
                const cell = document.createElement('td');
                const classes = scheduleData[semester][day].filter(cls => cls.time === time);
                
                if (classes.length > 0) {
                    classes.forEach(cls => {
                        const classDiv = document.createElement('div');
                        classDiv.className = 'class-slot';
                        classDiv.innerHTML = `
                            <div class="class-course">${cls.course}</div>
                            <div class="class-info">${cls.title}</div>
                            <div class="class-info">${cls.faculty}</div>
                            <span class="class-room">${cls.room}</span>
                        `;
                        cell.appendChild(classDiv);
                    });
                }
                
                row.appendChild(cell);
            }

            tbody.appendChild(row);
        });
    }
});