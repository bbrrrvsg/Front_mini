// 1. 게시물 불러오기 
게시물불러오기();

let currentMenu = 'hot'; // 현재 메뉴 저장
let currentSort = 'latest'; // 정렬 방식
let currentCategory = null;
let currentBrand = null;
let currentLocation = null; // 지역 저장

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
  let hot4글목록 = [];
  let 복사본 = [];
  
  // 배열 복사
  for (let i = 0; i < 글목록.length; i++) {
    복사본.push(글목록[i]);
  }
  
  // 정렬
  복사본.sort((a, b) => b.view_count - a.view_count);
  
  // 상위 4개만
  for (let i = 0; i < 4 && i < 복사본.length; i++) {
    hot4글목록.push(복사본[i]);
  }

  let html = "";
  for (let i = 0; i < hot4글목록.length; i++) {
    let 글 = hot4글목록[i];
    html += `
      <div class="hot-item" onclick="글상세보기(${글.post_id})" style="cursor:pointer; padding: 10px 0; border-bottom: 1px solid #eee;">
        <span style="font-weight:bold; color:#FF6B35;">${i + 1}</span>
        <span style="margin-left:8px; font-size:14px;">${글.title}</span>
        <div style="font-size:11px; color:#999; margin-left:20px;">👁 ${글.view_count}</div>
      </div>
    `;
  }

  hotPostsContainer.innerHTML = html || "<p style='font-size:12px; color:#999;'>인기글이 없습니다.</p>";
}

// 3. 글 상세보기 및 이동 (경로 주의!)
function 글상세보기(post_id) {
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

    location.href = `/html/detail.html?id=${post_id}`;
  }
}

// ★★★ 메뉴 변경 함수 ★★★
function changeMenu(menu) {
  currentMenu = menu;
  
  // 네비게이션 active 상태 변경
  let navSpans = document.querySelectorAll('.nav span');
  for (let i = 0; i < navSpans.length; i++) {
    navSpans[i].classList.remove('active');
  }
  event.target.classList.add('active');
  
  if (menu === 'brand') {
    브랜드업종표시();
  } else if (menu === 'local') {
    동네상권표시();
  } else {
    // hot 메뉴
    게시물불러오기();
  }
}

// ========== 브랜드/업종 기능 ==========
function 브랜드업종표시() {
  const feed = document.querySelector('.feed');
  
  let html = `
    <div style="padding: 20px;">
      <h2 style="margin-bottom: 20px; color: #111827; font-size: 20px;">업종을 선택해주세요</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 15px;">
  `;
  
  const categories = [
    { key: 'cafe', name: '☕ 카페', color: '#8B4513' },
    { key: 'chicken', name: '🍗 치킨', color: '#FF6B35' },
    { key: 'convenience', name: '🏪 편의점', color: '#4CAF50' },
    { key: 'restaurant', name: '🍴 식당', color: '#FF5722' }
  ];
  
  for (let i = 0; i < categories.length; i++) {
    let cat = categories[i];
    html += `
      <div onclick="카테고리선택('${cat.key}', '${cat.name}')" style="
        background: linear-gradient(135deg, ${cat.color} 0%, ${cat.color}dd 100%);
        padding: 20px 15px;
        border-radius: 8px;
        cursor: pointer;
        text-align: center;
        color: white;
        font-size: 15px;
        font-weight: bold;
        transition: transform 0.2s;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      " onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
        ${cat.name}
      </div>
    `;
  }
  
  html += `</div></div>`;
  feed.innerHTML = html;
}

function 카테고리선택(category, categoryName) {
  currentCategory = category;
  
  // 해당 카테고리 게시글만 필터링
  let data = localStorage.getItem('posts');
  let 글목록 = JSON.parse(data) || [];
  
  let 필터된글 = [];
  for (let i = 0; i < 글목록.length; i++) {
    if (글목록[i].category === category) {
      필터된글.push(글목록[i]);
    }
  }
  
  // 화면에 표시
  const feed = document.querySelector('.feed');
  
  let html = `
    <div style="padding: 20px;">
      <div style="margin-bottom: 20px;">
        <button onclick="브랜드업종표시()" style="
          background: #6b7280;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        ">← 업종 선택으로</button>
        <h2 style="color: #111827; font-size: 20px; margin: 10px 0;">${categoryName} 게시판</h2>
      </div>
  `;
  
  if (필터된글.length === 0) {
    html += `
      <div style="text-align: center; padding: 60px 20px;">
        <p style="color: #6b7280; font-size: 16px;">아직 ${categoryName} 게시글이 없습니다.</p>
      </div>
    `;
  } else {
    // 최신순 정렬
    필터된글.sort((a, b) => b.post_id - a.post_id);
    
    for (let i = 0; i < 필터된글.length; i++) {
      let 글 = 필터된글[i];
      html += `
        <div class="post" onclick="글상세보기(${글.post_id})" style="padding: 16px; border-bottom: 1px solid #eee; cursor: pointer;">
          <div style="font-size: 15px; margin-bottom: 8px;">${글.brand ? '[' + 글.brand + '] ' : ''}${글.title}</div>
          <div style="font-size: 12px; color: #6b7280;">
            ${글.user_id} · 조회수 ${글.view_count} · ${글.reg_date}
          </div>
        </div>
      `;
    }
  }
  
  html += `</div>`;
  feed.innerHTML = html;
}

// ========== 동네 상권 기능 ==========
function 동네상권표시() {
  const feed = document.querySelector('.feed');
  
  let html = `
    <div style="padding: 20px;">
      <h2 style="margin-bottom: 20px; color: #111827; font-size: 20px;">📍 우리 동네 선택</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px;">
  `;
  
  const 지역목록 = [
    { name: '강남', color: '#FF6B6B' },
    { name: '홍대', color: '#4ECDC4' },
    { name: '신촌', color: '#45B7D1' },
    { name: '건대', color: '#FFA07A' },
    { name: '명동', color: '#98D8C8' },
    { name: '이태원', color: '#F7B731' },
    { name: '잠실', color: '#5F27CD' },
    { name: '종로', color: '#00D2D3' }
  ];
  
  for (let i = 0; i < 지역목록.length; i++) {
    let 지역 = 지역목록[i];
    html += `
      <div onclick="지역선택('${지역.name}')" style="
        background: linear-gradient(135deg, ${지역.color} 0%, ${지역.color}dd 100%);
        padding: 30px 20px;
        border-radius: 8px;
        cursor: pointer;
        text-align: center;
        color: white;
        font-size: 16px;
        font-weight: bold;
        transition: transform 0.2s;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      " onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
        📍 ${지역.name}
      </div>
    `;
  }
  
  html += `</div></div>`;
  feed.innerHTML = html;
}

function 지역선택(지역명) {
  currentLocation = 지역명;
  
  // 모든 게시글 가져오기
  let data = localStorage.getItem('posts');
  let 글목록 = JSON.parse(data) || [];
  
  // 해당 지역 게시글만 필터링 (location 필드가 있는 글만)
  let 필터된글 = [];
  for (let i = 0; i < 글목록.length; i++) {
    if (글목록[i].location === 지역명) {
      필터된글.push(글목록[i]);
    }
  }
  
  // 화면에 표시
  const feed = document.querySelector('.feed');
  
  let html = `
    <div style="padding: 20px;">
      <div style="margin-bottom: 20px;">
        <button onclick="동네상권표시()" style="
          background: #6b7280;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
        ">← 지역 선택으로</button>
        <h2 style="color: #111827; font-size: 20px; margin: 10px 0;">📍 ${지역명} 상권 소식</h2>
      </div>
  `;
  
  // 필터된 글이 없으면 빈 화면
  if (필터된글.length === 0) {
    html += `
      <div style="text-align: center; padding: 60px 20px;">
        <div style="font-size: 48px; margin-bottom: 15px;">📍</div>
        <p style="color: #6b7280; font-size: 16px;">아직 ${지역명} 지역 게시글이 없습니다.</p>
        <p style="color: #9ca3af; font-size: 14px; margin-top: 10px;">첫 게시글을 작성해보세요!</p>
      </div>
    `;
  } else {
    // 최신순 정렬
    필터된글.sort((a, b) => b.post_id - a.post_id);
    
    for (let i = 0; i < 필터된글.length; i++) {
      let 글 = 필터된글[i];
      html += `
        <div class="post" onclick="글상세보기(${글.post_id})" style="padding: 16px; border-bottom: 1px solid #eee; cursor: pointer;">
          <div style="font-size: 15px; margin-bottom: 8px;">${글.title}</div>
          <div style="font-size: 12px; color: #6b7280;">
            ${글.user_id} · 조회수 ${글.view_count} · ${글.reg_date}
          </div>
        </div>
      `;
    }
  }
  
  html += `</div>`;
  feed.innerHTML = html;
}