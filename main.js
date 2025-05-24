const fs = require('fs');

// Read the contents of layouts.json
fs.readFile('layouts.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    const layouts = JSON.parse(data);
    let totalProbability = 0;
    let majesticProbability = 0;
    let rfmajesticProbability = 0;
    let eitherProbability = 0;
    let bothProbability = 0;
    let majesticCount = 0;
    let rfmajesticCount = 0;
    let eitherCount = 0;
    let bothCount = 0;

    layouts.forEach(layout => {
      const prob = parseInt(layout.probability, 10);
      totalProbability += prob;
      const hasMajestic = layout.Majestic !== undefined;
      const hasRFMajestic = layout.RFMajestic !== undefined;
      if (hasMajestic) {
        majesticProbability += prob;
        majesticCount++;
      }
      if (hasRFMajestic) {
        rfmajesticProbability += prob;
        rfmajesticCount++;
      }
      if (hasMajestic || hasRFMajestic) {
        eitherProbability += prob;
        eitherCount++;
      }
      if (hasMajestic && hasRFMajestic) {
        bothProbability += prob;
        bothCount++;
      }
    });

    console.log(`Total layouts: ${layouts.length}`);
    console.log(`Total probability: ${totalProbability}`);
    console.log(`\nMajestic layouts: ${majesticCount} (${(majesticProbability / totalProbability * 100).toFixed(2)}%)`);
    console.log(`RFMajestic layouts: ${rfmajesticCount} (${(rfmajesticProbability / totalProbability * 100).toFixed(2)}%)`);
    console.log(`Either Majestic or RFMajestic: ${eitherCount} (${(eitherProbability / totalProbability * 100).toFixed(2)}%)`);
    console.log(`Both Majestic and RFMajestic: ${bothCount} (${(bothProbability / totalProbability * 100).toFixed(2)}%)`);

    // Normalized output
    console.log(`\n--- Normalized to 1,000,000 ---`);
    console.log(`Majestic layouts: ${((majesticProbability / totalProbability) * 1000000).toFixed(0)} / 1,000,000 (${(majesticProbability / totalProbability * 100).toFixed(2)}%)`);
    console.log(`RFMajestic layouts: ${((rfmajesticProbability / totalProbability) * 1000000).toFixed(0)} / 1,000,000 (${(rfmajesticProbability / totalProbability * 100).toFixed(2)}%)`);
    console.log(`Either Majestic or RFMajestic: ${((eitherProbability / totalProbability) * 1000000).toFixed(0)} / 1,000,000 (${(eitherProbability / totalProbability * 100).toFixed(2)}%)`);
    console.log(`Both Majestic and RFMajestic: ${((bothProbability / totalProbability) * 1000000).toFixed(0)} / 1,000,000 (${(bothProbability / totalProbability * 100).toFixed(2)}%)`);
  } catch (error) {
    console.error('Error processing file:', error);
  }
});
