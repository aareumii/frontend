const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();

module.exports = async function saveDataToFirestore(data) {
	try {
		const docRef = await db.collection("project").add({
			...data,
			createdAt: new Date()
		});

		return {success: true, postId: docRef.id};
	} catch (error) {
		console.error("게시물 저장 중 오류 발생:", error);
		return {success: false, error: "게시물 저장 중 오류가 발생했습니다."};
	}
};
