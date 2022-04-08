import { clearSearchText, setSearchFocus,showClearTextButton,clearPushListener } from "./searchBar.js";
import {
  deleteSearchResults,
  buildSearchResults,
  clearStatsLine,
  setStatsLine
} from "./searchResults.js";
import { getSearchTerm,retrieveSearchResults } from "./dataFunctions.js";


// readystatechange 読み込み状況
document.addEventListener("readystatechange", (event) => {
  //読み込みが完了したら
  if (event.target.readyState === "complete") {
    // 初期化
    initApp();
  }
});

const initApp = () => {
  setSearchFocus();
  const search = document.getElementById("search");
  search.addEventListener("input", showClearTextButton);
  const clear = document.getElementById("clear");
  clear.addEventListener("click", clearSearchText);
  clear.addEventListener("keydown", clearPushListener);

  const form = document.getElementById("search-bar");
  //送信された時
  form.addEventListener("submit", submitTheSearch);
}

const submitTheSearch = (event) => {
  event.preventDefault();
  //検索結果削除
  deleteSearchResults();
  // 新しい検索結果表示
  processTheSearch();
  setSearchFocus();
};

//async 非同期処理
const processTheSearch = async () => {
  clearStatsLine();
  const searchTerm = getSearchTerm();

  //検索バーが空の時は進まない
  if (searchTerm === "") return;
  //await 処理が返されるまで一時待機
  const resultArray = await retrieveSearchResults(searchTerm);

  if (resultArray.length) buildSearchResults(resultArray);

  setStatsLine(resultArray.length);
}
