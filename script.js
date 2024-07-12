document.addEventListener("DOMContentLoaded", () => {
    const palette = document.getElementById("color-palette");
    const generatePaletteBtn = document.getElementById("generate-palette");
    const savePaletteBtn = document.getElementById("save-palette");
    const loadPaletteSelect = document.getElementById("load-palette");
    const darkModeBtn = document.getElementById("dark-mode-toggle");
    const randomizeAllBtn = document.getElementById("randomize-all");
  
    let colors = Array(5).fill().map(generateRandomColor);
    let lockedColors = [];
    let generationCount = 0;
  
    const animalEmojis = ['🐶', '🐱', '🐰', '🦊', '🐼', '🐨', '🐯', '🦁', '🐸', '🐙', '🐵', '🐷', '🦉', '🦄', '🦋'];
  
    const colorFacts = {
      red: ["Red is often associated with passion and energy!", "The human eye can distinguish more shades of red than any other color.", "Red is the first color babies can see after black and white.", "In Chinese culture, red symbolizes good luck and prosperity."],
      blue: ["Blue is the most common favorite color worldwide.", "The color blue can help lower heart rate and blood pressure.", "Blue is the rarest natural color in foods.", "Ancient Egyptians associated blue with the sky and divinity."],
      green: ["Green is considered the most restful color for the eye.", "Green is the second most common favorite color.", "In the Middle Ages, green was the color of choice for wedding gowns.", "The human eye can distinguish more shades of green than any other color."],
      yellow: ["Yellow is often associated with happiness and optimism.", "Yellow is the most visible color from a distance.", "In some cultures, yellow symbolizes courage.", "The color yellow can increase the metabolism."],
      purple: ["Purple was once so expensive, only royalty could afford it!", "Purple is often associated with creativity and imagination.", "The first synthetic dye was purple, discovered accidentally in 1856.", "In Thailand, purple is the color of mourning for widows."],
      orange: ["Orange is named after the fruit, not the other way around.", "Orange is a color that stimulates appetite and social interaction.", "In Hinduism, orange represents sacred fire.", "The Netherlands national color is orange."],
      pink: ["Pink was originally a color for boys, not girls!", "Pink can have a calming effect and is sometimes used in prisons.", "The pink ribbon is an international symbol of breast cancer awareness.", "In Japan, pink represents fallen cherry blossoms and the fleeting nature of life."],
      brown: ["Brown is often used to create a warm and cozy atmosphere.", "In marketing, brown is associated with reliability and stability.", "The first brown dye was made from clay in prehistoric times.", "In dream interpretation, brown often represents connection with nature."],
      black: ["Black absorbs all visible wavelengths of light!", "In ancient Egypt, black was the color of life and rebirth.", "Black is slimming because it makes things appear smaller.", "In the West, black is often associated with power and elegance."],
      white: ["White reflects all visible wavelengths of light!", "In many Eastern cultures, white is the color of mourning.", "White noise contains all frequencies at equal intensity.", "The ancient Greeks wore white to bed to ensure good dreams."],
      gray: ["Gray is a neutral color, often associated with balance.", "In nature, gray is the color of stones and metals.", "Gray is often used in marketing to convey a sense of calm and professionalism.", "The human eye can distinguish about 500 shades of gray."],
    };
  
    function generateRandomColor() {
      return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }
  
    function generatePalette() {
      const newColors = colors.map((color, index) => lockedColors.includes(index) ? color : generateRandomColor());
      colors = newColors;
      updatePalette();
      generationCount++;
  
      if (generationCount > 0 && generationCount % 10 === 0) {
        showSparkleEffect();
      }
    }
  
    function updatePalette() {
      palette.innerHTML = "";
      colors.forEach((color, index) => {
        const colorContainer = document.createElement("div");
        colorContainer.className = "color-container";
        
        const colorBox = document.createElement("div");
        colorBox.className = `color-box ${lockedColors.includes(index) ? 'locked' : ''}`;
        colorBox.style.backgroundColor = color;
        colorBox.addEventListener("click", () => copyToClipboard(color));
        
        const lockButton = document.createElement("button");
        lockButton.className = "lock-button";
        lockButton.textContent = lockedColors.includes(index) ? 'Unlock' : 'Lock';
        lockButton.addEventListener("click", (e) => {
          e.stopPropagation();
          toggleLockColor(index);
        });
  
        const regenerateButton = document.createElement("button");
        regenerateButton.className = "regenerate-button";
        regenerateButton.textContent = "Regenerate";
        regenerateButton.addEventListener("click", (e) => {
          e.stopPropagation();
          regenerateColor(index);
        });
  
        const colorCode = document.createElement("span");
        colorCode.className = "color-code";
        colorCode.textContent = color;
  
        colorBox.appendChild(lockButton);
        colorBox.appendChild(regenerateButton);
        colorContainer.appendChild(colorBox);
        colorContainer.appendChild(colorCode);
        palette.appendChild(colorContainer);
      });
    }
  
    function copyToClipboard(color) {
      navigator.clipboard.writeText(color).then(() => {
        alert("Color copied to clipboard!");
      });
    }
  
    function toggleLockColor(index) {
      if (lockedColors.includes(index)) {
        lockedColors = lockedColors.filter(i => i !== index);
      } else {
        lockedColors.push(index);
      }
      updatePalette();
    }
  
    function regenerateColor(index) {
      colors[index] = generateRandomColor();
      updatePalette();
    }
  
    function savePalette() {
      const paletteName = prompt("Enter a name for this palette:");
      if (paletteName) {
        localStorage.setItem(paletteName, JSON.stringify(colors));
        updateSavedPalettes();
      }
    }
  
    function loadPalette(name) {
      const savedColors = JSON.parse(localStorage.getItem(name));
      if (savedColors) {
        colors = savedColors;
        updatePalette();
      }
    }
  
    function updateSavedPalettes() {
      loadPaletteSelect.innerHTML = '<option value="">Load Palette</option>';
      Object.keys(localStorage).forEach(name => {
        const option = document.createElement("option");
        option.value = name;
        option.textContent = name;
        loadPaletteSelect.appendChild(option);
      });
    }
  
    function toggleDarkMode() {
      document.body.classList.toggle("dark-mode");
    }
  
    function showSparkleEffect() {
      const sparkleContainer = document.getElementById("sparkle-container");
      const sparkleEmoji = document.getElementById("sparkle-emoji");
      const sparkleFact = document.getElementById("sparkle-fact");
  
      const randomEmoji = animalEmojis[Math.floor(Math.random() * animalEmojis.length)];
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const colorName = getColorName(randomColor);
      const randomFact = colorFacts[colorName][Math.floor(Math.random() * colorFacts[colorName].length)];
  
      sparkleEmoji.textContent = randomEmoji;
      sparkleFact.textContent = randomFact;
  
      sparkleContainer.classList.remove("hidden");
      sparkleContainer.classList.add("animate-pop-in");
  
      setTimeout(() => {
        sparkleContainer.classList.add("hidden");
      }, 4000);
    }
  
    function getColorName(hexColor) {
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      
      const colorNames = Object.keys(colorFacts);
      const colorDistances = colorNames.map(name => {
        const [nr, ng, nb] = name.match(/[a-z]+/)[0]
          .split('')
          .map(c => c.charCodeAt(0) - 97)
          .map(v => v * 25);
        return Math.sqrt((r - nr)*2 + (g - ng)*2 + (b - nb)*2);
      });
      
      return colorNames[colorDistances.indexOf(Math.min(...colorDistances))];
    }
  
    // Event listeners
    generatePaletteBtn.addEventListener("click", generatePalette);
    savePaletteBtn.addEventListener("click", savePalette);
    loadPaletteSelect.addEventListener("change", (e) => loadPalette(e.target.value));
    darkModeBtn.addEventListener("click", toggleDarkMode);
    randomizeAllBtn.addEventListener("click", generatePalette);
    simulateColorBlindnessBtn.addEventListener("click", () => alert("Color blindness simulation not implemented yet."));
  
    // Initial setup
    generatePalette();
    updateSavedPalettes();
  });



//color extraction
function extractColors() {
  const fileInput = document.getElementById('image-input');
  const colorResults = document.getElementById('color-results');
  const loading = document.getElementById('loading');
  const uploadedImageContainer = document.getElementById('uploaded-image-container');
  const uploadedImage = document.getElementById('uploaded-image');

  if (fileInput.files && fileInput.files[0]) {
    const img = new Image();
    img.src = URL.createObjectURL(fileInput.files[0]);
    img.onload = () => {
      loading.style.display = 'block';
      uploadedImage.src = img.src;
      uploadedImage.style.display = 'block';

      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, 6); // Get 6 dominant colors

      loading.style.display = 'none';
      colorResults.innerHTML = '';
      palette.forEach(color => {
        const colorBlock = document.createElement('div');
        const hexColor = rgbToHex(color[0], color[1], color[2]);
        colorBlock.className = 'color-extraction-block';
        colorBlock.style.backgroundColor = hexColor;
        colorBlock.innerText = `${hexColor} (rgb(${color[0]}, ${color[1]}, ${color[2]}))`;
        colorResults.appendChild(colorBlock);
      });
    };
    img.onerror = () => {
      loading.style.display = 'none';
      alert('Error loading image. Please try another file.');
    };
  } else {
    alert('Please select an image file.');
  }
}

function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}


//text redirect
const sparkleLink = document.getElementById('sparkle-link');

sparkleLink.addEventListener('mouseover', () => {
    const beforeStyle = getComputedStyle(sparkleLink, '::before');
    const afterStyle = getComputedStyle(sparkleLink, '::after');

    if (beforeStyle.opacity === '0') {
        sparkleLink.style.setProperty('--before-opacity', '1');
        sparkleLink.style.setProperty('--after-opacity', '1');
    }
});

sparkleLink.addEventListener('mouseout', () => {
    sparkleLink.style.setProperty('--before-opacity', '0');
    sparkleLink.style.setProperty('--after-opacity', '0');
});
