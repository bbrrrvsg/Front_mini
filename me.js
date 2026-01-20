

// 유저 데이터
let users = JSON.parse(localStorage.getItem('users')) || [
    { user_id: 1, nickname: "치킨킹", warning_cnt: 2, status: "활동중" },
    { user_id: 2, nickname: "카페빌런", warning_cnt: 3, status: "차단" },
    { user_id: 3, nickname: "매너점주", warning_cnt: 0, status: "차단" }
];

let reports = JSON.parse(localStorage.getItem('reports')) || [
    { report_id: 1, user_id: 2, reason: "비방 욕설", reg_date: "2026-01-20" },
    { report_id: 2, user_id: 1, reason: "도배", reg_date: "2026-01-20" }
];

const today = new Date().toISOString().split('T')[0]; // 오늘 날짜 

printWSum() //실행

function printWSum() {
    let warningCount = 0; // 경고 변수
    let blockCount = 0; // 차단 변수 
    let todayBlock = 0; // 오늘 발급한 경고 변수 

    const stat1 = document.querySelector("#a");
    let html1 = "";

    for (let i = 0; i < users.length; i++) {
        // 경고가 1회 이상이고, 상태가 '차단'이 아닌 경우
        if (users[i].warning_cnt > 0 && users[i].status !== '차단') {
            warningCount++; // 조건에 맞으면 1씩 증가
        }
    }
    html1 = `${warningCount}명`
    stat1.innerHTML = html1;


    const stat2 = document.querySelector("#b")
    let html2 = '';
    for (let i = 0; i < users.length; i++){
        if(users[i].status == "차단"){
            blockCount++;
        }
    }
    html2 = `${blockCount}명`
    stat2.innerHTML = html2;


    const stat3 = document.querySelector("#c")
    let html3 = '';
    for (let i = 0; i < reports.length; i++){
        if(reports[i].reg_date == today){
            todayBlock++
        } 
    }
    html3 = `${todayBlock}건`
    stat3.innerHTML = html3;



    const stat4 = document.querySelector("#d")
    let html4 ='';
    // 자동차단 들어가야함 (추후에)




}

function saveData() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('reports', JSON.stringify(reports));
}





function printWlist() {

}