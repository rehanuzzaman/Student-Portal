document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    document.getElementById('current-date').textContent = 'May 15, 2025';

    // DOM Elements
    const newRegBtn = document.getElementById('newRegistrationBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelRegBtn = document.getElementById('cancelRegistrationBtn');
    const registrationModal = document.getElementById('registrationModal');
    const registrationForm = document.getElementById('registrationForm');
    const courseCheckboxes = document.querySelectorAll('.course-option input[type="checkbox"]');
    const printBtn = document.querySelector('.print-btn');
    const viewDetailBtns = document.querySelectorAll('.view-details-btn');
    const dropCourseBtns = document.querySelectorAll('.action-btn.drop');

    // Event Listeners
    newRegBtn.addEventListener('click', openRegistrationModal);
    closeModalBtn.addEventListener('click', closeRegistrationModal);
    cancelRegBtn.addEventListener('click', closeRegistrationModal);
    registrationForm.addEventListener('submit', submitRegistration);
    courseCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateCourseSelection);
    });
    printBtn.addEventListener('click', printSchedule);
    viewDetailBtns.forEach(btn => {
        btn.addEventListener('click', viewRegistrationDetails);
    });
    dropCourseBtns.forEach(btn => {
        btn.addEventListener('click', dropCourse);
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === registrationModal) {
            closeRegistrationModal();
        }
    });

    // Filter registration history
    document.getElementById('historyFilter').addEventListener('change', function() {
        const year = this.value;
        const cards = document.querySelectorAll('.history-card');
        
        cards.forEach(card => {
            const cardYear = card.querySelector('h4').textContent.split(' ')[1];
            if (year === 'all' || cardYear === year) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Functions
    function openRegistrationModal() {
        registrationModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeRegistrationModal() {
        registrationModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function updateCourseSelection() {
        const selectedCount = document.querySelectorAll('.course-option input[type="checkbox"]:checked').length;
        const totalCredits = selectedCount * 3; // Assuming each course is 3 credits
        const registrationFee = selectedCount * 1000; // 1000 BDT per course
        
        document.getElementById('selectedCount').textContent = selectedCount;
        document.getElementById('totalCredits').textContent = totalCredits;
        document.getElementById('registrationFee').textContent = `৳ ${registrationFee.toLocaleString()}`;
    }

    function submitRegistration(e) {
        e.preventDefault();
        
        const semester = document.getElementById('semesterSelect').value;
        const selectedCourses = Array.from(document.querySelectorAll('.course-option input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);
        
        if (!semester) {
            alert('Please select a semester');
            return;
        }
        
        if (selectedCourses.length === 0) {
            alert('Please select at least one course');
            return;
        }
        
        // Simulate registration processing
        alert(`Registration submitted for ${semester} with ${selectedCourses.length} courses\nTotal Fee: ৳ ${selectedCourses.length * 1000}`);
        closeRegistrationModal();
        
        // In a real app, this would send data to the server
    }

    function printSchedule() {
        alert('Opening print preview for current semester schedule...');
        // In a real app, this would open the browser's print dialog
    }

    function viewRegistrationDetails() {
        const semester = this.closest('.history-card').querySelector('h4').textContent;
        alert(`Viewing detailed registration for ${semester}\nThis would open a detailed view in a real app.`);
    }

    function dropCourse() {
        const courseCode = this.closest('tr').querySelector('td').textContent;
        if (confirm(`Are you sure you want to drop ${courseCode}?`)) {
            alert(`${courseCode} dropped successfully\nThis would update the server in a real app.`);
            // In a real app, this would remove the row after server confirmation
        }
    }
});