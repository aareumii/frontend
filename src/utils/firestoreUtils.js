import {doc, setDoc} from "firebase/firestore";
import {db} from "./firebaseConfig";

/**
 * Firestore에 데이터를 저장하는 함수
 * @param {string} collectionName - 저장할 컬렉션 이름
 * @param {Object} data - Firestore에 저장할 데이터
 * @returns {Promise} - 저장된 데이터의 문서 참조를 반환합니다.
 */
export const saveDataToFirestore = async (project, data) => {
	try {
		const docRef = doc(db, project);
		await setDoc(docRef, {
			...data,
			createdAt: new Date()
		});
		console.log("Document written with ID:", docRef.id);
		return docRef;
	} catch (error) {
		console.error("Error adding document:", error);
		throw error;
	}
};
