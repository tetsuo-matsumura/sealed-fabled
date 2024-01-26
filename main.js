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
    let typeCount = {}
    const totalItems = boostersLayout.length
    
    boostersLayout.forEach(layout => {
      Object.keys(layout).forEach(key => {
        if (typeCount[key]) {
          typeCount[key] += 1
        } else {
          typeCount[key] = 1
        }
      })
    })

    console.log(`Total Booster Layouts: ${totalItems}`);
    console.log(`Total Types: ${Object.keys(typeCount).length}`);
    Object.keys(typeCount).forEach(key => {
      console.log(`Bosters with ${key}: ${typeCount[key]}`)
      console.log(` Ratio ${typeCount[key] / totalItems * 100}%`)
    })

  } catch (jsonError) {
    console.error('Error parsing JSON:', jsonError);
  }
});
