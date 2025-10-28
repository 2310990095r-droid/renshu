/* ================================================= */
/* meal.js                      */
/* ================================================= */

document.addEventListener('DOMContentLoaded', function() {
    const recommendedMeals = [
        // 既存の豊富なメニューデータ（再掲）
        { name: "鶏むね肉とブロッコリーの和風炒め", calorie: "約450 kcal", recipe: "鶏むね肉とブロッコリーを酒・醤油・生姜で炒める。", points: ["高タンパク質: 鶏むね肉で筋肉の材料をたっぷり補給。", "ビタミンC: ブロッコリーで免疫力とコラーゲン生成をサポート。"] },
        { name: "鮭の味噌マヨホイル焼き＆玄米", calorie: "約550 kcal", recipe: "鮭と野菜を味噌マヨネーズで包みホイルで焼く。玄米と合わせる。", points: ["良質な脂質: 鮭に含まれるDHA・EPA（オメガ3脂肪酸）が回復をサポート。", "複合炭水化物: 玄米でエネルギーを長時間供給し、インスリンを安定化。"] },
        { name: "マグロとアボカドのポキ丼", calorie: "約500 kcal", recipe: "マグロとアボカドを醤油・ごま油で和え、ご飯に乗せる。", points: ["良質なタンパク質: マグロでアミノ酸を効率よく摂取。", "ミネラル・ビタミンE: アボカドで抗酸化作用とホルモンバランスをサポート。"] },
        { name: "牛赤身肉とキノコのオイスターソース炒め", calorie: "約480 kcal", recipe: "牛赤身肉とキノコ類をオイスターソースで手早く炒める。", points: ["鉄分・亜鉛: 牛肉で酸素運搬能力と代謝を向上。", "食物繊維: キノコで腸内環境を整え、栄養吸収を促進。"] },
        { name: "鯖缶と納豆のパワーサラダ", calorie: "約400 kcal", recipe: "鯖缶、納豆、野菜を混ぜ、ポン酢やオリーブオイルで味付け。", points: ["オメガ3脂肪酸: 鯖缶で炎症を抑え、回復を促進。", "プロバイオティクス: 納豆で腸内環境を改善し、栄養の吸収率を高める。"] },
        { name: "豚ヒレ肉のソテーとレンズ豆のポタージュ", calorie: "約520 kcal", recipe: "豚ヒレ肉をシンプルに焼き、レンズ豆を煮込んだポタージュと。 ", points: ["ビタミンB1: 豚ヒレ肉で疲労回復と糖質の代謝をサポート。", "複合炭水化物: レンズ豆で持続的なエネルギーと食物繊維を摂取。"] },
        { name: "エビとアスパラガスのガーリック炒め", calorie: "約380 kcal", recipe: "エビとアスパラガスをニンニク、オリーブオイル、塩胡椒で炒める。", points: ["低脂質・高タンパク質: エビは良質なアミノ酸が豊富で低カロリー。", "葉酸・カリウム: アスパラガスでミネラルバランスを調整。"] },
        { name: "鶏レバーの甘辛煮とほうれん草の和え物", calorie: "約430 kcal", recipe: "鶏レバーを醤油・砂糖・生姜で煮る。ほうれん草はごま和えに。", points: ["鉄分・ビタミンA: 鶏レバーで貧血予防と粘膜の健康を維持。", "ビタミンK・カルシウム: 骨の健康をサポート。"] },
        { name: "豆腐とわかめの味噌汁＋鶏むね肉の棒棒鶏", calorie: "約470 kcal", recipe: "鶏むね肉を茹で、ネギ・醤油・酢・ごま油のタレでいただく。", points: ["大豆タンパク質: 豆腐で消化吸収のよいタンパク質を摂取。", "セサミン: ごまに含まれる成分が肝機能をサポート。"] },
        { name: "茹で卵と全粒粉パンのオープンサンド", calorie: "約350 kcal", recipe: "全粒粉パンにアボカドや茹で卵を乗せ、軽く塩胡椒。", points: ["完全栄養食: 卵は必須アミノ酸のバランスが完璧。", "低GI・複合炭水化物: 全粒粉パンで血糖値の急上昇を抑える。"] }
    ];

    function displayRandomMeal() {
        const mealContainer = document.querySelector('#recommended-meal .meal-detail'); 
        if (!mealContainer) return; 

        const randomIndex = Math.floor(Math.random() * recommendedMeals.length);
        const meal = recommendedMeals[randomIndex];
        
        let html = `
            <p><strong>メニュー名:</strong> ${meal.name}</p>
            <h3>栄養ポイント</h3>
            <ul>
                ${meal.points.map(point => `<li>${point}</li>`).join('')}
            </ul>
            <div class="detail-info">
                <p><strong>🔥 推定カロリー:</strong> ${meal.calorie}</p>
                <p><strong>📝 調理方法:</strong> ${meal.recipe}</p>
            </div>
        `;
        mealContainer.innerHTML = html;
    }
    
    displayRandomMeal();
});
