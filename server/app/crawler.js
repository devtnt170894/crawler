const batdongsan = require('./batdongsan');
const crawler =  {
    getData : async (numPage)=>{
        await batdongsan.initialize();
        let rs = await batdongsan.pageResult(numPage);
        console.log(rs);
        await batdongsan.closePage();
        return rs;
    }
   
};
// (async () => {
//    let rs = await crawler.getData(3);
//     debugger;
// })()

module.exports = crawler;