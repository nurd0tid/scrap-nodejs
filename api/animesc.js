const cheerio = require("cheerio");
const express = require('express')
const router = express.Router()

router.get('/:judul', (req, res) => {
    const judul = req.params.judul
    var axios = require('axios');

    axios.get(`https://194.163.183.129/anime/${judul}`).then((data) => {
      const html = data.data;
      const $ = cheerio.load(html)
      
      let myArr = [];
       $("div.post-body").each((i, element) => {
          myArr.push({
            image: $(element).find("img").attr("src"),
            linkBacth: $(element).find("div.listbatch > a").attr("href"),
            judul: $(element).find("h1.entry-title").text(),
            deskripsi: $(element).find("div.desc").text(),
          })
        })
       
        res.status(200).json({ success: true, data: myArr });

    })
})

module.exports = router