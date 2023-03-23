function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    let username1="admin";
    let password1="password";
    if (username == "" || password == "") {
      alert("Please enter both username and password.");
      
    }else if(username == username1 && password == password1) {
        window.location.href="dashboard.html";
    }else{
        alert("Username or password is incorrect");
        return false;
    }
  }
  