import *as func from "./image_design_functions.js";
// RGB値をカラーコードに変換する関数
export function RGB_to_ColorCode(RGB_Array){
    const newArray=new Array(3);
    let ColorCode='#';
    for(let i=0; i<RGB_Array.length; i++){
        newArray[i]=RGB_Array[i].toString(16);
        ColorCode=ColorCode+newArray[i];
        if(newArray[i].length==1){
            ColorCode=ColorCode+newArray[i];
        }
    }

    //カラーコードが6桁にならない場合もあるが、同じアルファベットを略しての表記なので、間違いではない。
    // 黒に近い色ほど起こりやすい。
    console.log(ColorCode);
    return ColorCode;
}

// 引数に指定した画像からイメージデータを作り各ピクセル分のRGBA値を返す関数
export function createImageData(imgQuery) {

    // キャンバス作成
    const cv = document.createElement('canvas');

    // 幅と高さは画像の自然長さに調整
    cv.width = imgQuery.naturalWidth;
    cv.height = imgQuery.naturalHeight;
    console.log("aaaa",cv.width, cv.height);
    // a
    const context = cv.getContext('2d');

    // キャンバス内に画像描画
    context.drawImage(imgQuery, 0, 0);

    // 各ピクセルのRGBA値をイメージデータ作成によって取得(imageData.data)
    const data = context.getImageData(0, 0, cv.width, cv.height);
    console.log(data);
    return data;
}

// メインカラー・アクセントカラー決定用関数
export function analyze_colorValues(imgQuery){
    // 対象画像のイメージデータにおけるRGBA値を取得
    const data=createImageData(imgQuery);
}

//画像のクリック位置のピクセルのRGB値を調べ、リターンする関数
export function Ma_Ac_Color_Choice(event,imgQuery){
    const imageData=createImageData(imgQuery);
    const data=imageData.data;
    const index=imageData.width;
    console.log(index);
    let clickX=event.pageX;
    let clickY=event.pageY;

    const clientRect=imgQuery.getBoundingClientRect();
    const positionX=clientRect.left+window.pageXOffset;
    const positionY=clientRect.top+window.pageYOffset;

    let x=Math.round(clickX-positionX,-1) ;
    let y=Math.round(clickY-positionY,-1);

    console.log(x,y);
    console.log(data[(x+y*index)*4],data[(x+y*index)*4+1],data[(x+y*index)*4+2]);

    return [data[(x+y*index)*4],data[(x+y*index)*4+1],data[(x+y*index)*4+2]];
}

export function DrawCanvas(DisplayCanvas,picture) {
    let CanvasCenterPoint=[DisplayCanvas.width/2,DisplayCanvas.height/2];
    // 画像サイズはユーザの入力値でリアルタイムに変化させる！
    let img=new Image();
    img.src=picture.src;
    let new_Wid_Hei=func.ImageResize(img,640,360);
    console.log(new_Wid_Hei,img.src);
    let ImageCenterPoint=[new_Wid_Hei[0]/2,new_Wid_Hei[1]/2];
    console.log(CanvasCenterPoint,ImageCenterPoint);

    img.onload=function(){
        // Canvasの原点から描けるように、(dx,dy)には、canvas,resize_imageの(0.5x,0.5y)同士を減算した位置を指定
        DisplayCanvas.getContext('2d').drawImage(img,0,CanvasCenterPoint[1]-ImageCenterPoint[1],new_Wid_Hei[0],new_Wid_Hei[1]);
    };
}
