const functions = require("firebase-functions");
const admin = require("firebase-admin");
const busboy = require("busboy");
const cors = require("cors")({origin: true});

admin.initializeApp();

exports.api = functions.https.onRequest((req, res) => {
	cors(req, res, () => {
		if (req.method !== "POST") {
			return res.status(405).send("Method Not Allowed");
		}

		// Busboy 인스턴스를 생성하는 새로운 방식
		const bb = busboy({headers: req.headers});
		let formData = {};

		bb.on("field", (fieldname, val) => {
			formData[fieldname] = val;
		});

		// 파일 처리 로직 (필요한 경우)
		// bb.on("file", (fieldname, file, info) => { ... });

		bb.on("finish", async () => {
			try {
				await admin.firestore().collection("project").add(formData);
				res.status(200).send("Project post added.");
			} catch (error) {
				console.error("Error adding project post", error);
				res.status(500).send("Internal Server Error");
			}
		});

		bb.end(req.rawBody);
	});
});
