// Utility to generate a random base color in HSL
function getRandomBaseColor() {
    const hue = Math.floor(Math.random() * 360);
    return { h: hue, s: 70, l: 55 }; // Vibrant, not too dark/light
}

// Generate 6 complementary colors using HSL rotation
function generatePalette() {
    const base = getRandomBaseColor();
    const palette = [];
    for (let i = 0; i < 6; i++) {
        // Evenly distribute hues around the color wheel
        const hue = (base.h + i * 60) % 360;
        palette.push(`hsl(${hue}, ${base.s}%, ${base.l}%)`);
    }
    return palette;
}


// Get the container element
const container = document.getElementById('color_grid');


function hslToHex(hsl) {
    // Extract numbers from hsl string: "hsl(h, s%, l%)"
    const result = /hsl\((\d+),\s*(\d+)%?,\s*(\d+)%?\)/i.exec(hsl);
    if (!result) return null;
    let [_, h, s, l] = result;
    h = Number(h);
    s = Number(s) / 100;
    l = Number(l) / 100;

    // Convert HSL to RGB
    let c = (1 - Math.abs(2 * l - 1)) * s;
    let x = c * (1 - Math.abs((h / 60) % 2 - 1));
    let m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (h < 60)      [r, g, b] = [c, x, 0];
    else if (h < 120)[r, g, b] = [x, c, 0];
    else if (h < 180)[r, g, b] = [0, c, x];
    else if (h < 240)[r, g, b] = [0, x, c];
    else if (h < 300)[r, g, b] = [x, 0, c];
    else             [r, g, b] = [c, 0, x];

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    // Convert to hex
    return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
}

// Copy color to clipboard
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text);
    }
    else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed"; // Avoid scrolling to bottom
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand("copy");
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
        document.body.removeChild(textArea);
    }
}

// Append color to boxes
const generateAndAppendColors = () => {
    // Generate the color palette
    const colorPalette = generatePalette();
    // Get all existing divs inside the container
    const colorBoxes = container.querySelectorAll('div');
    colorBoxes.forEach((box, i) => {
        if (colorPalette[i]) {
            box.querySelector('p').textContent = hslToHex(colorPalette[i]);
            box.style.backgroundColor = colorPalette[i];
        }
    });

}

// Event listener for keydown to regenerate colors
document.addEventListener('keydown', (event) => {
    if (event.key === " ") {
        event.preventDefault(); // Prevent default space bar scroll behavior
        generateAndAppendColors(); // Regenerate and update colors
    }
})

// Initial call to generate and append colors
generateAndAppendColors();


// Create toast element
const toast = document.createElement('div');
toast.className = "fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded shadow-lg opacity-0 pointer-events-none transition-opacity duration-300 z-50";
toast.style.minWidth = "120px";
toast.style.textAlign = "center";
toast.textContent = "";
document.body.appendChild(toast);

// Show toast function
function showToast(message) {
    toast.textContent = message;
    toast.classList.remove('opacity-0');
    toast.classList.add('opacity-100');
    setTimeout(() => {
        toast.classList.remove('opacity-100');
        toast.classList.add('opacity-0');
    }, 1200);
}

// Update copyColor to use toast
const copyColor = () => {
    let text = event.target.parentElement.querySelector('p').textContent;
    copyToClipboard(text);
    showToast(`Copied: ${text}  to clipboard`);
}