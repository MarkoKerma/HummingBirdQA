
import { expect } from "@playwright/test";
import fs from "fs";

export class General {
  constructor(page) {

    this.page = page;
  }

  /**
   * writes token value to token.json file
   * @param {String} tokenValue 
   */
  async writeTokenToFile(tokenValue) {
    fs.writeFileSync(
      'tests\\fixtures\\token.json',
      JSON.stringify({
        tokenJWT: tokenValue
      }),
      (err) => {
        throw new Error(err);
      }
    );
  }
  
}
