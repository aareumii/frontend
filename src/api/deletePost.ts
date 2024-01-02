import {getFirestore, doc, deleteDoc} from "firebase/firestore";

const deletePost = async (documentId: string) => {
	const db = getFirestore();
	const docRef = doc(db, "project", documentId);

	try {
		await deleteDoc(docRef);
		console.log("Document successfully deleted!");
	} catch (error) {
		console.error("Error deleting document: ", error);
		throw error;
	}
};

export default deletePost;
