const cheerio = require("cheerio");
const express = require('express')
const router = express.Router()

router.get('/search/:artikel/:page', (req, res) => {
    const artikel = req.params.artikel
    const page = req.params.page
    var axios = require('axios');

    axios.get(`https://www.cnnindonesia.com/search/?query=${artikel}&page=${page}`).then((data) => {
      const html = data.data;
      const $ = cheerio.load(html)
      
      let myArr = [];
       $("article").each((i, element) => {
          myArr.push({
            image: $(element).find("img").attr("src"),
            link: $(element).find("a").attr("href"),
            title: $(element).find("h2.title").text(),
          })
        })
       
        res.status(200).json({ success: true, data: myArr });

    })
})

module.exports = router