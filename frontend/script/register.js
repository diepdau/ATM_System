document.getElementById('registerForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const response = await fetch('http://localhost:8000/v1/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (response.ok) {
            const data = await response.json();
            alert('Đăng ký thành công!');
            window.location.href = '/'; 
        } else {
            const error = await response.json();
            alert(error.message || 'Đăng ký thất bại!');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Đã xảy ra lỗi khi đăng ký.');
    }
});
