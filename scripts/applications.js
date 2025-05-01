document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', options);

    // Application type cards click handler
    document.querySelectorAll('.type-card').forEach(card => {
        card.addEventListener('click', function() {
            const appType = this.getAttribute('data-type');
            document.getElementById('app-type').value = appType;
            
            // Scroll to form
            document.getElementById('new-application').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Application form submission
    const appForm = document.getElementById('application-form');
    if (appForm) {
        appForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = appForm.querySelector('.btn-submit');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Get form values
                const appType = document.getElementById('app-type').value;
                const appSubject = document.getElementById('app-subject').value;
                const appDetails = document.getElementById('app-details').value;
                
                // Create new application item
                const appList = document.querySelector('.application-list');
                const newApp = document.createElement('div');
                newApp.className = 'application-item';
                
                newApp.innerHTML = `
                    <div class="app-header">
                        <h4>${appSubject}</h4>
                        <span class="app-status processing">Processing</span>
                    </div>
                    <div class="app-body">
                        <div class="app-meta">
                            <span><i class="fas fa-calendar"></i> Submitted: ${new Date().toLocaleDateString('en-US', options)}</span>
                            <span><i class="fas fa-clock"></i> Updated: ${new Date().toLocaleDateString('en-US', options)}</span>
                        </div>
                        <p class="app-note">${appDetails}</p>
                        <div class="app-actions">
                            <button class="btn-view">
                                <i class="fas fa-eye"></i> View Details
                            </button>
                            <button class="btn-cancel">
                                <i class="fas fa-times"></i> Cancel
                            </button>
                        </div>
                    </div>
                `;
                
                // Add to the top of the list
                appList.insertBefore(newApp, appList.firstChild);
                
                // Reset form
                appForm.reset();
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit Application';
                submitBtn.disabled = false;
                
                // Show success message
                alert('Application submitted successfully!');
            }, 1500);
        });
    }

    // Cancel application button handler
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-cancel')) {
            if (confirm('Are you sure you want to cancel this application?')) {
                const appItem = e.target.closest('.application-item');
                appItem.querySelector('.app-status').textContent = 'Cancelled';
                appItem.querySelector('.app-status').className = 'app-status rejected';
                e.target.disabled = true;
            }
        }
    });

    // View application button handler
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-view')) {
            const appItem = e.target.closest('.application-item');
            const appTitle = appItem.querySelector('h4').textContent;
            const appStatus = appItem.querySelector('.app-status').textContent;
            const appNote = appItem.querySelector('.app-note').textContent;
            
            alert(`Application Details:\n\nTitle: ${appTitle}\nStatus: ${appStatus}\n\n${appNote}`);
        }
    });

    // Notification click
    document.querySelector('.notifications').addEventListener('click', function() {
        alert('You have 2 new notifications');
        this.querySelector('.badge').style.display = 'none';
    });
});