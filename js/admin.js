AutoDangerIdentify();
function AutoDangerIdentify(){
    const DangerList = JSON.parse(localStorage.getItem(`DangerList`));//위험키워드 호출하여 변수에 저장
    const userContent=document.querySelector(`.usercontents`);//리스트 가져오기
    const userdelete=userContent.querySelector(`tr`);//삭제할 줄
    
    localStorage.getItem(`DangerList`);//위험키워드 호출
    
    for(let i=0;i<DangerList.length;i++){
        const dangerlist=DangerList[i];//금지 키워드 저장
        if(userContent.textContent.includes(DangerList[i])){//금지 키워드 찾기
            userContent.innerHTML=userContent.innerHTML.replace(dangerlist,`<span style="color:red;">${dangerlist}</span>`);//키워드를 찾으면 색 교체
            setTimeout(function(){
                alert(`금지키워드:${DangerList[i]}발견`);
                userdelete.remove();
            },3000);
        }
    }
}

AutoEmphasizeIdentify();
function AutoEmphasizeIdentify(){
    const EmphasizeList = JSON.parse(localStorage.getItem(`EmphasizeList`));
    const userContents=document.querySelector(`.usercontents`);
    const userPost=userContents.querySelector(`td`);
    localStorage.getItem(`EmphasizeList`);
    for(let i=0;i<EmphasizeList.length;i++){
        const emphasizelist=EmphasizeList[i];//강조 키워드 저장
        if(userPost.textContent.includes(EmphasizeList[i])){//강조 키워드 찾기
            userPost.innerHTML=userPost.innerHTML.replace(emphasizelist,`<span style="color:blue;">${emphasizelist}</span>`);//키워드를 찾으면 색 교체
        }
    }
}