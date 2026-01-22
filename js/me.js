const today = new Date().toISOString().split('T')[0]; // 오늘 날짜 

printWSum() //실행

function printWSum() {

    autoBlockCheck();
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
    for (let i = 0; i < users.length; i++) {
        if (users[i].status == "차단") {
            blockCount++;
        }
    }
    html2 = `${blockCount}명`
    stat2.innerHTML = html2;


    const stat3 = document.querySelector("#c")
    let html3 = '';
    for (let i = 0; i < reports.length; i++) {
        if (reports[i].reg_date == today) {
            todayBlock++
        }
    }
    html3 = `${todayBlock}건`
    stat3.innerHTML = html3;


    const stat4 = document.querySelector("#d")
    let html4 = '';

    // 자동차단 로직 실행
    const autoBlocked = autoBlockCheck();
    if (autoBlocked > 0) {
        saveData(); // 변경사항 저장
    }

    html4 = `${autoBlocked}명`
    stat4.innerHTML = html4;
}



printWlist()
function printWlist() {
    syncUsersFromPosts();
    const listArea = document.querySelector("#foot");
    let users = JSON.parse(localStorage.getItem('users')) || [];
    
    let html = "";

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        if (user.warning_cnt === 0) continue;

        let lastReport = { reg_date: "-", reason: "-" };

        for (let j = 0; j < reports.length; j++) {
            let 신고대상_user_id = null;
            for (let k = 0; k < posts.length; k++) {
                if (posts[k].post_id === reports[j].post_id) {
                    신고대상_user_id = posts[k].user_id;
                    break;
                }
            }
            
            if (신고대상_user_id === user.user_id) {
                lastReport = reports[j];
            }
        }

        // 상태(차단/경고)에 따른 디자인 설정
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

        // HTML 저장 (user_id가 문자열이므로 따옴표 추가)
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
                      ${user.status === "차단" ? `onclick="unblockUser('${user.user_id}')"` : ""}>${statusText}</span></td>
            </tr>
        `;
    }

    listArea.innerHTML = html;
    saveData();
}



// 차단해체 
function unblockUser(id) {

    if (!confirm("이 유저의 차단을 해제하시겠습니까?")) return;

    for (let i = 0; i < users.length; i++) {
        if (users[i].user_id === id) {
            users[i].status = "활동중";
            users[i].warning_cnt = 0;
            break;
        }
    }

    saveData();
    printWSum();
    printWlist();

    alert("차단이 해제되었습니다.");
}




//자동차단

function autoBlockCheck() {
    let autoBlockCount = 0; // 자동차단된 유저 수

    for (let i = 0; i < users.length; i++) {
        // 경고 3회 이상 && 아직 차단 상태가 아닌 경우
        if (users[i].warning_cnt >= 3 && users[i].status !== "차단") {
            users[i].status = "차단"; // 상태를 차단으로 변경
            autoBlockCount++;
        }
    }

    return autoBlockCount; // 자동차단된 유저 수 반환
}





// 10초마다 자동차단 체크 및 화면 갱신
setInterval(() => {
    autoBlockCheck();
    saveData();
    printWSum();
    printWlist();
}, 5000);