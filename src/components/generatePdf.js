const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const handlebars = require("handlebars");

module.exports = {
  generatePdf: async function(data, colour) {
    var templateHtml = fs.readFileSync(
      path.resolve("./src/templates/template.html"),
      "utf8"
    );
    var template = handlebars.compile(templateHtml);
    var html = template(data);

    var pdfPath = path.resolve(`./out/${data.name}.pdf`);

    var options = {
      width: "1230px",
      headerTemplate: "<p></p>",
      footerTemplate: "<p></p>",
      displayHeaderFooter: false,
      margin: {
        top: "10px",
        bottom: "30px"
      },
      printBackground: true,
      path: pdfPath
    };

    const browser = await puppeteer.launch({
      args: ["--no-sandbox"],
      headless: true
    });

    var page = await browser.newPage();

    await page.goto(`data:text/html;charset=UTF-8,${html}`, {
      waitUntil: "networkidle0"
    });

    await page.pdf(options);
    await browser.close();
  }
};
