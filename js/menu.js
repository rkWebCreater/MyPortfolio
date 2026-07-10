document.addEventListener("DOMContentLoaded", function() {
    
    // ==========================================
    // 1. ドロワーメニューのHTML構造を挿入
    // ==========================================
    const drawerHtml = `
        <!-- ハンバーガーボタン -->
        <button class="menu-trigger" id="menu-trigger" aria-label="メニューを開く" aria-expanded="false">
          <span></span>
          <span></span>
        </button>

        <!-- ドロワーメニュー本体 -->
        <div class="drawer-menu" id="drawer-menu">
          <nav class="drawer-nav">
            <ul>
              <li><a href="index.html">トップページ</a></li>
              <li><a href="index.html?target=about-con">経歴</a></li>
              <li><a href="index.html?target=proTtl">作品紹介</a></li>
            </ul>
          </nav>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', drawerHtml);


    // ==========================================
    // 2. 指定の要素へスムーズにスクロールする関数（共通処理）
    // ==========================================
    const scrollToTarget = (targetId) => {
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // 固定ヘッダー（ナビゲーションバー）がある場合は、その高さ分（例: 80px）を引き算する
            const headerHeight = 0; // ヘッダーがある場合は数値を変更してください（例: 80）
            const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth" // なめらかにスクロール
            });
        }
    };


    // ==========================================
    // 3. ページ読み込み時にパラメータがあればスクロール
    // ==========================================
    const urlParams = new URLSearchParams(window.location.search);
    const initialTarget = urlParams.get('target');
    
    // 画像などの読み込み完了を少し待ってからスクロールさせると位置がズレません
    window.addEventListener("load", () => {
        if (initialTarget) {
            scrollToTarget(initialTarget);
        }
    });


    // ==========================================
    // 4. ドロワーメニューの開閉 ＆ クリックイベント
    // ==========================================
    const menuTrigger = document.getElementById("menu-trigger");
    const drawerMenu = document.getElementById("drawer-menu");

    if (menuTrigger && drawerMenu) {
        
        // メニューを開閉する関数
        const toggleMenu = () => {
            const isOpen = drawerMenu.classList.toggle("is-open");
            menuTrigger.classList.toggle("is-active", isOpen);
            menuTrigger.setAttribute("aria-expanded", isOpen);
            menuTrigger.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
        };

        // ボタンクリックで開閉
        menuTrigger.addEventListener("click", toggleMenu);

        // メニュー内のリンクをクリックしたときの処理
        const drawerLinks = drawerMenu.querySelectorAll("a");
        drawerLinks.forEach(link => {
            link.addEventListener("click", (event) => {
                
                // クリックされたURLのパラメータ（?target=xxxx）を解析
                const url = new URL(link.href);
                const targetId = url.searchParams.get("target");

                // もし「同じページ（index.html）」の中のターゲットへのリンクだった場合
                if (targetId && (window.location.pathname === url.pathname || window.location.pathname.endsWith(url.pathname))) {
                    
                    // 1. 通常のページ遷移（再読み込み）をキャンセルする
                    event.preventDefault();
                    
                    // 2. メニューを閉じる
                    toggleMenu();
                    
                    // 3. JavaScriptで直接その場からスクロールさせる
                    scrollToTarget(targetId);

                    // 4. ブラウザのURL欄の「?target=xxxx」もクリックに合わせて書き換える（任意）
                    history.pushState(null, '', link.href);
                } else {
                    // 違うページに飛ぶリンク（通常のindex.htmlに戻るなど）ならメニューだけ閉じて遷移させる
                    toggleMenu();
                }
            });
        });
    }
});
