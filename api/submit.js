const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res) => {
    const { code } = req.body;

    // Step 1: Save the submitted code to a temporary Solidity file
    const contractPath = path.join(__dirname, '..', 'src', 'Arithmetic.sol');
    fs.writeFileSync(contractPath, code, 'utf8');

    // Step 2: Run `forge test` to check if the tests pass
    exec('forge test', { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
        if (error) {
            res.status(500).json({ message: 'Test failed', details: stderr });
        } else {
            res.status(200).json({ message: 'Test passed', details: stdout });
        }
    });
};
