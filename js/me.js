// ========================================
// 1. 데이터 초기화
// ========================================
let users = JSON.parse(localStorage.getItem('users')) || [
    { user_id: 1, nickname: "치킨킹", warning_cnt: 2, status: "활동중" },
    { user_id: 2, nickname: "카페빌런", warning_cnt: 3, status: "차단" },
    { user_id: 3, nickname: "유저3", warning_cnt: 2, status: "활동중" },
    { user_id: 4, nickname: "유저4", warning_cnt: 3, status: "차단" },
    { user_id: 5, nickname: "유저5", warning_cnt: 1, status: "활동중" },
    { user_id: 6, nickname: "유저6", warning_cnt: 4, status: "차단" },
    { user_id: 7, nickname: "유저7", warning_cnt: 0, status: "활동중" },
    { user_id: 8, nickname: "유저8", warning_cnt: 2, status: "활동중" },
    { user_id: 9, nickname: "유저9", warning_cnt: 5, status: "차단" },
    { user_id: 10, nickname: "유저10", warning_cnt: 1, status: "활동중" },
    { user_id: 11, nickname: "유저11", warning_cnt: 0, status: "활동중" },
    { user_id: 12, nickname: "유저12", warning_cnt: 3, status: "차단" },
    { user_id: 13, nickname: "유저13", warning_cnt: 2, status: "활동중" },
    { user_id: 14, nickname: "유저14", warning_cnt: 1, status: "활동중" },
    { user_id: 15, nickname: "유저15", warning_cnt: 4, status: "차단" },
    { user_id: 16, nickname: "유저16", warning_cnt: 0, status: "활동중" },
    { user_id: 17, nickname: "유저17", warning_cnt: 2, status: "활동중" },
    { user_id: 18, nickname: "유저18", warning_cnt: 3, status: "차단" },
    { user_id: 19, nickname: "유저19", warning_cnt: 1, status: "활동중" },
    { user_id: 20, nickname: "유저20", warning_cnt: 0, status: "활동중" },
    { user_id: 21, nickname: "유저21", warning_cnt: 2, status: "활동중" },
    { user_id: 22, nickname: "유저22", warning_cnt: 4, status: "차단" },
    { user_id: 23, nickname: "유저23", warning_cnt: 1, status: "활동중" },
    { user_id: 24, nickname: "유저24", warning_cnt: 0, status: "활동중" },
    { user_id: 25, nickname: "유저25", warning_cnt: 3, status: "차단" },
    { user_id: 96, nickname: "유저96", warning_cnt: 1, status: "활동중" },
    { user_id: 97, nickname: "유저97", warning_cnt: 2, status: "활동중" },
    { user_id: 98, nickname: "유저98", warning_cnt: 4, status: "차단" },
    { user_id: 99, nickname: "유저99", warning_cnt: 0, status: "활동중" },
    { user_id: 100, nickname: "유저100", warning_cnt: 3, status: "차단" }
];

let reports = JSON.parse(localStorage.getItem('reports')) || [];

const today = new Date().toISOString().split('T')[0];
const dummyReasons = ["비방 욕설", "도배 및 스팸", "홍보성 게시글", "기타 운영 정책 위반", "부적절한 닉네임"];

// ========================================
// 2. 유틸리티 함수
// ========================================
/**
 * localStorage에 users와 reports 데이터를 저장
 */
function saveData() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('reports', JSON.stringify(reports));
}

// ========================================
// 3. 데이터 동기화 함수
// ========================================
/**
 * warning_cnt가 있지만 reports에 데이터가 없는 유저들에게
 * 자동으로 더미 리포트 데이터를 생성해서 추가
 */
function syncReports() {
    let isChanged = false;

    users.forEach(user => {
        if (user.warning_cnt > 0) {
            // 이 유저의 리포트가 있는지 확인
            const hasReport = reports.some(r => r.user_id === user.user_id);
            
            if (!hasReport) {
                // 리포트가 없으면 새로 생성
                const newReport = {
                    report_id: reports.length + 1,
                    user_id: user.user_id,
                    reason: dummyReasons[Math.floor(Math.random() * dummyReasons.length)],
                    reg_date: today 
                };
                reports.push(newReport);
                isChanged = true;
            }
        }
    });

    // 새로운 리포트가 추가되었을 때만 저장
    if (isChanged) {
        saveData();
    }
}

// ========================================
// 4. 통계 출력 함수
// ========================================
/**
 * 상단 통계 카드 4개의 데이터를 계산하고 화면에 출력
 * - 경고 회원: warning_cnt > 0이고 차단되지 않은 회원 수
 * - 차단된 회원: status가 '차단'인 회원 수
 * - 오늘 발급 경고: reg_date가 오늘인 리포트 수
 * - 자동 차단: 추후 구현 예정
 */
function printWSum() {
    let warningCount = 0;
    let blockCount = 0;
    let todayBlock = 0;

    // 경고 회원 수 계산
    for (let i = 0; i < users.length; i++) {
        if (users[i].warning_cnt > 0 && users[i].status !== '차단') {
            warningCount++;
        }
    }

    // 차단 회원 수 계산
    for (let i = 0; i < users.length; i++) {
        if (users[i].status === "차단") {
            blockCount++;
        }
    }

    // 오늘 발급 경고 수 계산
    for (let i = 0; i < reports.length; i++) {
        if (reports[i].reg_date === today) {
            todayBlock++;
        }
    }

    // DOM 업데이트
    document.querySelector("#a").innerHTML = `${warningCount}명`;
    document.querySelector("#b").innerHTML = `${blockCount}명`;
    document.querySelector("#c").innerHTML = `${todayBlock}건`;
    // document.querySelector("#d").innerHTML = `0건`; // 자동차단 (추후 구현)
}

// ========================================
// 5. 리스트 출력 함수
// ========================================
/**
 * 경고를 받은 유저 목록을 테이블로 출력
 * - warning_cnt가 0인 유저는 제외
 * - 각 유저의 마지막 리포트 정보를 찾아서 표시
 * - 차단된 유저는 클릭 시 차단 해제 가능
 */
function printWlist() {
    const listArea = document.querySelector("#foot");
    let html = "";

    for (let i = 0; i < users.length; i++) {
        const user = users[i];

        // 경고가 없는 유저는 목록에서 제외
        if (user.warning_cnt === 0) continue;

        // 해당 유저의 마지막 리포트 찾기
        let lastReport = { reg_date: "-", reason: "-" };
        
        for (let j = 0; j < reports.length; j++) {
            if (reports[j].user_id === user.user_id) {
                lastReport = reports[j];
            }
        }

        // 상태에 따른 디자인 설정
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

    listArea.innerHTML = html;
}

// ========================================
// 6. 사용자 액션 함수
// ========================================
/**
 * 차단된 유저의 차단을 해제하는 함수
 * @param {number} id - 차단 해제할 유저의 user_id
 * - 차단 해제 시 warning_cnt도 0으로 초기화
 * - localStorage에 저장 후 화면 갱신
 */
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
    renderPage(); // 전체 리렌더링
    alert("차단이 해제되었습니다.");
}

// ========================================
// 7. 페이지 렌더링 함수
// ========================================
/**
 * 통계와 리스트를 모두 다시 렌더링
 * 데이터 변경 후 화면 갱신이 필요할 때 호출
 */
function renderPage() {
    printWSum();
    printWlist();
}

// ========================================
// 8. 초기 실행
// ========================================
/**
 * 페이지 로드 시 실행되는 초기화 함수
 * 1. syncReports: 리포트 데이터 동기화 (빈 리포트 자동 생성)
 * 2. renderPage: 통계 및 리스트 화면 출력
 */
function init() {
    syncReports();  // 리포트 데이터 동기화
    renderPage();   // 페이지 렌더링
}

// 페이지 로드 시 실행
init();