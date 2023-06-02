# If you want to set up the bot for yourself

## Installation

In the `stables-discord-bot` directory, run the following command:

```bash
npm i
```

### create .env file

Create a `.env` file and add the token ID of your Discord bot and the channel ID of the channel where you want the bot to send messages.

For example :

```
TOKEN = your-token

CHANID = your-chan-id
```

## Usage
Once you have set up the `.env` file:
 
Make sure you have Node.js installed (version 18 or higher).
To start the bot, run the following command from the root directory:

```
node index.js
```

When you see `Discord bot ready` in the console, it means the bot is running.
