export const setSearchFocus = () => {
  document.getElementById("search").focus();
};

//Xボタン表示
export const showClearTextButton = () => {
  const search = document.getElementById("search");
  const clear = document.getElementById("clear");

  if (search.value.length) {
    clear.classList.remove("none");
    clear.classList.add("flex");
  } else {
    clear.classList.add("none");
    clear.classList.remove("flex");
  }
};

//検索バー削除
export const clearSearchText = (event) => {
  //デフォルトの動作を発生させない
  event.preventDefault();
  document.getElementById("search").value = "";
  const clear = document.getElementById("clear");
  clear.classList.add("none");
  clear.classList.remove("flex");
  setSearchFocus();
};


export const clearPushListener = (event) => {
  //エンターキーまたはスペースキーが押された時
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    document.getElementById("clear").click();
  }
};
