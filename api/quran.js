const cheerio = require("cheerio");
const express = require('express')
const router = express.Router()

router.get('/:surah', (req, res) => {
    const surah = req.params.surah
    var axios = require('axios');

    axios.get(`https://quran.com/id/${surah}`).then((data) => {
      const html = data.data;
      const $ = cheerio.load(html)
      
      let myArr = [];
       $("div.TranslationViewCell_cellContainer__rhs1_").each((i, element) => {
          myArr.push({
            Arab: $(element).find("div.TranslationViewCell_arabicVerseContainer__1PutS").text(),
            Latin: $(element).find("div.TranslationText_translation-font-size-3__ww3t4").text(),
          })
        })

        console.log(myArr)
       
        res.status(200).json({ success: true, data: myArr });
      })
})

module.exports = router