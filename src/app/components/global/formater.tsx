import Numeral from "numeral";
import React from "react";

// Check is integer
export const isInt = (value: any) => {
  if (isNaN(value)) {
    return false;
  }
  var x = parseFloat(value);
  return (x | 0) === x;
};

// Advanced formater
export const Format = React.memo(
  ({ number, fix, type, coin, negative }: format.price) => {
    const fixedLength = 6;
    const numLength = Math.floor(+(number || 0)).toString().length;
    const totalnNumLength =
      (+(number || 0) * 1)
        .toString()
        .match(/\.[0-9]{0,}/g)?.[0]
        ?.replace(".", "")?.length || 0;
    const length =
      totalnNumLength <= fixedLength
        ? totalnNumLength
        : numLength >= 4
        ? 2
        : fixedLength - numLength;
    return (
      <>
        {`${
          type &&
          ({
            coin: "",
            number: "",
            amount: "$",
            percentage: "",
          }[type] ||
            "")
        } ${Numeral(
          parseFloat(
            number
              ? number <= 0 && !negative
                ? `0`
                : `${number}`.match(
                    new RegExp(`^-?\\d+(?:\.\\d{0,${fix || length}})?`)
                  )?.[0] || `0`
              : `0`
          )
        ).format(`0,0.${new Array(fix || length).fill("0").join("")}`)} ${
          type &&
          ({
            coin: coin,
            number: "",
            amount: "",
            percentage: "%",
          }[type] ||
            "")
        }`.trim()}
      </>
    );
  }
);

export declare namespace format {
  export interface price {
    number?: number | string;
    fix?: number;
    type: "coin" | "number" | "amount" | "percentage" | string | undefined;
    coin?: string;
    negative?: boolean;
  }
}
