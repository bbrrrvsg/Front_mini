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




  //아 현기증 
  //아 탈모생길것같애
  //아 집가고싶다.
  //아 족발먹고싶다.
  //아 졸려...
  //아 배고파
  //아 지옥이다...
  //아 나는왤케 멍청하지
  //아 죽고싶다.
  //아무생각도 안나 그냥 다까먹어버렸어
  //졸려
  ///아 대가리 아파
  ///ㅅㅂ
  //아 술마시고싶다.
  //집못가
  //

}