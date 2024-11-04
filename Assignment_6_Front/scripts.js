document.addEventListener("DOMContentLoaded", () => {
    setupTaskManager();
    setupGreeting();
});



function setupTaskManager() {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTaskButton");
    const resetButton = document.getElementById("resetButton");
    const taskList = document.getElementById("taskList");
    const errorMessage = document.getElementById("errorMessage");
    const taskLimit = 3;
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F1C40F", "#9B59B6", "#E67E22", "#2ECC71", "#FFFFFF"];
    const changeColorButton = document.getElementById("changeColorButton");
    
    addTaskButton.addEventListener("click", addTask);
    resetButton.addEventListener("click", resetForm);
    taskInput.addEventListener("input", toggleAddButton);
    taskList.addEventListener("click", handleTaskListClick);
    changeColorButton.addEventListener("click", changeBackgroundColor);
    

    //hadles logic of adding task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (!taskText) return showError("Please enter a task.");
        if (taskList.children.length >= taskLimit) return showError("Task limit reached.");
        
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `<span>${taskText}</span><button class="btn btn-danger btn-sm delete-button" aria-label="Delete Task">Delete</button>`;
        taskList.appendChild(li);
        taskInput.value = "";
        hideError();
        toggleAddButton();
    }

    function handleTaskListClick(event) {
        if (event.target.classList.contains("delete-button")) {
            taskList.removeChild(event.target.parentElement);
        }
    }

    function toggleAddButton() {
        addTaskButton.disabled = !taskInput.value.trim();
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    function hideError() {
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }

    function changeBackgroundColor() {
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = randomColor;
    }


    
    //updates time 
    function updateDateTime() {
        const now = new Date();
        const options = { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
        document.getElementById('currentDateTime').innerText = `Current Date and Time: ${now.toLocaleString('en-US', options)}`;
    }


    //resets form
    function resetForm() {
      
        resetButton.disabled = true;
    
        document.querySelectorAll('input').forEach(input => input.value = '');
        taskList.innerHTML = ''; 
        hideError(); 
        resetButton.disabled = false; 
        //delays form reset by 2 seconds
        // setTimeout(() => {
        //     document.querySelectorAll('input').forEach(input => input.value = '');
        //     taskList.innerHTML = ''; 
        //     hideError(); 
        //     resetButton.disabled = false; 
        // }, 2000); 
    }

    updateDateTime();
    setInterval(updateDateTime, 60000);
}


//handles greetings form logic
document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("nameInput");
    const submitButton = document.getElementById("submitButton");
    const greetingElement = document.getElementById("greeting");

    submitButton.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const greetingMessage = getGreetingMessage();
        greetingElement.textContent = name ? `${greetingMessage}, ${name}!` : `${greetingMessage}, stranger!`;
        nameInput.value = ""; // Clear the input field
    });

    // Allow pressing "Enter" to submit the name
    nameInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            submitButton.click();
        }
    });
});


//Greetings logic that changes according to day time 
function getGreetingMessage() {
    const now = new Date();
    const hours = now.getHours();

    if (hours < 12) {
        return "Good morning";
    } else if (hours < 18) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}



//Multi-step form logic
document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll('.step');
    let currentStep = 0;

    // Load saved data from local storage
    loadSavedData();

    function loadSavedData() {
        document.getElementById('name').value = localStorage.getItem('name') || '';
        document.getElementById('email').value = localStorage.getItem('email') || '';
        document.getElementById('address').value = localStorage.getItem('address') || '';
        document.getElementById('city').value = localStorage.getItem('city') || '';
    }

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.style.display = index === stepIndex ? 'block' : 'none';
        });
    }

    function updateConfirmation() {
        document.getElementById('confirmName').textContent = document.getElementById('name').value;
        document.getElementById('confirmEmail').textContent = document.getElementById('email').value;
        document.getElementById('confirmAddress').textContent = document.getElementById('address').value;
        document.getElementById('confirmCity').textContent = document.getElementById('city').value;
    }

    function saveData() {
        localStorage.setItem('name', document.getElementById('name').value);
        localStorage.setItem('email', document.getElementById('email').value);
        localStorage.setItem('address', document.getElementById('address').value);
        localStorage.setItem('city', document.getElementById('city').value);
    }

    document.getElementById('nextButton1').addEventListener('click', () => {
        if (document.getElementById('name').value && document.getElementById('email').value) {
            saveData();
            currentStep++;
            showStep(currentStep);
        }
    });

    document.getElementById('nextButton2').addEventListener('click', () => {
        if (document.getElementById('address').value && document.getElementById('city').value) {
            updateConfirmation();
            saveData();
            currentStep++;
            showStep(currentStep);
        }
    });

    document.getElementById('backButton').addEventListener('click', () => {
        currentStep--;
        showStep(currentStep);
    });

    document.getElementById('backButton2').addEventListener('click', () => {
        currentStep--;
        showStep(currentStep);
    });

    document.getElementById('submitFormButton').addEventListener('click', () => {
        alert('Form submitted successfully!');
        // Clear local storage after form submission if desired
        localStorage.clear();
    });

    // Show the first step initially
    showStep(currentStep);
});


//Manages navigation witing nav usin keyboard
document.addEventListener("DOMContentLoaded", () => {
    setupKeyboardNavigation();
});


//Manages navigation within nav using keyboard 
function setupKeyboardNavigation() {
    const navItems = document.querySelectorAll("#navMenu .nav-link");
    let currentIndex = 0;

    // Set focus to the first item initially
    navItems[currentIndex].focus();

    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowDown") {
            // Move to the next item
            currentIndex = (currentIndex + 1) % navItems.length;
            navItems[currentIndex].focus();
            event.preventDefault(); // Prevent default scrolling behavior
        } else if (event.key === "ArrowUp") {
            // Move to the previous item
            currentIndex = (currentIndex - 1 + navItems.length) % navItems.length;
            navItems[currentIndex].focus();
            event.preventDefault(); // Prevent default scrolling behavior
        }
    });
}


//Plays a sound when button is clicked 
document.addEventListener("DOMContentLoaded", () => {
    const playSoundButton = document.getElementById("playSoundButton");
    const notificationSound = document.getElementById("notificationSound");

    playSoundButton.addEventListener("click", () => {
        notificationSound.currentTime = 0; // Rewind to start
        notificationSound.play(); // Play the sound
    });
});

document.getElementById('myForm').addEventListener('submit', function(event) {
    let valid = true;

    // Clear previous error messages
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmError').textContent = '';
    const successMessage = document.getElementById('successMessage');
    successMessage.style.display = 'none'; // Hide success message initially

    // Email validation
    const email = document.getElementById('email').value;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Invalid email format.';
        valid = false;
    }

    // Password validation
    const password = document.getElementById('password').value;
    if (password.length < 6) {
        document.getElementById('passwordError').textContent = 'Password must be at least 6 characters long.';
        valid = false;
    }

    // Confirm password validation
    const confirmPassword = document.getElementById('confirmPassword').value;
    if (password !== confirmPassword) {
        document.getElementById('confirmError').textContent = 'Passwords do not match.';
        valid = false;
    }

    // If valid, show success message
    if (valid) {
        event.preventDefault(); // Prevent actual form submission
        successMessage.style.display = 'block'; // Show success message
        successMessage.classList.add('fade-in'); // Add fade-in class for animation
        // Optionally, clear the form fields after success
        document.getElementById('myForm').reset();
    }

    // If any validation fails, prevent form submission
    if (!valid) {
        event.preventDefault();
    }
});




