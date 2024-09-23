// Function to fetch user details from student.json
async function fetchUserDetails(username) {
  try {
    const response = await fetch('login.json');
    const data = await response.json();
    const user = data.find(u => u.username === username);
    return user;
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
}

async function checkUsername() {
  const username = document.getElementById("username").value;
  const user = await fetchUserDetails(username);
  if (user) {
    document.getElementById("usernameDiv").style.display = "block";
    document.getElementById("questionDiv").style.display = "block";
    document.getElementById("questionLabel").textContent = user.secret_question;
  } else {
    alert("Username not found.");
  }
}

async function checkAnswer() {
  const username = document.getElementById("username").value;
  const answer = document.getElementById("answer").value;
  const user = await fetchUserDetails(username);
  if (user && answer.toLowerCase() === user.answer.toLowerCase()) {
    document.getElementById("questionDiv").style.display = "block";
    document.getElementById("passwordDiv").style.display = "block";
    document.getElementById("password").textContent = "Your password is: " + user.password;
    document.getElementById("backtologin").style.display="block";
  } else {
    alert("Incorrect answer.");
  }
}
