AutoDangerIdentify();
function AutoDangerIdentify(){
    const DangerList = JSON.parse(localStorage.getItem(`DangerList`));
    const userContent=document.querySelector(`.usercontent`);
    const userPost=userContent.querySelector(`td`);
    const userdelete=userContent.querySelector(`tr`);
    localStorage.getItem(`DangerList`);
    for(let i=0;i<DangerList.length;i++){
        const dangerlist=DangerList[i];//금지 키워드 저장
        if(userPost.textContent.includes(DangerList[i])){//금지 키워드 찾기
            userPost.innerHTML=userPost.innerHTML.replace(dangerlist,`<span style="color:red;">${dangerlist}</span>`);//키워드를 찾으면 색 교체
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
    const userContent=document.querySelector(`.usercontent`);
    const userPost=userContent.querySelector(`td`);
    localStorage.getItem(`EmphasizeList`);
    for(let i=0;i<EmphasizeList.length;i++){
        const emphasizelist=EmphasizeList[i];//강조 키워드 저장
        if(userPost.textContent.includes(EmphasizeList[i])){//강조 키워드 찾기
            userPost.innerHTML=userPost.innerHTML.replace(emphasizelist,`<span style="color:blue;">${emphasizelist}</span>`);//키워드를 찾으면 색 교체
        }
    }
}