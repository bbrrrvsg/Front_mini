function 게시물등록() {

  let 글제목 = document.querySelector("#post-title").value;
  let 글내용 = document.querySelector("#post-content").value;

  let data = localStorage.getItem('posts');
  let 글목록 = (data == null) ? [] : JSON.parse(data);

  let 새게시물 = {
    post_id: Date.now(),
    user_id:1,
    title:글제목,
    content:글내용,
    view_count:0,
    reg_date: new Date().toLocaleDateString(),
    category: "카페"
  };

  글목록.push(새게시물);
  localStorage.setItem('posts',JSON.stringify(글목록));  

  alert("글이 등록되었습니다.");
  location.href="index.html";

  

}