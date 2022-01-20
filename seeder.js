const { MongoClient } = require("mongodb");
require("dotenv").config();
const fs = require("fs").promises;
const path = require("path");
const loading = require("loading-cli");
const { MONGODB_URI } = process.env;


/**
 * constants
 */
const client = new MongoClient(MONGODB_URI);

async function main() {
  try {
    await client.connect();
    const db = client.db();
    const results = await db.collection("Pokemon").find({}).count();

    /**
     * If existing records then delete the current collections
     */
    if (results) {
      console.info("deleting collection");
      await db.collection("Pokemon").drop();
    }

    /**
     * This is just a fun little loader module that displays a spinner
     * to the command line
     */
    const load = loading("importing your pokemon (._.)!!").start();

    /**
     * Import the JSON data into the database
     */

    const data = await fs.readFile(path.join(__dirname, "Generation1-7.json"), "utf8");
    await db.collection("Pokemon").insertMany(JSON.parse(data));



      /**
       * Finally, we remove nulls regions from our collection of arrays
       *  */
      await db
        .collection("Pokemon")
        .updateMany({ regions: { $all: [null] } }, [
          { $set: { regions: [{ $arrayElemAt: ["$regions", 0] }] } },
        ]);
      load.stop();
      console.info(
        `Pokemon collection set up (._.)!!`
      );
      process.exit();
    }
  } catch (error) {
    console.error("error:", error);
    process.exit();
  }
}

main();
