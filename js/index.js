const pastelColors = [
    '#FFB6C1', // LightPink
    '#FFC0CB', // Pink
    '#FFD700', // Gold
    '#FF69B4', // HotPink
    '#FFE4B5', // Moccasin
    '#FFA07A', // LightSalmon
    '#20B2AA', // LightSeaGreen
    '#87CEFA', // LightSkyBlue
    '#778899', // LightSlateGray
    '#B0C4DE'  // LightSteelBlue
];

const allButtons = document.querySelectorAll('button');

function assignRandomPastelColor() {

    allButtons.forEach(button => {
        // Generate a random index to select a color from the pastelColors array
        const randomIndex = Math.floor(Math.random() * pastelColors.length);
        // Assign the random pastel color as the background color of the button
        button.style.backgroundColor = pastelColors[randomIndex];
    });
}

// Call the function to assign random pastel colors when the page loads
window.onload = assignRandomPastelColor;


