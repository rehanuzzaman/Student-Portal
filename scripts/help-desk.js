document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', options);

    // Help option cards click handler
    document.querySelectorAll('.option-card').forEach(card => {
        card.addEventListener('click', function() {
            const target = this.getAttribute('data-target');
            
            // Hide all sections
            document.querySelectorAll('.help-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            document.getElementById(target).classList.add('active');
        });
    });

    // FAQ accordion functionality
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                answer.style.display = 'block';
            }
        });
    });

    // Ticket form submission
    const ticketForm = document.getElementById('support-ticket-form');
    if (ticketForm) {
        ticketForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = ticketForm.querySelector('.btn-submit');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Get form values
                const subject = document.getElementById('ticket-subject').value;
                const category = document.getElementById('ticket-category').value;
                
                // Create new ticket item
                const ticketList = document.querySelector('.ticket-list');
                const newTicket = document.createElement('div');
                newTicket.className = 'ticket-item';
                
                newTicket.innerHTML = `
                    <div class="ticket-header">
                        <h4>${subject}</h4>
                        <span class="ticket-status processing">Processing</span>
                    </div>
                    <div class="ticket-body">
                        <div class="ticket-meta">
                            <span><i class="fas fa-calendar"></i> Submitted: ${new Date().toLocaleDateString('en-US', options)}</span>
                            <span><i class="fas fa-tag"></i> Category: ${document.getElementById('ticket-category').options[document.getElementById('ticket-category').selectedIndex].text}</span>
                        </div>
                        <p class="ticket-desc">${document.getElementById('ticket-details').value}</p>
                        <div class="ticket-actions">
                            <button class="btn-view">
                                <i class="fas fa-eye"></i> View Details
                            </button>
                        </div>
                    </div>
                `;
                
                // Add to the top of the list
                ticketList.insertBefore(newTicket, ticketList.firstChild);
                
                // Reset form
                ticketForm.reset();
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Ticket';
                submitBtn.disabled = false;
                
                // Show success message
                alert('Support ticket submitted successfully! Ticket ID: DIU-' + Math.floor(Math.random() * 10000));
            }, 1500);
        });
    }

    // View ticket button handler
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-view') || e.target.closest('.btn-view')) {
            const ticketItem = e.target.closest('.ticket-item');
            const ticketTitle = ticketItem.querySelector('h4').textContent;
            const ticketStatus = ticketItem.querySelector('.ticket-status').textContent;
            const ticketDesc = ticketItem.querySelector('.ticket-desc').textContent;
            
            alert(`Ticket Details:\n\nSubject: ${ticketTitle}\nStatus: ${ticketStatus}\n\nDescription:\n${ticketDesc}`);
        }
    });

    // Notification click
    document.querySelector('.notifications').addEventListener('click', function() {
        alert('You have 2 new notifications');
        this.querySelector('.badge').style.display = 'none';
    });
});