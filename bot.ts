// importing the required packages for the bot file
import dotenv from "dotenv";
dotenv.config();
import { getCoinPrice } from "./coin_functions";
import { Telegraf } from "telegraf";

// getting the bot token from the dotenv file
const Token = process.env.BOT_TOKEN || "";

// create an instance of the telegram bot api
const bot = new Telegraf(Token);

// start command for the bot
bot.start(async (ctx) => {
  // getting the prices of the defualt tokens
  const solPrice = await getCoinPrice("SOL/USDT");
  const btcPrice = await getCoinPrice("BTC/USDT");
  const ethPrice = await getCoinPrice("ETH/USDT");
  ctx.replyWithMarkdownV2(
    `SOL \\$${solPrice}  BTC \\$${btcPrice}  ETH \\$${ethPrice} Trading Bot Official Here is your Solana wallet Fund your Wallet and start trading `
  );
});

// command to launch or start the bot
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
