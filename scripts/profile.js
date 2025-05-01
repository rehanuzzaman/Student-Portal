document.addEventListener('DOMContentLoaded', function() {
    // Set current date
    document.getElementById('current-date').textContent = 'May 15, 2025';

    // DOM Elements
    const editProfileBtn = document.getElementById('editProfileBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const editProfileModal = document.getElementById('editProfileModal');
    const profileForm = document.getElementById('profileForm');
    const uploadImageBtn = document.getElementById('uploadImageBtn');
    const profileImage = document.getElementById('profileImage');

    // Event Listeners
    editProfileBtn.addEventListener('click', openEditModal);
    closeModalBtn.addEventListener('click', closeEditModal);
    cancelEditBtn.addEventListener('click', closeEditModal);
    profileForm.addEventListener('submit', saveProfileChanges);
    uploadImageBtn.addEventListener('click', triggerImageUpload);

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === editProfileModal) {
            closeEditModal();
        }
    });

    // Functions
    function openEditModal() {
        editProfileModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeEditModal() {
        editProfileModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    function saveProfileChanges(e) {
        e.preventDefault();
        
        // Get form values
        const fullName = document.getElementById('editFullName').value;
        const phone = document.getElementById('editPhone').value;
        const email = document.getElementById('editEmail').value;
        const presentAddress = document.getElementById('editPresentAddress').value;
        const permanentAddress = document.getElementById('editPermanentAddress').value;
        const emergencyContact = document.getElementById('editEmergencyContact').value;
        
        // Update profile display
        document.getElementById('fullName').textContent = fullName;
        document.getElementById('phone').textContent = phone;
        document.getElementById('email').textContent = email;
        document.getElementById('presentAddress').textContent = presentAddress;
        document.getElementById('permanentAddress').textContent = permanentAddress;
        document.getElementById('emergencyContact').textContent = emergencyContact;
        
        // Show success message
        alert('Profile updated successfully!');
        closeEditModal();
    }

    function triggerImageUpload() {
        // Create hidden file input
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    profileImage.src = event.target.result;
                    // In a real app, you would upload the image to server here
                };
                reader.readAsDataURL(file);
            }
        });
        
        fileInput.click();
    }

    // Load profile data (simulated)
    function loadProfileData() {
        // In a real app, this would come from an API
        const profileData = {
            fullName: "John Michael Doe",
            dob: "January 15, 2003",
            gender: "Male",
            bloodGroup: "O+",
            nationality: "Bangladeshi",
            religion: "Islam",
            email: "john.doe@student.diu.edu.bd",
            phone: "+880 1712 345678",
            emergencyContact: "+880 1812 345678 (Father)",
            presentAddress: "123/A, Dhanmondi, Dhaka-1209",
            permanentAddress: "456/B, Mirpur, Dhaka-1216",
            department: "Computer Science & Engineering",
            program: "B.Sc. in CSE",
            batch: "2022",
            studentType: "Regular",
            admissionDate: "January 10, 2022",
            graduationDate: "December 2025"
        };

        // Populate the form fields
        document.getElementById('editFullName').value = profileData.fullName;
        document.getElementById('editPhone').value = profileData.phone;
        document.getElementById('editEmail').value = profileData.email;
        document.getElementById('editPresentAddress').value = profileData.presentAddress;
        document.getElementById('editPermanentAddress').value = profileData.permanentAddress;
        document.getElementById('editEmergencyContact').value = profileData.emergencyContact;
    }

    // Initialize profile data
    loadProfileData();
});