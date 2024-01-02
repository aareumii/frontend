import {doc, updateDoc} from "firebase/firestore";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {db, storage} from "../firebaseConfig"; // Firebase 설정 파일 경로

// Firestore에 데이터를 업데이트하는 함수
const updateFirestoreData = async (
	documentId: string,
	data: Partial<PostData>
) => {
	const docRef = doc(db, "project", documentId);
	await updateDoc(docRef, data);
};

// Firebase Storage에 파일을 업로드하고 URL을 반환하는 함수
const uploadFileToStorage = async (file: File) => {
	const storageRef = ref(storage, `uploads/${file.name}`);
	await uploadBytes(storageRef, file);
	return getDownloadURL(storageRef);
};

interface PostData {
	content: string;
	hashtags: string;
	uploadedUrls: (string | File)[];
}

const updatePost = async (documentId: string, postData: PostData) => {
	try {
		// Firestore에 텍스트 데이터 업데이트
		const textData: Partial<PostData> = {
			content: postData.content,
			hashtags: postData.hashtags
		};
		await updateFirestoreData(documentId, textData);

		// 파일 업로드 및 URL 업데이트
		const fileUrls = await Promise.all(
			postData.uploadedUrls.map(async fileOrUrl => {
				return typeof fileOrUrl === "string"
					? fileOrUrl
					: await uploadFileToStorage(fileOrUrl);
			})
		);

		// Firestore에 파일 URL 업데이트
		await updateFirestoreData(documentId, {uploadedUrls: fileUrls});

		console.log("Post updated successfully");
	} catch (error) {
		console.error("Error updating post:", error);
		throw error;
	}
};

export default updatePost;
