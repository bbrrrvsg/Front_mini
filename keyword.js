function AddDangerKeyword() {
    const Addkeyword = document.querySelector(`.forbidden-keyword-input`);
    const inner = document.querySelector(`.forbidden-keyword-list`);
    const dangerListElements = inner.querySelectorAll(`li`);
    let dangerlist = [];
    for(let i = 0; i < dangerListElements.length; i++){
        dangerlist.push(dangerListElements[i].textContent);
    }
    const newValue = Addkeyword.value.trim();
    if(newValue !== "") {
        dangerlist.push(newValue);
        let html = "";
        for(let j = 0; j < dangerlist.length; j++) {
            html += `<li>${dangerlist[j]}</li>`;
        }
        inner.innerHTML = html;
        Addkeyword.value = "";
    }
    const DangGerList=localStorage.setItem("DangGerList",JSON.stringify(dangerlist));
    const registration=document.querySelector(`.stat-value-black`);
    registration.textContent=dangerlist.length+"개";
}
function AddEmphasizeKeyword() {
    const NewEmphasizeKeyword=document.querySelector(`.highlight-keyword-input`);
    const inner=document.querySelector(`.highlight-keyword-list`);
    const emphasizeListElements=inner.querySelectorAll(`li`);
    let emphasizelist=[];
    for (let i=0;i<emphasizeListElements.length;i++){
        emphasizelist.push(emphasizeListElements[i].textContent);
    }
    const newValue=NewEmphasizeKeyword.value.trim();
    if(newValue!==""){
        emphasizelist.push(newValue);
        let html="";
        for(let j=0;j<emphasizelist.length;j++){
            html+=`<li>${emphasizelist[j]}</li>`;
        }
        inner.innerHTML=html;
        NewEmphasizeKeyword.value="";
    }
    const EmphasizeList=localStorage.setItem("EmphasizeList",JSON.stringify(emphasizelist));
    const registration=document.querySelector(`.stat-value-orange`);
    registration.textContent=emphasizelist.length+"개";
}