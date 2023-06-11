import *as func from "./image_design_functions.js";
const uploaded_image_all=document.querySelector("#uploaded_image_all");
const submit_id=document.querySelectorAll('.submit_id');
const DisplayCanvas=document.querySelectorAll('.DisplayCanvas');
const uploaded=document.querySelectorAll('.uploaded');
const NowValues=document.querySelectorAll(".NowValues");
const MainInfo=document.querySelectorAll(".MainInfo");
const AccentInfo=document.querySelectorAll(".AccentInfo");
const FontInfo=document.querySelectorAll(".FontInfo");
const MainList=document.querySelectorAll(".MainList");
const AccentList=document.querySelectorAll(".AccentList");
const FontList=document.querySelectorAll(".FontList");
const to_next=document.querySelectorAll(".to_next");
const display_num=document.querySelectorAll('.display_num');
const database_contents=document.querySelectorAll('.database_contents');

console.log(uploaded_image_all);
console.log(submit_id);
console.log(NowValues);
console.log(DisplayCanvas[0]);

// すべてのsubmit_idクラスを非表示に
submit_id.forEach(submit_id => {
    submit_id.style.display='none';
});


let CanvasCenterPoint=[DisplayCanvas[0].width/2,DisplayCanvas[0].height/2];
// 画像サイズはユーザの入力値でリアルタイムに変化させる！

for (let i = 0; i < uploaded.length; i++) {
    let img=new Image();
    img.src=uploaded[i].src;
    let new_Wid_Hei=func.ImageResize(img,640,360);
    console.log(new_Wid_Hei,img.src);
    let ImageCenterPoint=[new_Wid_Hei[0]/2,new_Wid_Hei[1]/2];
    console.log(CanvasCenterPoint,ImageCenterPoint);

    img.onload=function(){
        // Canvasの原点から描けるように、(dx,dy)には、canvas,resize_imageの(0.5x,0.5y)同士を減算した位置を指定
        DisplayCanvas[i].getContext('2d').drawImage(img,CanvasCenterPoint[0]-ImageCenterPoint[0],CanvasCenterPoint[1]-ImageCenterPoint[1],new_Wid_Hei[0],new_Wid_Hei[1]);
    };

    console.log(FontInfo[i].innerHTML);
   //  3つの値が埋まったらシーン生成ボタン開放 各値の色やフォントも適用
    if (MainInfo[i].innerHTML!="未定" && AccentInfo[i].innerHTML!="未定" &&FontInfo[i].innerHTML!="未定") {
       to_next[i].removeAttribute("disabled");
    }
    if (MainInfo[i].innerHTML!="未定") {
        MainList[i].style.backgroundColor=`${MainInfo[i].innerHTML}`;
    }

    if (AccentInfo[i].innerHTML!="未定") {
        AccentList[i].style.backgroundColor=`${AccentInfo[i].innerHTML}`;
    }

    if (FontInfo[i].innerHTML!="未定") {
        NowFont(FontInfo[i].innerHTML,FontList[i]);
    }
}

function NowFont(font_value_array,FontList) {
    switch(font_value_array){
        case "あずきフォント":
            FontList.style.fontFamily="Azuki";
            break;
 
         case "からかぜ":
            FontList.style.fontFamily="Karakaze";
            break;
 
 
         case "たぬき油性マジック":
            FontList.style.fontFamily="Tanuki";
            break;
 
         case "めもわーる":
            FontList.style.fontFamily="Memo";
            break;
 
         case "JKゴシックL":
            FontList.style.fontFamily="jk_L";
            break;
 
         case "PixelMPlus":
            FontList.style.fontFamily="PixelMPlus";
            break;
 
         case "ラノベPOP":
            FontList.style.fontFamily="LightNovel";
            break;
 
         case "うたミンフォント":
            FontList.style.fontFamily="Utamin";
            break;
 
         case "マキナス":
            FontList.style.fontFamily="Makinus";
            break;
 
         case "コウザン行書体":
            FontList.style.fontFamily="kouzan";
            break;
 
         case "しょかきうたげ":
            FontList.style.fontFamily="Shokaki";
            break;
 
         case "游明朝Light":
            FontList.style.fontFamily="YuMincho";
            break;
 
         case "刻明朝":
            FontList.style.fontFamily="Kokumin";
            break;
 
         case "装甲明朝":
            FontList.style.fontFamily="Soukou";
            break;
 
         case "源界明朝":
            FontList.style.fontFamily="Genkai";
            break;
    }
    
}