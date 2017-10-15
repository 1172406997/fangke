import  "./sha1.js"
export const Encrypt = function(){
	var token="TONG";
			// 时间戳
	var timestamp = (Date.parse(new Date())) / 1000;
	// 随机数
	var nonce = parseInt(Math.random() * 10000);
	//字典排序
	var array = [token, timestamp, nonce];
	var str = array.sort().join(',').replace(/,/g, '');
	//sha1加密
  console.log(hex_sha1(str));
	var sha = hex_sha1(str); //hex_sha1函数可能需要引⼊外部库
	//				alert(sha)
	var strin = {"sha":sha,"nonce":nonce,"timestamp":timestamp}
	return strin;
}
