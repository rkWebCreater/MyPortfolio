window.addEventListener("DOMContentLoaded", function(){

    //URLの後ろについているパラメータ(?id=xxxx)を取得
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    //もしURLにIDが含まれていなければ、エラー文字を出して処理をストップする
    if(!productId){
        document.getElementById('detail-title').textContent = "作品が見つかりません。";
        return;
    }

    //一覧ページと同じproduct.jsonからデータを読み込む
    fetch('product.json')
       .then(response => response.json())
       .then(productsData =>{

        //読み込んだデータ（配列）の中からURLのIDと一致する作品を一件探す
        const currentProduct = productsData.find(product => product.id === productId);

        //一致する作品が見つかったらhtmlの各要素にデータを流し込む
        if(currentProduct){

            //タイトルを上書き
            document.getElementById('detail-title').textContent = currentProduct.title;

            //画像を設定（srcとalt属性を上書き）
            const imgElement = document.getElementById('detail-img');
            imgElement.src = currentProduct.imgUrl;
            imgElement.alt = currentProduct.title;

            //追加した詳細データをテキストとして流し込む（textContentを使う　innerHTMLは使わない jsonのデータ項目から）
            document.getElementById('detail-description').textContent = currentProduct.description;
            document.getElementById('detail-period').textContent = currentProduct.period;
            document.getElementById('detail-skills').textContent = currentProduct.skills;

        } else{
            //IDが間違っていてデータが見つからない場合
            document.getElementById('detail-title').textContent = "指定された作品は見つかりませんでした。";
        }

       })
       
       .catch(error => {
        console.error('データの取得に失敗しました:', error);
        document.getElementById('detail-title').textContent = "データの読み込み中にエラーが発生しました。";
       });



})