const axios = require("axios");
const cheerio = require("cheerio");

axios({
  method: "GET",
  url: "https://194.163.183.129/anime/princess-connect-re-dive-season-2/",
  headers: {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
  }
}).then(res => {
  const $ = cheerio.load(res.data);
  let myArr = [];
  $("div.post-body").each((i, el) => {
    myArr.push({
      judul: $(el).find("h1.entry-title").text(),
      deskripsi: $(el).find("div.desc").text(),
      linkBacth: $(el).find("div.listbatch > a").attr("href"),
    })
  })
  console.log(myArr);
}).catch(err => {
  console.log(err);
})