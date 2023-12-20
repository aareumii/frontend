// createPostApi.ts

// 다른 import 문들
import * as express from "express"; // express 모듈 임포트

// 추가된 export 문
export {};

const firestore = admin.firestore();

exports.createPost = functions.https.onRequest(
	async (request: express.Request, response: express.Response) => {
		try {
			// POST 요청으로 전달된 데이터 파싱
			const {
				content,
				temperature,
				location,
				mediaFiles,
				hashtags,
				access_token
			} = request.body;

			// Firestore에 데이터 저장
			const postRef = await firestore.collection("posts").add({
				content,
				temperature,
				location,
				mediaFiles,
				hashtags
			});

			// 저장된 게시물의 ID 반환
			const postId = postRef.id;

			// 게시물을 저장한 후 추가 작업을 수행하거나 응답을 보낼 수 있습니다.

			// 응답
			response.json({message: "게시물이 성공적으로 저장되었습니다.", postId});
		} catch (error) {
			console.error("Error in createPost:", error);
			response
				.status(500)
				.json({error: "게시물을 저장하는 동안 오류가 발생했습니다."});
		}
	}
);
