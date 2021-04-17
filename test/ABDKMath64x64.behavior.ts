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
}
