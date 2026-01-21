

// 유저 데이터
let users = JSON.parse(localStorage.getItem('users')) || [
    { user_id: 1, nickname: "치킨킹", warning_cnt: 2, status: "활동중" },
    { user_id: 2, nickname: "카페빌런", warning_cnt: 3, status: "차단" },

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




printWlist()
function printWlist() {
    const listArea = document.querySelector("#foot");  

    let html = ""; 

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        // 경고가 없는 유저는 목록에서 제외
        if (user.warning_cnt === 0) continue;

       // 전체 리포트 중에서 이 유저의 마지막 리포트 찾기
      let lastReport = { reg_date: "-", reason: "-" }; // 기본값 설정
        
        for (let j = 0; j < reports.length; j++) {
            if (reports[j].user_id === user.user_id) {
                // 이 유저의 신고 기록을 찾을 때마다 lastReport를 업데이트함
                // 결국 마지막에 찾은 기록이 저장됨
                lastReport = reports[j];
            }
        }

        // 4. 상태(차단/경고)에 따른 디자인 설정
        let barColor = "progress-warning";
        let badgeClass = "badge-warning";
        let statusText = "경고중";
        let percent = (user.warning_cnt / 3) * 100;
        let badgeStyle = "";

        if (user.status === "차단") {
            barColor = "progress-danger";
            badgeClass = "badge-danger";
            statusText = "차단됨";
            percent = 100; // 차단은 게이지 꽉 차게
            badgeStyle = `cursor: pointer;`;
        }

        // 5. 백틱(``)을 사용하여 변수에 HTML 저장
        html += `
            <tr>
                <td>${user.nickname}</td>
                <td>
                    <span class="alert-level">${user.warning_cnt}</span>
                    <span style="color: #999; font-size: 14px;">/ 3</span>
                    <div class="progress-bar">
                        <div class="progress-fill ${barColor}" style="width: ${percent}%;"></div>
                    </div>
                </td>
                <td>${lastReport.reg_date}</td>
                <td>${lastReport.reason}</td>
                <td><span class="badge ${badgeClass}" style="${badgeStyle}" 
                      ${user.status === "차단" ? `onclick="unblockUser(${user.user_id})"` : ""}>${statusText}</span></td>
            </tr>
        `;
    }

    // 6. 반복문이 끝나면 tbody에 한 번에 넣기
    listArea.innerHTML = html;
}

function unblockUser(id){

    if (!confirm("이 유저의 차단을 해제하시겠습니까?")) return;

    for (let i = 0; i < users.length; i++) {
        if (users[i].user_id === id) {
            users[i].status = "활동중";      // 문자열 변경
            users[i].warning_cnt = 0;     // 경고 횟수도 초기화 (다시 활동해야 하니까요)
            break;
        }
    }

    saveData();     // 로컬스토리지 저장
    printWSum();    
    printWlist();   
    
    alert("차단이 해제되었습니다.");
}