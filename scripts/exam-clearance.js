document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', options);

    // Check clearance status
    document.getElementById('check-clearance').addEventListener('click', function() {
        checkClearanceStatus();
    });

    // Print clearance form
    document.getElementById('print-clearance').addEventListener('click', function() {
        printClearanceForm();
    });

    // Notification click
    document.querySelector('.notifications').addEventListener('click', function() {
        alert('You have 2 new notifications');
        this.querySelector('.badge').style.display = 'none';
    });

    function checkClearanceStatus() {
        const btn = document.getElementById('check-clearance');
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Checking...';
        btn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // In a real app, this would fetch data from the server
            updateAccountsStatus();
            
            btn.innerHTML = '<i class="fas fa-check"></i> Status Updated';
            setTimeout(() => {
                btn.innerHTML = '<i class="fas fa-sync"></i> Check Clearance Status';
                btn.disabled = false;
            }, 2000);
        }, 1500);
    }

    function updateAccountsStatus() {
        // Simulate accounts clearance completion
        const accountsStatus = document.querySelector('.status-card.accounts .status-badge');
        const accountsInfo = document.querySelector('.status-card.accounts p');
        
        if (accountsStatus.classList.contains('pending')) {
            accountsStatus.classList.remove('pending');
            accountsStatus.classList.add('cleared');
            accountsStatus.textContent = 'Cleared';
            
            accountsInfo.textContent = 'Last updated: ' + new Date().toLocaleDateString('en-US', { 
                year: 'numeric', month: 'long', day: 'numeric' 
            });
            
            // Enable print button if all clearances are done
            checkAllClearances();
        }
    }

    function checkAllClearances() {
        const allCleared = document.querySelectorAll('.status-badge').length === 
                         document.querySelectorAll('.status-badge.cleared').length;
        
        if (allCleared) {
            document.getElementById('print-clearance').disabled = false;
            document.querySelector('.status-card.registrar .status-badge').classList.remove('not-cleared');
            document.querySelector('.status-card.registrar .status-badge').classList.add('cleared');
            document.querySelector('.status-card.registrar .status-badge').textContent = 'Cleared';
            document.querySelector('.status-card.registrar p').textContent = 'Ready to print clearance form';
        }
    }

    function printClearanceForm() {
        // In a real app, this would generate a printable clearance form
        alert('Exam clearance form would be generated and printed here.\nAll clearances are verified!');
    }
});