const crawler = require('../crawler');
const axios = require('axios');
const API_URL = 'http://localhost:8080';
exports.crawler = async (req, res) => {
  let results = await crawler.getData(req.params.numPage);
  let error = [];
  let success = [];
  for (const result of results) {
    let matin = await axios.get(`${API_URL}/api/news/${result.maTin}`);
    if(matin.data){
      error.push(result.maTin);
      continue;
    }
    try {
      await axios({
        method: 'POST',
        url: `${API_URL}/api/news`,
        headers: { 'Content-Type': 'application/json' },
        data: result
      }).then(rs=>{
        success.push(rs.data.maTin);
      }).catch(err => {
         console.error(err);
      });
    } catch (error) {
      console.error(error)
    }
  }
    res.send({
      success : success,
      error  : error
    });
};