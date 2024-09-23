document.getElementById('submit').addEventListener('click', function myfunction(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Retrieve form elements
    var rollNumber = document.getElementById("rollNumber").value;
    var name = document.getElementById("name").value;
    var yearOfStudy = document.getElementById("yearOfStudy").value;
    var age = document.getElementById("age").value;
    var gender = document.getElementById("gender").value;
    var email = document.getElementById("email").value;

    // Retrieve interests
    var interests = [];
    var checkboxes = document.getElementsByName("interests");
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            interests.push(checkbox.value);
        }
    });

    // Retrieve hobbies
    var hobbies = [];
    checkboxes = document.getElementsByName("hobbies");
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            hobbies.push(checkbox.value);
        }
    });

    // Construct JavaScript object
    var formData = {
        "rollNumber": rollNumber,
        "name": name,
        "yearOfStudy": yearOfStudy,
        "age": age,
        "gender": gender,
        "email": email,
        "interests": interests,
        "hobbies": hobbies
    };

    let filePath = 'student.json';
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(students => {
            let matchFound = false;
            students.forEach(student => {
                let ageDifference = Math.abs(student.age - age);
                if ((ageDifference <= 4) && student.gender !== gender) {
                    let interestsMatch = student.Interests.filter(interest => formData.interests.includes(interest)).length >= 1;
                    let hobbiesMatch = student.Hobbies.filter(hobby => formData.hobbies.includes(hobby)).length >= 1;
                    if (interestsMatch && hobbiesMatch) {
                        console.log('Perfect match (within age difference) with at least one hobby and one interest match:', student);
                        let queryString = `?photo=${encodeURIComponent(student.Photo)}
                        &Name=${student.Name}
                        &IITB_Roll_Number=${student.IITB_Roll_Number}
                        &yearOfStudy=${student.yearOfStudy}
                        &age=${student.age}
                        &gender=${student.gender}
                        &email=${student.Email}
                        &interests=${student.Interests}
                        &hobbies=${student.Hobbies}`;

                        // Redirect to another.html with the query string
                        window.location.href = 'another.html' + queryString;
                        matchFound = true;
                    }
                }
            });
            if (!matchFound) {
                console.log('No perfect match found');
                // Display a message indicating no perfect match found
                window.location.href = 'nomatch.html?noMatch=true';
            }

              if (rollNumber === "" || name === "" || yearOfStudy === "" || age === "" || email === "") {
        alert("Please fill in all required fields.");
        event.preventDefault(); // Prevent form submission if fields are empty
        return; // Exit the function if any required field is empty
    }
        });
});
