document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const validUsername = 'user'; // replace with your username
    const validPassword = 'password'; // replace with your password

    if (username === validUsername && password === validPassword) {
        window.location.href = 'dashboard.html'; // redirect to a dashboard or home page
    } else {
        document.getElementById('error-message').textContent = 'Invalid username or password.';
    }
});