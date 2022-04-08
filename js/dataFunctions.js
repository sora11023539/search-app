//検索文字列取得
export const getSearchTerm = () => {
  //検索BOXから値を取得
  //trim 空白削除
  const rawSearchTerm = document.getElementById("search").value.trim();

  //2つ以上のスペース = 1つのスペース
  const regex = /[ ]{2,}/gi;
  //replaceAll 第一引数と一致したものを全て第二引数のものに置き換え
  const searchTerm = rawSearchTerm.replaceAll(regex, " ");

  return searchTerm;
};

//検索結果の取得
export const retrieveSearchResults = async(searchTerm) => {
  //wiki検索文字列取得
  const wikiSearchString = getWikiSearchString(searchTerm);

  //検索結果はエンコードしたものと等しくなる
  const wikiSearchResults = await requestData(wikiSearchString);

  let resultArray = [];

  //query データベースに対する命令
  //hasOwnProperty そのプロパティが存在するか確認
  if (wikiSearchResults.hasOwnProperty("query")) {
    resultArray = processWikiResults(wikiSearchResults.query.pages);
  }
  return resultArray;
};

//検索用語と一緒
const getWikiSearchString = (searchTerm) => {
  const maxChars = getMaxChars();
  const rawSearchString = `https://ja.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;

  //encodeUri uriでは使えない文字列を変換する
  const searchString = encodeURI(rawSearchString);
  return searchString;

}

//文字数の制限
const getMaxChars = () => {
  //window.innerWidth コンテンツ表示領域の幅
  //clientWidth padding + width - スクロールバー
  const width = window.innerWidth || document.body.clientWidth;

  //画面幅に応じた文字数の制限
  let maxChars;
  if (width < 414) {
    maxChars = 65;
  };
  if (width >= 414 && width < 1400) {
    maxChars = 100;
  };
  if (width > 1400) {
    maxChars = 130;
  };
  return maxChars;
};

//検索文字列受け入れ
const requestData = async (searchString) => {
  //例外エラーの処理
  //try 例外エラーが発生するかもしれない処理
  try {
    const response = await fetch(searchString);
    //jsonデータ取得
    const data = response.json()
    console.log(data);
    return data;
    //errorが出た時
  } catch (err) {
    //エラー入力し、そのエラーをコンソールに記録
    console.error(err);
  }
}

const processWikiResults = (results) => {
  //resultArrayに空の配列用意
  const resultArray = [];

  Object.keys(results).forEach(key => {
    const id = key;
    //dataのtitleプロパティ取得
    const title = results[key].title;
    //dataのtextプロパティ取得
    const text = results[key].extract;
    //dataのthumbnailプロパティ取得
    const img = results[key].hasOwnProperty("thumbnail")
      //true
      ? results[key].thumbnail.source
        //false
        : null;

      //itemに格納
      const item = {
        id: id,
        title: title,
        text: text,
        img: img,
      }
      //配列の最後に追加する要素を指定
      resultArray.push(item);
  });

  return resultArray;
}
