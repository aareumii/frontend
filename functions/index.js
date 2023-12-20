const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

exports.project = functions.https.onRequest(async (request, response) => {
	cors(request, response, async () => {
		try {
			if (request.method !== "POST") {
				return response.status(405).json({error: "Method not allowed"});
			}

			const postData = request.body;

			const result = await saveDataToFirestore(postData);

			if (result.success) {
				return response.status(201).json({
					message: "게시물이 성공적으로 저장되었습니다.",
					postId: result.postId
				});
			} else {
				return response.status(500).json({error: result.error});
			}
		} catch (error) {
			console.error("오류 발생:", error);
			return response.status(500).json({error: "서버 오류가 발생했습니다."});
		}
	});
});
