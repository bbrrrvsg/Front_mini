AddDangerKeyword();
AddEmphasizeKeyword();

function AddDangerKeyword() {
    const Addkeyword = document.querySelector(`.forbidden-keyword-input`);//입력창을 가져와서
    const inner = document.querySelector(`.forbidden-keyword-list`);//리스트들을 가져와서
    const dangerListElements = inner.querySelectorAll(`li`);
    let dangerlist = [];//빈배열에

    for (let i = 0; i < dangerListElements.length; i++) {
        dangerlist.push(dangerListElements[i].querySelector('.keyword-text').textContent.trim());
    }//빈 배얄안에 리스트를 넣고

    const newValue = Addkeyword.value.trim(); //입력창 값을 저장하고
    if (newValue !== "") {// 무언가 입력을 했을때
        dangerlist.push(newValue);  //배열에 넣는다
        let html = "";
        for (let j = 0; j < dangerlist.length; j++) {
            html += `<li>
                        <span class="keyword-text">${dangerlist[j]}</span>
                        <div class="keyword-actions">
                            <button class="keyword-action-btn edit-btn" onclick="UpdateDangerKeyword(${j})">수정</button>
                            <button class="keyword-action-btn delete-btn" onclick="DeleteDangerKeyword(${j})">삭제</button>
                        </div>
                    </li>`;
        }   //배열 길이만큼 html에 문자열로 넣고
        inner.innerHTML = html; //출력
        Addkeyword.value = "";  //입력창 초기화
    }
    localStorage.setItem("DangerList", JSON.stringify(dangerlist));    //배열에 있는 금지 키워드를 로컬에 JS형식의 문자열로 저장
    const registration = document.querySelector(`.stat-value-black`);   //저장될 금지어 키워드 갯수 가져옴 
    registration.textContent = dangerlist.length + "개";    //거기다가 금지어의 갯수 넣기
}

function DeleteDangerKeyword(index) {
    const dangerkeyword = document.querySelector(`.forbidden-keyword-list`);
    const dangerListElements = dangerkeyword.querySelectorAll(`li`);
    let dangerlist = [];

    for (let i = 0; i < dangerListElements.length; i++) {
        if (i !== index) {
            dangerlist.push(dangerListElements[i].querySelector('.keyword-text').textContent.trim());
        }
    }

    let html = "";
    for (let j = 0; j < dangerlist.length; j++) {
        html += `<li>
                    <span class="keyword-text">${dangerlist[j]}</span>
                    <div class="keyword-actions">
                        <button class="keyword-action-btn edit-btn" onclick="UpdateDangerKeyword(${j})">수정</button>
                        <button class="keyword-action-btn delete-btn" onclick="DeleteDangerKeyword(${j})">삭제</button>
                    </div>
                </li>`;
    }
    dangerkeyword.innerHTML = html;

    localStorage.setItem("DangerList", JSON.stringify(dangerlist));
    const registration = document.querySelector(`.stat-value-black`);
    registration.textContent = dangerlist.length + "개";
}

function UpdateDangerKeyword(index) {
    const dangerkeyword = document.querySelector(`.forbidden-keyword-list`);//수정할 부분 가져와서
    const dangerListElements = dangerkeyword.querySelectorAll(`li`);//리스트를 가져와서
    let dangerlist = [];//빈 배열에
    for (let i = 0; i < dangerListElements.length; i++) {
        dangerlist.push(dangerListElements[i].querySelector('.keyword-text').textContent.trim());
    }//배열을 먼저 넣고
    const UpdateIndex=dangerlist[index];//수정할 인덱스 값을 가져와서
    const newValue = prompt("금지 키워드를 수정할 키워드를 입력하세요:", UpdateIndex);
    dangerlist.splice(index,1,newValue);//인덱스 값을 없애고 값을 다시 저장
    let html = "";
    for (let j = 0; j < dangerlist.length; j++) {
        html+=`<li>
                    <span class="keyword-text">${dangerlist[j]}</span>
                    <div class="keyword-actions">
                        <button class="keyword-action-btn edit-btn" onclick="UpdateDangerKeyword(${j})">수정</button>
                        <button class="keyword-action-btn delete-btn" onclick="DeleteDangerKeyword(${j})">삭제</button>
                    </div>
                </li>`;
        dangerkeyword.innerHTML = html;
    }
    localStorage.setItem("DangerList", JSON.stringify(dangerlist));

}

function AddEmphasizeKeyword() {
    const NewEmphasizeKeyword = document.querySelector(`.highlight-keyword-input`);
    const inner = document.querySelector(`.highlight-keyword-list`);
    const emphasizeListElements = inner.querySelectorAll(`li`);
    let emphasizelist = [];

    for (let i = 0; i < emphasizeListElements.length; i++) {
        emphasizelist.push(emphasizeListElements[i].querySelector('.keyword-text').textContent.trim());
    }

    const newValue = NewEmphasizeKeyword.value.trim();
    if (newValue !== "") {
        emphasizelist.push(newValue);
        let html = "";
        for (let j = 0; j < emphasizelist.length; j++) {
            html += `<li>
                        <span class="keyword-text">${emphasizelist[j]}</span>
                        <div class="keyword-actions">
                            <button class="keyword-action-btn edit-btn" onclick="UpdateEmphasizeKeyword(${j})">수정</button>
                            <button class="keyword-action-btn delete-btn" onclick="DeleteEmphasizeKeyword(${j})">삭제</button>
                        </div>
                    </li>`;
        }
        inner.innerHTML = html;
        NewEmphasizeKeyword.value = "";
    }

    localStorage.setItem("EmphasizeList", JSON.stringify(emphasizelist));
    const registration = document.querySelector(`.stat-value-orange`);
    registration.textContent = emphasizelist.length + "개";
}

function DeleteEmphasizeKeyword(index) {
    const inner = document.querySelector(`.highlight-keyword-list`);
    const emphasizeListElements = inner.querySelectorAll(`li`);
    let emphasizelist = [];

    for (let i = 0; i < emphasizeListElements.length; i++) {
        if (i !== index) {
            emphasizelist.push(emphasizeListElements[i].querySelector('.keyword-text').textContent.trim());
        }
    }

    let html = "";
    for (let j = 0; j < emphasizelist.length; j++) {
        html += `<li>
                    <span class="keyword-text">${emphasizelist[j]}</span>
                    <div class="keyword-actions">
                        <button class="keyword-action-btn edit-btn" onclick="UpdateEmphasizeKeyword(${j})">수정</button>
                        <button class="keyword-action-btn delete-btn" onclick="DeleteEmphasizeKeyword(${j})">삭제</button>
                    </div>
                </li>`;
    }
    inner.innerHTML = html;

    localStorage.setItem("EmphasizeList", JSON.stringify(emphasizelist));
    const registration = document.querySelector(`.stat-value-orange`);
    registration.textContent = emphasizelist.length + "개";
}

function UpdateEmphasizeKeyword(index) {
    const inner = document.querySelector(`.highlight-keyword-list`);
    const EmphasizeList= inner.querySelectorAll(`li`);
    let emphasizelist = [];

    for (let i = 0; i < EmphasizeList.length; i++) {
        emphasizelist.push(EmphasizeList[i].querySelector('.keyword-text').textContent.trim());
    }
    const UpdateIndex=emphasizelist[index];
    const newValue = prompt("강조 키워드를 수정할 키워드를 입력하세요:", UpdateIndex);
    emphasizelist.splice(index,1,newValue);
    let html = "";
    for (let j = 0; j < emphasizelist.length; j++) {
        html+=`<li>
                    <span class="keyword-text">${emphasizelist[j]}</span>
                    <div class="keyword-actions">
                        <button class="keyword-action-btn edit-btn" onclick="UpdateEmphasizeKeyword(${j})">수정</button>
                        <button class="keyword-action-btn delete-btn" onclick="DeleteEmphasizeKeyword(${j})">삭제</button>
                    </div>
                </li>`;
    }
    inner.innerHTML = html;
    localStorage.setItem("EmphasizeList", JSON.stringify(emphasizelist));
}