const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp(); // Firebase 초기화
const db = admin.firestore(); // Firestore 인스턴스 참조

exports.project = functions.https.onRequest((request, response) => {
	cors(request, response, async () => {
		// CORS 미들웨어 사용
		if (request.method !== "POST") {
			response.status(405).send("Method Not Allowed");
			return;
		}

		try {
			// 클라이언트로부터 받은 데이터
			const postData = request.body;

			// Firestore에 데이터 저장
			const docRef = await db.collection("project").add(postData);
			response.status(200).send({
				success: true,
				message: "게시물이 성공적으로 저장되었습니다.",
				postId: docRef.id
			});
		} catch (error) {
			console.error("Error adding document: ", error);
			response.status(500).send({
				success: false,
				error: "서버 오류가 발생했습니다.",
				message: error.message
			});
		}
	});
});
