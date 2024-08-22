import dotenv from "dotenv";
dotenv.config();
import { getCoinPrice } from "./coin_functions";
import { Telegraf } from "telegraf";
import winston from "winston";
export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "bot.log" }),
  ],
});

const Token = process.env.BOT_TOKEN || "";
if (!Token) {
  logger.error("Bot Token is missing. kindly include the token in the .env");
  process.exit(1);
}

logger.info("Bot created.");
const bot = new Telegraf(Token);

bot.start(async (ctx) => {
  logger.info("Start command triggered by user");
  try {
    logger.info("Fetching price details concurrently");
    const [solPrice, btcPrice, ethPrice] = await Promise.all([
      getCoinPrice("SOL/USDT"),
      getCoinPrice("BTC/USDT"),
      getCoinPrice("ETH/USDT"),
    ]);
    const message = `SOL: <b>$${solPrice || "N/A"}</b> ═ BTC: <b>$${
      btcPrice || "N/A"
    }</b>  ═ ETH: <b>$${ethPrice || "N/A"}\n</b> 
  <b>Solana-Bot - Trading Bot Official\n</b>
💡 Here is your Solana wallet. Fund your wallet and start trading.
🅴 Your Solana Wallet: <code>eekmlamel</code> (tap to copy)\n
Balance: 
Enter a token address to quickly open the buy menu.
      `;
    logger.info("Sending price details to the user");
    await ctx.replyWithHTML(message);
  } catch (error: any) {
    logger.error(
      `Error while fetching prices or sending message: ${error.message}`
    );
    ctx.reply(
      "An error occurred while fetching the price details. Please try again later."
    );
  }
});

bot.launch();
logger.info("Bot launched successfully.");

// // Enable graceful stop
// process.once("SIGINT", () => {
//   logger.info("Bot stopping due to SIGINT.");
//   bot.stop("SIGINT");
// });

// process.once("SIGTERM", () => {
//   logger.info("Bot stopping due to SIGTERM.");
//   bot.stop("SIGTERM");
// });
