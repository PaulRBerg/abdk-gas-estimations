import { expect } from "chai";
import { BigNumber } from "ethers";
import forEach from "mocha-each";

import { MAX_64x64, MIN_64x64, ZERO } from "../helpers/constants";
import { bn } from "../helpers/numbers";

export function shouldBehaveLikeABDKMath64x64(): void {
  context("abs", async function () {
    const testSets = [
      [MIN_64x64.add(1), MAX_64x64],
      [bn("-0x10000000000000000"), bn("0x10000000000000000")],
      [ZERO, ZERO],
      [bn("0x10000000000000000"), bn("0x10000000000000000")],
      [MAX_64x64, MAX_64x64],
    ];

    forEach(testSets).it("takes %e and returns %e", async function (x: BigNumber, expected: BigNumber) {
      const result: BigNumber = await this.abdkMath64x64.doAbs(x);
      expect(expected).to.equal(result);
    });
  });

  context("avg", async function () {
    const testSets = [
      [MIN_64x64, MIN_64x64, MIN_64x64],
      [bn("-0x40000000000000000"), bn("0x20000000000000000"), bn("-0x10000000000000000")],
      [bn("-0x20000000000000000"), bn("-0x40000000000000000"), bn("-0x30000000000000000")],
      [bn("-0x10000000000000000"), bn("-0x10000000000000000"), bn("-0x10000000000000000")],
      [ZERO, ZERO, ZERO],
      [bn("0x10000000000000000"), bn("0x10000000000000000"), bn("0x10000000000000000")],
      [bn("0x20000000000000000"), bn("0x40000000000000000"), bn("0x30000000000000000")],
      [bn("0x40000000000000000"), bn("-0x20000000000000000"), bn("0x10000000000000000")],
      [MAX_64x64, MAX_64x64, MAX_64x64],
    ];

    forEach(testSets).it("takes %e and returns %e", async function (x: BigNumber, y: BigNumber, expected: BigNumber) {
      const result: BigNumber = await this.abdkMath64x64.doAvg(x, y);
      expect(expected).to.equal(result);
    });
  });

  context("div", async function () {
    const testSets = [
      [MIN_64x64, bn("0x20000000000000000"), MIN_64x64.div(2)],
      [bn("-0x40000000000000000"), bn("-0x20000000000000000"), bn("0x20000000000000000")],
      [bn("0x40000000000000000"), bn("0x20000000000000000"), bn("0x20000000000000000")],
      [MAX_64x64, bn("0x20000000000000000"), MAX_64x64.div(2)],
    ];

    forEach(testSets).it("takes %e and returns %e", async function (x: BigNumber, y: BigNumber, expected: BigNumber) {
      const result: BigNumber = await this.abdkMath64x64.doDiv(x, y);
      expect(expected).to.equal(result);
    });
  });

  context("exp", async function () {
    const testSets = [
      [bn("-0x400000000000000001"), ZERO],
      [bn("-0x400000000000000000"), ZERO],
      [ZERO, bn("0x10000000000000000")],
      [bn("0x12"), bn("0x10000000000000011")],
      [bn("0x480f"), bn("0x1000000000000480e")],
      [bn("0x10000000000000000"), bn("0x2b7e151628aed2a69")],
      [bn("0x20000000000000000"), bn("0x763992e35376b7307")],
      [bn("0x2b7e151628aed2a64"), bn("0xf277dbaf2293d7a68")],
      [bn("0x3243f6a8885a308cb"), bn("0x1724046eb093399e0e")],
      [bn("0x40000000000000000"), bn("0x3699205c4e74b0cef6")],
      [bn("0xbe463f141205bc01a"), bn("0x23ac31b9c26f10f297c51")],
      [bn("0x14d1eb851eb851eb85"), bn("0x41a896095ab3d885944f0eb1")],
      [bn("0x2155554fbdad7518b1"), bn("0x110728c8cbf7c33ac7648846d4229")],
      [bn("0x2bab13e5fca20ef146"), bn("0x7fffffffffffffffa746f40417184301")],
    ];

    forEach(testSets).it("takes %e and returns %e", async function (x: BigNumber, expected: BigNumber) {
      const result: BigNumber = await this.abdkMath64x64.doExp(x);
      expect(expected).to.equal(result);
    });
  });

  context("exp2", async function () {
    const testSets = [
      [bn("-0x400000000000000001"), ZERO],
      [bn("-0x400000000000000000"), 1],
      [ZERO, bn("0x10000000000000000")],
      [bn("0x12"), bn("0x1000000000000000c")],
      [bn("0x480f"), bn("0x480f")],
      [bn("0x10000000000000000"), bn("0x20000000000000000")],
      [bn("0x20000000000000000"), bn("0x40000000000000000")],
      [bn("0x2b7e151628aed2a64"), bn("121395919654568043164")],
      [bn("0x3243f6a8885a308cb"), bn("0x8d331bf3337c1a6a9")],
      [bn("0x40000000000000000"), bn("0x100000000000000000")],
      [bn("0xbe463f141205bc01a"), bn("0xed8f705de6cf28b3dd0")],
      [bn("0x14d1eb851eb851eb85"), bn("0x1c3f1a5aa4c94b23c3dac3")],
      [bn("0x2155554fbdad7518b1"), bn("0x28514556d1edc97f902a96094")],
      [bn("0x3e0000000000000000"), bn("0x40000000000000000000000000000000")],
      [bn("0x3effffffffffffffff"), bn("0x7fffffffffffffffa746f40417184301")],
    ];

    forEach(testSets).it("takes %e and returns %e", async function (x: BigNumber, expected: BigNumber) {
      const result: BigNumber = await this.abdkMath64x64.doExp2(x);
      expect(expected).to.equal(result);
    });
  });
}
