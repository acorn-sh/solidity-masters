// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/Arithmetic.sol";

contract ArithmeticTest is Test {
    Arithmetic public arithmetic;

    function setUp() public {
        arithmetic = new Arithmetic();
    }

    function test_Addition() public {
        uint256 result = arithmetic.add(2, 3);
        assertEq(result, 5, "Addition failed for 2 + 3");
    }

    function test_AdditionWithZero() public {
        uint256 result = arithmetic.add(0, 5);
        assertEq(result, 5, "Addition failed for 0 + 5");
    }
}
