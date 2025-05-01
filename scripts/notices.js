document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', options);

    // Sample notices data
    const notices = [
        {
            id: 1,
            category: 'important',
            title: 'Final Exam Schedule Published',
            content: 'Spring 2025 final exam schedule has been published. Check your routine immediately.',
            date: '2025-05-10',
            badge: 'Important'
        },
        {
            id: 2,
            category: 'general',
            title: 'Summer 2025 Registration Opens',
            content: 'Registration for Summer 2025 semester will begin on June 1, 2025.',
            date: '2025-05-05',
            badge: 'General'
        },
        {
            id: 3,
            category: 'transport',
            title: 'Summer Transport Schedule',
            content: 'Updated transport schedule for Summer 2025 has been published on the portal.',
            date: '2025-04-28',
            badge: 'Transport'
        }
    ];

    // Load notices
    renderNotices(notices);

    // Filter functionality
    document.getElementById('category-filter').addEventListener('change', function() {
        filterNotices();
    });

    document.getElementById('date-filter').addEventListener('change', function() {
        filterNotices();
    });

    // Refresh button
    document.getElementById('refresh-notices').addEventListener('click', function() {
        // In a real app, this would fetch new notices from the server
        renderNotices(notices);
        this.innerHTML = '<i class="fas fa-sync-alt"></i> Refreshed';
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
        }, 2000);
    });

    // Notification click
    document.querySelector('.notifications').addEventListener('click', function() {
        alert('You have 2 new notifications');
        this.querySelector('.badge').style.display = 'none';
    });

    function renderNotices(noticesToRender) {
        const noticeList = document.getElementById('notice-list');
        noticeList.innerHTML = '';

        if (noticesToRender.length === 0) {
            noticeList.innerHTML = '<div class="no-notices">No notices found matching your filters</div>';
            return;
        }

        noticesToRender.forEach(notice => {
            const noticeItem = document.createElement('div');
            noticeItem.className = 'notice-item';
            
            // Calculate days ago
            const noticeDate = new Date(notice.date);
            const today = new Date();
            const diffTime = Math.abs(today - noticeDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            noticeItem.innerHTML = `
                <div class="notice-header">
                    <span class="notice-badge ${notice.category}">${notice.badge}</span>
                    <span class="notice-date">${noticeDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="notice-body">
                    <h3 class="notice-title">${notice.title}</h3>
                    <p class="notice-text">${notice.content}</p>
                    <div class="notice-meta">
                        <span><i class="fas fa-calendar"></i> ${noticeDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span><i class="fas fa-clock"></i> ${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago</span>
                    </div>
                </div>
            `;
            
            noticeList.appendChild(noticeItem);
        });
    }

    function filterNotices() {
        const categoryFilter = document.getElementById('category-filter').value;
        const dateFilter = document.getElementById('date-filter').value;
        
        let filteredNotices = [...notices];
        
        // Apply category filter
        if (categoryFilter !== 'all') {
            filteredNotices = filteredNotices.filter(notice => notice.category === categoryFilter);
        }
        
        // Apply date filter
        if (dateFilter === 'recent') {
            filteredNotices.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (dateFilter === 'oldest') {
            filteredNotices.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (dateFilter === 'last-month') {
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
            filteredNotices = filteredNotices.filter(notice => new Date(notice.date) >= oneMonthAgo);
        }
        
        renderNotices(filteredNotices);
    }
});