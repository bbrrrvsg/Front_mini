function saveData() {
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('reports', JSON.stringify(reports));
}

// 유저 자동 생성 함수 (먼저 정의)
function syncUsersFromPosts() {
    let users2 = JSON.parse(localStorage.getItem('users')) || [];
    
    // let posts = JSON.parse(localStorage.getItem('posts')) || [];

    // for (let i = 0; i < posts.length; i++) {
        // let post_user_id = posts[i].user_id;
        
        // let userExists = false;
        // for (let j = 0; j < users.length; j++) { 
        //     if (users[j].user_id === post_user_id) {
        //         userExists = true;
        //         break;
        //     }
        // }
        
        // if (!userExists) {
            // let userNumber = post_user_id.replace('user_', '');
            // let newUser = {
            //     user_id: post_user_id,
            //     nickname: "유저" + userNumber,
            //     warning_cnt: 0,
            //     status: "활동중"
            // };
            // users.push(newUser);
        // }
    // }
    if( users2.length == 0 ){
        users2 = users
    }
    localStorage.setItem('users', JSON.stringify(users2));
}

// 유저 데이터
let users =  [
    { user_id: "user_1", nickname: "치킨킹", warning_cnt: 2, status: "차단" },
    { user_id: "user_2", nickname: "카페빌런", warning_cnt: 3, status: "활동중" }
];

let reports = JSON.parse(localStorage.getItem('reports')) || [
    { report_id: 1, user_id: "user_2", reason: "비방 욕설", reg_date: "2026-01-20" },
    { report_id: 2, user_id: "user_1", reason: "도배", reg_date: "2026-01-20" }
];

// 페이지 로드 시 자동 실행 (맨 마지막에!)
syncUsersFromPosts();