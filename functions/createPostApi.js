import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp();

exports.project = functions.https.onRequest(async (request, response) => {
	if (request.method !== "POST") {
		response.status(405).send("Method Not Allowed");
		return;
	}

	try {
		// 요청 본문에서 데이터 추출
		const {content, temperature, location, mediaFiles, hashtags} = request.body;

		// Firestore 컬렉션에 문서 추가
		const docRef = await admin.firestore().collection("project").add({
			content,
			temperature,
			location,
			mediaFiles,
			hashtags,
			createdAt: admin.firestore.FieldValue.serverTimestamp() // 현재 시간 추가
		});

		// 성공 응답
		response.status(200).send({postId: docRef.id});
	} catch (error) {
		console.error("Error saving data:", error);
		response.status(500).send("Internal Server Error");
	}
});
