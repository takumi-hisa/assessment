'use strict';
const userNameInput = document.getElementById('user-name');
//入力欄
const assessmentButton = document.getElementById('assessment');
//診断するボタン
const resultDivided = document.getElementById('result-area');
//診断結果を表示する
const tweetDivided = document.getElementById('tweet-area');
//ツイートボタンを作成するエリア

//break;//{}の処理を終了する
//return;//関数の処理を終了する

userNameInput.onkeydown = event => {
    if(event.key === 'Enter'){//Enterキーが押されたら
       assessmentButton.onclick();
       //診断クリックボタンがクリックされた時の処理を呼び出す
    }
};

assessmentButton.onclick = () => {
    const userName = userNameInput.value;
    if (userName.length === 0) {
        //名前の入力がなければそこで関数の処理を終了する
        return ;
    }
    // console.log(userName);
    //診断結果を作成してHTMLに表示する
    resultDivided.innerText = '';
    // tweetDivided.innerText = '';
    const header = document.createElement('h3');//見出し用
    header.innerText = '診断結果';//<h3>診断結果</h3>
    resultDivided.appendChild(header);
    //<div id="result-area"><h3>診断結果</h3><div>

    const paragraph = document.createElement('p');//pタグ
    const result = assessment(userName);//診断結果を用意しておく
    paragraph.innerText = result;
    //<p>◯◯さんのいいところは✖️✖️です</p>
    resultDivided.appendChild(paragraph);
    // //<div id="result-area">
    // //<h3>診断結果</h3>
    // //<p>◯◯さんのいいところは✖️✖️です</p>
    // //<div>

    //tweetボタンを作成するよー
    tweetDivided.innerText = '';//診断ボタン押すたびにツイートボタンが増えないように都度消す
    const anchor = document.createElement('a')//<a></a>
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=' +
    encodeURIComponent ('あなたのいいところ')  +
    '&ref_src=twsrc%5Etfw';

    anchor.setAttribute('href',hrefValue);
    //<a href = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw'></a>
    anchor.setAttribute('class','twitter-hashtag-button');
    //<a href = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw' class = 'twitter-hashtag-button'></a>
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';

    tweetDivided.appendChild(anchor);

   

    const script = document.createElement('script');
    script.setAttribute('src','https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);

};

const answers = [
'{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
'{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができま,す。',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */

function assessment(userName){
    //診断結果を実装する
    //入力が同じ名前なら同じ診断結果を出力する
    let sumOfCharCode = 0;
    for (let i = 0; i < userName.length; i++) {
        sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
    }
    //0から15の範囲までに収める
    const index = sumOfCharCode % answers.length;
    let result = answers[index];//診断結果を取り出してくる
    result = result.replaceAll('{userName}',userName);//置き換える

    return result;
}
console.log(assessment('太郎'));
console.log(assessment('次郎'));
console.log(assessment('太郎'));

console.assert(
    assessment('太郎') ===
      '太郎のいいところは決断力です。次郎がする決断にいつも助けられる人がいます。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
  );
  
  

