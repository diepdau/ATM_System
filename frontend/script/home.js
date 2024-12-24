 const userEmail = localStorage.getItem("user");
 if (!userEmail) {
     alert("Bạn chưa đăng nhập!");
     window.location.href = "/";
 } else {
     document.getElementById('userEmail').textContent = userEmail;
 }
    document.getElementById('viewInfo').addEventListener('click', function() {
     window.location.href = "accountInfo"; 
 });
