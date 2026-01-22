    // URL에서 post_id 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = parseInt(urlParams.get('id'));

    글불러오기();

    function 글불러오기() {
      // 1단계: 주소에서 글 번호 가져오기
      const post_id = parseInt(new URLSearchParams(window.location.search).get('id'));

      // 2단계: 저장된 글 목록 가져오기
      let 저장된데이터 = localStorage.getItem('posts');
      let 글목록 = JSON.parse(저장된데이터);

      // 3단계: 내가 클릭한 글 찾기
      let 내가찾는글 = null;
      for (let i = 0; i < 글목록.length; i++) {
        if (글목록[i].post_id === post_id) {
          내가찾는글 = 글목록[i];
          break; // 찾았으니 멈춤
        }
      }

      // 4단계: 화면에 보여주기
      if (내가찾는글) {
        document.querySelector("#detail-title").textContent = 내가찾는글.title;
        document.querySelector("#detail-meta").textContent =
          내가찾는글.user_id + " · 조회수 " + 내가찾는글.view_count;
        document.querySelector("#detail-content").textContent = 내가찾는글.content;
      } else {
        alert("글을 찾을 수 없어요!");
        location.href = 'index.html';
      }
    }

    // 신고 모달 열기
    function 신고모달열기() {
      document.querySelector("#report-modal").style.display = "block";
    }

    // 신고 모달 닫기
    function 신고모달닫기() {
      document.querySelector("#report-modal").style.display = "none";
      document.querySelector("#report-reason").value = ""; // 선택 초기화
    }

    // 신고 제출
    function 신고제출() {
      let 신고사유 = document.querySelector("#report-reason").value;

      if (!신고사유) {
        alert("신고 사유를 선택해주세요.");
        return;
      }

      // 신고 내역 저장
      let 신고목록 = JSON.parse(localStorage.getItem('reports')) || [];
      
      let 신고내역 = {
        report_id: Date.now(),
        post_id: post_id,
        reason: 신고사유,
        report_date: new Date().toLocaleString()
      };

      신고목록.push(신고내역);
      localStorage.setItem('reports', JSON.stringify(신고목록));
      syncUsersFromPosts();
      alert("신고가 접수되었습니다.\n관리자가 확인 후 조치하겠습니다.");
      
      신고모달닫기();
    }

    // 모달 바깥 클릭시 닫기
    window.onclick = function(event) {
      let modal = document.querySelector("#report-modal");
      if (event.target === modal) {
        신고모달닫기();
      }
    }