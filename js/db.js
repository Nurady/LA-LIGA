let dbPromised = idb.open("laliga", 25, (upgradeDb) => {
  let articlesObjectStore = upgradeDb.createObjectStore("articles", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("teams_id", "id", { unique: false });
});

function saveForLater(data) {
  console.log(data)
  dbPromised
    .then((db) => {
      let tx = db.transaction("articles", "readwrite");
      let store = tx.objectStore("articles");    
      store.put(data);
      console.log(data)
      return tx.complete;
    })
    .then(() => {
      console.log("Artikel berhasil di simpan.");
    });
}

function getAll() {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("articles", "readonly");
        let store = tx.objectStore("articles");
        return store.getAll();
      })
      .then((data) => {
        resolve(data);
      });
  });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        let tx = db.transaction("articles", "readonly");
        let store = tx.objectStore("articles");
        return store.get(id);
      })
      .then((data) => {         
        resolve(data);  
      });
  });
}

function deleteteam(data) {
    dbPromised
      .then((db) => {
        let tx = db.transaction("articles", "readwrite");
        let store = tx.objectStore("articles");
        store.delete(data);
        console.log(data);
        return tx.complete;       
      })
      .then(() => {
        console.log('Tim Favorit Dihapus');
  });
}