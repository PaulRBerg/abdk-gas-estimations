import { expect } from "chai";
import { BigNumber } from "ethers";
import forEach from "mocha-each";

import { E, MAX_64x64, MIN_64x64, PI, ZERO } from "../helpers/constants";
import { bn } from "../helpers/numbers";

export function shouldBehaveLikeABDKMath64x64(): void {
  context("abs", async function () {
    const testSets = [
      [MIN_64x64.add(1), MAX_64x64],
      [bn("-0x10000000000000000"), bn("0x10000000000000000")],
    ].concat([
      [ZERO, ZERO],
      [bn("0x10000000000000000"), bn("0x10000000000000000")],
      [MAX_64x64, MAX_64x64],
    ]);

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
    ].concat([
      [ZERO, ZERO, ZERO],
      [bn("0x10000000000000000"), bn("0x10000000000000000"), bn("0x10000000000000000")],
      [bn("0x20000000000000000"), bn("0x40000000000000000"), bn("0x30000000000000000")],
      [bn("0x40000000000000000"), bn("-0x20000000000000000"), bn("0x10000000000000000")],
      [MAX_64x64, MAX_64x64, MAX_64x64],
    ]);

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
    ].concat([
      [ZERO, bn("0x10000000000000000")],
      [bn("0x12"), bn("0x10000000000000011")],
      [bn("0x480f"), bn("0x1000000000000480e")],
      [bn("0x10000000000000000"), bn("0x2b7e151628aed2a69")],
      [bn("0x20000000000000000"), bn("0x763992e35376b7307")],
      [E, bn("0xf277dbaf2293d7a68")],
      [PI, bn("0x1724046eb093399e0e")],
      [bn("0x40000000000000000"), bn("0x3699205c4e74b0cef6")],
      [bn("0xbe463f141205bc01a"), bn("0x23ac31b9c26f10f297c51")],
      [bn("0x14d1eb851eb851eb85"), bn("0x41a896095ab3d885944f0eb1")],
      [bn("0x2155554fbdad7518b1"), bn("0x110728c8cbf7c33ac7648846d4229")],
      [bn("0x2bab13e5fca20ef146"), bn("0x7fffffffffffffffa746f40417184301")],
    ]);

    forEach(testSets).it("takes %e and returns %e", async function (x: BigNumber, expected: BigNumber) {
      const result: BigNumber = await this.abdkMath64x64.doExp(x);
      expect(expected).to.equal(result);
    });
  });

  context("exp2", async function () {
    const testSets = [
      [bn("-0x400000000000000001"), ZERO],
      [bn("-0x400000000000000000"), 1],
    ].concat([
      [ZERO, bn("0x10000000000000000")],
      [bn("0x12"), bn("0x1000000000000000c")],
      [bn("0x480f"), bn("0x480f")],
      [bn("0x10000000000000000"), bn("0x20000000000000000")],
      [bn("0x20000000000000000"), bn("0x40000000000000000")],
      [E, bn("121395919654568043164")],
      [PI, bn("0x8d331bf3337c1a6a9")],
      [bn("0x40000000000000000"), bn("0x100000000000000000")],
      [bn("0xbe463f141205bc01a"), bn("0xed8f705de6cf28b3dd0")],
      [bn("0x14d1eb851eb851eb85"), bn("0x1c3f1a5aa4c94b23c3dac3")],
      [bn("0x2155554fbdad7518b1"), bn("0x28514556d1edc97f902a96094")],
      [bn("0x3e0000000000000000"), bn("0x40000000000000000000000000000000")],
      [bn("0x3effffffffffffffff"), bn("0x7fffffffffffffffa746f40417184301")],
    ]);

    forEach(testSets).it("takes %e and returns %e", async function (x: BigNumber, expected: BigNumber) {
      const result: BigNumber = await this.abdkMath64x64.doExp2(x);
      expect(expected).to.equal(result);
    });
  });

  context("gavg", async function () {
    const testSets = [
      [MIN_64x64.add(1), bn(-1), bn("0xb504f333f9de6484")],
      [bn("-0x964cccccccccccccccd"), bn("-0x1edb35edf1e0828c36db"), bn("0x1106714d801cbcda4b2c")],
      [bn("-0x1427851eb851eb851ec"), bn("-0x2a2c51eb851eb851eb8"), bn("0x1d277ff195650278509")],
      [PI.mul(-1), bn("-0x83333333333333333"), bn("0x5135649fd908ab2e0")],
      [E.mul(-1), bn("-0x59028f5c28f5c28f5c"), bn("0xf8e0c8f73566eeba9")],
      [bn("-0x20000000000000000"), bn("-0x80000000000000000"), bn("0x40000000000000000")],
      [bn("-0x10000000000000000"), bn("-0x40000000000000000"), bn("0x20000000000000000")],
      [bn("-0x10000000000000000"), bn("-0x10000000000000000"), bn("0x10000000000000000")],
      [ZERO, PI.mul(-1), ZERO],
    ].concat([
      [ZERO, PI, ZERO],
      [bn("0x10000000000000000"), bn("0x10000000000000000"), bn("0x10000000000000000")],
      [bn("0x10000000000000000"), bn("0x40000000000000000"), bn("0x20000000000000000")],
      [bn("0x20000000000000000"), bn("0x80000000000000000"), bn("0x40000000000000000")],
      [E, bn("0x59028f5c28f5c28f5c"), bn("0xf8e0c8f73566eeba9")],
      [PI, bn("0x83333333333333333"), bn("0x5135649fd908ab2e0")],
      [bn("0x1427851eb851eb851ec"), bn("0x2a2c51eb851eb851eb8"), bn("0x1d277ff195650278509")],
      [bn("0x964cccccccccccccccd"), bn("0x1edb35edf1e0828c36db"), bn("0x1106714d801cbcda4b2c")],
      [MAX_64x64, bn(1), bn("0xb504f333f9de6484")],
    ]);

    forEach(testSets).it("takes %e and returns %e", async function (x: BigNumber, y: BigNumber, expected: BigNumber) {
      const result: BigNumber = await this.abdkMath64x64.doGavg(x, y);
      expect(expected).to.equal(result);
    });
  });

  context("inv", async function () {
    const testSets = [
      [PI.mul(-1), bn("-0x517cc1b727220a95")],
      [E.mul(-1), bn("-0x5e2d58d8b3bcdf1b")],
      [bn("-0x20000000000000000"), bn("-0x8000000000000000")],
      [bn("-0x10000000000000000"), bn("-0x10000000000000000")],
      [bn("-0x12"), bn("-0xe38e38e38e38e38e38e38e38e38e38e")],
    ].concat([
      [bn("0x12"), bn("0xe38e38e38e38e38e38e38e38e38e38e")],
      [bn("0x10000000000000000"), bn("0x10000000000000000")],
      [bn("0x20000000000000000"), bn("0x8000000000000000")],
      [E, bn("0x5e2d58d8b3bcdf1b")],
      [PI, bn("0x517cc1b727220a95")],
    ]);

    forEach(testSets).it("takes %e and returns %e", async function (x: BigNumber, expected: BigNumber) {
      const result: BigNumber = await this.abdkMath64x64.doInv(x);
      expect(expected).to.equal(result);
    });
  });
}
