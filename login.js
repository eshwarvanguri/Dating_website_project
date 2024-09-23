document.getElementById("loginForm").addEventListener("submit", function(eshwar) {
    eshwar.preventDefault(); 

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    fetch("login.json")
        .then(response => response.json())
        .then(data => {
            var user = data.find(user => user.username === username && user.password === password);
            if (user) {

                window.location.href = "findmatch.html";
            } else {
                
                alert("Invalid username or password");
            }
        })
        .catch(error => console.error("Error fetching data:", error));
});
