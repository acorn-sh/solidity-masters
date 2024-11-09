const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

function runSolidityCode(code) {
    return new Promise((resolve, reject) => {
        // Define the temp directory and file path
        const tempDir = path.join(__dirname, 'test');
        const filePath = path.join(tempDir, 'Temp.sol');

        // Ensure the temp directory exists
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        // Write the code to the temporary Solidity file
        fs.writeFileSync(filePath, code);

        // Use forge compile instead of forge test
        exec(`forge compile --contracts ${filePath}`, (error, stdout, stderr) => {
            if (error) {
                console.error("Compilation error:", stderr || error.message);
                reject(stderr || error.message);
            } else {
                resolve(stdout);
            }
        });
    });
}

module.exports = { runSolidityCode };
