// this file holds all the functions about any coin details

// import all required packages for the file
import ccxt, { binance, Int, Ticker } from "ccxt";
// initialising the ccxt for requests with binance
const exchange = new ccxt["binance"]();

// function to get price of any coin
export async function getCoinPrice(symbol: string): Promise<Int | null>{
    try{
        // load the market to make sure the symbol is available
        await exchange.loadMarkets();
        // fetch the ticker from the symbol
        const ticker: Ticker = await exchange.fetchTicker(symbol);
        // return the last traded price of the symbol
        return ticker.last;
    }catch(error){
        // catching the error is any
        console.error("Error fetching crypto price:", error);
        return null;
    }
}