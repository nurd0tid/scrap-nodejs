const cheerio = require("cheerio");
const express = require('express')
const router = express.Router()

router.get('/search/:artikel/:page', (req, res) => {
    const artikel = req.params.artikel
    const page = req.params.page
    var axios = require('axios');

    axios.get(`https://www.detik.com/search/searchall?query=${artikel}&siteid=${page}`).then((data) => {
      const html = data.data;
      const $ = cheerio.load(html)
      
      let myArr = [];
       $("article").each((i, element) => {
          myArr.push({
            link: $(element).find("a").attr("href"),
            tanggal: $(element).find("span.date").text().split(",")[1].trim(),
            title: $(element).find("h2.title").text(),
            deskripsi: $(element).find("p").text(),
          })
        })
       
        res.status(200).json({ success: true, data: myArr });

    })
})

module.exports = router