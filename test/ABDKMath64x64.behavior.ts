import { expect } from "chai";
import { BigNumber } from "ethers";
import forEach from "mocha-each";

import { E, MAX_64x64, MIN_64x64, PI, ZERO } from "../helpers/constants";
import { bn } from "../helpers/numbers";

export function shouldBehaveLikeABDKMath64x64(): void {
  context("abs", function () {
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

  context("avg", function () {
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

  context("div", function () {
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

  context("exp", function () {
    const testSets = [
      [bn("-0x400000000000000001"), ZERO],
      [bn("-0x400000000000000000"), ZERO],
    ].concat([
      [ZERO, bn("0x10000000000000000")],
      [bn("0x12"), bn("0x10000000000000011")],
      [bn("0x480f"), bn("0x1000000000000480e")],
      [bn("0x10000000000000000"), bn("0x2b7e151628aed2a69")],
      [bn("0x20000000000000000"), bn("0x763992e35376b7307")],
      [E, bn("0xf277dbaf2293d7ad1")],
      [PI, bn("0x1724046eb093399ebf")],
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

  context("exp2", function () {
    const testSets = [
      [bn("-0x400000000000000001"), ZERO],
      [bn("-0x400000000000000000"), 1],
    ].concat([
      [ZERO, bn("0x10000000000000000")],
      [bn("0x12"), bn("0x1000000000000000c")],
      [bn("0x480f"), bn("0x100000000000031f2")],
      [bn("0x10000000000000000"), bn("0x20000000000000000")],
      [bn("0x20000000000000000"), bn("0x40000000000000000")],
      [E, bn("0x694b4f1be2063a2bc")],
      [PI, bn("0x8d331bf3337c1a6da")],
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

  context("gavg", function () {
    const testSets = [
      [MIN_64x64.add(1), bn(-1), bn("0xb504f333f9de6484")],
      [bn("-0x964cccccccccccccccd"), bn("-0x1edb35edf1e0828c36db"), bn("0x1106714d801cbcda4b2c")],
      [bn("-0x1427851eb851eb851ec"), bn("-0x2a2c51eb851eb851eb8"), bn("0x1d277ff195650278509")],
      [PI.mul(-1), bn("-0x83333333333333333"), bn("0x5135649fd908ab2e7")],
      [E.mul(-1), bn("-0x59028f5c28f5c28f5c"), bn("0xf8e0c8f73566eebbd")],
      [bn("-0x20000000000000000"), bn("-0x80000000000000000"), bn("0x40000000000000000")],
      [bn("-0x10000000000000000"), bn("-0x40000000000000000"), bn("0x20000000000000000")],
      [bn("-0x10000000000000000"), bn("-0x10000000000000000"), bn("0x10000000000000000")],
      [ZERO, PI.mul(-1), ZERO],
    ].concat([
      [ZERO, PI, ZERO],
      [bn("0x10000000000000000"), bn("0x10000000000000000"), bn("0x10000000000000000")],
      [bn("0x10000000000000000"), bn("0x40000000000000000"), bn("0x20000000000000000")],
      [bn("0x20000000000000000"), bn("0x80000000000000000"), bn("0x40000000000000000")],
      [E, bn("0x59028f5c28f5c28f5c"), bn("0xf8e0c8f73566eebbd")],
      [PI, bn("0x83333333333333333"), bn("0x5135649fd908ab2e7")],
      [bn("0x1427851eb851eb851ec"), bn("0x2a2c51eb851eb851eb8"), bn("0x1d277ff195650278509")],
      [bn("0x964cccccccccccccccd"), bn("0x1edb35edf1e0828c36db"), bn("0x1106714d801cbcda4b2c")],
      [MAX_64x64, bn(1), bn("0xb504f333f9de6484")],
    ]);

    forEach(testSets).it("takes %e and returns %e", async function (x: BigNumber, y: BigNumber, expected: BigNumber) {
      const result: BigNumber = await this.abdkMath64x64.doGavg(x, y);
      expect(expected).to.equal(result);
    });
  });

  context("inv", function () {
    const testSets = [
      [PI.mul(-1), bn("-0x517cc1b727220a95")],
      [E.mul(-1), bn("-0x5e2d58d8b3bcdf1a")],
      [bn("-0x20000000000000000"), bn("-0x8000000000000000")],
      [bn("-0x10000000000000000"), bn("-0x10000000000000000")],
      [bn("-0x12"), bn("-0xe38e38e38e38e38e38e38e38e38e38e")],
    ].concat([
      [bn("0x12"), bn("0xe38e38e38e38e38e38e38e38e38e38e")],
      [bn("0x10000000000000000"), bn("0x10000000000000000")],
      [bn("0x20000000000000000"), bn("0x8000000000000000")],
      [E, bn("0x5e2d58d8b3bcdf1a")],
      [PI, bn("0x517cc1b727220a95")],
    ]);

    forEach(testSets).it("takes %e and returns %e", async function (x: BigNumber, expected: BigNumber) {
      const result: BigNumber = await this.abdkMath64x64.doInv(x);
      expect(expected).to.equal(result);
    });
  });

  context("ln", function () {
    const testSets = [
      [bn("0x199999999999999a"), bn("-0x24d763776aaa2b059")],
      [bn("0x3333333333333333"), bn("-0x19c041f7ed8d336b2")],
      [bn("0x4ccccccccccccccd"), bn("-0x134378fcbda7206e5")],
      [bn("0x6666666666666666"), bn("-0xea9207870703bd06")],
      [bn("0x8000000000000000"), bn("-0xb17217f7d1cf79ac")],
      [bn("0x999999999999999a"), bn("-0x82c577d408a28d39")],
      [bn("0xb333333333333333"), bn("-0x5b4f0c9384fd3b16")],
      [bn("0xcccccccccccccccd"), bn("-0x391fef8f35344359")],
      [bn("0xe666666666666666"), bn("-0x1af8e8210a415d70")],
      [bn("0x10000000000000000"), ZERO],
      [bn("0x12000000000000000"), bn("2172713514977912297")],
      [bn("0x20000000000000000"), bn("0xb17217f7d1cf79ab")],
      [E, bn("0xffffffffffffffff")],
      [PI, bn("0x1250d048e7a1bd0bc")],
      [bn("0x40000000000000000"), bn("0x162e42fefa39ef357")],
      [bn("0x80000000000000000"), bn("38358925935607966979")],
      [bn("0xde0b6b3a76400000000000000000000"), bn("0x29724fe657ff706671")],
      [MAX_64x64, bn("0x2bab13e5fca20ef145")],
    ];

    forEach(testSets).it("takes %e and returns %e", async function (x: BigNumber, expected: BigNumber) {
      const result: BigNumber = await this.abdkMath64x64.doLn(x);
      expect(expected).to.equal(result);
    });
  });

  context("log2", function () {
    const testSets = [
      [bn("0x199999999999999a"), bn("-0x035269e12f346e2bf4")],
      [bn("0x3333333333333333"), bn("-0x025269e12f346e2bfb")],
      [bn("0x4ccccccccccccccd"), bn("-0x01bca9c6f53897a459")],
      [bn("0x6666666666666666"), bn("-0x015269e12f346e2bfb")],
      [bn("0x8000000000000000"), bn("-0x010000000000000000")],
      [bn("0x999999999999999a"), bn("-0xbca9c6f53897a459")],
      [bn("0xb333333333333333"), bn("-0x83bb1144b3e890c7")],
      [bn("0xcccccccccccccccd"), bn("-0x5269e12f346e2bf9")],
      [bn("0xe666666666666666"), bn("-0x26e9acbb3cc11cbb")],
      [bn("0x10000000000000000"), ZERO],
      [bn("0x12000000000000000"), bn("0x2b803473f7ad0f3f")],
      [bn("0x20000000000000000"), bn("0x10000000000000000")],
      [E, bn("0x0171547652b82fe177")],
      [PI, bn("0x01a6c873498ddf75b0")],
      [bn("0x40000000000000000"), bn("0x20000000000000000")],
      [bn("0x80000000000000000"), bn("0x30000000000000000")],
      [bn("0xde0b6b3a76400000000000000000000"), bn("0x3bcb71d551afbf1784")],
      [MAX_64x64, bn("0x3effffffffffffffff")],
    ];

    forEach(testSets).it("takes %e and returns %e", async function (x: BigNumber, expected: BigNumber) {
      const result: BigNumber = await this.abdkMath64x64.doLog2(x);
      expect(expected).to.equal(result);
    });
  });

  context("mul", function () {
    const testSets = [
      [MIN_64x64, bn("0x12"), bn("-0x090000000000000000")],
      [bn("-0xf42400000000000000000"), bn("0x10000000000000000"), bn("-0x0f42400000000000000000")],
      [bn("-0x32b7fd2f1a9fbe76c8b4"), bn("0x30efd70a3d70a3d70a4"), bn("-0x9b203d8c0f66a55087087f")],
      [bn("-0x26590000000000000000"), bn("0x92c0000000000000000"), bn("-0x015fb84c0000000000000000")],
      [bn("-0x13a45604189374bc6a8"), bn("0xbc30a3d70a3d70a3d7"), bn("-0xe706a8d4562e09fe8683")],
      [bn("-0x124ccccccccccccccd"), bn("0xc0a3d70a3d70a3d71"), bn("-0xdc54fdf3b645a1caca")],
      [PI.mul(-1), E, bn("-0x088a2c05a2ea3a4f32")],
      [bn("-0x21916872b020c49ba"), bn("0x11e76c8b439581062"), bn("-0x02590060780fdc1615")],
      [bn("-0x28f5c28f5c28f5c"), bn("0xccccccccccccccd"), bn("-0x20c49ba5e353f8")],
      [bn("-0x4189374bc6a7f0"), bn("0x28f5c28f5c28f5c"), bn("-0xa7c5ac471b48")],
      [bn("-0xa7c5ac471b48"), bn("0xa7c5ac471b48"), bn("-0x6df37f68")],
      [bn("-0x10000000000000000"), bn("0x10000000000000000"), bn("-0x10000000000000000")],
      [bn("-0x1"), ZERO, ZERO],
      [bn("-0x1"), bn("0x1"), bn("-0x1")],
    ].concat([
      [bn("0x1"), bn("0x1"), ZERO],
      [bn("0x1"), ZERO, ZERO],
      [bn("0x10000000000000000"), bn("0x10000000000000000"), bn("0x10000000000000000")],
      [bn("0xa7c5ac471b48"), bn("0xa7c5ac471b48"), bn("0x6df37f67")],
      [bn("0x4189374bc6a7f0"), bn("0x28f5c28f5c28f5c"), bn("0xa7c5ac471b47")],
      [bn("0x28f5c28f5c28f5c"), bn("0xccccccccccccccd"), bn("0x20c49ba5e353f7")],
      [bn("0x21916872b020c49ba"), bn("0x11e76c8b439581062"), bn("0x02590060780fdc1614")],
      [PI, E, bn("0x088a2c05a2ea3a4f31")],
      [bn("0x124ccccccccccccccd"), bn("0xc0a3d70a3d70a3d71"), bn("0xdc54fdf3b645a1cac9")],
      [bn("0x13a45604189374bc6a8"), bn("0xbc30a3d70a3d70a3d7"), bn("0xe706a8d4562e09fe8682")],
      [bn("0x26590000000000000000"), bn("0x92c0000000000000000"), bn("0x015fb84c0000000000000000")],
      [bn("0x32b7fd2f1a9fbe76c8b4"), bn("0x30efd70a3d70a3d70a4"), bn("0x9b203d8c0f66a55087087e")],
      [bn("0xf42400000000000000000"), bn("0x10000000000000000"), bn("0x0f42400000000000000000")],
      [MAX_64x64, bn("0x12"), bn("0x08ffffffffffffffff")],
    ]);

    forEach(testSets).it("takes %e and returns %e", async function (x: BigNumber, y: BigNumber, expected: BigNumber) {
      const result: BigNumber = await this.abdkMath64x64.doMul(x, y);
      expect(expected).to.equal(result);
    });
  });

  context("pow", function () {
    const testSets = [
      [ZERO, ZERO, bn("0x10000000000000000")],
      [ZERO, bn("0x10000000000000000"), ZERO],
      [ZERO, E, ZERO],
      [ZERO, PI, ZERO],
      [bn("0x4189374bc6a7f0"), bn(3), bn("0x044b82fa09")],
      [bn("0x199999999999999a"), bn(2), bn("0x28f5c28f5c28f5c")],
      [bn("0x10000000000000000"), bn(1), bn("0x10000000000000000")],
      [bn("0x20000000000000000"), bn(5), bn("0x200000000000000000")],
      [bn("0x20000000000000000"), bn(62), bn("0x40000000000000000000000000000000")],
      [E, bn(2), bn("0x0763992e35376b730e")],
      [bn("0x640000000000000000"), bn(4), bn("0x05f5e1000000000000000000")],
      [PI, bn(3), bn("0x1f019b59389d7c1dff")],
      [bn("0x57db22d0e56041893"), bn(19), bn("0x66d7fb57e4c479dd52cc8d80b156")],
      [bn("0x19342a7ef9db22d0e560"), bn(4), bn("0x06283d66b906be3c806ab9413ac745")],
      [bn("0xf42400000000000000000"), bn(2), bn("0xe8d4a510000000000000000000")],
      [MAX_64x64, bn(1), MAX_64x64],
    ];

    forEach(testSets).it("takes %e and returns %e", async function (x: BigNumber, y: BigNumber, expected: BigNumber) {
      const result: BigNumber = await this.abdkMath64x64.doPow(x, y);
      expect(expected).to.equal(result);
    });
  });

  context("sqrt", function () {
    const testSets = [
      [ZERO, ZERO],
      [bn("0x12"), bn("0x43e1db337")],
      [bn("0x480f"), bn("0x87d1da0d7f")],
      [bn("0x10000000000000000"), bn("0x10000000000000000")],
      [bn("0x20000000000000000"), bn("0x016a09e667f3bcc908")],
      [E, bn("0x01a61298e1e069bc97")],
      [bn("0x30000000000000000"), bn("0x01bb67ae8584caa73b")],
      [PI, bn("0x01c5bf891b4ef6aa79")],
      [bn("0x40000000000000000"), bn("0x20000000000000000")],
      [bn("0x100000000000000000"), bn("0x40000000000000000")],
      [bn("0x16345785d8a00000000000000000000"), bn("0x12d940b6044f7da46cfe7000")],
      [bn("0xde0b6b3a76400000000000000000000"), bn("0x3b9aca000000000000000000")],
    ];

    forEach(testSets).it("takes %e and returns %e", async function (x: BigNumber, expected: BigNumber) {
      const result: BigNumber = await this.abdkMath64x64.doSqrt(x);
      expect(expected).to.equal(result);
    });
  });
}
