// canvasのサイズに合わせて画像サイズを調整する関数（canvas内に収まる最大サイズに自動調整）
export function ImageResize(img,newWidth,canvasHeight){
    console.log(img.width,img.height);
    let newHeight=Math.round(img.height*(newWidth/img.width),-1) ;

    while(newHeight>canvasHeight){
        newHeight-=10;
    }

    newWidth=Math.round(img.width*(newHeight/img.height),-1) ;
    return [newWidth,newHeight];
}

function ValueCalclation(colorCodeValue){
    //カラーコードからRGB値を算出
    let rv=colorCodeValue[1]+colorCodeValue[2];
    let gv=colorCodeValue[3]+colorCodeValue[4];
    let bv=colorCodeValue[5]+colorCodeValue[6];
    let newrv=parseInt(rv,16);
    let newgv=parseInt(gv,16);
    let newbv=parseInt(bv,16);

    //確認
    console.log(newrv+'と'+newgv+'と'+newbv);

    //RGB値からHSL値を算出
    //1．色相
    let Hue=0;
    let MaxV=Math.max(newrv,newgv,newbv);
    let MinV=Math.min(newrv,newgv,newbv);
    let diff=MaxV-MinV;
    if(newrv==newgv&&newgv==newbv){
        Hue=0;
    }
    else if(MaxV==newrv){
        Hue=60*((newgv-newbv)/diff);
    }
    else if(MaxV==newgv){
        Hue=60*((newbv-newrv)/diff)+120;
    }
    else if(MaxV==newbv){
        Hue=60*((newrv-newgv)/diff)+240;
    }

    if(Hue<0){
        Hue+=360;
    }

    //2.彩度
    let Saturation=(MaxV+MinV)/2;
    if(Saturation<=127&& Saturation>=0){
        Saturation=(MaxV-MinV)/(MaxV+MinV);
    }
    else if(Saturation>=128){
        Saturation=(MaxV-MinV)/(510-MaxV-MinV);
    }

    //3.輝度
    let Lightness=(MaxV+MinV)/2;


    //計算結果値を配列に格納してreturn
    return [colorCodeValue,newrv,newgv,newbv,Math.round(Hue),Math.round(Saturation*100),Math.round(Lightness/255*100)];
}

//ベースカラーの色相とIncreaseValue°ずつずらした配色実現のための関数
function ValueIncreaseRound(number,Value,IncreaseValue){
    let Values=new Array(number);
    Values[0]=Value;
    for(let i=1; i<number; i++){
        Values[i]=Values[i-1]+IncreaseValue;
        if(Values[i]>360){
            Values[i]-=360;
        }
    }

    return Values;
}

//リターン値[colorCodeValue,newrv,newgv,newbv,Math.round(Hue),Math.round(Saturation*100),Math.round(Lightness/255*100)];

//ダイアード・トライアド・テトラード・ペンタード・へクサードは
//この関数の(number,degree)にそれぞれ[2,180],[3,120],[4,90],[5,72],[6,60]を入れていけばよい。
export function numbers_ColorScheme(colorCodeValue,number,degree){
    let Values=ValueCalclation(colorCodeValue);
    let BaseHue=Values[4];
    let Pairs=ValueIncreaseRound(number,BaseHue,degree);

    //それぞれの色相値の配列と、固定の彩度、明度も値を返す。
    return [Pairs,Values[5],Values[6]];
}

//トーンオントーン配色
export function TonT_ColorScheme(colorCodeValue){
    let Values=ValueCalclation(colorCodeValue);
    let hslValues=[Values[4],Values[5],[Values[6],Values[6]]];
    console.log(hslValues);
    hslValues[2][0]+=30;
    hslValues[2][1]-=30;
    if(hslValues[2][0]>100){
        hslValues[2][0]=100;
    }
    if(hslValues[2][1]<0){
        hslValues[2][1]=0;
    }

    //明度値にのみ元の値から50の差をつけたhsl値
    return hslValues;
}

//ダイアード～へクサード配色までは引数を変えてHTML変更！ 引き数：(変更先htmlクエリ,ピッカークエリ,数字,角度）
export function numbersChange(numberdColor,picker,number,degree){
    let colorCodeValue=picker.value;
    let hslValues=numbers_ColorScheme(colorCodeValue,number,degree);
    console.log(hslValues);
    for(let i=0; i<number; i++){
        numberdColor[i].style.backgroundColor='hsl('+hslValues[0][i]+','+hslValues[1]+'%,'+hslValues[2]+'%)';
    }

}

// トーナル配色パートのHTML変更用関数
export function tonalChange(tonalColor,picker){
    let colorCodeValue=picker.value;
    let tonalValues=new Array(tonalColor.length-1);
    tonalColor[0].style.backgroundColor=colorCodeValue;
    // 配色適用部分のHTML変更
    for(let i=0; i<tonalColor.length-1; i++){
        tonalValues[i]=Tonal_ColorScheme(colorCodeValue);
        tonalColor[i+1].style.backgroundColor='hsl('+tonalValues[i][0]+','+tonalValues[i][1]+'%,'+tonalValues[i][2]+'%)';
    }
    console.log(tonalValues);
}

export function FontsPick(FontsName){
    let FontStyle="No Font";
    switch (FontsName) {
        case "あずきフォント":
            FontStyle='Azuki';
            break;
    
        case "からかぜ":
            FontStyle='Karakaze';
            break;
    
        case "たぬき油性マジック":
            FontStyle='Tanuki';
            break;
    
        case "めもわーる":
            FontStyle='Memo';
            break;
    
        case "JKゴシックL":
            FontStyle='jk_L';
            break;
    
        case "PixelMPlus":
            FontStyle='PixelMPlus';
            break;
    
        case "ラノベPOP":
            FontStyle='LightNovel';
            break;
    
        case "うたミンフォント":
            FontStyle='Utamin';
            break;
    
        case "マキナス":
            FontStyle='Makinus';
            break;
    
        case "コウザン行書体":
            FontStyle='Kouzan';
            break;
    
        case "しょかきうたげ":
            FontStyle='Shokaki';
            break;
    
        case "游明朝Light":
            FontStyle='YuMincho';
            break;
    
        case "刻明朝":
            FontStyle='Kokumin';
            break;
    
        case "装甲明朝":
            FontStyle='Soukou';
            break;
    
        case "源界明朝":
            FontStyle='Genkai';
            break;
    }
    return FontStyle;
}

// キャンバスを画像化する関数
export function createImage(context){
    let image= new Image();
    image.src= context.canvas.toDataURL()
    return image;
  }

//   画像化したキャンバスを１つのキャンバスに同時描画する関数
export async function CombineCanvases(context_background,context_background_custom,context,context_text,context_combine) { 
    const canvasImages=new Array(4);
    canvasImages[0]=await createImage(context_background);
    canvasImages[1]=await createImage(context_background_custom);
    canvasImages[2]=await createImage(context);
    canvasImages[3]=await createImage(context_text);
    await context_combine.drawImage(canvasImages[0],0,0);
    await context_combine.drawImage(canvasImages[1],0,0);
    await context_combine.drawImage(canvasImages[2],0,0);
    context_combine.drawImage(canvasImages[3],0,0);
}

export function downloadCanvas(DisplayCanvas_combine,CombineCanvasesButton) {
	let link = CombineCanvasesButton;
	link.href = DisplayCanvas_combine.toDataURL();
	link.download = "SceneImage.png";
}