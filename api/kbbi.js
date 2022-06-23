const axios = require("axios");
const cheerio = require("cheerio");
const express = require('express')
const router = express.Router()

router.get('/:keyword', (req, res) => {
    const keyword = req.params.keyword

    axios.get(`https://kbbi.web.id/${keyword}`).then((data) => {
      const html = data.data;
      const $ = cheerio.load(html)
      
      let myArr = [];
       $("div.content").each((i, element) => {
          myArr.push({
            link: $(element).find("a.link-kata").attr("href"),
            // tanggal: $(element).find("span.date").text().split(",")[1].trim(),
            // title: $(element).find("h2.title").text(),
            deskripsi: $(element).find("#d1").text(),
          })
        })
       
        res.status(200).json({ success: true, data: myArr });

    })
})

module.exports = router