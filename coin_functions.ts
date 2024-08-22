import ccxt, { Int, Ticker } from "ccxt";
import { logger } from "./bot";
const exchange = new ccxt.bitfinex2({timeout:30000});

export async function getCoinPrice(symbol: string): Promise<Int | null> {
  try {
    const ticker: Ticker = await exchange.fetchTicker(symbol);
    logger.info(`Returning price for ${symbol}`);
    return ticker.last;
  } catch (error: any) {
    logger.error(`Error while fetching price for ${symbol}:: ${error.message}`);
    return null;
  }
}
