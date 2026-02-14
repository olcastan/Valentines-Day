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
            displayHappyImages(); // Display random happy images across the page
            showYesMessage(); // Show the custom message
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
    document.getElementById('container').appendChild(happyContainer);
    
    // Create an array to track occupied areas to prevent overlap
    var occupiedAreas = [];
    
    // Display each image from the yesImages array at random positions
    yesImages.forEach(function(imageSrc, index) {
        var img = new Image();
        img.src = imageSrc;
        img.className = 'happy-image';
        
        var randomX, randomY, attempts = 0, maxAttempts = 50;
        var overlap = true;
        
        // Try to find a non-overlapping position
        while (overlap && attempts < maxAttempts) {
            // Random position between 5% and 75% to ensure images stay visible
            randomX = Math.random() * 70 + 5;
            randomY = Math.random() * 70 + 5;
            
            overlap = false;
            // Check if this position overlaps with any existing images
            for (var i = 0; i < occupiedAreas.length; i++) {
                var area = occupiedAreas[i];
                // Check for overlap (with 15% buffer zone)
                if (Math.abs(randomX - area.x) < 15 && Math.abs(randomY - area.y) < 15) {
                    overlap = true;
                    break;
                }
            }
            attempts++;
        }
        
        // Store this position as occupied
        occupiedAreas.push({x: randomX, y: randomY});
        
        img.style.position = 'absolute';
        img.style.left = randomX + '%';
        img.style.top = randomY + '%';
        img.style.maxWidth = '150px'; // Slightly smaller to reduce overlap
        img.style.maxHeight = '150px';
        
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
    messageBox.innerText = yesMessage; // Use the customizable message
    document.body.appendChild(messageBox);
    
    // Add animation class after a short delay
    setTimeout(function() {
        messageBox.classList.add('show');
    }, 100);
}

// Display the cat.gif initially
displayCat();