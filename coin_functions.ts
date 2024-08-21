// this file holds all the functions about any coin details

// import all required packages for the file
import ccxt, { Int, Ticker } from "ccxt";
import { logger } from "./bot";
// initialising the ccxt for requests with binance
const exchange = new ccxt.bitfinex2({timeout:30000});
  // help to avoid hitting rate limit.
  // enableRateLimit: true,
  // timeout: 30000,

// function to get price of any coin
export async function getCoinPrice(symbol: string): Promise<Int | null> {
  try {
    // fetch the ticker from the symbol
    const ticker: Ticker = await exchange.fetchTicker(symbol);
    // return the last traded price of the symbol
    logger.info(`Returning price for ${symbol}`);
    return ticker.last;
  } catch (error: any) {
    // catching the error is any
    logger.error(`Error while fetching price for ${symbol}`);
    logger.error(error.message);
    return null;
  }
}
