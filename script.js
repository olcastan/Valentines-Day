// script.js

var noImages = ['dez_eyebrows.JPEG', 'dog-crying-meme-doggo-crys.gif', 'dog_seatbelt.JPEG', 'ay cabron.JPEG', 'dog-why-you-lying.gif', 'dez_looking_up_sad.JPEG']; // Add your image filenames here
var yesImages = ['cat.gif', 'dez_gif.gif', 'dez_smiling_teef.JPEG', 'quiero_perrear.gif', 'shake_you_hips.gif', 'baby-ai.gif', 'cat_kissing_camera.gif', 'traffic-dog-smile.gif']; // Add your happy image filenames here
var lastNoImage = null; // Track the last "No" image to avoid repeats
var yesMessage = "It's our first Valentine's being married! Get ready to spend a wonderful day with your husband as we explore our hometown and have fun together!! \n\nWhat you will need: \n- an overnight bag with at least 1 change of clothes \n- a nice outfit to enjoy a romantic dinner (dinner will take place at 9:30pm) \n- ooo pls don't be mad at you husband hehe \n- nothing else! let's have a fun day together, just us💕"; // EDIT THIS TEXT to customize the message

// Function to handle button click events
function selectOption(option) {
    // Check which option was clicked
    if (option === 'yes') {
        // Flash rainbow colors
        flashRainbowColors(function() {
            document.getElementById('question').style.display = 'none'; // Hide the question
            displayHappyImages(); // Display random happy images across the page (around the message)
            showYesMessage(); // Show the custom message last so it appears on top
        });
    } else if (option === 'no') {
        // Display a random image from the noImages array (different from last one)
        var randomImage;
        do {
            randomImage = noImages[Math.floor(Math.random() * noImages.length)];
        } while (randomImage === lastNoImage && noImages.length > 1);
        lastNoImage = randomImage;
        displayImage(randomImage);
        
        // Change text on the "No" button to "You sure?"
        document.getElementById('no-button').innerText = 'You sure?'; 
        
        // Move the "No" button to a random position
        moveNoButton();
    } else {
        // If neither "Yes" nor "No" was clicked, show an alert message
        alert('Invalid option!');
    }
}

// Function to move the "No" button to a random position on the page
function moveNoButton() {
    var noButton = document.getElementById('no-button');
    
    // Get viewport dimensions
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;
    
    // Get button dimensions
    var buttonWidth = noButton.offsetWidth;
    var buttonHeight = noButton.offsetHeight;
    
    // Calculate random position (keeping button fully visible)
    var randomX = Math.random() * (viewportWidth - buttonWidth - 40) + 20; // 20px margin
    var randomY = Math.random() * (viewportHeight - buttonHeight - 40) + 20; // 20px margin
    
    // Apply absolute positioning
    noButton.style.position = 'fixed';
    noButton.style.left = randomX + 'px';
    noButton.style.top = randomY + 'px';
    noButton.style.margin = '0'; // Remove default margin
}

// Function to flash rainbow colors and then execute a callback function
function flashRainbowColors(callback) {
    var colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
    var i = 0;
    var interval = setInterval(function() {
        document.body.style.backgroundColor = colors[i];
        i = (i + 1) % colors.length;
    }, 200); // Change color every 200 milliseconds
    setTimeout(function() {
        clearInterval(interval);
        document.body.style.backgroundColor = ''; // Reset background color
        if (callback) {
            callback();
        }
    }, 2000); // Flash colors for 2 seconds
}

// Function to display the cat.gif initially
function displayCat() {
    // Get the container where the image will be displayed
    var imageContainer = document.getElementById('image-container');
    // Create a new Image element for the cat
    var catImage = new Image();
    // Set the source (file path) for the cat image
    catImage.src = 'monkey.JPEG'; // Assuming the cat image is named "cat.gif"
    // Set alternative text for the image (for accessibility)
    catImage.alt = 'Cat';
    // When the cat image is fully loaded, add it to the image container
    catImage.onload = function() {
        imageContainer.appendChild(catImage);
    };
}

// Helper function to display any image
function displayImage(imageSrc) {
    document.getElementById('image-container').innerHTML = '';
    var imageContainer = document.getElementById('image-container');
    var newImage = new Image();
    newImage.src = imageSrc;
    newImage.alt = 'Image';
    newImage.onload = function() {
        imageContainer.appendChild(newImage);
    };
}

// Function to display random happy images across the page
function displayHappyImages() {
    // Clear existing content in the image container
    document.getElementById('image-container').innerHTML = '';
    // Hide the options container
    document.getElementById('options').style.display = 'none';
    
    // Create a container for the happy images
    var happyContainer = document.createElement('div');
    happyContainer.id = 'happy-container';
    document.body.appendChild(happyContainer);
    
    // Display each image from the yesImages array at positions that avoid the center
    yesImages.forEach(function(imageSrc, index) {
        var img = new Image();
        img.src = imageSrc;
        img.className = 'happy-image';
        
        // Create zones in corners and edges, avoiding center (30%-70% horizontally, 20%-80% vertically)
        var zones = [
            {x: [2, 20], y: [5, 25]},      // Top left corner
            {x: [80, 95], y: [5, 25]},     // Top right corner
            {x: [2, 20], y: [75, 95]},     // Bottom left corner
            {x: [80, 95], y: [75, 95]},    // Bottom right corner
            {x: [2, 15], y: [35, 50]},     // Middle left edge
            {x: [85, 98], y: [35, 50]},    // Middle right edge
            {x: [35, 45], y: [2, 12]},     // Top center edge
            {x: [55, 65], y: [88, 98]}     // Bottom center edge
        ];
        
        // Assign each image to a zone
        var zone = zones[index % zones.length];
        var randomX = Math.random() * (zone.x[1] - zone.x[0]) + zone.x[0];
        var randomY = Math.random() * (zone.y[1] - zone.y[0]) + zone.y[0];
        
        img.style.position = 'fixed';
        img.style.left = randomX + '%';
        img.style.top = randomY + '%';
        img.style.maxWidth = '150px';
        img.style.maxHeight = '150px';
        img.style.transform = 'translate(-50%, -50%)'; // Center the image on its position
        
        // Add a slight delay to each image appearing for a cascading effect
        setTimeout(function() {
            happyContainer.appendChild(img);
        }, index * 200); // 200ms delay between each image
    });
}

// Function to show the "Yes" message in the center
function showYesMessage() {
    var messageBox = document.createElement('div');
    messageBox.id = 'yes-message';
    
    // Split message into lines and create proper HTML structure
    var lines = yesMessage.split('\n');
    var formattedHTML = '';
    
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].trim() !== '') {
            formattedHTML += '<p>' + lines[i] + '</p>';
        }
    }
    
    messageBox.innerHTML = formattedHTML;
    document.body.appendChild(messageBox);
    
    // Add animation class after a short delay
    setTimeout(function() {
        messageBox.classList.add('show');
    }, 100);
}

// Display the cat.gif initially
displayCat();