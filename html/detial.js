// 페이지 로드 시 실행
window.onload = function() {
    // 1. URL에서 post_id 추출
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    if (!postId) {
        alert("잘못된 접근입니다.");
        location.href = "../index.html";
        return;
    }

    // 2. LocalStorage에서 글 찾기
    const data = localStorage.getItem('posts');
    const posts = data ? JSON.parse(data) : [];
    
    // 타입이 다를 수 있으므로 == 사용 (정규화 단계에서 ID를 문자/숫자 섞었을 때 안전함)
    const post = posts.find(p => p.post_id == postId);

    if (post) {
        // 3. 화면에 데이터 뿌리기
        document.getElementById('detail-title').innerText = post.title;
        document.getElementById('detail-meta').innerText = 
            `${post.user_id} · 조회수 ${post.view_count} · ${post.reg_date}`;
        document.getElementById('detail-content').innerText = post.content;
    } else {
        alert("해당 게시글이 존재하지 않습니다.");
        location.href = "../index.html";
    }
};

// 신고 모달 기능 (아까 짠 엑셀 시트 10과 연결될 부분)
function 신고모달열기() {
    document.getElementById('report-modal').style.display = 'flex';
}

function 신고모달닫기() {
    document.getElementById('report-modal').style.display = 'none';
}

function 신고제출() {
    const reason = document.getElementById('report-reason').value;
    if (!reason) {
        alert("사유를 선택해주세요.");
        return;
    }
    
    // [엑셀 시트 10: User_Reports에 쌓일 데이터 예시]
    alert(`신고가 접수되었습니다. 사유: ${reason}`);
    신고모달닫기();
}