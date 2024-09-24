// Import the required modules for file handling
const fs = require('fs');

// Time Complexity: O(k^2), where k is the number of points used for interpolation.
// Space Complexity: O(k), since we store the decoded values and interpolate over them.

// Function to parse the JSON file and return the necessary keys and data points
function parseInput(filePath) {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(rawData);
    const n = jsonData.keys.n;
    const k = jsonData.keys.k;
    let points = [];

    for (let i = 1; i <= n; i++) {
        if (jsonData[i] && jsonData[i].base && jsonData[i].value) {
            const base = parseInt(jsonData[i].base);
            const valueStr = jsonData[i].value;
            const y = parseInt(valueStr, base);
            points.push({ x: i, y });
        } else {
            console.error(`Error parsing data for index ${i}. Missing base or value property.`);
        }
    }
    
    return { points, k };
}

// Function to compute Lagrange interpolation and find the constant term
function lagrangeInterpolation(points, k) {
    let constantTerm = 0;

    for (let i = 0; i < k; i++) {
        let xi = points[i].x;
        let yi = points[i].y;
        let li = 1;

        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = points[j].x;
                li *= (-xj) / (xi - xj); // Calculating the Lagrange basis polynomial
            }
        }
        constantTerm += yi * li; // Adding the contribution of each term
    }

    return constantTerm;
}

// Main function to handle the entire flow
function main() {
    const { points, k } = parseInput('input1.json'); // Adjust the file path as needed
    const constantTerm = lagrangeInterpolation(points, k);
    console.log("The constant term (c) is:", constantTerm);
}

// Call the main function
main();