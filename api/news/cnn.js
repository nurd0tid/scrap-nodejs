const axios = require("axios");
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
            link: $(element).find("a").attr("href"),
            title: $(element).find("h2.title").text(),
            tanggal: $(element).find("span.box_text > span.date").text()
            // deskripsi: $(element).find("p").text(),
          })
        })
       
        res.status(200).json({ success: true, data: myArr });

    })

    // var config = {
    //   method: "GET",
    //   url: `https://www.detik.com/search/searchall?query=${artikel}&siteid=${page}`,
    //   headers: {
    //     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36"
    //   }
    // };
    
    // axios(config)
    // .then(res => {
    //     var $ =  cheerio.load(res.data)
    //     let myArr = [];
    //     $("article").each((i, el) => {
    //       myArr.push({
    //         link: $(el).find("a").attr("href"),
    //         tanggal: $(el).find("span.date").text().split(",")[1].trim(),
    //         title: $(el).find("h2.title").text(),
    //         deskripsi: $(el).find("p").text(),
    //       })
    //     })
    //    console.log(myArr)
    // })
})

module.exports = router