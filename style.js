

//gsapスクロールアニメーション-----------------------------
window.addEventListener("pageshow", function(){

  //プラグインを定義
  gsap.registerPlugin(ScrollTrigger);
  
  const area  = document.querySelector(".mainVisual_section");
  const items = document.querySelectorAll(".js_img");
  const num   = items.length; //.js_imgの数を取得

  //各画像の位置とscaleを指定
  items.forEach((item, i) => {
    gsap.set(item, {
      zIndex : num - i,
    });
  });
  
  gsap.set(".img1", {
    scale: 0, width: "50%", height: "50%", left: 0, top: 0,
  });
  gsap.set(".img2", {
    scale: 0, width: "50%", height: "50%", left: "10%", top: 0,
  });
  gsap.set(".img3", {
    scale: 0, width: "25%", height: "25%", left: "30%", top: 0,
  });
  gsap.set(".img4", {
    scale: 0, width: "50%", height: "50%", left: "40%", top: 0,
  });
  gsap.set(".img5", {
    scale: 0, width: "50%", height: "50%", left: "55%", top: 0,
  });
  gsap.set(".img6", {
    scale: 0, width: "50%", height: "50%", left: "70%", top: 0,
  });

  //matchMedia()を使用してPCとスマホで動作を分岐させる
  const mm = gsap.matchMedia();

  //addメソッドで各画面の大きさを指定する
  //PC表示
  mm.add( "(min-width : 769px)",() => {

  //matchMediaの中でタイムラインを指定
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: area, //トリガー
      start: "top top", //開始位置
      end: "+=4000", //終了位置
      scrub: 2, //ピン留め
      pin: true, //スクロール量に応じて動かす
      invalidateOnRefresh : true,
      anticipatePin : 1 //pin留めのタイミングをブラウザのスクロールよりわずかに先に行う
    }
  });

  //要素を順に拡大する(全てを拡大してから順に消えていく)
  tl.to(".img1", { scale: 0.4, left: "-10%", top: "-10%", duration: 0.7 })        //"-=0.8"は前の要素の始まる0.8秒前に実行するという意味
    .to(".img2", { scale: 0.3, left: "0%", top: "40%", duration: 0.5 }, "-=0.5")
    .to(".img3", { scale: 0.1, left: "30%" , top : "40%" , duration: 0.6 }, "-=0.3")
    .to(".img4", { scale: 0.4, left: "20%" , top: "-5%", duration: 0.7 },"-=0.4")
    .to(".img5", { scale: 0.3, left: "50%", top: "40%", duration: 0.8 }, "-=0.5")
    .to(".img6", { scale: 0.5, left: "50%" , top : "-20%" , duration: 1 }, "-=0.6")
    .to(".img1", { opacity: 0, filter:"blur(30px)", duration: 1 }, "-=0.5")
    .to(".img2", { opacity: 0, filter: "grayscale(300%)", duration: 1 }, "-=0.5")
    .to(".img3", { opacity: 0, filter: "sepia(300%)", duration: 1 }, "-=0.5")
    .to(".img4", { opacity: 0,  ease: "power3.inOut" , duration: 1 }, "-=0.5")
    .to(".img5", { opacity: 0, duration: 1}, "-=0.5") 
    .to(".img6", { opacity: 0, filter: "grayscale(300%)", duration: 1}, "-=0.5") 
  });

    /* 要素を順に拡大する(1つづつ大きくしてから消えるようにする)
  tl.to(".img1", { scale: 0.2, left: "-25%", top: "-10%", duration: 0.5 },"-=0.5")
    .to(".img1", { opacity: 0, duration: 1 }, "-=0.5")
    .to(".img2", { scale: 0.5, left: "2%", top: "5%", duration: 0.5 }, "-=0.5")
    .to(".img2", { opacity: 0, duration: 1 }, "-=0.3")
    .to(".img3", { scale: 0.5, left: "30%" , top : "0%" , duration: 0.3 }, "-=0.5")
    .to(".img3", { opacity: 0, duration: 1 }, "-=0.3") 
    .to(".img4", { scale: 0.6, left: "-10%", top: "-5%", duration: 0.5 },"-=0.5")
    .to(".img4", { opacity: 0, duration: 2 }, "-=0.2")
    .to(".img5", { scale: 0.1, left: "6%", top: "-30%", duration: 0.5 }, "-=0.5")
    .to(".img5", { opacity: 0, duration: 2}, "-=0.2")
    .to(".img6", { scale: 0.5, left: "40%" , top : "-5%" , duration: 1 }, "-=0.5")
    .to(".img6", { opacity: 0, duration: 3}, "-=0.2") 
    */
    
//スマホ
  mm.add( "(max-width : 768px)",() => {

  //matchMediaの中でタイムラインを指定
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: area, //トリガー
      start: "top top", //開始位置
      end: "+=1000", //終了位置
      scrub: 5, //ピン留め
      pin: true, //スクロール量に応じて動かす
    }
  });
  
  //要素を順に拡大する(全てを拡大してから順に消えていく)
  tl.to(".img1", { scale: 0.2, left: "-25%", top: "-20%", duration: 0.4 },"-=0.9")
    .to(".img2", { scale: 0.2, left: "30%", top: "-10%", duration: 0.5 }, "-=0.8")
    .to(".img3", { scale: 0.1, left: "-5%" , top : "30%" , duration: 0.6 }, "-=0.7")
    .to(".img4", { scale: 0.2, left: "-25%", top: "50%", duration: 0.7 },"-=0.6")
    .to(".img5", { scale: 0.1, left: "40%", top: "20%", duration: 0.8 }, "-=0.5")
    .to(".img6", { scale: 0.2, left: "30%" , top : "50%" , duration: 1 }, "-=1.0")
    .to(".img1", { opacity: 0, filter:"grayscale(100%)" , duration: 1 }, "-=0.5")
    .to(".img2", { opacity: 0, duration: 1 }, "-=0.3")
    .to(".img3", { opacity: 0, duration: 1 }, "-=0.7")
    .to(".img4", { opacity: 0, duration: 2 }, "-=0.2")
    .to(".img5", { opacity: 0, duration: 2}, "-=0.5") 
    .to(".img6", { opacity: 0, filter: "blur(30px)" , duration: 3}, "-=0.8") 

  });
});

//ここまでgsap　ーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

//作品紹介の作品欄

window.addEventListener("pageshow", function(event){

//---------   gsap アニメーション　再描画（初期化）    --------------------

/* `performance.navigation.type` を使用して、戻るボタン操作を100%確実に検知 
   window.performance ブラウザに「ページの読み込みに関するデータをください」と確認している。古いブラウザでエラーが出ないための安全装置
   navigation.type === 2：ブラウザの規則で、数字の 2 は「戻るボタンまたは進むボタンが押されたこと」 を意味する
*/
  const isBack = event.persisted || (window.performance && window.performance.navigation.type === 2);

  // 「戻る」ボタンで来た場合は、強制リロードしてGSAPと一覧を再描画
  if (isBack) {
    window.location.reload();
    return;
  }

  //htmlの親要素を取得
  const proCon = document.getElementById('product-con');
  //戻ってきたときに古いデータと重複しないよう、一度中身を完全に空っぽにする
  if (proCon) {
    proCon.innerHTML = "";
  }
//----------------  ここまでgsap初期化

  //product.jsonからデータを読み込む
fetch('product.json')
  .then(response => response.json())
  .then(productsData => {
 
//データの数だけ繰り返し処理 .forEach( => {});
  productsData.forEach(product => {

//divを作成 .createElement('');
  const contentDiv = document.createElement('div');
  contentDiv.classList.add('content'); //必要に応じてクラスを作成
  const imgTtlDiv = document.createElement('div');
  imgTtlDiv.classList.add('img_ttl'); //必要に応じてクラスを作成

//link要素を作成
  const link = document.createElement('a');
  link.setAttribute('href',`detail.html?id=${product.id}`);//　`detail.html?id=${product.id}`必ずバッククォーテーションで囲む必要がある

//img要素を作成
  const imgElement = document.createElement('img');
  imgElement.src = product.imgUrl;
  imgElement.alt = product.text;

//p要素を作成
  const pElement = document.createElement('p');
  pElement.textContent = product.title;

//linkの中にimg と pを入れる .appendChild()
  link.appendChild(imgElement); 
  link.appendChild(pElement);

//imgTtlDivにlinkを入れる
  imgTtlDiv.appendChild(link);

//imgとpを入れたdivを親のdivに入れる
  contentDiv.appendChild(imgTtlDiv);

//親要素にすべて入ったdivを追加
  proCon.appendChild(contentDiv);

  });

})
.catch(error => console.error('データの取得に失敗しました:', error));

});

  
// 【重要】ブラウザ標準の「勝手に前のスクロール位置に戻す機能」を完全にOFFにする
// これにより、詳細ページから戻ってきた時に画面が変な場所へワープするのを100%防ぎます
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener("load", function() {
    
    // 1. URLから「?target=xxxx」のパラメータを取得
    const urlParams = new URLSearchParams(window.location.search);
    const targetId = urlParams.get('target');

    // 2. もしターゲット（aboutやcontactなど）が指定されていた場合
    if (targetId) {
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // 【対策①】スクロール開始前に一度、強制的に画面の最上部（0,0）に固定します
            window.scrollTo(0, 0);

            // 【対策②】GSAPの全ScrollTriggerの位置計算を最新の状態にアップデート（強制リフレッシュ）
            ScrollTrigger.refresh();

            // 3. ブラウザの描画とGSAPの計算が完全に噛み合うまで、一瞬だけ（150ミリ秒）待ってから優しく動かす
            setTimeout(() => {
                gsap.to(window, {
                    duration: 2.5,              // 少しゆったり（2.5秒）させることで、ズレやガタつきを吸収
                    scrollTo: {
                        y: targetElement,       // 目標の要素の位置（#about や #contact）
                        offsetY: 60             // 画面上の余白（ヘッダーがある場合はその高さ分空ける）
                    },
                    ease: "power2.out"          // 非常に滑らかな減速アニメーション
                });
            }, 150);
        }
    }
});
