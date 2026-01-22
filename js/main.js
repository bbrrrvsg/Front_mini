// 1. 게시물 불러오기 
function 게시물불러오기() {
  let data = localStorage.getItem('posts');
  let 글목록 = (data == null) ? [] : JSON.parse(data);

  let 글구역 = document.querySelector(".feed");
  let html = "";

  // 최신글 순으로 메인 피드 생성
  for (let i = 글목록.length - 1; i >= 0; i--) {
    let 글 = 글목록[i];
    html += `
    <div class="post" onclick="글상세보기(${글.post_id})">
      <div class="post-title">${글.title}</div>
      <div class="post-meta">
        ${글.user_id} · 조회수 ${글.view_count} · ${글.reg_date}
      </div>
    </div>
    `;
  }
  글구역.innerHTML = html;

  // ★ 핫 게시판도 같이 업데이트!
  핫게시물표시(글목록);
}

// 2. 핫 게시판 표시 (조회수 순 정렬 + 클릭 이벤트 추가)
function 핫게시물표시(글목록) {
  const hotPostsContainer = document.getElementById('hot-posts');
  if (!hotPostsContainer) return;

  // 조회수 높은 순으로 4개 복사해서 정렬
  let hot4 = [...글목록].sort((a, b) => b.view_count - a.view_count).slice(0, 4);

  let html = "";
  hot4.forEach((글, index) => {
    // 여기에 onclick="글상세보기(${글.post_id})" 가 있어야 클릭이 됨!
    html += `
      <div class="hot-item" onclick="글상세보기(${글.post_id})" style="cursor:pointer; padding: 10px 0; border-bottom: 1px solid #eee;">
        <span style="font-weight:bold; color:#FF6B35;">${index + 1}</span>
        <span style="margin-left:8px; font-size:14px;">${글.title}</span>
        <div style="font-size:11px; color:#999; margin-left:20px;">👁 ${글.view_count}</div>
      </div>
    `;
  });

  hotPostsContainer.innerHTML = html || "<p style='font-size:12px; color:#999;'>인기글이 없습니다.</p>";
}

// 3. 글 상세보기 및 이동 (경로 주의!)
function 글상세보기(post_id) {
  let data = localStorage.getItem('posts');
  let 글목록 = JSON.parse(data);

  let 글인덱스 = 글목록.findIndex(p => p.post_id == post_id);
  
  if (글인덱스 !== -1) {
    // 조회수 증가
    글목록[글인덱스].view_count += 1;
    localStorage.setItem('posts', JSON.stringify(글목록));

    // ★ 경로 확인: detail.html이 main.js와 같은 html 폴더 안에 있다면 "./detail.html"
    // 만약 상위 폴더에 있다면 "../html/detail.html" 등으로 맞춰야 함
    location.href = `../html/detail.html?id=${post_id}`;
  }
}

// 페이지 로드 시 실행
window.onload = function() {
  게시물불러오기();
};