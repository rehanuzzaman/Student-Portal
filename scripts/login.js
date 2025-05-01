document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const passwordInput = document.getElementById('password');
  const togglePassword = document.querySelector('.toggle-password');
  const demoCredentials = {
      id: '222-35-1091',
      password: 'diu@123456789'
  };

  // Toggle password visibility
  if (togglePassword) {
      togglePassword.addEventListener('click', function() {
          const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
          passwordInput.setAttribute('type', type);
          this.classList.toggle('fa-eye-slash');
      });
  }

  // Form submission
  if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form values
          const studentId = document.getElementById('studentId').value.trim();
          const password = document.getElementById('password').value.trim();
          const rememberMe = document.getElementById('remember').checked;
          
          // Reset errors
          hideError('idError');
          hideError('passwordError');
          
          // Validate inputs
          let isValid = true;
          
          if (!studentId) {
              showError('idError', 'Student ID is required');
              isValid = false;
          } else if (!/^\d{3}-\d{2}-\d{4}$/.test(studentId)) {
              showError('idError', 'Invalid ID format (e.g. 222-35-1091)');
              isValid = false;
          }
          
          if (!password) {
              showError('passwordError', 'Password is required');
              isValid = false;
          } else if (password.length < 8) {
              showError('passwordError', 'Password must be at least 8 characters');
              isValid = false;
          }
          
          // Demo validation
          if (isValid) {
              if (studentId === demoCredentials.id && password === demoCredentials.password) {
                  // Simulate successful login
                  setLoading(true);
                  
                  setTimeout(() => {
                      window.location.href = 'dashboard.html';
                  }, 1000);
              } else {
                  showError('passwordError', 'Invalid Student ID or Password');
                  setLoading(false);
              }
          }
      });
  }

  function showError(elementId, message) {
      const errorElement = document.getElementById(elementId);
      errorElement.textContent = message;
      errorElement.style.display = 'block';
  }

  function hideError(elementId) {
      const errorElement = document.getElementById(elementId);
      errorElement.textContent = '';
      errorElement.style.display = 'none';
  }

  function setLoading(isLoading) {
      const button = loginForm.querySelector('button[type="submit"]');
      
      if (isLoading) {
          button.disabled = true;
          button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Authenticating...';
      } else {
          button.disabled = false;
          button.innerHTML = '<span>Sign In</span><i class="fas fa-arrow-right"></i>';
      }
  }
});