// script.js

var noImages = ['dez_eyebrows.JPEG', 'dog_seatbelt.JPEG', 'ay cabron.JPEG', 'dog-why-you-lying.gif', 'dez_looking_up_sad.JPEG']; // Add your image filenames here
var yesImages = ['cat.gif', 'dez_gif.gif', '', 'dez_smiling_teef.JPEG', 'quiero_perrear.gif', 'shake_you_hips.gif']; // Add your happy image filenames here

// Function to handle button click events
function selectOption(option) {
    // Check which option was clicked
    if (option === 'yes') {
        // Flash rainbow colors
        flashRainbowColors(function() {
            document.getElementById('question').style.display = 'none'; // Hide the question
            displayHappyImages(); // Display random happy images across the page
        });
    } else if (option === 'no') {
        // Display a random image from the noImages array
        var randomImage = noImages[Math.floor(Math.random() * noImages.length)];
        displayImage(randomImage);
        
        // Change text on the "No" button to "You sure?"
        document.getElementById('no-button').innerText = 'You sure?'; 
        // Increase font size of "Yes" button
        var yesButton = document.getElementById('yes-button');
        var currentFontSize = window.getComputedStyle(yesButton).getPropertyValue('font-size');
        var newSize = parseFloat(currentFontSize) * 1.5; // Increase font size by 1.5x
        yesButton.style.fontSize = newSize + 'px';
    } else {
        // If neither "Yes" nor "No" was clicked, show an alert message
        alert('Invalid option!');
    }
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
    catImage.src = 'cat.gif'; // Assuming the cat image is named "cat.gif"
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
    
    // Display each image from the yesImages array at random positions
    yesImages.forEach(function(imageSrc, index) {
        var img = new Image();
        img.src = imageSrc;
        img.className = 'happy-image';
        
        // Generate random position (keeping images visible)
        // Random position between 10% and 80% for both x and y to keep images on screen
        var randomX = Math.random() * 70 + 10; // Between 10% and 80%
        var randomY = Math.random() * 70 + 10; // Between 10% and 80%
        
        img.style.position = 'absolute';
        img.style.left = randomX + '%';
        img.style.top = randomY + '%';
        img.style.maxWidth = '200px'; // Set max width so images aren't too large
        img.style.maxHeight = '200px'; // Set max height
        
        // Add a slight delay to each image appearing for a cascading effect
        setTimeout(function() {
            happyContainer.appendChild(img);
        }, index * 200); // 200ms delay between each image
    });
}

// Display the cat.gif initially
displayCat();