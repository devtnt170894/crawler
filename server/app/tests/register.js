const registerGmail = require('./registerGmail');
(async () => {
     await registerGmail.initialize();
     await registerGmail.loginAzure("0750120180@sv.hcmunre.edu.vn","sdegiI325as");
})()