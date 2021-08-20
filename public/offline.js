const request = window.indexedDB.open("toDolist", 1);

request.onupgradeneeded= ({ target }) => {
  console.log("onupgradeneeded => executed");
  const db = target.result;
  const objectStore = db.createObjectStore("toDoList");
};

request.onsuccess = event => {
  console.log("request.onsuccess => executed");
  console.log(request.result);
}