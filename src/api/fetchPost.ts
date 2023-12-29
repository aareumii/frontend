import {db} from "../firebaseConfig";
import {doc, getDoc, Timestamp} from "firebase/firestore";

// PostData 인터페이스 정의
interface PostData {
	content: string;
	temperature: number;
	location: string;
	hashtags: string[]; // 해시태그 배열로 수정
	date: string | null;
	imageUrl: string[];
	createdAt: string;
	mediaFiles: string[];
}

export async function fetchPost(postId: string): Promise<PostData> {
	try {
		const docRef = doc(db, "project", postId);
		const docSnapshot = await getDoc(docRef);

		if (!docSnapshot.exists()) {
			throw new Error("게시물을 찾을 수 없습니다");
		}

		const data = docSnapshot.data();

		// createdAt을 Timestamp로 변환 (null 또는 문자열일 경우 처리 추가)
		const createdAt =
			data.createdAt &&
			typeof data.createdAt.toDate === "function" &&
			!isNaN(data.createdAt.toDate().getTime())
				? data.createdAt.toDate().toISOString()
				: null;

		const defaultPostData: PostData = {
			content: "",
			temperature: 0,
			imageUrl: [], // 이미지 URL 배열 초기화
			location: "",
			hashtags: [], // 해시태그 배열 초기화
			date: null,
			createdAt: "",
			mediaFiles: []
		};

		const postData: PostData = {
			...defaultPostData,
			...data,
			date: data.date ? (data.date as Timestamp).toDate().toISOString() : null,
			temperature: data.temperature ? parseInt(data.temperature.toString()) : 0,
			createdAt: createdAt
		};

		// 해시태그 정보 변환
		if (data.hashtags && Array.isArray(data.hashtags)) {
			postData.hashtags = data.hashtags.map((tag: string) => tag.trim());
		}

		// 이미지 URL 정보 저장
		if (data.mediaFiles && Array.isArray(data.mediaFiles)) {
			postData.imageUrl = data.mediaFiles.map((file: string) => file.trim());
		}

		return postData;
	} catch (error) {
		console.error("Firestore에서 게시물 가져오기 오류:", error);
		throw error;
	}
}
