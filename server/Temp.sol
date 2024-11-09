pragma solidity ^0.8.0;
    
    contract HelloWorld {
        string public greeting = "Hello, Solidity!";
    
        function greet() public view returns (string memory) {
            return greeting;
        }
    }