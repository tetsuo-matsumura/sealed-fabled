const fs = require('fs');
const path = require('path');

const inputFilePath = path.join(__dirname, 'sea.txt');
const typesOutputFilePath = path.join(__dirname, 'types.json');
const layoutsOutputFilePath = path.join(__dirname, 'layouts.json');

// Check if the file exists
if (!fs.existsSync(inputFilePath)) {
    console.error(`File does not exist: ${inputFilePath}`);
    process.exit(1);
}

fs.readFile(inputFilePath, 'utf-8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err.message}`);
        return;
    }
    
    // Check if data is empty
    if (!data) {
        console.error(`File is empty or could not be read: ${inputFilePath}`);
        return;
    }
    
    // Print the raw file content to ensure it's read correctly
    //console.log("Raw file content:\n", data);

    // Split the data into lines and process each line
    const lines = data.split(/\r\n|\r|\n/).filter(line => line.trim());
    
    // Debugging: Print the lines to see if they are correctly split
    //console.log("Lines after splitting and filtering:\n", lines);

    const types = {};
    const layouts = [];
    let layoutWeight = 0;

    let currentSection = null;
    let currentLayout = null;

    lines.forEach(line => {
        // Check for new section
        const sectionMatch = line.match(/^\[(.+)]$/);
        if (sectionMatch) {
            currentSection = sectionMatch[1];
            currentLayout = null;  // Reset current layout when a new section starts
            return;
        }

        if (!currentSection) {
            return;  // Skip any lines outside of sections
        }

        if (currentSection === 'Settings') {
            // Ignore the Settings section
            return;
        }

        if (currentSection === 'CustomCards') {
          
            return;
        } else if (currentSection === 'Layouts') {
            const layoutMatch = line.trim().match(/^- (.+) \((\d+)\)\s*$/);
            if (layoutMatch) {
                layoutWeight += parseInt(layoutMatch[2], 10)
                if (currentLayout) {
                    currentLayout.probability = layoutMatch[2]
                    layouts.push(currentLayout);

                }
                currentLayout = {};
                currentLayout.probability = layoutMatch[2]
            } else {
                const [count, type] = line.trim().split(' ');
                if (currentLayout) {
                    currentLayout[type] = parseInt(count, 10);
                }
            }
        } else {
            if (!types[currentSection]) {
                types[currentSection] = [];
            }
            const [count,] = line.trim().split(' ')
            for (let i = 0; i < count; i++) {
              types[currentSection].push(line.trim().replace(/^\d+ /, ''));
            }
        } 
    });

    if (currentLayout) {
        layouts.push(currentLayout);
    }

    console.log(layoutWeight)

    fs.writeFile(typesOutputFilePath, JSON.stringify(types, null, 2), err => {
        if (err) throw err;
        console.log('types.json has been saved.');
    });

    fs.writeFile(layoutsOutputFilePath, JSON.stringify(layouts, null, 2), err => {
        if (err) throw err;
        console.log('layouts.json has been saved.');
    });
});
