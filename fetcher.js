const [url, loc] = process.argv.slice(2);
const paths = { url, loc };
const fs = require("fs");
const request = require("request");

request(paths.url, (error, response, body) => {
  if (error) {
    console.log(error);
    return;
  }

  if (!error && response.statusCode === 200) {
    fs.writeFile(paths.loc, body, (err) => {
      if (err) {
        console.error(err);
      }

      fs.stat(paths.loc, (err, stats) => {
        console.log(`Downloaded and saved ${stats.size} to ${paths.loc}`);
      });
    });
  }
});
