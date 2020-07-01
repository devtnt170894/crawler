const puppeteer = require('puppeteer');
const BASE_URL = 'https://batdongsan.com.vn/nha-dat-cho-thue-tp-hcm';
//const BASE_URL = 'https://batdongsan.com.vn/nha-dat-cho-thue';
const BASE_URL_DETAIL = 'https://batdongsan.com.vn/cho-thue-nha-mat-pho-duong-yersin-phuong-nguyen-thai-binh/quan-1-ngang-8-5m-dai-18-5-dien-tich-500m2-pr25682105';
const batdongsan = {
	browser: null,
	page: null,
	initialize: async () => {
		batdongsan.browser = await puppeteer.launch({ headless: false });
		batdongsan.page = await batdongsan.browser.newPage();
		await batdongsan.page.goto(BASE_URL, { waitUntil: 'networkidle2' })
	},
	closePage : async ()=>{
		await batdongsan.browser.close();
	},
	getPageUrlResults: async (nr) => {
		let results = [];
		for (let i = 0; i < nr; i++) {		
			let new_result = await batdongsan.getPageUrl();
			results = [...results, ...new_result];
			let nextPageButton = await batdongsan.page.$('.background-pager-right-controls a:nth-last-child(3)');
			if (nextPageButton) {
				await nextPageButton.click();
				await batdongsan.page.waitForNavigation({ waitUntil: 'networkidle2' });
			}
			else {
				break;
			}
		}
		return results;
	},
	getPageUrl : async ()=>{
		let elements = await batdongsan.page.$$('div[class*="Main"]>.vip0');
		let url = []
		for (let element of elements) {
			let title = await element.$eval(('div[class="p-title"] a'), el => el.href);
			let ngayDang = await element.$eval(('.uptime'), el => el.innerText.trim());	

			// let nowDate = new Date().setHours(0,0,0,0);;
			// var parts = ngayDang.split('/');
			// let myDate = new Date(parts[2], parts[1] - 1, parts[0]).setHours(0,0,0,0);;
			// if( nowDate > myDate ){
			// 	break;
			// }
			url.push({title,ngayDang});
		}
		return url;
	},
	pageResult : async (numPage)=>{
		let results = [];
		let elements = await batdongsan.getPageUrlResults(numPage);
		for (let el of elements) { 
			let data = await batdongsan.getResultDetail(el.title);
			//let data = await batdongsan.getResultDetail(BASE_URL_DETAIL);
			results = [...results,...data];
		}
		return results;
	},
	getResultDetail: async (url) => {
		await batdongsan.page.goto(url, { waitUntil: 'networkidle2' })
		const data = [];
		let btnHienSoContent = await batdongsan.page.$('span[class="hidden-phone hidden-mobile detail"]');
		if(btnHienSoContent){
			await btnHienSoContent.click();
		}
		let btnHienSoLienHe = await batdongsan.page.$('span[class="hidden-phone hidden-mobile detail border-phone"]');
		if(btnHienSoLienHe){
			await btnHienSoLienHe.click();
		}
		let sdtLienHe = await batdongsan.page.$('span[class="hidden-phone hidden-mobile detail border-phone show"]');
			sdtLienHe = await batdongsan.page.evaluate(body => body.getAttribute('raw').trim(), sdtLienHe);
		let tenLienHe = await batdongsan.page.$('div[class="right divContactName"]');
			tenLienHe = await batdongsan.page.evaluate(el => el.innerText.trim(), tenLienHe);
		let container = await batdongsan.page.$('div[id="product-detail"]');
		const title = await container.$eval(('div[class="pm-title"] > h1'), el => el.innerText.trim());
		const gia = await container.$eval(('span[class="gia-title mar-right-15"] > strong'), el => el.innerText.trim());
		const dienTich = await container.$eval(('span[class="gia-title"] > strong'), el => el.innerText.trim());
		let khuVuc = await container.$eval(('span[class="diadiem-title mar-right-15"]'), el => el.innerText.trim());
			khuVuc = await batdongsan.cutString(khuVuc,'-');
		const noiDungDang = await container.$eval(('div[class="pm-content"] .pm-desc'), el => el.innerText.trim());
		let maLoaiNgay = await batdongsan.page.$('div[class*="prd-more-info"]');
		let maTin = await maLoaiNgay.$eval(('div'), el => el.innerText);
			maTin = await batdongsan.cutString(maTin,':');
		let loaiChoThue = await batdongsan.page.$('div[class="searchrow advance-select-box"]:nth-child(4) span[class="select-text-content"]');
			loaiChoThue = await batdongsan.page.evaluate(body => body.innerText, loaiChoThue);
		let ngayDang = await maLoaiNgay.$eval(('div:nth-last-child(2)'), el => el.innerText);
			ngayDang = await batdongsan.cutString(ngayDang,':');
		let ngayHetHan = await maLoaiNgay.$eval(('div:nth-child(4)'), el => el.innerText);
			ngayHetHan = await batdongsan.cutString(ngayHetHan,':');
		let diaChi = await batdongsan.page.$('div[class="div-table-cell table1"] .table-detail .row:nth-child(2)');
			if(diaChi){
				diaChi = await batdongsan.page.evaluate(body => body.innerText, diaChi);
				diaChi = diaChi.indexOf("Địa chỉ") === 0 ? diaChi = diaChi.replace("Địa chỉ", "").trim() : diaChi= "";
			}	
			else{
				diaChi="";
			}
		let soPhongNgu = "";
		for (let i = 3; i < 5; i++) {
			soPhongNgu = await batdongsan.page.$(`div[class="div-table-cell table1"] .table-detail .row:nth-child(${i})`);
			if (soPhongNgu) {
				soPhongNgu = await batdongsan.page.evaluate(body => body.innerText, soPhongNgu);
				if(soPhongNgu.indexOf("Số phòng ngủ") === 0){
					soPhongNgu = soPhongNgu.replace("Số phòng ngủ", "").trim();
					break;
				}
				else{
					soPhongNgu = ""; 
				}	
			}else { 
				soPhongNgu = ""; 
			}
		}	
		data.push({ title,url, gia, dienTich, khuVuc, noiDungDang, maTin, loaiChoThue, ngayDang, ngayHetHan, diaChi,soPhongNgu,sdtLienHe,tenLienHe });
		return data;
	},
	cutString : async (str,char)=>{
		let result;
		result = str.split(`${char}`);
		result = result[1].trim();
		return result;
	}
};
// (async () => {
// 	await batdongsan.initialize();
// 	let rs = await batdongsan.getResultDetail(BASE_URL_DETAIL);
// 	//let rs = await batdongsan.getPageUrl();
// 	console.log(rs)
// 	 debugger;
//  })();
module.exports = batdongsan;