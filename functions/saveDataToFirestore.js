const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.saveData = functions.https.onRequest((request, response) => {
	cors(request, response, async () => {
		// 요청 처리 로직
		try {
			const docRef = await admin
				.firestore()
				.collection("project")
				.add({
					...request.body,
					createdAt: admin.firestore.FieldValue.serverTimestamp()
				});
			response.status(200).send({postId: docRef.id});
		} catch (error) {
			console.error("Error:", error);
			response.status(500).send("An error occurred");
		}
	});
});
