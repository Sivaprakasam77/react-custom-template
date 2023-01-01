import * as FirebaseFirestore from "firebase/firestore";
import React from "react";
import * as Providers from "src/app/providers";

/* Snapshot lisenter for collection and collectionGroup
   ####################################################
   PARAMS
   type = collection | collectiongroup
   path = collection/ collelctionGroup path
*/
export const useFireSnapshot = <T>(
  type: "collection" | "collectionGroup",
  path: string
) => {
  const [data, setData] = React.useState<T[]>();
  const firestore = FirebaseFirestore.getFirestore(Providers.secondaryApp);

  // You can modify your path based on development and production
  const pathModifier = (text: string) => text;

  // Initialize collection and collectionGroup
  const collection =
    type === "collection"
      ? FirebaseFirestore.collection(firestore, pathModifier(path))
      : FirebaseFirestore.collectionGroup(firestore, pathModifier(path));

  // Collection/CollectionGroup Snapshot listener with queryConstraint (Firebase query conditions) and slient to disable listening
  const collectionSnapshot = (
    queryConstraint?: FirebaseFirestore.QueryConstraint[],
    slient?: boolean
  ) => {
    // Query with constraint initialization
    const query = FirebaseFirestore.query(
      collection,
      ...(queryConstraint || [])
    );

    React.useEffect(() => {
      if (!slient) {
        // Subscribe collection path
        const unsubscribe = FirebaseFirestore.onSnapshot(query, (docs) => {
          setData(
            docs.docs.map((doc) => ({ id: doc.id, ...(doc.data() as T) }))
          );
          import.meta.env.MODE === "development" &&
            console.info(
              path,
              docs.docs.map((doc) => ({ id: doc.id, ...(doc.data() as T) }))
            );
        });

        // unsubscribe when dependency and path change
        return () => {
          unsubscribe();
        };
      } else setData(undefined);
    }, [path]);
    return { data };
  };

  // Document Snapshot listener with id is unique documen path and slient to diable listening
  const documentSnapshot = (id: string, slient?: boolean) => {
    React.useEffect(() => {
      if (!slient) {
        // Subscribe document path
        const unsubscribe = FirebaseFirestore.onSnapshot(
          FirebaseFirestore.doc(
            collection as FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
            id
          ),
          (doc) => {
            setData([{ id: doc.id, ...(doc.data() as T) }]);
            import.meta.env.MODE === "development" &&
              console.info(path, { id: doc.id, ...(doc.data() as T) });
          }
        );
        // Unsubscribe whne dependency and path change
        return () => {
          unsubscribe();
        };
      } else setData(undefined);
    }, [path]);
    return { data };
  };

  return { collectionSnapshot, documentSnapshot };
};
