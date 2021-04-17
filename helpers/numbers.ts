import { BigNumber, BigNumberish } from "@ethersproject/bignumber";

export function bn(x: BigNumberish): BigNumber {
  if (BigNumber.isBigNumber(x)) {
    return x;
  }
  return BigNumber.from(x);
}
