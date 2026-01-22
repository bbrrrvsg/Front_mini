function highlightKeywords(keywordList, className, isDanger) {
    // 리스트가 없거나 비어있으면 함수 종료
    if (!keywordList || keywordList.length === 0) return;

    // 게시판의 모든 행(tr)을 가져옴 (클래스명 주의)
    const allRows = document.querySelectorAll('.usercontent tr');

    for (let j = 0; j < allRows.length; j++) {
        const row = allRows[j];
        const cell = row.querySelector('td'); // 게시물 내용이 담긴 칸
        if (!cell) continue;

        let hasDangerousKeyword = false;
        let dangerousKeywordFound = '';

        // [핵심] 현재 리스트가 금지어인지 강조어인지에 따라 접근할 키 이름을 결정
        const keyName = isDanger ? "금지어" : "강조어";

        for (let i = 0; i < keywordList.length; i++) {
            // 객체 안에서 실제 텍스트 내용을 꺼냄 (예: keywordList[i]["금지어"])
            const keyword = keywordList[i][keyName];
            
            if (!keyword) continue; // 데이터가 비어있으면 건너뜀

            // 셀 내용에 해당 키워드가 포함되어 있는지 확인
            if (cell.textContent.includes(keyword)) {
                // split-join 방식으로 하이라이트 태그 삽입
                const highlighted = `<span class="${className}">${keyword}</span>`;
                cell.innerHTML = cell.innerHTML.split(keyword).join(highlighted);

                // 금지어일 경우 알림과 삭제를 위한 상태 저장
                if (isDanger) {
                    hasDangerousKeyword = true;
                    dangerousKeywordFound = keyword;
                }
            }
        }

        // 금지 키워드가 발견된 행은 3초 뒤 알림 후 삭제
        if (hasDangerousKeyword) {
            setTimeout(function () {
                alert(`금지키워드: "${dangerousKeywordFound}" 발견`);
                if (row) {
                    row.remove();
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

// 3. 페이지가 로드될 때 즉시 실행
identifyAllKeywords();