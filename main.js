const fs = require('fs');

// Read the contents of layouts.json
fs.readFile('layouts.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    // Parse JSON data
    const boostersLayout = JSON.parse(data);

    // Count total number of items
    let majestics = 0
    const totalItems = boostersLayout.length
    
    boostersLayout.forEach(layout => {
      Object.keys(layout).forEach(key => {
        if (key === "RFRare") {
          majestics += 1
        }
      })
    })
    // Calculate the ratio
    const ratio = majestics / totalItems;

    // Log the results
    console.log(`Total Booster Layouts: ${totalItems}`);
    console.log(`Boosters containing RF Rare: ${majestics}`);
    console.log(`Ratio: ${ratio}`);
  } catch (jsonError) {
    console.error('Error parsing JSON:', jsonError);
  }
});
