document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', options);

    // Meeting form submission
    const meetingForm = document.getElementById('meeting-form');
    if (meetingForm) {
        meetingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = meetingForm.querySelector('.btn-submit');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Get form values
                const date = document.getElementById('meeting-date').value;
                const time = document.getElementById('meeting-time').value;
                const purpose = document.getElementById('meeting-purpose').value;
                
                // Create new meeting item
                const meetingList = document.querySelector('.meeting-list');
                const newMeeting = document.createElement('div');
                newMeeting.className = 'meeting-item';
                
                const dateObj = new Date(date);
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                
                newMeeting.innerHTML = `
                    <div class="meeting-date">
                        <span class="day">${dateObj.getDate()}</span>
                        <span class="month">${monthNames[dateObj.getMonth()]}</span>
                    </div>
                    <div class="meeting-info">
                        <h4>${document.getElementById('meeting-purpose').options[document.getElementById('meeting-purpose').selectedIndex].text}</h4>
                        <p><i class="fas fa-clock"></i> ${time} - ${add30Minutes(time)}</p>
                        <p><i class="fas fa-map-marker-alt"></i> AB4-502</p>
                        <span class="meeting-status pending">Pending Approval</span>
                    </div>
                `;
                
                // Add to the top of the list
                meetingList.insertBefore(newMeeting, meetingList.firstChild);
                
                // Reset form
                meetingForm.reset();
                submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Request';
                submitBtn.disabled = false;
                
                // Show success message
                alert('Meeting request sent successfully!');
            }, 1500);
        });
    }

    // Message send functionality
    const messageInput = document.querySelector('.message-input textarea');
    const sendBtn = document.querySelector('.btn-send');
    
    if (sendBtn && messageInput) {
        sendBtn.addEventListener('click', function() {
            sendMessage();
        });
        
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    // Notification click
    document.querySelector('.notifications').addEventListener('click', function() {
        alert('You have 2 new notifications');
        this.querySelector('.badge').style.display = 'none';
    });

    function add30Minutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        let newHours = hours;
        let newMinutes = minutes + 30;
        
        if (newMinutes >= 60) {
            newHours += 1;
            newMinutes -= 60;
        }
        
        return `${newHours.toString().padStart(2, '0')}:${newMinutes.toString().padStart(2, '0')}`;
    }

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (messageText === '') return;
        
        const messageList = document.querySelector('.message-list');
        const newMessage = document.createElement('div');
        newMessage.className = 'message-item student';
        
        newMessage.innerHTML = `
            <div class="message-avatar">
                <img src="./assets/avatar.png" alt="Student Avatar">
            </div>
            <div class="message-content">
                <div class="message-header">
                    <span class="sender">You</span>
                    <span class="time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div class="message-text">
                    <p>${messageText}</p>
                </div>
            </div>
        `;
        
        messageList.appendChild(newMessage);
        messageInput.value = '';
        
        // Auto scroll to bottom
        messageList.scrollTop = messageList.scrollHeight;
        
        // Simulate mentor reply after 1-3 seconds
        setTimeout(() => {
            const replies = [
                "Thanks for your message. I'll get back to you soon.",
                "That's a good question. Let's discuss this in our next meeting.",
                "I appreciate your initiative. We can work on this together.",
                "Please send me more details about this via email."
            ];
            
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            
            const mentorReply = document.createElement('div');
            mentorReply.className = 'message-item mentor';
            
            mentorReply.innerHTML = `
                <div class="message-avatar">
                    <img src="./assets/mentor-avatar.png" alt="Mentor Avatar">
                </div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="sender">Dr. Imran Mahmud</span>
                        <span class="time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <div class="message-text">
                        <p>${randomReply}</p>
                    </div>
                </div>
            `;
            
            messageList.appendChild(mentorReply);
            messageList.scrollTop = messageList.scrollHeight;
        }, 1000 + Math.random() * 2000);
    }
});