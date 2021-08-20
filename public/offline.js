let db;

const request = window.indexedDB.open("budget", 1);

request.onupgradeneeded= ( event ) => {
  const db = event.target.result;
  db.createObjectStore("pending", { autoIncrement: true })
};

request.onsuccess = event => {
  db = request.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function (event) {
  console.log('unable to connect to indexDB budget database' + event.target.errorCode);
};

function saveRecord(record) {
  const transaction = db.transaction(['pending'], 'readwrite');

  const store = transaction.createObjectStore('pending');

  store.onupgradeneeded(record);
}