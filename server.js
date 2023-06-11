// 使用ツールの定義
const express=require('express');
const app=express();
const fileUpload = require('express-fileupload');
const mysql=require('mysql');
const { dirname } = require('path');
const req = require('express/lib/request');
const { log } = require('console');

app.use(fileUpload());
// 使用フォルダの読み込み
app.use(express.static("upload"));
app.use(express.static("public"));
app.use(express.static("views"));

// ローカルポート番号
const PORT=3000;

// connection Pool
const Pool=mysql.createPool({
    connectionLimit:10,
    host:"localhost",
    user:"root",
    password:"ichimizuleo25811827",
    // password:"M0i8z2u7E0n4a30",
    database:"image_upload_data"
});

// ページ読み込み・更新時処理
app.get('/', (req, res) => {

    // データベース接続
    Pool.getConnection((err,connection)=>{
        if(err){
            throw err;
        }

        console.log("databaseと接続中");

        connection.query("SELECT *FROM imagedata",(err,results)=>{
            connection.release();
            console.log(results.length);
            console.log(results);
            if(!err){
                res.render('index.ejs',{imageTable:results});
            }
        });
    });
});

// postメソッド発動時の処理
app.post("/",(req,res)=>{
    if(!req.files){
        return res.status(400).send("no image uploaded.")
    }


    // 送られたファイルの情報を格納する変数
    let imageFile=req.files.imageFile;
    console.log(imageFile);

    // アップロードファイルのパス名指定
    let uploadFilePath=__dirname+"/public/upload/"+imageFile.name;

    // サーバに画像ファイルを置く場所の指定
    imageFile.mv(uploadFilePath,function(err){
        if(err){
            return res.status(500).send(err);
        }

        // res.send("画像をアップロードすることに成功");
    });

    // MYSQLに画像のパスを保存
    Pool.getConnection((err,connection)=>{
        if(err){
            throw err;
        }

        console.log("databaseと接続中");

        connection.query(`INSERT INTO imagedata(imageName) VALUES("${imageFile.name}")`,(err,results)=>{
            connection.release();

            if(!err){
                res.redirect("/");
            }
            else{
                console.log(err);
            }
        });
    });
});

app.get("/image_analyze",(req,res)=>{
    if(!req){
        return res.status(400).send("no information");
    }
    res.render("image_analyze.ejs");
});
// カラー設定ページへの遷移時パス　POST処理
app.post("/image_analyze",(req,res)=>{
    // postで送ったデータ（name=imagedata_id）の値取得
    console.log(req.body.imagedata_id);
    let imagedata_id=req.body.imagedata_id;
    if(!req){
        return res.status(400).send("no information");
    }

    Pool.getConnection((err,connection)=>{
        if(err){
            throw err;
        }

        console.log("databaseと接続中");
        connection.query(`select *from imagedata WHERE id=${imagedata_id}`,(err,results)=>{
            console.log(results);
            connection.release();

            if(!err){
                res.render('image_analyze.ejs',{imageName:results});
            }
            else{
                console.log(err);
            }
        });
    });
});
// 色情報決定時の処理
app.post("/ColorDecided",(req,res)=>{
    console.log(req.body.MainColorCode,req.body.AccentColorCode,req.body.imagedata_id);

    // データベースにカラーコードの情報をインサートして再表示
    Pool.getConnection((err,connection)=>{
        if(err){
            throw err;
        }

        let imagedata_id=req.body.imagedata_id;
        let MainColorCode=req.body.MainColorCode;
        let AccentColorCode=req.body.AccentColorCode;

        console.log("databaseと接続中");
        // 選んだ色のカラーコードの値をデータベースカラムに追加
        connection.query(`UPDATE imagedata SET MainColor="${MainColorCode}",AccentColor="${AccentColorCode}" WHERE id=${imagedata_id}`,(err,results)=>{
            console.log(results);

            if(!err){
                res.redirect("/");         
            }
            else{
                throw err;
            }
        });
    });
    
});

// フォント選定ページ遷移時の処理
app.post("/font",(req,res)=>{
    console.log(req.body.imagedata_id);
    let imagedata_id=req.body.imagedata_id;
    console.log(imagedata_id);
     // データベース接続
     Pool.getConnection((err,connection)=>{
        if(err){
            throw err;
        }

        console.log("databaseと接続中");

        connection.query(`SELECT *FROM imagedata WHERE id=${imagedata_id}`,(err,results)=>{
            connection.release();
            console.log(results);
            if(!err){
                res.render('font_decide.ejs',{imageTable:results});
            }

            else{
                console.log(err);
            }
        });
    });
    
});

// フォント決定時の処理
app.post("/font_choosed",(req,res)=>{
    console.log(req.body.font_value,req.body.imagedata_id);

    let font_value=req.body.font_value;
    let imagedata_id=req.body.imagedata_id;

    // データベース接続
    Pool.getConnection((err,connection)=>{
        if(err){
            throw err;
        }

        console.log("databaseと接続中");

        connection.query(`SELECT FontName from fonts WHERE TFArray="${font_value}"`,(err,FontName)=>{
            if(err){
                throw err;
            }
            console.log(FontName[0].FontName);
            connection.query(`UPDATE imagedata SET Font="${FontName[0].FontName}" WHERE id=${imagedata_id}`,(err,results)=>{
                console.log(results);
                if(!err){
                    connection.query("SELECT *from imagedata",(err,rows)=>{
                        connection.release();
                        if(!err){
                            res.render('index.ejs',{imageTable:rows});
                        }
    
                        else{
                            throw err;
                        }
                    });
                }
    
                else{
                    connection.release();
                    throw err;
                }
            });
        });
        
    });

});
// シーン生成ページ遷移時の処理
app.post("/image_design",(req,res)=>{
    let imagedata_id=req.body.imagedata_id;
    console.log(imagedata_id);
     // データベース接続
     Pool.getConnection((err,connection)=>{
        if(err){
            throw err;
        }

        console.log("databaseと接続中");

        connection.query(`SELECT x.id,x.imageName,x.MainColor,x.AccentColor,x.Font,y.SongText FROM imagedata AS x JOIN songtext AS y ON x.id=y.imagedata_id WHERE x.id=${imagedata_id}`,(err,results)=>{
            console.log(results);

            if(results.length==0){
                connection.query(`SELECT *FROM imagedata WHERE id=${imagedata_id}`,(err,results)=>{
                    connection.release();
                    console.log(results);
                    if(!err){
                        res.render('image_design.ejs',{imageTable:results});
                    }

                    else{
                        console.log(err);
                    }
                });
            }

            else if(!err){
                connection.release();
                res.render('image_design.ejs',{imageTable:results});
            }
    
            else{
                console.log(err);
            }
            
        });
    });
});

// テキスト登録時の処理
app.post("/SongText_insert",(req,res)=>{
    let imagedata_id=req.body.imagedata_id;
    let SongText=req.body.SongText;
    console.log(imagedata_id,SongText);

    Pool.getConnection((err,connection)=>{
        if(err){
            throw err;
        }

        console.log("databaseと接続中");

        connection.query(`INSERT into songtext(imagedata_id,SongText) VALUES(${imagedata_id},"${SongText}")`,(err,results)=>{
            console.log(results);
            if(!err){
                connection.query(`SELECT x.id,x.imageName,x.MainColor,x.AccentColor,x.Font,y.SongText FROM imagedata AS x JOIN songtext AS y ON x.id=y.imagedata_id WHERE x.id=${imagedata_id}`,(err,results)=>{
                    connection.release();
                    console.log(results);

                    if(!err){
                        res.render('image_design.ejs',{imageTable:results});
                    }
            
                    else{
                        console.log(err);
                    }
                });
            }
    
            else{
                console.log(err);
            }
        });
    });

});
// シーン生成ページからベースページへ遷移時の処理
app.post("/backtotop",(req,res)=>{
    res.redirect("/");
});

// サーバー起動確認
app.listen(PORT,function(){
    console.log("サーバー起動now");
});