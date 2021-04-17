// eslint-disable @typescript-eslint/no-explicit-any
import { Fixture } from "ethereum-waffle";

import { Signers } from "./";
import { ABDKMath64x64Mock } from "../typechain/ABDKMath64x64Mock";

declare module "mocha" {
  export interface Context {
    abdkMath64x64: ABDKMath64x64Mock;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}
