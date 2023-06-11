import *as func from "./image_design_functions.js";
const CanvasZone=document.querySelector("#CanvasZone");
const DisplayCanvas_background=document.querySelector("#DisplayCanvas_background");
let canvasText_background=DisplayCanvas_background.getContext('2d');
const DisplayCanvas_background_custom=document.querySelector("#DisplayCanvas_background_custom");
let canvasText_background_custom=DisplayCanvas_background_custom.getContext('2d');
const DisplayCanvas=document.querySelector("#DisplayCanvas");
let canvasText=DisplayCanvas.getContext('2d');
const DisplayCanvas_text=document.querySelector("#DisplayCanvas_text");
let canvasText_text=DisplayCanvas_text.getContext('2d');
const DisplayCanvas_combine=document.querySelector("#DisplayCanvas_combine");
let canvasText_combine=DisplayCanvas_combine.getContext('2d');
const submit_image=document.querySelector('.submit_image');
const submit_id=document.querySelector('.submit_id');
const submit_MainColor=document.querySelector('.submit_MainColor');
const submit_AccentColor=document.querySelector('.submit_AccentColor');
const submit_Font=document.querySelector('.submit_Font');
const SongText=document.querySelectorAll('.PositionMenu');
const drawPositionBar=document.querySelectorAll('.drawPositionBar');
const drawPositionDisplay=document.querySelector('#drawPositionDisplay');
const GradationButton=document.querySelector('#GradationButton');
const gradationNumber=document.querySelector('#gradationNumber');
const TouitsuButton=document.querySelector('#TouitsuButton');
const EasyBack_MV_BW=document.querySelector('#EasyBack_MV_BW');
const EasyBack_MV=document.querySelector('#EasyBack_MV');
const text_size=document.querySelectorAll(".text_size");
const text_x_position=document.querySelectorAll(".text_x_position");
const text_y_position=document.querySelectorAll(".text_y_position");
const DrawPositionDecide=document.querySelectorAll(".DrawPositionDecide");

// カスタマイズ要素パート
const funnyList=document.querySelectorAll('.funny');
const darkList=document.querySelectorAll('.dark');
const elementsList=document.querySelectorAll('.elements');

const check_funny=document.querySelector('#check_funny');
const check_dark=document.querySelector('#check_dark');
const check_elements=document.querySelector('#check_elements');

const flowers=document.querySelector("#flowers");
const musicmark=document.querySelector("#musicmark");
const star=document.querySelector("#star");
const ryusei=document.querySelector("#ryusei");
const dark=document.querySelector("#dark");
const headBone=document.querySelector("#headBone");
const magicCircle=document.querySelector("#magicCircle");
const fire=document.querySelector("#fire");
const water=document.querySelector("#water");
const wind=document.querySelector("#wind");
const land=document.querySelector("#land");

const stripe=document.querySelector("#stripe");
const shadow_Main=document.querySelector("#shadow_Main");
const shadow_Accent=document.querySelector("#shadow_Accent");
const shadow_black=document.querySelector("#shadow_black");

const background_ResetButton=document.querySelector('#background_ResetButton');
const songtext_ResetButton=document.querySelector('#songtext_ResetButton');
const shadow_ResetButton=document.querySelector('#shadow_ResetButton');
const CombineCanvasesButton=document.querySelector('#CombineCanvasesButton');

// 背景に合わせて画像サイズを変更するための、背景パターン識別子 0でデフォルト　1で簡単MV背景を示す
let blackRange=40;
let UnderRange=Number(DisplayCanvas_background.height)-2*blackRange;

// 背景パターン用識別子
let back_num=0;

// 対象画像の変数を作成
let img=new Image();
img.src=submit_image.src;

// カスタマイズ要素用の画像パス格納配列
let flowersImage=new Image();
flowersImage.src='accents/funny/flower.png';
let musicmarkImage=new Image();
musicmarkImage.src='accents/funny/musicmark.png';
let starImage=new Image();
starImage.src='accents/funny/star.png';
let ryuseiImage=new Image();
ryuseiImage.src='accents/funny/ryusei.png';
let darkImage=new Image();
darkImage.src='accents/dark/dark.png';
let headBoneImage=new Image();
headBoneImage.src='accents/dark/headBone.png';
let magicCircleImage=new Image();
magicCircleImage.src='accents/dark/magicCircle.png';
let fireImage=new Image();
fireImage.src='accents/elements/fire.png';
let waterImage=new Image();
waterImage.src='accents/elements/water.png';
let windImage=new Image();
windImage.src='accents/elements/wind.png';
let landImage=new Image();
landImage.src='accents/elements/land.png';


// メインカラーのカラーコードと補色の値を格納
let colorCodeValue=submit_MainColor.innerHTML;
let dyad=func.numbers_ColorScheme(colorCodeValue,2,180);
let triad=func.numbers_ColorScheme(colorCodeValue,3,120);
let tetrad=func.numbers_ColorScheme(colorCodeValue,4,90);
let pentad=func.numbers_ColorScheme(colorCodeValue,5,72);
let heqsad=func.numbers_ColorScheme(colorCodeValue,6,60);


// 歌詞テキストを格納
let SongTextArray=new Array();
// const drawPositionDisplay=new Array(SongText.length);
for(let i=0; i<SongText.length; i++){
    SongTextArray[i]=SongText[i].innerHTML;
    
}

// フォント識別文字列を格納
let FontsCodeArray=submit_Font.innerHTML;
console.log(FontsCodeArray);
let FontCode=func.FontsPick(FontsCodeArray);
console.log(FontCode);
drawPositionDisplay.style.fontFamily=`${FontCode}`;

let CanvasCenterPoint=[DisplayCanvas.width/2,DisplayCanvas.height/2];
// 画像サイズはユーザの入力値でリアルタイムに変化させる！
let new_Wid_Hei=func.ImageResize(img,960,540);
console.log(new_Wid_Hei);
let ImageCenterPoint=[new_Wid_Hei[0]/2,new_Wid_Hei[1]/2];
console.log(CanvasCenterPoint,ImageCenterPoint);

img.onload=function(){
    // Canvasの原点から描けるように、(dx,dy)には、canvas,resize_imageの(0.5x,0.5y)同士を減算した位置を指定
    canvasText.drawImage(img,CanvasCenterPoint[0]-ImageCenterPoint[0],CanvasCenterPoint[1]-ImageCenterPoint[1],new_Wid_Hei[0],new_Wid_Hei[1]);
};

GradationButton.style.backgroundColor='hsl('+dyad[0][1]+','+dyad[1]+'%,'+dyad[2]+'%)';
TouitsuButton.style.backgroundColor=submit_MainColor.innerHTML;
EasyBack_MV.style.backgroundColor=submit_MainColor.innerHTML;

GradationButton.addEventListener('click',()=> {
    back_num=0;
    canvasText_background.clearRect(0,0,DisplayCanvas.width,DisplayCanvas.height); 
    const gradation=canvasText_background.createLinearGradient(0,0,DisplayCanvas_background.width,DisplayCanvas_background.height) ; 
    // グラデーションの色数を2~6に指定し、ダイアード配色・トライアド配色・テトラード配色・ペンタード配色・ヘクサード配色のいずれかを適用
    switch (Number(gradationNumber.value)) {
        case 2:
            gradation.addColorStop(0.0 , 'hsl('+dyad[0][0]+','+dyad[1]+'%,'+dyad[2]+'%)');
            gradation.addColorStop(1.0 , 'hsl('+dyad[0][1]+','+dyad[1]+'%,'+dyad[2]+'%)');
            break;
    
        case 3:
            gradation.addColorStop(0.0 , 'hsl('+triad[0][0]+','+triad[1]+'%,'+triad[2]+'%)');
            gradation.addColorStop(0.5 , 'hsl('+triad[0][1]+','+triad[1]+'%,'+triad[2]+'%)');
            gradation.addColorStop(1.0 , 'hsl('+triad[0][2]+','+triad[1]+'%,'+triad[2]+'%)');
            break;
    
        case 4:
            gradation.addColorStop(0.0 , 'hsl('+tetrad[0][0]+','+tetrad[1]+'%,'+tetrad[2]+'%)');
            gradation.addColorStop(0.33 , 'hsl('+tetrad[0][1]+','+tetrad[1]+'%,'+tetrad[2]+'%)');
            gradation.addColorStop(0.66 , 'hsl('+tetrad[0][2]+','+tetrad[1]+'%,'+tetrad[2]+'%)');
            gradation.addColorStop(1.0 , 'hsl('+tetrad[0][3]+','+tetrad[1]+'%,'+tetrad[2]+'%)');
            break;
    
        case 5:
            gradation.addColorStop(0.0 , 'hsl('+pentad[0][0]+','+pentad[1]+'%,'+pentad[2]+'%)');
            gradation.addColorStop(0.25 , 'hsl('+pentad[0][1]+','+pentad[1]+'%,'+pentad[2]+'%)');
            gradation.addColorStop(0.50 , 'hsl('+pentad[0][2]+','+pentad[1]+'%,'+pentad[2]+'%)');
            gradation.addColorStop(0.75, 'hsl('+pentad[0][3]+','+pentad[1]+'%,'+pentad[2]+'%)');
            gradation.addColorStop(1.0 , 'hsl('+pentad[0][4]+','+pentad[1]+'%,'+pentad[2]+'%)');
            break;
    
        case 6:
            gradation.addColorStop(0.0, 'hsl('+heqsad[0][0]+','+heqsad[1]+'%,'+heqsad[2]+'%)');
            gradation.addColorStop(0.2, 'hsl('+heqsad[0][1]+','+heqsad[1]+'%,'+heqsad[2]+'%)');
            gradation.addColorStop(0.4, 'hsl('+heqsad[0][2]+','+heqsad[1]+'%,'+heqsad[2]+'%)');
            gradation.addColorStop(0.6, 'hsl('+heqsad[0][3]+','+heqsad[1]+'%,'+heqsad[2]+'%)');
            gradation.addColorStop(0.8, 'hsl('+heqsad[0][4]+','+heqsad[1]+'%,'+heqsad[2]+'%)');
            gradation.addColorStop(1.0, 'hsl('+heqsad[0][5]+','+heqsad[1]+'%,'+heqsad[2]+'%)');
            break;
    
        default:
            break;
    }    
    canvasText_background.fillStyle=gradation;
    canvasText_background.fillRect(0,0,DisplayCanvas_background.width,DisplayCanvas_background.height);
    canvasText_background.save();

    // 画像を背景に適したサイズに調整
    canvasText.clearRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
    new_Wid_Hei=func.ImageResize(img,960,540);
    console.log(new_Wid_Hei);
    ImageCenterPoint=[new_Wid_Hei[0]/2,new_Wid_Hei[1]/2];
    CanvasCenterPoint=[DisplayCanvas.width/2,DisplayCanvas.height/2];
    canvasText.drawImage(img,CanvasCenterPoint[0]-ImageCenterPoint[0],CanvasCenterPoint[1]-ImageCenterPoint[1],new_Wid_Hei[0],new_Wid_Hei[1]);
});
TouitsuButton.addEventListener('click',()=> {
    back_num=0;
    canvasText_background.clearRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
    let TonT=func.TonT_ColorScheme(colorCodeValue);
    // トーンオントーン配色の出力パターンのいずれかをランダムに適用
    canvasText_background.fillStyle='hsl('+TonT[0]+','+TonT[1]+'%,'+TonT[2][Math.floor(Math.random()*1.9)]+'%)';
    canvasText_background.fillRect(0,0,DisplayCanvas_background.width,DisplayCanvas_background.height);
    canvasText_background.save();

    // 画像を背景に適したサイズに調整
    canvasText.clearRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
    new_Wid_Hei=func.ImageResize(img,960,540);
    console.log(new_Wid_Hei);
    ImageCenterPoint=[new_Wid_Hei[0]/2,new_Wid_Hei[1]/2];
    CanvasCenterPoint=[DisplayCanvas.width/2,DisplayCanvas.height/2];
    canvasText.drawImage(img,CanvasCenterPoint[0]-ImageCenterPoint[0],CanvasCenterPoint[1]-ImageCenterPoint[1],new_Wid_Hei[0],new_Wid_Hei[1]);
});

EasyBack_MV_BW.addEventListener('click',()=>{
    back_num=1;
    canvasText_background.clearRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
    canvasText_background.fillStyle="black";
    canvasText_background.fillRect(0,0,DisplayCanvas_background.width,blackRange);
    canvasText_background.fillRect(0,UnderRange,DisplayCanvas_background.width,DisplayCanvas_background.height);
    canvasText_background.fillStyle="white";
    canvasText_background.fillRect(0,30,DisplayCanvas_background.width,UnderRange);

    // 画像を背景に適したサイズに調整
    canvasText.clearRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
    new_Wid_Hei=func.ImageResize(img,960,UnderRange);
    console.log(new_Wid_Hei);
    ImageCenterPoint=[new_Wid_Hei[0]/2,new_Wid_Hei[1]/2];
    CanvasCenterPoint=[DisplayCanvas.width/2,(DisplayCanvas.height-blackRange)/2];
    canvasText.drawImage(img,CanvasCenterPoint[0]-ImageCenterPoint[0],CanvasCenterPoint[1]-ImageCenterPoint[1],new_Wid_Hei[0],new_Wid_Hei[1]);
});

EasyBack_MV.addEventListener('click',()=>{
    back_num=1;
    canvasText.clearRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
    canvasText_background.clearRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
    canvasText_background.fillStyle=`${submit_AccentColor.innerHTML}`;
    canvasText_background.fillRect(0,0,DisplayCanvas_background.width,blackRange);
    canvasText_background.fillRect(0,UnderRange,DisplayCanvas_background.width,DisplayCanvas_background.height);
    canvasText_background.fillStyle=`${submit_MainColor.innerHTML}`;
    canvasText_background.fillRect(0,30,DisplayCanvas_background.width,UnderRange);

    new_Wid_Hei=func.ImageResize(img,960,UnderRange);
    console.log(new_Wid_Hei);
    ImageCenterPoint=[new_Wid_Hei[0]/2,new_Wid_Hei[1]/2];
    CanvasCenterPoint=[DisplayCanvas.width/2,(DisplayCanvas.height-blackRange)/2];
    canvasText.drawImage(img,CanvasCenterPoint[0]-ImageCenterPoint[0],CanvasCenterPoint[1]-ImageCenterPoint[1],new_Wid_Hei[0],new_Wid_Hei[1]);
});

// 歌詞をクリックしたら細かい設定メニューを表示
for (let i = 0; i <SongText.length; i++) {
    let position_values=new Array(SongText.length);
    position_values[i]=[0,0];
    let position_value=[drawPositionDisplay.getBoundingClientRect().x,drawPositionDisplay.getBoundingClientRect().y];
    console.log(position_value);
    SongText[i].addEventListener('click',()=>{
        if(drawPositionBar[i].style.display=='none'){
            drawPositionBar[i].style.display="inline-block";
        }

        else{
            drawPositionBar[i].style.display="none";
        }
        
        if(drawPositionDisplay.style.visibility=='hidden'){
            drawPositionDisplay.style.visibility='visible';
        }
        else{
            drawPositionDisplay.style.visibility='hidden';
        }
    });  

    text_size[i].addEventListener('change',()=>{
        drawPositionDisplay.style.fontSize=`${text_size[i].value}px`;
        canvasText_text.font=`${text_size[i].value}px`;
    });

    text_x_position[i].addEventListener('change',()=> {
        position_value[0]=text_x_position[i].value;
        drawPositionDisplay.style.left=`${text_x_position[i].value}px`;
        position_values[i]=position_value;
        console.log(i,'キャンバスとの相対位置：['+position_values[i]+']');

    });
    // 100px分のずれ
    text_y_position[i].addEventListener('change',()=> {
        position_value[1]=Number(text_y_position[i].value)+100;
        drawPositionDisplay.style.top=`${position_value[1]}px`;
        position_values[i][1]=text_y_position[i].value;
        console.log(i,'キャンバスとの相対位置：['+position_values[i]+']');  
    });

    DrawPositionDecide[i].addEventListener('click',()=>{
        // フォントサイズ分だけy座標をプラスして差をなくす　50はフォントサイズ
        let drawPoint=[Number(position_values[i][0]),Number(position_values[i][1])+Number(text_size[i].value)];
        console.log(drawPoint);
        canvasText_text.font=`${text_size[i].value}px "${FontCode}"`;
        canvasText_text.fillStyle=`${submit_AccentColor.innerHTML}`;
        console.log(canvasText_text.font,SongTextArray[i],drawPoint);
        canvasText_text.fillText(SongTextArray[i],drawPoint[0],drawPoint[1]);
        canvasText_text.fillStyle=`${submit_MainColor.innerHTML}`;
        canvasText_text.strokeText(SongTextArray[i],drawPoint[0],drawPoint[1]);
    });
}

// カスタマイズ要素の処理実装
check_funny.addEventListener('click',()=>{
    console.log(check_funny.checked);
    if (check_funny.checked==true) {
        for (let i = 0; i < funnyList.length; i++) {
            funnyList[i].style.display="inline-block";      
        }
        
    }
    else{
        for (let i = 0; i < funnyList.length; i++) {
            funnyList[i].style.display="none";      
        }
        
    }
});

check_dark.addEventListener('click',()=>{
    console.log(check_dark.checked);
    if (check_dark.checked==true) {
        for (let i = 0; i < darkList.length; i++) {
            darkList[i].style.display="inline-block";      
        }
        
    }
    else{
        for (let i = 0; i < darkList.length; i++) {
            darkList[i].style.display="none";      
        }
        
    }
});
check_elements.addEventListener('click',()=>{
    console.log(check_elements.checked);
    if (check_elements.checked==true) {
        for (let i = 0; i < elementsList.length; i++) {
            elementsList[i].style.display="inline-block";      
        }
        
    }
    else{
        for (let i = 0; i < elementsList.length; i++) {
            elementsList[i].style.display="none";      
        }
        
    }
});


flowers.addEventListener('click',()=>{
    canvasText_background_custom.restore();
    canvasText_background_custom.fillStyle=canvasText_background_custom.createPattern(flowersImage,'repeat');
    canvasText_background_custom.fillRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
});
musicmark.addEventListener('click',()=>{
    canvasText_background_custom.restore();
    canvasText_background_custom.fillStyle=canvasText_background_custom.createPattern(musicmarkImage,'repeat');
    canvasText_background_custom.fillRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
});
star.addEventListener('click',()=>{
    canvasText_background_custom.restore();
    canvasText_background_custom.fillStyle=canvasText_background_custom.createPattern(starImage,'repeat');
    canvasText_background_custom.fillRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
});
ryusei.addEventListener('click',()=>{
    canvasText_background_custom.restore();
    canvasText_background_custom.fillStyle=canvasText_background_custom.createPattern(ryuseiImage,'repeat');
    canvasText_background_custom.fillRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
});

dark.addEventListener('click',()=>{
    canvasText_background_custom.restore();
    canvasText_background_custom.drawImage(darkImage,CanvasCenterPoint[0]-(darkImage.width/2),CanvasCenterPoint[1]-(darkImage.height/2),darkImage.width,darkImage.height);
});
headBone.addEventListener('click',()=>{
    canvasText_background_custom.restore();
    canvasText_background_custom.drawImage(headBoneImage,Math.random()*(DisplayCanvas.width-headBoneImage.width),Math.random()*(DisplayCanvas.height-headBoneImage.height),headBoneImage.width,headBoneImage.height);
});
magicCircle.addEventListener('click',()=>{
    canvasText_background_custom.restore();
    canvasText_background_custom.fillStyle=canvasText_background_custom.createPattern(magicCircleImage,'repeat');
    canvasText_background_custom.fillRect(0,CanvasCenterPoint[1]-(magicCircleImage.height/2),DisplayCanvas.width,magicCircleImage.height);
});
fire.addEventListener('click',()=>{
    canvasText_background_custom.restore();
    canvasText_background_custom.fillStyle=canvasText_background_custom.createPattern(fireImage,'repeat');
    canvasText_background_custom.fillRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
});
water.addEventListener('click',()=>{
    canvasText_background_custom.restore();
    canvasText_background_custom.fillStyle=canvasText_background_custom.createPattern(waterImage,'repeat');
    canvasText_background_custom.fillRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
});
wind.addEventListener('click',()=>{
    canvasText_background_custom.restore();
    canvasText_background_custom.fillStyle=canvasText_background_custom.createPattern(windImage,'repeat');
    canvasText_background_custom.fillRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
});
land.addEventListener('click',()=>{
    canvasText_background_custom.restore();
    canvasText_background_custom.fillStyle=canvasText_background_custom.createPattern(landImage,'repeat');
    canvasText_background_custom.fillRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
});

stripe.addEventListener('click',()=>{
    back_num=0;
    canvasText_background_custom.restore();
    let drawWidth=Math.round(DisplayCanvas_background.width/32);
    console.log(drawWidth);

    for (let i = 0; i < 16; i++) {
        canvasText_background_custom.fillStyle=`${submit_MainColor.innerHTML}`;
        canvasText_background_custom.fillRect(i*2*drawWidth,0,drawWidth,DisplayCanvas_background.height);
        canvasText_background_custom.fillStyle=`${submit_AccentColor.innerHTML}`;
        canvasText_background_custom.fillRect(i*2*drawWidth+drawWidth,0,drawWidth,DisplayCanvas_background.height);
    }

    // 画像を背景に適したサイズに調整
    canvasText.clearRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
    new_Wid_Hei=func.ImageResize(img,960,540);
    console.log(new_Wid_Hei);
    ImageCenterPoint=[new_Wid_Hei[0]/2,new_Wid_Hei[1]/2];
    CanvasCenterPoint=[DisplayCanvas.width/2,DisplayCanvas.height/2];
    canvasText.drawImage(img,CanvasCenterPoint[0]-ImageCenterPoint[0],CanvasCenterPoint[1]-ImageCenterPoint[1],new_Wid_Hei[0],new_Wid_Hei[1]);
});
shadow_Main.addEventListener('click',()=>{
    canvasText.restore();
    if(back_num==0){
        canvasText.clearRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
        canvasText.shadowColor =`${submit_MainColor.innerHTML}`;
        canvasText.shadowOffsetX = 30;
        canvasText.shadowOffsetY = 50;
        canvasText.shadowBlur = 5;
        new_Wid_Hei=func.ImageResize(img,960,540);
        console.log(new_Wid_Hei);
        ImageCenterPoint=[new_Wid_Hei[0]/2,new_Wid_Hei[1]/2];
        CanvasCenterPoint=[DisplayCanvas.width/2,DisplayCanvas.height/2];
        canvasText.drawImage(img,CanvasCenterPoint[0]-ImageCenterPoint[0],CanvasCenterPoint[1]-ImageCenterPoint[1],new_Wid_Hei[0],new_Wid_Hei[1]);
    }
    if(back_num==1){
        canvasText.clearRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
        canvasText.shadowColor = `${submit_MainColor.innerHTML}`;
        canvasText.shadowOffsetX = 30;
        canvasText.shadowOffsetY = 50;
        canvasText.shadowBlur = 5;
        new_Wid_Hei=func.ImageResize(img,960,UnderRange);
        console.log(new_Wid_Hei);
        ImageCenterPoint=[new_Wid_Hei[0]/2,new_Wid_Hei[1]/2];
        CanvasCenterPoint=[DisplayCanvas.width/2,(DisplayCanvas.height-blackRange)/2];
        canvasText.drawImage(img,CanvasCenterPoint[0]-ImageCenterPoint[0],CanvasCenterPoint[1]-ImageCenterPoint[1],new_Wid_Hei[0],new_Wid_Hei[1]);
        canvasText.drawImage(img,CanvasCenterPoint[0]-ImageCenterPoint[0],CanvasCenterPoint[1]-ImageCenterPoint[1],new_Wid_Hei[0],new_Wid_Hei[1]);
    }
});
shadow_Accent.addEventListener('click',()=>{
    canvasText.restore();
    if(back_num==0){
        canvasText.clearRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
        canvasText.shadowColor =`${submit_AccentColor.innerHTML}`;
        canvasText.shadowOffsetX = 30;
        canvasText.shadowOffsetY = 50;
        canvasText.shadowBlur = 5;
        new_Wid_Hei=func.ImageResize(img,960,540);
        console.log(new_Wid_Hei);
        ImageCenterPoint=[new_Wid_Hei[0]/2,new_Wid_Hei[1]/2];
        CanvasCenterPoint=[DisplayCanvas.width/2,DisplayCanvas.height/2];
        canvasText.drawImage(img,CanvasCenterPoint[0]-ImageCenterPoint[0],CanvasCenterPoint[1]-ImageCenterPoint[1],new_Wid_Hei[0],new_Wid_Hei[1]);
    }
    if(back_num==1){
        canvasText.clearRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
        canvasText.shadowColor = `${submit_AccentColor.innerHTML}`;
        canvasText.shadowOffsetX = 30;
        canvasText.shadowOffsetY = 50;
        canvasText.shadowBlur = 5;
        new_Wid_Hei=func.ImageResize(img,960,UnderRange);
        console.log(new_Wid_Hei);
        ImageCenterPoint=[new_Wid_Hei[0]/2,new_Wid_Hei[1]/2];
        CanvasCenterPoint=[DisplayCanvas.width/2,(DisplayCanvas.height-blackRange)/2];
        canvasText.drawImage(img,CanvasCenterPoint[0]-ImageCenterPoint[0],CanvasCenterPoint[1]-ImageCenterPoint[1],new_Wid_Hei[0],new_Wid_Hei[1]);
        canvasText.drawImage(img,CanvasCenterPoint[0]-ImageCenterPoint[0],CanvasCenterPoint[1]-ImageCenterPoint[1],new_Wid_Hei[0],new_Wid_Hei[1]);
    }
});
shadow_black.addEventListener('click',()=>{
    canvasText.restore();
    if(back_num==0){
        canvasText.clearRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
        canvasText.shadowColor ="black";
        canvasText.shadowOffsetX = 30;
        canvasText.shadowOffsetY = 50;
        canvasText.shadowBlur = 5;
        new_Wid_Hei=func.ImageResize(img,960,540);
        console.log(new_Wid_Hei);
        ImageCenterPoint=[new_Wid_Hei[0]/2,new_Wid_Hei[1]/2];
        CanvasCenterPoint=[DisplayCanvas.width/2,DisplayCanvas.height/2];
        canvasText.drawImage(img,CanvasCenterPoint[0]-ImageCenterPoint[0],CanvasCenterPoint[1]-ImageCenterPoint[1],new_Wid_Hei[0],new_Wid_Hei[1]);
    }
    if(back_num==1){
        canvasText.clearRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
        canvasText.shadowColor = "black";
        canvasText.shadowOffsetX = 30;
        canvasText.shadowOffsetY = 50;
        canvasText.shadowBlur = 5;
        new_Wid_Hei=func.ImageResize(img,960,UnderRange);
        console.log(new_Wid_Hei);
        ImageCenterPoint=[new_Wid_Hei[0]/2,new_Wid_Hei[1]/2];
        CanvasCenterPoint=[DisplayCanvas.width/2,(DisplayCanvas.height-blackRange)/2];
        canvasText.drawImage(img,CanvasCenterPoint[0]-ImageCenterPoint[0],CanvasCenterPoint[1]-ImageCenterPoint[1],new_Wid_Hei[0],new_Wid_Hei[1]);
        canvasText.drawImage(img,CanvasCenterPoint[0]-ImageCenterPoint[0],CanvasCenterPoint[1]-ImageCenterPoint[1],new_Wid_Hei[0],new_Wid_Hei[1]);
    }
});

background_ResetButton.addEventListener('click',()=>{
    console.log("reset");
    canvasText_background_custom.clearRect(0,0,DisplayCanvas_background_custom.width,DisplayCanvas_background_custom.height);
});

songtext_ResetButton.addEventListener('click',()=>{
    console.log("reset");
    canvasText_text.clearRect(0,0,DisplayCanvas_text.width,DisplayCanvas_text.height);
});

shadow_ResetButton.addEventListener('click',()=>{
    console.log("reset");
    canvasText.clearRect(0,0,DisplayCanvas.width,DisplayCanvas.height);
    canvasText.shadowOffsetX = 0;
    canvasText.shadowOffsetY = 0;
    canvasText.shadowBlur = 0;
    canvasText.drawImage(img,CanvasCenterPoint[0]-ImageCenterPoint[0],CanvasCenterPoint[1]-ImageCenterPoint[1],new_Wid_Hei[0],new_Wid_Hei[1]);
});

CombineCanvasesButton.addEventListener('click',async()=>{
    await func.CombineCanvases(canvasText_background,canvasText_background_custom,canvasText,canvasText_text,canvasText_combine);
    func.downloadCanvas(DisplayCanvas_combine,CombineCanvasesButton);
});