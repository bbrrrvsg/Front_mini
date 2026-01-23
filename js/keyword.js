// 페이지 로드 시 초기 화면 출력
renderListOnLoad();

function renderListOnLoad() {
    updateView('DangerList', 'F');      //키워드 아이디 주 식별자:F
    updateView('EmphasizeList', 'H');   //키워드 아이디 주 식별자:H
}

// --- [ 공통 함수: 로컬 데이터에 ID 부여 및 재정렬 ] ---
function reorderLocalList(list, type) {
    for (let i = 0; i < list.length; i++) {
    const num = String(i + 1).padStart(3, '0');     //주 식별자에 올 뒤에 숫자 000~999까지
        
        // 기존 데이터에서 글자만 추출 (객체 형태든 문자열 형태든 대응)
        const currentText = list[i]["금지어"] || list[i]["강조어"] || list[i].text || list[i];
        
        
        if (type === 'F') {     //금지어 저장
            list[i] = { id: type + num, "금지어": currentText };
        } else {                //강조어 저장
            list[i] = { id: type + num, "강조어": currentText };
        }
    }
    return list;                
}

// 화면 갱신용 공통 함수
function updateView(storageKey, type) {
    const list = JSON.parse(localStorage.getItem(storageKey)) || [];    //로컬에 있는 것들 가져옴 또는 빈 배열
    const isDanger = type === 'F';  
    const listSelector = isDanger ? ".forbidden-keyword-list" : ".highlight-keyword-list";  
    const countSelector = isDanger ? ".stat-value-black" : ".stat-value-orange";
    const editFn = isDanger ? "UpdateDangerKeyword" : "UpdateEmphasizeKeyword";
    const deleteFn = isDanger ? "DeleteDangerKeyword" : "DeleteEmphasizeKeyword";
    const autoDeleteCount=".stat-value-red";
    // 화면에 그릴 때 사용할 키 이름 결정
    const keyName = isDanger ? "금지어" : "강조어";
 
    let html = "";
    for (let j = 0; j < list.length; j++) {
        html += `<li>
                    <span class="keyword-text">${list[j][keyName]}</span>
                    <div class="keyword-actions">
                        <button class="keyword-action-btn edit-btn" onclick="${editFn}(${j})">수정</button>
                        <button class="keyword-action-btn delete-btn" onclick="${deleteFn}(${j})">삭제</button>
                    </div>
                </li>`;
    }
    const inner = document.querySelector(listSelector);
    if(inner) inner.innerHTML = html;
    document.querySelector(countSelector).textContent = list.length + "개";

    const autoDelete=document.querySelector(autoDeleteCount);
    if(autoDelete){
        const totalDelete=parseInt(localStorage.getItem(`deleteCount`))||0;
        autoDelete.textContent=totalDelete+"개";
    }
}

// --- [ 1. 금지 키워드 관련 함수 ] ---
function AddDangerKeyword() {
    const input = document.querySelector(`.forbidden-keyword-input`);
    let dangerlist = JSON.parse(localStorage.getItem("DangerList")) || [];
    
    const newValue = input.value.trim(); 
    if (newValue !== "") {
        dangerlist.push(newValue); 
        dangerlist = reorderLocalList(dangerlist, 'F'); 
        
        localStorage.setItem("DangerList", JSON.stringify(dangerlist));
        updateView('DangerList', 'F');
        input.value = "";
    }
}

function DeleteDangerKeyword(index) {
    let dangerlist = JSON.parse(localStorage.getItem("DangerList")) || [];
    dangerlist.splice(index, 1);
    dangerlist = reorderLocalList(dangerlist, 'F');
    localStorage.setItem("DangerList", JSON.stringify(dangerlist));
    updateView('DangerList', 'F');
}

function UpdateDangerKeyword(index) {
    let dangerlist = JSON.parse(localStorage.getItem("DangerList")) || [];
    const oldValue = dangerlist[index]["금지어"];
    const newValue = prompt("금지 키워드를 수정하세요:", oldValue);
    
    if (newValue && newValue.trim() !== "") {
        dangerlist[index]["금지어"] = newValue.trim();
        dangerlist = reorderLocalList(dangerlist, 'F');
        localStorage.setItem("DangerList", JSON.stringify(dangerlist));
        updateView('DangerList', 'F');
    }
}

// --- [ 2. 강조 키워드 관련 함수 ] ---
function AddEmphasizeKeyword() {
    const input = document.querySelector(`.highlight-keyword-input`);
    let emphasizelist = JSON.parse(localStorage.getItem("EmphasizeList")) || [];

    const newValue = input.value.trim();
    if (newValue !== "") {
        emphasizelist.push(newValue);
        emphasizelist = reorderLocalList(emphasizelist, 'H');
        
        localStorage.setItem("EmphasizeList", JSON.stringify(emphasizelist));
        updateView('EmphasizeList', 'H');
        input.value = "";
    }
}

function DeleteEmphasizeKeyword(index) {
    let emphasizelist = JSON.parse(localStorage.getItem("EmphasizeList")) || [];
    emphasizelist.splice(index, 1);
    emphasizelist = reorderLocalList(emphasizelist, 'H');
    localStorage.setItem("EmphasizeList", JSON.stringify(emphasizelist));
    updateView('EmphasizeList', 'H');
}

function UpdateEmphasizeKeyword(index) {
    let emphasizelist = JSON.parse(localStorage.getItem("EmphasizeList")) || [];
    const oldValue = emphasizelist[index]["강조어"];
    const newValue = prompt("강조 키워드를 수정하세요:", oldValue);
    
    if (newValue && newValue.trim() !== "") {
        emphasizelist[index]["강조어"] = newValue.trim();
        emphasizelist = reorderLocalList(emphasizelist, 'H');
        localStorage.setItem("EmphasizeList", JSON.stringify(emphasizelist));
        updateView('EmphasizeList', 'H');
    }
}