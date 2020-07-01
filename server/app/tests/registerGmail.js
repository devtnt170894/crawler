const puppeteer = require('puppeteer');
//const BASE_URL = 'https://accounts.google.com/signin/v2/identifier?hl=vi&continue=https%3A%2F%2Fmail.google.com%2Fmail&service=mail&flowName=GlifWebSignIn&flowEntry=AddSession';
//const BASE_URL = 'https://accounts.google.com/signin/v2/identifier?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin';
const BASE_URL = 'https://shell.azure.com/';
const registerGmail = { 
	browser: null,
	page: null,
	initialize: async () => {
		registerGmail.browser = await puppeteer.launch({ headless: false });
		registerGmail.page = await registerGmail.browser.newPage();
		await registerGmail.page.goto(BASE_URL, { waitUntil: 'networkidle2' })
    },
    closePage : async ()=>{
		await registerGmail.browser.close();
    },
    register : async (lastName,firstName,Username,Passwd,ConfirmPasswd)=>{
        let btnRegister = await registerGmail.page.$x('//span[contains(text(),"Tạo tài khoản")]');
        await btnRegister[0].click();
        await registerGmail.page.waitFor(1000);
        let btnClickIsMe = await registerGmail.page.$x('//div[contains(text(),"Cho bản thân tôi")]');
        await btnClickIsMe[0].click();
        await registerGmail.page.waitForNavigation({ waitUntil: 'networkidle2' });
        await registerGmail.page.waitFor(1000);
        await registerGmail.page.type('input[name="lastName"]',lastName);
        await registerGmail.page.waitFor(500);
        await registerGmail.page.type('input[name="firstName"]',firstName);
        await registerGmail.page.waitFor(500);
        await registerGmail.page.type('input[name="Username"]',Username);
        await registerGmail.page.waitFor(500);
        await registerGmail.page.type('input[name="Passwd"]',Passwd);
        await registerGmail.page.waitFor(500);
        await registerGmail.page.type('input[name="ConfirmPasswd"]',ConfirmPasswd);
        await registerGmail.page.waitFor(500);
        let btnNextStep = await registerGmail.page.$x('//span[contains(text(),"Tiếp theo")]');
        await btnNextStep[0].click();
    },
    loginAzure : async (loginfmt,passwd)=>{
      await registerGmail.page.type('input[name="loginfmt"]',loginfmt);
      await registerGmail.page.waitFor(50);
      let btnNext = await registerGmail.page.$('input[class="btn btn-block btn-primary"]');
      await btnNext.click();
      await registerGmail.page.waitForNavigation({ waitUntil: 'networkidle2' });
      await registerGmail.page.waitFor(500);
      await registerGmail.page.type('input[name="passwd"]',passwd);
      await registerGmail.page.waitFor(50);
      btnNext = await registerGmail.page.$('input[class="btn btn-block btn-primary"]');
      await btnNext.click();
      await registerGmail.page.waitForNavigation({ waitUntil: 'networkidle2' });
      await registerGmail.page.waitFor(500);
      btnNext = await registerGmail.page.$('input[class="btn btn-block btn-primary"]');
      await btnNext.click();
      await registerGmail.page.waitForNavigation({ waitUntil: 'networkidle2' });
      await registerGmail.page.waitFor(2000);
      let canvas = await registerGmail.page.$('div canvas[class="xterm-cursor-layer"]');
      for (let i = 0; i < 1000; i++) {
        await registerGmail.page.mouse.move(Math.random() * 500, Math.random() * 500);
        await registerGmail.sleep(100);
      }
      console.log("Looping on move...done");
    },
    sleep (time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }
}
module.exports = registerGmail;