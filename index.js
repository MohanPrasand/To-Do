if (!("todo" in localStorage))
    localStorage.setItem("todo","{}");
let data=localStorage["todo"];
data=JSON.parse(data);
    
    
let contain=document.getElementById('container');
let addbtn=document.getElementById("add");
let addprimebtn=document.getElementById("addprime");
let msgbox=document.getElementById("addPage");
let cancel=document.getElementById("cancel");
let txtarea=document.getElementById("newmessage");
let savebtn=document.getElementById("save");
let menubtn=document.getElementById("menubtn");
let menu=document.getElementById("menu");
let closebtn=document.getElementById("close");
let closeimg=document.getElementById("closeimg");
function createItem(message){
    let keys=Object.keys(data);
    let itno=0;
    if (keys.length!=0)
        itno=String(Number(keys[keys.length-1])+1);
    data[itno]={};
    data[itno].message=message;
    data[itno].itemno=itno;
    data[itno].date=new Date().getDate()+"-"+(1+new Date().getMonth())+"-"+new Date().getFullYear();
    data[itno].checked=false;
    localStorage["todo"]=JSON.stringify(data);
    return itno;
}

function deleteItem(itemno){
    if(!(itemno in data))
        return;
    delete data[itemno];
    localStorage["todo"]=JSON.stringify(data);
    showRecord();
}

function uncheck(itemno){
    if(data[itemno].checked)
        data[itemno].checked=false;
    else
        data[itemno].checked=true;
    localStorage["todo"]=JSON.stringify(data);
}

// function deleteAll(){
//     data={};
//     localStorage["todo"]='';
//     showRecord();
// }

function showItem(item){
    let con=document.createElement('span');
    let inp=document.createElement('input');
    let mess=document.createElement('span');
    let del=document.createElement('span');

    con.id="item";
    inp.id="check";
    mess.id="message";
    del.id="delete";

    inp.type="checkbox";
    del.innerHTML="<img id=\"deleteimg\" src=\"delete.png\" alt=\"delete\">";
    mess.innerText=item.message;
    inp.addEventListener("click",()=>{
        uncheck(item.itemno);
    })
    del.addEventListener("click",()=>{
        deleteItem(item.itemno);
    })

    if(item.checked)
        inp.checked=true;

    con.appendChild(inp);
    con.appendChild(mess);
    con.appendChild(del);
    contain.appendChild(con);
}

function showDate(dat){
    let dd=document.createElement("span");
    dd.id="date";
    dd.innerText=dat;
    contain.appendChild(dd);
}

function showRecord(){
    let nowDate=new Date().getDate()+"-"+(1+new Date().getMonth())+"-"+new Date().getFullYear();
    let keys=Object.keys(data).reverse();
    let currDate="";
    let i;
    contain.innerHTML='';
    for (i in keys){
        let currd=data[keys[i]];
        if(currDate!=currd.date){
            currDate=currd.date;
            if(currDate==nowDate)
                showDate("Today");
            else
                showDate(currDate);
        }
        showItem(currd);
    }
    let de=document.createElement("DIV");
    de.style.height=100+'px';
    contain.appendChild(de);

}


addbtn.addEventListener("click",()=>{
    msgbox.style.scale=1;
    txtarea.focus();
});
addprimebtn.addEventListener("click",()=>{
    msgbox.style.scale=1;
    txtarea.focus();
});

cancel.addEventListener("click",()=>{
    txtarea.value="";
    msgbox.style.scale=0;
});

savebtn.addEventListener("click",()=>{
    createItem(txtarea.value);
    txtarea.value="";
    showRecord();
    msgbox.style.scale=0;
});

menubtn.addEventListener("click",()=>{
    menu.style.left=0;
    closebtn.style.left=105+"%";
    closeimg.style.transform="rotate(135deg)"
})
closebtn.addEventListener("click",()=>{
    menu.style.left=-40+'%';
    closebtn.style.left=-10+'%';
    closeimg.style.transform="rotate(0deg)"
})



showRecord();






