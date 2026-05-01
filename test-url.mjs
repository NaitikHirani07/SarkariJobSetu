const urlStr = "mysql://root:@localhost:3306/sarkari_job_setu";
const urlObj = new URL(urlStr);
console.log("protocol:", urlObj.protocol);
console.log("username:", urlObj.username);
console.log("password:", urlObj.password);
console.log("hostname:", urlObj.hostname);
console.log("pathname:", urlObj.pathname);
