// 유저 데이터
let users = JSON.parse(localStorage.getItem('users')) || [
    { user_id: 1, nickname: "치킨킹", warning_cnt: 2, status: "활동중" },
    { user_id: 2, nickname: "카페빌런", warning_cnt: 3, status: "차단" },

];

// 신고 기록
let reports = JSON.parse(localStorage.getItem('reports')) || [
    { report_id: 1, user_id: 2, reason: "비방 욕설", reg_date: "2026-01-20" },
    { report_id: 2, user_id: 1, reason: "도배", reg_date: "2026-01-20" }
];