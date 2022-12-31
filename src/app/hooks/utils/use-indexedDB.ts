import * as React from "react";

export const useIndexedDB = <T>(
  DBName: string,
  tableName: string,
  id: string,
  indexID?: string
) => {
  const [data, setData] = React.useState<T[]>([]);
  const [loading, setLoading] = React.useState(false);
  const indexedDB = window.indexedDB;
  // window.indexedDB ||
  // window.mozIndexedDB ||
  // window.webkitIndexedDB ||
  // window.msIndexedDB ||
  // window.shimIndexedDB;
  let db: IDBDatabase | undefined = undefined;

  const handleDB = (
    option: UseIndexedDB.options,
    data?: UseIndexedDB.common<T>
  ) => {
    setLoading(true);
    const request = indexedDB.open(DBName);
    request.onerror = (e) => {
      import.meta.env.MODE === "development" && console.info("Error", e);
    };
    request.onupgradeneeded = (e: any) => {
      db = e.target.result;
      if (db) {
        const store = db.createObjectStore(tableName, { keyPath: id });
        if (indexID) {
          store.createIndex(indexID, indexID, { unique: false });
        }
        store.transaction.oncomplete = (e) => {
          import.meta.env.MODE === "development" &&
            console.info("transaction completed");
        };
      }
    };
    request.onsuccess = (e: any) => {
      db = e.target.result;
      import.meta.env.MODE === "development" &&
        console.info("Successfully opened");
      try {
        switch (option) {
          case "read":
            getById(data as string);
            break;
          case "readall":
            getAll();
            break;
          case "query":
            query(data as UseIndexedDB.Query);
            break;
          case "insert":
            insertDB(data as T[]);
            break;
          case "update":
            updateDB(data as T);
            break;
          case "delete":
            deleteById(data as string);
            break;
          case "deleteDB":
            deleteDB();
            break;
        }
      } catch (e) {
        setLoading(false);
      } finally {
        db?.close();
      }
    };
  };

  const deleteDB = () => {
    const request = indexedDB.deleteDatabase(DBName);
    request.onsuccess = () => setLoading(false);
  };

  const insertDB = (records: T[]) => {
    if (db) {
      const insert_transaction = db.transaction(tableName, "readwrite");
      const store = insert_transaction.objectStore(tableName);
      insert_transaction.onerror = () =>
        import.meta.env.MODE === "development" &&
        console.info("Insert Transaction Error");
      insert_transaction.oncomplete = () =>
        import.meta.env.MODE === "development" &&
        console.info("Insert Transaction completed");
      records.forEach((record) => {
        import.meta.env.MODE === "development" && console.info(record);
        const request = store.add(record);
        request.onerror = (e) =>
          import.meta.env.MODE === "development" &&
          console.info("Couldn't insert", record, e);
        request.onsuccess = (e: any) => setLoading(false);
      });
    }
  };

  const getAll = () => {
    if (db) {
      const read_transaction = db.transaction(tableName, "readonly");
      const store = read_transaction.objectStore(tableName);
      read_transaction.onerror = () =>
        import.meta.env.MODE === "development" &&
        console.info("Read Transaction error");
      read_transaction.oncomplete = () =>
        import.meta.env.MODE === "development" &&
        console.info("Read Transaction completed");
      const request = store.getAll();
      request.onerror = () =>
        import.meta.env.MODE === "development" &&
        console.info("Couldn't find by id");
      request.onsuccess = () => {
        setData(request.result);
        setLoading(false);
      };
    }
  };

  const query = ({ index, key }: UseIndexedDB.Query) => {
    if (db) {
      const read_transaction = db.transaction(tableName, "readonly");
      const store = read_transaction.objectStore(tableName);
      read_transaction.onerror = () =>
        import.meta.env.MODE === "development" &&
        console.info("Query Transaction error");
      read_transaction.oncomplete = () =>
        import.meta.env.MODE === "development" &&
        console.info("Query Transaction completed");
      const request = store.index(index).get(key);
      request.onerror = () =>
        import.meta.env.MODE === "development" &&
        console.info("Couldn't find by id");
      request.onsuccess = () => {
        setData([request.result as unknown as T]);
        setLoading(false);
      };
    }
  };

  const getById = (key: string) => {
    if (db) {
      const read_transaction = db.transaction(tableName, "readonly");
      const store = read_transaction.objectStore(tableName);
      read_transaction.onerror = () =>
        import.meta.env.MODE === "development" &&
        console.info("Read Transaction error");
      read_transaction.oncomplete = () =>
        import.meta.env.MODE === "development" &&
        console.info("Read Transaction completed");
      const request = store.get(key);
      request.onerror = () =>
        import.meta.env.MODE === "development" &&
        console.info("Couldn't find by id");
      request.onsuccess = () => {
        setData(request.result);
        setLoading(false);
      };
    }
  };

  const updateDB = (record: T) => {
    if (db) {
      const update_transaction = db.transaction(tableName, "readwrite");
      const store = update_transaction.objectStore(tableName);
      update_transaction.onerror = () =>
        import.meta.env.MODE === "development" &&
        console.info("Update Transaction error");
      update_transaction.oncomplete = () =>
        import.meta.env.MODE === "development" &&
        console.info("Update Transaction completed");
      const request = store.put(record);
      request.onerror = () =>
        import.meta.env.MODE === "development" &&
        console.info("Couldn't update");
      request.onsuccess = () => setLoading(false);
    }
  };

  const deleteById = (key: string) => {
    if (db) {
      const delete_transaction = db.transaction(tableName, "readwrite");
      const store = delete_transaction.objectStore(tableName);
      delete_transaction.onerror = () =>
        import.meta.env.MODE === "development" &&
        console.info("Delete Transaction error");
      delete_transaction.oncomplete = () =>
        import.meta.env.MODE === "development" &&
        console.info("Delete Transaction completed");
      const request = store.delete(key);
      request.onerror = () =>
        import.meta.env.MODE === "development" &&
        console.info("Couldn't delete by id");
      request.onsuccess = () => setLoading(false);
    }
  };

  return {
    data,
    handleDB,
    loading,
  };
};

declare namespace UseIndexedDB {
  export type options =
    | "read"
    | "readall"
    | "query"
    | "delete"
    | "deleteDB"
    | "insert"
    | "update";
  export type common<T> = T[] | T | string | Query;
  export interface Query {
    index: string;
    key: IDBValidKey;
  }
}
