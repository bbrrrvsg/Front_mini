게시물불러오기();
function 게시물불러오기() {
  let data = localStorage.getItem('posts');
  let 글목록 = (data == null) ? [] : JSON.parse(data);

  let 글구역 = document.querySelector(".feed");
  let html = "";

  for (let i = 글목록.length - 1; i >= 0; i--) {
    let 글 = 글목록[i];

    html += `
    <div class="post">
      <div class="post-title">${글.title}</div>
      <div class="post-meta">
        ${글.user_id} · 조회수 ${글.view_count} · ${글.reg_date}
      </div>
    </div>
  `;
  }
  글구역.innerHTML = html;
}
