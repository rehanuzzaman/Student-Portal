document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = new Date().toLocaleDateString('en-US', options);

    // Initialize rating widgets
    $(".rateyo").rateYo({
        rating: 0,
        starWidth: "20px",
        normalFill: "#e2e8f0",
        ratedFill: "#f59e0b",
        fullStar: true,
        spacing: "5px"
    });

    $(".rateyo-readonly").rateYo({
        rating: 4.5,
        starWidth: "20px",
        normalFill: "#e2e8f0",
        ratedFill: "#10b981",
        fullStar: true,
        spacing: "5px",
        readOnly: true
    });

    // Form submission
    $(".evaluation-form").on("submit", function(e) {
        e.preventDefault();
        const form = $(this);
        const submitBtn = form.find(".btn-submit");
        
        // Disable button during submission
        submitBtn.html('<i class="fas fa-spinner fa-spin"></i> Submitting...');
        submitBtn.prop("disabled", true);
        
        // Simulate API call
        setTimeout(() => {
            // In a real app, this would submit to the server
            submitBtn.html('<i class="fas fa-check"></i> Submitted');
            
            // Update progress
            updateEvaluationProgress();
            
            // Remove card after submission
            setTimeout(() => {
                form.closest(".course-card").fadeOut(300, function() {
                    $(this).remove();
                });
            }, 1000);
        }, 1500);
    });

    // Notification click
    document.querySelector(".notifications").addEventListener("click", function() {
        alert("You have 2 new notifications");
        this.querySelector(".badge").style.display = "none";
    });

    function updateEvaluationProgress() {
        const progressFill = document.querySelector(".progress-fill");
        const progressText = document.querySelector(".progress-container span");
        
        // Calculate new progress (in a real app, this would come from server)
        const current = parseInt(progressText.textContent.match(/\d+/)[0]);
        const total = parseInt(progressText.textContent.match(/of (\d+)/)[1]);
        const newProgress = current + 1;
        
        // Update UI
        progressFill.style.width = `${(newProgress / total) * 100}%`;
        progressText.textContent = `${newProgress} of ${total} courses evaluated`;
    }
});