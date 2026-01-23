function highlightKeywords(keywordList, className, isDanger) {
    if (!keywordList || keywordList.length === 0) return;       // 리스트가 없거나 비어있으면 함수 종료
    const allRows = document.querySelectorAll('.usercontent tr');   // 게시판의 모든 행(tr)을 가져옴
    for (let j = 0; j < allRows.length; j++) {
        const row = allRows[j];
        const cell = row.querySelector('td'); // 게시물 내용이 담긴 칸
        if (!cell) continue;
        let hasDangerousKeyword = false;
        let dangerousKeywordFound = '';
        const keyName = isDanger ? "금지어" : "강조어";     // [핵심] 현재 리스트가 금지어인지 강조어인지에 따라 접근할 키 이름을 결정
        for (let i = 0; i < keywordList.length; i++) {
            const keyword = keywordList[i][keyName];        // 객체 안에서 실제 텍스트 내용을 꺼냄 (예: keywordList[i]["금지어"])
            if (!keyword) continue; // 데이터가 비어있으면 건너뜀
            if (cell.textContent.includes(keyword)) {       // 셀 내용에 해당 키워드가 포함되어 있는지 확인
                const highlighted = `<span class="${className}">${keyword}</span>`;
                cell.innerHTML = cell.innerHTML.split(keyword).join(highlighted);       // split-join 방식으로 하이라이트 태그 삽입
                if (isDanger) {hasDangerousKeyword = true; dangerousKeywordFound = keyword;}       // 금지어일 경우 알림과 삭제를 위한 상태 저장
            }
        }
        if (hasDangerousKeyword) {      // 금지 키워드가 발견된 행은 3초 뒤 알림 후 삭제
            setTimeout(function () {
                const postDelete = row.getAttribute(`data-id`);   //삭제할 게시물 임시
                const postDelete = row.getAttribute(`data-id`);   //삭제할 게시물 임시
                if (row) {
                    row.remove();
                    let posts = JSON.parse(localStorage.getItem('posts')) || [];    //posts로컬 불러오기
                    for (let k = 0; k < posts.length; k++) {
                        if (String(posts[k].post_id === String(postDelete))) {
                            posts.splice(k, 1);      //만약 금지키워드의 post아이디와 같으면 삭제
                            localStorage.setItem('posts', JSON.stringify(posts));    //삭제된 로컬 최신화
                            let currentCount = parseInt(localStorage.getItem(`deleteCount`)) || 0; //로컬에 저장될 삭제 카운트
                            currentCount++;
                            localStorage.setItem(`deleteCount`, currentCount);
                            const Deletecount = document.querySelector(`.stat-value-red`);
                            if (Deletecount) {
                                Deletecount.textContent = currentCount + "개";
                            }
                            break;
                        }
                    }
                    setTimeout(() => {
                        alert(`금지키워드발견: "${dangerousKeywordFound}" 키워드로 인해 게시물이 삭제되었습니다`);
                    }, 200);
                    setTimeout(() => {
                        alert(`금지키워드발견: "${dangerousKeywordFound}" 키워드로 인해 게시물이 삭제되었습니다`);
                    }, 200);
                }
            }, 3000);
        }
    }
}

/**
 * 2. 로컬 스토리지 데이터를 불러와 전체 기능을 실행하는 함수
 */
function identifyAllKeywords() {
    // [강조 키워드 처리]
    // {"id": "H001", "강조어": "..."} 구조의 데이터를 가져옴
    const emphasizeList = JSON.parse(localStorage.getItem('EmphasizeList')) || [];
    highlightKeywords(emphasizeList, 'keyword-emphasize', false);

    // [금지 키워드 처리]
    // {"id": "F001", "금지어": "..."} 구조의 데이터를 가져옴
    const dangerList = JSON.parse(localStorage.getItem('DangerList')) || [];
    highlightKeywords(dangerList, 'keyword-danger', true);
}
postsPrint();
// 3.로컬에 posts(게시물)불러와서 출력
function postsPrint() {
function postsPrint() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const userContent = document.querySelector(`.usercontent`);   //내용 삽입할 곳
    const userContent = document.querySelector(`.usercontent`);   //내용 삽입할 곳
    let html = "";
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i]; //post에 posts내용 객체로 저장
        html += `<tr>
            <td class="usercontents" onclick="글상세보기1(${post.post_id})"><h3>제목:${post.title}</h3></br>내용:${post.content}</td>
            <td><span class="badge badge-info"> ${post.category}(${post.brand}})</span></td>
            <td class="text-muted">${post.reg_date}</td>
            <td>${post.user_id}</td>
            <td class="stats-icons">👁️ ${post.view_count}</td>
          </tr>`;
    }
    userContent.innerHTML = html;
    identifyAllKeywords();
}

function 글상세보기1(post_id) {
  let data = localStorage.getItem('posts');
  let 글목록 = JSON.parse(data);

  let 글인덱스 = -1;
  for (let i = 0; i < 글목록.length; i++) {
    if (글목록[i].post_id == post_id) {
      글인덱스 = i;
      break;
    }
  }
  
  if (글인덱스 !== -1) {
    // 조회수 증가
    글목록[글인덱스].view_count += 1;
    localStorage.setItem('posts', JSON.stringify(글목록));

    location.href = `../html/detail.html?id=${post_id}`;
  }
}