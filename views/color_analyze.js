import *as func from "./color_analyze_functions.js";

const uploaded_pic=document.querySelector('#uploaded_pic');
const DisplayCanvas=document.querySelector('#DisplayCanvas');
const analyzed_pic=document.querySelectorAll('.analyzed_pic');
const MainColorButton=document.querySelector('#MainColorButton');
const AccentColorButton=document.querySelector('#AccentColorButton');
const MainColorDefine=document.querySelector('#MainColorDefine');
const AccentColorDefine=document.querySelector('#AccentColorDefine');
const checkButton=document.querySelector('#checkButton');
const choiceOKButton=document.querySelectorAll('.choiceOK');
const closeButton_Main=document.querySelectorAll('.closeButton_Main');
const closeButton_Accent=document.querySelectorAll('.closeButton_Accent');
const displayChoice=document.querySelectorAll('.displayChoice');
const informations=document.querySelector('#Informations');
const colorDefinePart=document.querySelector('#colorDefinePart');
const changeM_data=document.querySelector(".changeM_data");
const changeA_data=document.querySelector(".changeA_data");
const submit_main=document.querySelector('#submit_main');
const submit_accemt=document.querySelector('#submit_accent');

console.log(displayChoice[0].children[1]);

func.DrawCanvas(DisplayCanvas,uploaded_pic);

let MainColor=new Array(3),AccentColor=new Array(3);
let MainColorCode,AccentColorCode;


MainColorButton.addEventListener('click',function(){
    MainColorDefine.style.display='inline-block';
});
AccentColorButton.addEventListener('click',function(){
    AccentColorDefine.style.display='inline-block';
});


analyzed_pic[0].addEventListener('click',async function(event){
    MainColor=func.Ma_Ac_Color_Choice(event,analyzed_pic[0]);
    console.log(MainColor);
    MainColorCode=await func.RGB_to_ColorCode(MainColor);
    submit_main.value=MainColorCode;
    displayChoice[0].children[1].style.backgroundColor=MainColorCode;
});


analyzed_pic[1].addEventListener('click',async function(event){
    AccentColor=func.Ma_Ac_Color_Choice(event,analyzed_pic[1]);
    AccentColorCode=await func.RGB_to_ColorCode(AccentColor);
    submit_accent.value=AccentColorCode;
    displayChoice[1].children[1].style.backgroundColor=AccentColorCode;
});

choiceOKButton[0].addEventListener('click',function(){
    displayChoice[0].style.display='inline-block';
    // informations.children[0].innerHTML=`メインカラー：${MainColorCode}`;
    changeM_data.innerHTML=`→${MainColorCode}`;
});

choiceOKButton[1].addEventListener('click',function(){
    displayChoice[1].style.display='inline-block';
    // informations.children[1].innerHTML=`アクセントカラー：${AccentColorCode}`;
    changeA_data.innerHTML=`→${AccentColorCode}`;
});


for (let i = 0; i < closeButton_Accent.length; i++) {
    closeButton_Main[i].addEventListener('click',function(){
        MainColorDefine.style.display='none';
    });
    closeButton_Accent[i].addEventListener('click',function(){
        AccentColorDefine.style.display='none';
    });
    
    
}


