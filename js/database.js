function saveData() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('reports', JSON.stringify(reports));
}

// 유저 데이터
let users = JSON.parse(localStorage.getItem('users')) || [
    { user_id: 1, nickname: "치킨킹", warning_cnt: 2, status: "활동중" },
    { user_id: 2, nickname: "카페빌런", warning_cnt: 3, status: "차단" },

];

let reports = JSON.parse(localStorage.getItem('reports')) || [
    { report_id: 1, user_id: 2, reason: "비방 욕설", reg_date: "2026-01-20" },
    { report_id: 2, user_id: 1, reason: "도배", reg_date: "2026-01-20" }
];


 //새게시물
let 새게시물 = {
    post_id: Date.now(),
    user_id: 'user_' + Math.floor(Math.random() * 1000),
    title: 글제목,
    content: 글내용,
    view_count: 0,
    reg_date: new Date().toLocaleDateString(),
    category: 카테고리,
    brand: 브랜드 || null
};