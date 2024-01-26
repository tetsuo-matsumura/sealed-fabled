const fs = require('fs');

function getRandomCard(type) {
    const typesJson = JSON.parse(fs.readFileSync('types.json', 'utf8'));
    const typeCards = typesJson[type];
    const randomCardName = typeCards[Math.floor(Math.random() * typeCards.length)];
    return randomCardName;
}

function findMatchingCard(cardName) {
    const cardsJson = JSON.parse(fs.readFileSync('cards.json', 'utf8'));
    return cardsJson.find(card => card.name === cardName);
}

function generateRandomLayout(layouts) {
    const randomLayout = layouts[Math.floor(Math.random() * layouts.length)];
    const output = {};

    for (const type in randomLayout) {
        const quantity = randomLayout[type];
        output[type] = [];

        for (let i = 0; i < quantity; i++) {
            const randomCardName = getRandomCard(type);
            const matchingCard = findMatchingCard(randomCardName);

            if (matchingCard) {
                output[type].push(matchingCard);
            } else {
                console.error(`Card not found for name: ${randomCardName}`);
            }
        }
    }

    return output;
}

function displayCardImages(cards) {
  const outputDiv = document.getElementById('output');
  outputDiv.innerHTML = ''; // Clear previous content

  for (const type in cards) {
      const cardList = cards[type];
      for (const card of cardList) {
          const img = document.createElement('img');
          img.src = card.image_uris.en; // Assuming the image URL is in the 'en' property
          img.alt = card.name;
          outputDiv.appendChild(img);
      }
  }
}

function main() {
  const layoutsJson = JSON.parse(fs.readFileSync('layouts.json', 'utf8'));
  const randomLayout = generateRandomLayout(layoutsJson);

  // Display card images on the screen
  displayCardImages(randomLayout);
}

main();