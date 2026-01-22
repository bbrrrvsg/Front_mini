게시물불러오기();

function 게시물불러오기() {
  let data = localStorage.getItem('posts');
  let 글목록 = (data == null) ? [] : JSON.parse(data);

  let 글구역 = document.querySelector(".feed");
  let html = "";

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
}

function 글상세보기(post_id) {
  // 조회수 증가
  let data = localStorage.getItem('posts');
  let 글목록 = JSON.parse(data);

  let 글인덱스 = 글목록.findIndex(p => p.post_id === post_id);
  글목록[글인덱스].view_count += 1;
  localStorage.setItem('posts', JSON.stringify(글목록));

  // 상세 페이지로 이동
  location.href = `/html/detail.html?id=${post_id}`;
}








// 브랜드/업종 기능 추가
let currentMenu = 'hot';
let currentCategory = null;
let currentBrand = null;


const brandLogos = {
  '스타벅스': 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/200px-Starbucks_Corporation_Logo_2011.svg.png',
  '투썸플레이스': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/A_Twosome_Place_logo.svg/200px-A_Twosome_Place_logo.svg.png',
  '이디야커피': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Ediya_Coffee_logo.svg/200px-Ediya_Coffee_logo.svg.png',
  '메가커피': 'https://via.placeholder.com/80/FF6B35/FFFFFF?text=MEGA',
  '컴포즈커피': 'https://via.placeholder.com/80/8B4513/FFFFFF?text=COMPOSE',
  '빽다방': 'https://via.placeholder.com/80/00A86B/FFFFFF?text=PAIK',
  '할리스': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Hollys_Coffee_logo.svg/200px-Hollys_Coffee_logo.svg.png',
  '탐앤탐스': 'https://via.placeholder.com/80/D2691E/FFFFFF?text=TOM',
  '카페베네': 'https://via.placeholder.com/80/8B4513/FFFFFF?text=BENE',
  '엔제리너스': 'https://via.placeholder.com/80/CD853F/FFFFFF?text=ANGEL',
  'BBQ': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/BBQ_%28restaurant%29_logo.svg/200px-BBQ_%28restaurant%29_logo.svg.png',
  '교촌치킨': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Kyochon_logo.svg/200px-Kyochon_logo.svg.png',
  'BHC': 'https://via.placeholder.com/80/FF0000/FFFFFF?text=BHC',
  '굽네치킨': 'https://via.placeholder.com/80/FF6347/FFFFFF?text=GOOBNE',
  '페리카나': 'https://via.placeholder.com/80/FFD700/000000?text=PELICANA',
  '네네치킨': 'https://via.placeholder.com/80/FF4500/FFFFFF?text=NENE',
  '처갓집': 'https://via.placeholder.com/80/8B0000/FFFFFF?text=처갓집',
  '호식이두마리치킨': 'https://via.placeholder.com/80/FF8C00/FFFFFF?text=호식이',
  '멕시카나': 'https://via.placeholder.com/80/DC143C/FFFFFF?text=MEXICANA',
  '푸라닭': 'https://via.placeholder.com/80/32CD32/FFFFFF?text=푸라닭',
  'CU': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/CU_%28convenience_store%29_logo.svg/200px-CU_%28convenience_store%29_logo.svg.png',
  'GS25': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/GS25_Logo.svg/200px-GS25_Logo.svg.png',
  '세븐일레븐': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/7-Eleven_logo.svg/200px-7-Eleven_logo.svg.png',
  '이마트24': 'https://via.placeholder.com/80/FFD700/000000?text=emart24',
  '미니스톱': 'https://via.placeholder.com/80/4169E1/FFFFFF?text=MINISTOP',
  '맘스터치': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Mom%27s_Touch_logo.svg/200px-Mom%27s_Touch_logo.svg.png',
  '롯데리아': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Lotteria_logo.svg/200px-Lotteria_logo.svg.png',
  '맥도날드': 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/200px-McDonald%27s_Golden_Arches.svg.png',
  'KFC': 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/KFC_logo.svg/200px-KFC_logo.svg.png',
  '버거킹': 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Burger_King_logo_%281999%29.svg/200px-Burger_King_logo_%281999%29.svg.png',
  '서브웨이': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Subway_2016_logo.svg/200px-Subway_2016_logo.svg.png',
  '김밥천국': 'https://via.placeholder.com/80/228B22/FFFFFF?text=김밥천국',
  '죠스떡볶이': 'https://via.placeholder.com/80/FF4500/FFFFFF?text=죠스'
};

const brands = {
  cafe: [
    '스타벅스', '투썸플레이스', '이디야커피', '메가커피',
    '컴포즈커피', '빽다방', '할리스', '탐앤탐스',
    '카페베네', '엔제리너스'
  ],
  chicken: [
    'BBQ', '교촌치킨', 'BHC', '굽네치킨', '페리카나',
    '네네치킨', '처갓집', '호식이두마리치킨', '멕시카나', '푸라닭'
  ],
  convenience: [
    'CU', 'GS25', '세븐일레븐', '이마트24', '미니스톱'
  ],
  restaurant: [
    '맘스터치', '롯데리아', '맥도날드', 'KFC', '버거킹',
    '서브웨이', '김밥천국', '죠스떡볶이'
  ]
};

function changeMenu(menu) {
  currentMenu = menu;

  // 네비게이션 active 상태 변경
  document.querySelectorAll('.nav span').forEach(span => {
    span.classList.remove('active');
  });
  event.target.classList.add('active');

  if (menu === 'brand') {
    showBrandCategories();
  } else {
    currentCategory = null;
    currentBrand = null;
    게시물불러오기();
  }
}















function showBrandCategories() {
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

  categories.forEach(cat => {
    html += `
      <div onclick="selectCategory('${cat.key}')" style="
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
  });

  html += `
      </div>
    </div>
  `;

  feed.innerHTML = html;
}

function selectCategory(category) {
  currentCategory = category;
  showBrandList();
}

function showBrandList() {
  const feed = document.querySelector('.feed');

  const categoryNames = {
    cafe: '☕ 카페',
    chicken: '🍗 치킨',
    convenience: '🏪 편의점',
    restaurant: '🍴 식당'
  };

  let html = `
    <div style="padding: 20px;">
      <div style="margin-bottom: 20px;">
        <button onclick="showBrandCategories()" style="
          background: #6b7280;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 5px;
          cursor: pointer;
          margin-bottom: 10px;
          font-size: 13px;
        ">← 돌아가기</button>
        <h2 style="color: #111827; font-size: 18px;">${categoryNames[currentCategory]} 브랜드</h2>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 15px;">
  `;

  brands[currentCategory].forEach(brand => {
    const logoUrl = brandLogos[brand];

    html += `
      <div onclick="selectBrand('${brand}')" style="
        background: white;
        border: 2px solid #e5e7eb;
        border-radius: 8px;
        padding: 15px 10px;
        cursor: pointer;
        text-align: center;
        transition: all 0.2s;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        min-height: 110px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      " onmouseover="this.style.transform='translateY(-3px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.1)'" 
         onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 1px 3px rgba(0,0,0,0.05)'">
        <img src="${logoUrl}" 
             style="width: 60px; height: 60px; object-fit: contain; margin-bottom: 8px;" 
             alt="${brand}">
        <div style="font-weight: bold; color: #111827; font-size: 12px;">${brand}</div>
      </div>
    `;
  });

  html += `
      </div>
    </div>
  `;

  feed.innerHTML = html;
}

function selectBrand(brand) {
  currentBrand = brand;
  showBrandPosts();
}

function showBrandPosts() {
  let data = localStorage.getItem('posts');
  let 글목록 = (data == null) ? [] : JSON.parse(data);

  let 글구역 = document.querySelector('.feed');

  // 필터링: 선택한 카테고리와 브랜드에 맞는 글만
  let 필터된글 = 글목록.filter(글 => {
    if (글.category !== currentCategory) return false;
    if (currentBrand && 글.brand !== currentBrand) return false;
    return true;
  });

  let html = `
    <div style="padding: 20px;">
      <div style="margin-bottom: 20px;">
        <button onclick="showBrandList()" style="
          background: #6b7280;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 5px;
          cursor: pointer;
          margin-bottom: 10px;
          font-size: 13px;
        ">← 브랜드 목록으로</button>
        <h2 style="color: #111827; font-size: 18px;">${currentBrand} 게시판</h2>
      </div>
  `;

  if (필터된글.length === 0) {
    html += `
      <div style="text-align: center; padding: 40px 20px;">
        <p style="color: #6b7280; font-size: 14px;">아직 게시글이 없습니다.</p>
      </div>
    `;
  } else {
    for (let i = 필터된글.length - 1; i >= 0; i--) {
      let 글 = 필터된글[i];
      html += `
        <div class="post" onclick="글상세보기(${글.post_id})">
          <div class="post-title">${글.title}</div>
          <div class="post-meta">
            ${글.user_id} · 조회수 ${글.view_count} · ${글.reg_date}
          </div>
        </div>
      `;
    }
  }

  html += `</div>`;
  글구역.innerHTML = html;
}

function filter(category) {
  // 기존 필터 기능은 유지
  게시물불러오기();
}