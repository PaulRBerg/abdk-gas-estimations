import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import hre from "hardhat";
import { Artifact } from "hardhat/types";

import { ABDKMath64x64Mock } from "../typechain/ABDKMath64x64Mock";
import { Signers } from "../types";
import { shouldBehaveLikeABDKMath64x64 } from "./ABDKMath64x64.behavior";

const { deployContract } = hre.waffle;

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await hre.ethers.getSigners();
    this.signers.admin = signers[0];
  });

  describe("ABDKMath64x64", function () {
    beforeEach(async function () {
      const abdkMath64x64MockArtifact: Artifact = await hre.artifacts.readArtifact("ABDKMath64x64Mock");
      this.abdkMath64x64 = <ABDKMath64x64Mock>await deployContract(this.signers.admin, abdkMath64x64MockArtifact, []);
    });

    shouldBehaveLikeABDKMath64x64();
  });
});
