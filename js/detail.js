window.addEventListener("DOMContentLoaded", function(){

    // URLの後ろについているパラメータ(?id=xxxx)を取得
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // もしURLにIDが含まれていなければ、エラー文字を出して処理をストップする
    if(!productId){
        document.getElementById('detail-title').textContent = "作品が見つかりません。";
        return;
    }

    // 一覧ページと同じproduct.jsonからデータを読み込む
    fetch('product.json')
       .then(response => response.json())
       .then(productsData =>{

        // 読み込んだデータ（配列）の中からURLのIDと一致する作品を一件探す
        const currentProduct = productsData.find(product => product.id === productId);

        // それ以外のデータを探す(今表示されている作品以外を下部に他の作品欄として表示するため)
        const otherProducts = productsData.filter(product => product.id !== productId);

        // 一致する作品が見つかったらhtmlの各要素にデータを流し込む
        if(currentProduct){

            // htmlに書いてある親要素のidタグの値にタイトルを上書き
            document.getElementById('detail-title').textContent = currentProduct.title;

            // 画像を設定（srcとalt属性を上書き）
            const imgElement = document.getElementById('detail-img');
            imgElement.src = currentProduct.imgUrl;
            imgElement.alt = currentProduct.title;

            // 追加した詳細データをテキストとして流し込む
            document.getElementById('detail-description').textContent = currentProduct.description;

            const mainImg = document.getElementById('mainImg');
            mainImg.src = currentProduct.mainImg;
            mainImg.alt = currentProduct.title;

            // その他の作品を一覧表示
            const otherList = document.getElementById("other-product-list");

            if(otherList){
                // 【超重要①】ここでは、PC・スマホ関係なく「常に1セット（1倍）だけ」HTMLを挿入します
                // これにより、スマホで3回表示されるバグの根本原因を完全に排除します
                const listHtml = otherProducts.map( product => `
                    <li class="slider-item">
                     <a href="detail.html?id=${product.id}" >
                      <img src="${product.imgUrl}" alt="${product.title}">
                      <p>${product.title}</p>
                     </a>
                    </li>
                `).join('');

                otherList.innerHTML = listHtml;

                // 挿入した1セット分のHTMLを「PC用の増殖の種」として変数に保存しておく
                const originalHtml = otherList.innerHTML;

                // すべての画像の読み込み完了を待つ
                const imgs = document.querySelectorAll('.slider-item img');
                let loadedCount = 0;
                const totalImgs = imgs.length;

                // 【最も確実な無限ループ処理】
                function startGsapSlider() {
   
                    const mm = gsap.matchMedia();

    
   
                    // 画面幅769px以上の時（PC）だけアニメーションを実行
   
                    mm.add("(min-width: 769px)", () => {
        
       
                        // 【超重要②】PCサイズになった「その瞬間」に、JSでHTMLの中身を自動で3倍に増殖させます
       
                        otherList.innerHTML = originalHtml + originalHtml + originalHtml;

       
                        let tween; // ここで作成した変数「tween」をそのまま下で使います
        
      
                        // イベントリスナーの関数を定義（クリーンアップで削除できるようにするため）
      
                        const handleMouseEnter = () => { if (tween) tween.pause(); };
                        const handleMouseLeave = () => { if (tween) tween.play(); };

        // ブラウザが画像を完全に描ききるまで2フレーム待ってから高さを計測（カクつき防止）
      
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                
                // 全体の3分の1の高さ（＝元の1セット分の正確なピクセル長さ）を計測
                const oneSetHeight = otherList.getBoundingClientRect().height / 3;

                // 初期位置リセット
                gsap.set(otherList, { y: 0 });

                // 【修正①】「const tween = 」を削除し、上で作った「tween」にアニメーションを代入します
                tween = gsap.to(otherList, {
                    y: +oneSetHeight, // 「+=」ではなく、目標の位置（マイナス1セット分）まで直接等速で引き上げる
                    ease: "none",     
                    duration: 10,           // スピード（秒数）。好みに合わせて調整
                    repeat: -1,             // 無限ループ
                    modifiers: {
                        y: gsap.utils.unitize(y => {
                            return gsap.utils.wrap( -oneSetHeight, 0, parseFloat(y)) -oneSetHeight;
                        })
                    }
                });

                // 【修正②】抜けていたマウスホバーのイベントを、ここで実際に登録します
                otherList.addEventListener('mouseenter', handleMouseEnter);
                otherList.addEventListener('mouseleave', handleMouseLeave);

                // 【超重要③】画面サイズがスマホ（768px以下）に変わった瞬間、
                // 増殖させたHTMLを消し去り、元の1セット（1倍）に強制リセットします！
                return () => {
                    if (tween) tween.kill();
                    
                    // 【修正③】スマホサイズになったらホバーのイベントも一緒に削除します
                    otherList.removeEventListener('mouseenter', handleMouseEnter);
                    otherList.removeEventListener('mouseleave', handleMouseLeave);
                    
                    gsap.set(otherList, { clearProps: "all" });
                    otherList.innerHTML = originalHtml; // 1倍に戻す
                };
            });
        });
    });

     // 2. スマホサイズ（画面幅768px以下）の時の処理を明示的に追加
    mm.add("(max-width: 768px)", () => {
        // スマホサイズになった瞬間に、中身を強制的に「元の1倍」に戻して完全停止させる
        gsap.killTweensOf(otherList); // otherListにかかっているアニメーションをすべて強制終了
        gsap.set(otherList, { clearProps: "all" }); // 移動値を完全リセット
        otherList.innerHTML = originalHtml; // HTMLを1倍に戻す
    });
}


                const checkImages = () => {
                    loadedCount++;
                    if (loadedCount === totalImgs || totalImgs === 0){
                        startGsapSlider();
                    }
                };

                if (totalImgs === 0) {
                    startGsapSlider();
                } else {
                    imgs.forEach(img => {
                        if(img.complete) checkImages();
                        else {
                            img.addEventListener('load' , checkImages);
                            img.addEventListener('error', checkImages);
                        }
                    });
                }
            }
        } else {
            // IDが間違っていてデータが見つからない場合
            document.getElementById('detail-title').textContent = "指定された作品は見つかりませんでした。";
        }

       }) // fetchの終わり
       .catch(error => {
        console.error('データの取得に失敗しました:', error);
        document.getElementById('detail-title').textContent = "データの読み込み中にエラーが発生しました。";
       });

});


