
// nav bar start
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const dropdown = document.querySelector('.dropdown');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


dropdown.addEventListener('click', () => {
    dropdown.classList.toggle('active');
});
// nav bar end

// form start
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); 

    // Clear previous errors
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    // Form validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    let isValid = true;

    if (name === '') {
        document.getElementById('nameError').textContent = 'Name is required.';
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Invalid email format.';
        isValid = false;
    }

    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters.';
        isValid = false;
    }

    if (isValid) {
        window.location.href = 'index1.html'; // Redirect on successful validation
    }
});


// form end

