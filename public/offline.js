let db;

const request = window.indexedDB.open("budget", 1);

request.onupgradeneeded = ( event ) => {
  const db = event.target.result;
  db.createObjectStore("pending", { autoIncrement: true })
};

request.onsuccess = event => {
  db = event.target.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};

request.onerror = function (event) {
  console.log('unable to connect to indexDB budget database' + event.target.errorCode);
};

function saveRecord(record) {
  const transaction = db.transaction(['pending'], 'readwrite');

  const store = transaction.objectStore('pending');

  store.add(record);
}

function checkDatabase() {
  const transaction = db.transaction(["pending"], "readwrite");
  const store = transaction.objectStore("pending");
  const getAll = store.getAll();

  getAll.onsuccess = async function () {
    if (getAll.result.length > 0) {
      try{ 
        const response = await fetch('/api/transaction/bulk', {
          method: "POST",
          body: JSON.stringify(getAll.result),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          }
        });

        const json = await response.json()

        if (json) {
          const transaction = db.transaction(['pending'], 'readwrite');
          const store = transaction.objectStore('pending');
          store.clear();
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

window.addEventListener('online', checkDatabase);