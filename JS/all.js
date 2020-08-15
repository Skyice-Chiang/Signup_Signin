let regEmail = document.querySelector(".regEmail");
let regPassword = document.querySelector(".regPassword");
let logEmail = document.querySelector(".logEmail");
let logPassword = document.querySelector(".logPassword");
let signUp = document.querySelector(".signup");
let signIn = document.querySelector(".signin");
let emailErr = document.querySelector(".emailErr");
let passwordErr = document.querySelector(".passwordErr");
let url = "https://hexschool-tutorial.herokuapp.com/api/";

/* 監聽 */
signUp.addEventListener("click", dataProcessing);
signIn.addEventListener("click", dataProcessing);


/* 資料處理 */
function dataProcessing(e) {
    let regEmailStr = regEmail.value;
    let regPasswordStr = regPassword.value;
    let logEmailStr = logEmail.value;
    let logPasswordStr = logPassword.value;
    let emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    let passwordRule = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,16}$/;
    let userData = {};
    let allData = [];

    //註冊
    if (e.target.value == "SIGNUP") {
        //防呆機制/格式正確-正則表達式
        if (regEmailStr == "" || regPasswordStr == "") {
            alert("請輸入正確的信箱或密碼");
            regEmail.value = "";
            regPassword.value = "";
        } else if (emailRule.test(regEmailStr) !== true && passwordRule.test(regPasswordStr) !== true) {
            emailErr.style.visibility = "visible";
            passwordErr.style.visibility = "visible";
            regEmail.value = "";
            regPassword.value = "";
        } else if (emailRule.test(regEmailStr) !== true) {
            passwordErr.style.visibility = "hidden";
            emailErr.style.visibility = "visible";
            regEmail.value = "";
        } else if (passwordRule.test(regPasswordStr) !== true) {
            emailErr.style.visibility = "hidden";
            passwordErr.style.visibility = "visible";
            regPassword.value = "";
        } else {
            //放入資料
            emailErr.style.visibility = "hidden";
            passwordErr.style.visibility = "hidden";
            userData.email = regEmailStr;
            userData.password = regPasswordStr;
            allData.push(userData);
            allData.push("signup");
        }
    //登入    
    } else if (e.target.value == "SIGNIN") {
        if (logEmailStr == "" || logPasswordStr == "") {
            alert("請輸入正確的信箱或密碼");
            logEmail.value = "";
            logPassword.value = "";
        } else {
            userData.email = logEmailStr;
            userData.password = logPasswordStr;
            allData.push(userData);
            allData.push("signin");
        }
    };
    console.log(allData);
    dataCheck(allData);
};

/* 向後台確認資料且回送結果 */
function dataCheck(data) {
    axios.post(url + data[1], data[0])
        .then(res => {
            alert(res.data.message);
            regEmail.value = "";
            regPassword.value = "";
            logEmail.value = "";
            logPassword.value = "";
        })
        .catch(err => { console.log("資料錯誤") })
};
