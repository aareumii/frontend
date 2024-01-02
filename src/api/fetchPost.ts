import {getFirestore, doc, getDoc} from "firebase/firestore";

const fetchPost = async (documentId: string) => {
	const db = getFirestore();
	const docRef = doc(db, "project", documentId);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		const docData = docSnap.data();
		const uploadedUrls = [];

		// Extracting all 'uploadedUrls'
		for (const key in docData) {
			if (key.startsWith("uploadedUrls")) {
				uploadedUrls.push(docData[key]);
			}
		}

		return {
			content: docData.content || "",
			hashtags: docData.hashtags || "",
			location: docData.location || "",
			temperature: docData.temperature || "",
			currentDateAndTime: docData.currentDateAndTime || "",
			uploadedUrls: uploadedUrls
		};
	} else {
		console.log("No such document!");
		return null; // Document does not exist
	}
};

export default fetchPost;
