document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch('http://localhost:8000/v1/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('user', data.email);
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('balance', data.balance);
            alert('Đăng nhập thành công!');
            window.location.href = '/home'; 
        } else {
            const error = await response.json();
            alert(error.message || 'Đăng nhập thất bại!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi khi đăng nhập.');
    }
});