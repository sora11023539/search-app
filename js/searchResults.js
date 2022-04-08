//検索結果の削除
export const deleteSearchResults = () => {
  const parentElement = document.getElementById("search-result");

  //最後の子要素取得
  let child = parentElement.lastElementChild;

  //繰り返し処理
  while (child) {
    //最後の子要素削除
    parentElement.removeChild(child);
    //置き換える
    child = parentElement.lastElementChild;
  }
}

export const buildSearchResults = (resultArray) => {
  resultArray.forEach(result => {
    const resultItem = createResultItem(result);
    //divタグ生成
    const resultContents = document.createElement('div');
    //divタグにresultContentsクラス追加
    resultContents.classList.add("result-contents");

    if (result.img) {
      const resultImage = createResultImage(result);

      //要素追加
      resultContents.append(resultImage);
    }

    const resultText = createResultText(result);
    resultContents.append(resultText);
    resultItem.append(resultContents);

    const searchResults = document.getElementById("search-result");
    searchResults.append(resultItem);
  });
}

//コンテナ生成 リンク生成
const createResultItem = (result) => {
  //resultItem と定義するとdiv要素追加
  const resultItem = document.createElement("div");
  //div要素にクラス追加
  resultItem.classList.add("result-item");

  const resultTitle = document.createElement("div");
  resultTitle.classList.add("result-title");

  const link = document.createElement("a");
  link.href = `https://ja.wikipedia.org/?curid=${result.id}`
  link.textContent = result.title;
  link.target = "_blank";

  //要素追加
  resultTitle.append(link);
  resultItem.append(resultTitle);

  return resultItem;
}

//サムネイル取得
const createResultImage = (result) => {
  const resultImage = document.createElement("div");
  resultImage.classList.add("result-image");
  const img = document.createElement("img");
  img.src = result.img;
  img.alt = result.title;
  resultImage.append(img);
  return resultImage;
}

//抜粋取得
const createResultText = (result) => {
  const resultText = document.createElement("div");
  resultText.classList.add("result-text");
  const resultDescription = document.createElement("p");
  resultDescription.classList.add("result-description");

  resultDescription.textContent = result.text;
  resultText.append(resultDescription);
  return resultText;
}

//検索結果数表示
export const clearStatsLine = () => {
  document.getElementById("stats").textContent = "";
}

export const setStatsLine = (numberOfResults) => {
  const statLine = document.getElementById("stats");

  if (numberOfResults) {
    statLine.textContent = `Displaying ${numberOfResults} results.`;
  } else {
    statLine.textContent = "Sorry, no results.";
  }
}
