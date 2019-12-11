const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

module.exports = {
  generatePdf: async function(data) {
    var templateHtml = fs.readFileSync(
      path.resolve("./src/templates/template.html"),
      "utf8"
    );
    var template = handlebars.compile(templateHtml);
    var html = template(data);

    /* 
      Create "out"" directory if it doesn't exists. 
      GitHub won't allow for commiting empty folders. 
      The PDF will be saved here.
    */
    const dir = "./out";

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    var pdfPath = path.resolve(`./out/${data.username}.pdf`);

    var options = {
      width: "1230px",
      height: "1500px",
      headerTemplate: "<p></p>",
      footerTemplate: "<p></p>",
      displayHeaderFooter: false,
      margin: {
        top: "10px",
        bottom: "30px"
      },
      printBackground: true,
      preferCSSPageSize: true,
      path: pdfPath
    };

    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      headless: true
    });

    var page = await browser.newPage();

    await page.goto(
      `data:text/html;charset=UTF-8,${encodeURIComponent(html)}`,
      {
        waitUntil: "networkidle2"
      }
    );

    await page.emulateMedia("screen");

    await page.pdf(options);
    await browser.close();
  }
};
