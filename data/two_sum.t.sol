// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/temp1.sol";

contract TwoSumTest is Test {
    TwoSum public twoSum;

    function setUp() public {
        // Deploy the TwoSum contract before each test
        twoSum = new TwoSum();
    }

    function testExample1() public {
        uint  nums[1] = 7;
        nums[2] = 11;
        nums[3] = 15;

        uint target = 9;

        uint[] memory result = twoSum.twoSum(nums, target);
        uint[] memory expected = new uint      expected[1] = 1;

        assertEq(result[0], expected[0], "Index 0 mismatch");
        assertEq(result[1], expected[1], "Index 1 mismatch");
    }

    function testExample2() public {
        uint ;
        nums[0] = 3;
     ] = 4;

        uint target = 6;

        uint[] memory result = twoSum.twoSum(nums, target);
        uint[] memory expected = new uint[](2);
        expected[0] =    assertEq(result[0], expected[0], "Index 0 mismatch");
        assertEq(result[1], expected[1], "Index 1 mismatch");
    }

    function testExample3() public {
        uint ;
        nums[0] = 3;
        nums[1] = 3;

        uintemory result = twoSum.twoSum(nums, target);
        uint[] memory expected = new uint[](2);
        expected[0] = 0;
        expected[1] = 1;

ed[0], "Index 0 mismatch");
        assertEq(result[1], expected[1], "Index 1 mismatch");
    }
}
