import {getFirestore, collection, addDoc} from "firebase/firestore";

const addNewDocument = async (data: object) => {
	const db = getFirestore();
	const docRef = await addDoc(collection(db, "project"), data);
	return docRef.id; // 생성된 문서의 ID 반환
};

export default addNewDocument;
