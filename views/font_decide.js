const sample=document.querySelector("#sample");
const id_text=document.querySelector("#id_text");
const submit_font=document.querySelector('#submit_font');
const CoolorCute=document.forms.CoolorCute;
const DigtalorHandson=document.forms.DigtalorHandson;
const ThickorThin=document.forms.ThickorThin;
const UniqueValue=document.forms.UniqueValue;
const font_value=document.querySelector("#font_value");

console.log(CoolorCute,DigtalorHandson,ThickorThin,UniqueValue);


let font_value_array=CoolorCute.CoolorCute.value+DigtalorHandson.DigtalorHandson.value+ThickorThin.ThickorThin.value+UniqueValue.UniqueValue.value;
console.log(font_value_array);

id_text.style.display="none";
font_value.style.display="none";

async function change_font(){
    let font_value_array=CoolorCute.CoolorCute.value+DigtalorHandson.DigtalorHandson.value+ThickorThin.ThickorThin.value+UniqueValue.UniqueValue.value;
    let font_value_array_Num=Number(font_value_array);

    // font_value_arrayの値を使ってフォントをリアルタイムに書き換える関数
   switch(font_value_array_Num){
       case 0:
           sample.style.fontFamily="Azuki";
           break;

        case 1:
           sample.style.fontFamily="Karakaze";
           break;


        case 10:
           sample.style.fontFamily="Tanuki";
           break;

        case 11:
           sample.style.fontFamily="Memo";
           break;

        case 100:
           sample.style.fontFamily="jk_L";
           break;

        case 101:
           sample.style.fontFamily="PixelMPlus";
           break;

        case 110:
           sample.style.fontFamily="LightNovel";
           break;

        case 111:
           sample.style.fontFamily="Utamin";
           break;

        case 1000:
           sample.style.fontFamily="Makinus";
           break;

        case 1001:
           sample.style.fontFamily="Kouzan";
           break;

        case 1010:
           alert("このパターンは未実装です。");
           break;

        case 1011:
           sample.style.fontFamily="Shokaki";
           break;

        case 1100:
           sample.style.fontFamily="Yumincho";
           break;

        case 1101:
           sample.style.fontFamily="Kokumin";
           break;
        // case 1101:
        //    sample.style.fontFamily="Iroha";
        //    break;

        case 1110:
           sample.style.fontFamily="Soukou";
           break;

        case 1111:
           sample.style.fontFamily="Genkai";
           break;
   }
   if(font_value_array_Num==1010){
      submit_font.disabled=true;
   }
   else{
      submit_font.disabled=false;
   }
   font_value.value=`${font_value_array}`;
   console.log(font_value_array,font_value_array_Num);
}