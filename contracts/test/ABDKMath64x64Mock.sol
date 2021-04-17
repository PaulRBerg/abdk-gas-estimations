// SPDX-License-Identifier: LGPL-3.0-or-later
pragma solidity >=0.8.0;

import "hardhat/console.sol";
import "../ABDKMath64x64.sol";

contract ABDKMath64x64Mock {
    function doAbs(int128 x) external view returns (int128 result) {
        uint256 gasUsed;
        (result, gasUsed) = ABDKMath64x64.abs(x);
        console.log("gasUsed", gasUsed);
    }

    function doAvg(int128 x, int128 y) external view returns (int128 result) {
        uint256 gasUsed;
        (result, gasUsed) = ABDKMath64x64.avg(x, y);
        console.log("gasUsed", gasUsed);
    }

    function doDiv(int128 x, int128 y) external view returns (int128 result) {
        uint256 gasUsed;
        (result, gasUsed) = ABDKMath64x64.div(x, y);
        console.log("gasUsed", gasUsed);
    }

    function doExp(int128 x) external view returns (int128 result) {
        uint256 gasUsed;
        (result, gasUsed) = ABDKMath64x64.exp(x);
        console.log("gasUsed", gasUsed);
    }

    function doExp2(int128 x) external view returns (int128 result) {
        uint256 gasUsed;
        (result, gasUsed) = ABDKMath64x64.exp_2(x);
        console.log("gasUsed", gasUsed);
    }

    function doGavg(int128 x, int128 y) external view returns (int128 result) {
        uint256 gasUsed;
        (result, gasUsed) = ABDKMath64x64.gavg(x, y);
        console.log("gasUsed", gasUsed);
    }

    function doInv(int128 x) external view returns (int128 result) {
        uint256 gasUsed;
        (result, gasUsed) = ABDKMath64x64.inv(x);
        console.log("gasUsed", gasUsed);
    }

    function doLn(int128 x) external pure returns (int128 result) {
        result = ABDKMath64x64.ln(x);
    }

    function doLog2(int128 x) external pure returns (int128 result) {
        result = ABDKMath64x64.log_2(x);
    }

    function doMul(int128 x, int128 y) external pure returns (int128 result) {
        result = ABDKMath64x64.mul(x, y);
    }

    function doPow(int128 x, uint256 y) external pure returns (int128 result) {
        result = ABDKMath64x64.pow(x, y);
    }

    function doSqrt(int128 x) external pure returns (int128 result) {
        result = ABDKMath64x64.sqrt(x);
    }
}
