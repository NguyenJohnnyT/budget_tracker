const request = window.indexedDB.open("budget", 1);

request.onupgradeneeded= ( event ) => {
  const db = event.target.result;
  db.createObjectStore("pending", { autoIncremenet: true })
};

request.onsuccess = event => {
  const db = request.result;

  if (navigator.onLine) {
    checkDatabase();
  }
};