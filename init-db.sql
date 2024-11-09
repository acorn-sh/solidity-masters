DO
$$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_database
      WHERE datname = 'solidity_db'
   ) THEN
      PERFORM dblink_exec('dbname=postgres user=postgres', 'CREATE DATABASE solidity_db');
   END IF;
END
$$;

-- Create tables if they do not exist
CREATE TABLE IF NOT EXISTS problems (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    initial_code TEXT NOT NULL
);

-- Insert initial problem data
INSERT INTO problems (title, description, initial_code) VALUES 
    (
        'Preventing Data Loss in Type Conversion',
        'You are tasked with writing a function that safely converts a larger unsigned integer to a smaller one without data loss. The function should take a uint256 input and return a uint16 output. If the input value is too large to fit into a uint16, the function should revert the transaction with an appropriate error message.',
        'solidity\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract TypeConversion {\n    function toUint16(uint256 input) public pure returns (uint16) {\n        // Your code here\n    }\n}'
    ),
    (
        'Working with Array Slices in Calldata',
        'Implement a function that takes a dynamic array of unsigned integers (uint[]) as calldata and returns a new array containing a slice of the original array. The function should accept start and end indices to specify the slice range. Ensure that the function correctly handles cases where start or end indices are out of bounds by reverting the transaction with an error message.',
        'solidity\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract ArraySlicer {\n    function sliceArray(uint[] calldata data, uint start, uint end) public pure returns (uint[] memory) {\n        // Your code here\n    }\n}'
    ),
    (
        'Using Enums to Manage Contract State',
        'Create a simple contract that uses an enum to manage its state. The contract should have three states: Inactive, Active, and Paused. Implement functions to transition between these states while enforcing the following rules: The contract starts in the Inactive state. Only an authorized address (the owner) can change the state. The state can transition from Inactive to Active. The state can transition from Active to Paused and vice versa. The state cannot transition back to Inactive once it has become Active. Include events to log state changes.',
        'solidity\n// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract StateMachine {\n    enum ContractState { Inactive, Active, Paused }\n\n    ContractState public state;\n    address public owner;\n\n    // Events\n    event StateChanged(ContractState newState);\n\n    // Constructor\n    constructor() {\n        // Your code here\n    }\n\n    // Function to activate the contract\n    function activate() public {\n        // Your code here\n    }\n\n    // Function to pause the contract\n    function pause() public {\n        // Your code here\n    }\n\n    // Function to resume the contract from pause\n    function resume() public {\n        // Your code here\n    }\n}\n'
    );
