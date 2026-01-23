// 게시물 등록 함수
function 게시물등록() {
  let 글제목 = document.querySelector("#post-title").value;
  let 글내용 = document.querySelector("#post-content").value;
  let 카테고리 = document.querySelector("#category-select").value;
  let 브랜드 = document.querySelector("#brand-select").value; 

  if (!글제목 || !글내용) {
    alert("제목과 내용을 입력해주세요.");
    return;
  }

  if (!카테고리) {
    alert("업종을 선택해주세요.");
    return;
  }

  let data = localStorage.getItem('posts');
  let 글목록 = (data == null) ? [] : JSON.parse(data);

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

  글목록.push(새게시물);
  localStorage.setItem('posts', JSON.stringify(글목록));  

  alert("글이 등록되었습니다.");
  location.href = "../index.html";

}