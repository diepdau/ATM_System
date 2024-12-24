const userEmail = localStorage.getItem("user");
const balance = localStorage.getItem("balance");
const token = localStorage.getItem("token");
if (!userEmail) {
    alert("Bạn chưa đăng nhập!");
    window.location.href = "/";
} else {
    document.getElementById('userEmail').textContent = userEmail;
    document.getElementById('balance').textContent = balance || "0"; 
}
document.getElementById('goBack').addEventListener('click', function() {
    window.location.href = "home";
});

document.getElementById('logout').addEventListener('click', async function() {
    try {
    const response = await fetch('http://localhost:8000/v1/auth/logout', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.ok) {
        localStorage.clear();
        window.location.href = "/";
    } else {
        const errorData = await response.json();
        alert(`Lỗi khi đăng xuất: ${errorData.error || "Không xác định"}`);
    }
    } catch (error) {
        console.error(error);
        alert("Đã xảy ra lỗi khi đăng xuất.");
    }
});
document.getElementById('withdrawBtn').addEventListener('click', function() {
    const withdrawAmount = parseFloat(document.getElementById('amount').value);
    const currentBalance = parseFloat(balance);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
        alert("Vui lòng nhập số tiền hợp lệ!");
        return;
    }
    if (withdrawAmount > currentBalance) {
        alert("Số dư không đủ để rút!");
        return;
    }
    const newBalance = currentBalance - withdrawAmount;
    localStorage.setItem("balance", newBalance.toFixed(2));
    document.getElementById('balance').textContent = newBalance.toFixed(2); 
    alert(`Bạn đã rút ${withdrawAmount.toFixed(2)}. Số dư còn lại: ${newBalance.toFixed(2)}`);
});

        // const response = await fetch('http://localhost:8000/v1/user/withdraw', {
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`,
        //     },
        //     body: JSON.stringify({ amount: withdrawAmount }),
        // });

document.getElementById('depositForm').addEventListener('submit', function () {
    const depositAmount = parseFloat(document.getElementById('depositAmount').value);
    const currentBalance = parseFloat(localStorage.getItem('balance'));
    if (isNaN(depositAmount) || depositAmount <= 0) {
        alert("Vui lòng nhập số tiền hợp lệ!");
        return;
    }
    const newBalance = currentBalance + depositAmount;
    localStorage.setItem('balance', newBalance.toFixed(2));
    document.getElementById('balance').textContent = newBalance.toFixed(2);
    alert(`Bạn đã nạp ${depositAmount.toFixed(2)}. Số dư hiện tại: ${newBalance.toFixed(2)}`);
});
