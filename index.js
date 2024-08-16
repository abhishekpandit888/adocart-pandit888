import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js";

const appSettings = {
  databaseURL:
    "https://playground-5d036-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDb = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function () {
  let inputValue = inputFieldEl.value;

  push(shoppingListInDb, inputValue);

  clearInputFieldEl();
});

onValue(shoppingListInDb, function (snapshot) {
  if (snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val());

    clearShoppingListEl();

    for (let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i];
      let currentItemId = currentItem[0];
      let currentItemValue = currentItem[1];

      appendItem(currentItem);
    }
  } else {
    shoppingListEl.innerHTML = "No items here yet ...";
  }
});

function clearShoppingListEl() {
  shoppingListEl.innerHTML = "";
}

function clearInputFieldEl() {
  inputFieldEl.value = "";
}

function appendItem(item) {
  let itemId = item[0];
  let itemValue = item[1];

  let newEl = document.createElement("li");
  newEl.textContent = itemValue;

  newEl.addEventListener("click", function () {
    let exactLocaionOfDb = ref(database, `shoppingList/${itemId}`);
    remove(exactLocaionOfDb);
  });

  shoppingListEl.append(newEl);
}
