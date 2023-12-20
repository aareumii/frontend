// eslint-disable-next-line @typescript-eslint/naming-convention
import React, {useState} from "react";

// eslint-disable-next-line @typescript-eslint/naming-convention
import Layout from "../../components/layout/Layout";
// eslint-disable-next-line @typescript-eslint/naming-convention
import PostTopWrap from "./PostTopWrap";
// eslint-disable-next-line @typescript-eslint/naming-convention
import PostContent from "./PostContent";
// eslint-disable-next-line @typescript-eslint/naming-convention
import PostImage from "./PostImage";

import {Container} from "./NewPostStyles";
// eslint-disable-next-line @typescript-eslint/naming-convention
import PostButton from "./PostButton";

import axios from "axios";

interface NewPostProps {}

const NewPost: React.FC<NewPostProps> = () => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [location, setLocation] = useState<string>("");
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [temperature, setTemperature] = useState<number | null>(null);
	const [files, setFiles] = useState<File[]>([]); // 파일 목록을 저장할 배열
	const [content, setContent] = useState<string>("");
	const [hashtags, setHashtags] = useState<string>("");

	const handleLocationChange = (newLocation: string) => {
		setLocation(newLocation);
	};

	const handleTemperatureChange = (newTemperature: number | null) => {
		setTemperature(newTemperature);
	};

	const handleFilesChange = (newFiles: File[]) => {
		setFiles(newFiles);
	};

	const handleContentChange = (newContent: string) => {
		setContent(newContent);
	};

	const handleHashtagsChange = (newHashtags: string) => {
		setHashtags(newHashtags);
	};

	const handleSave = async () => {
		if (!content.trim() || files.length === 0) {
			alert("내용과 이미지를 모두 입력해주세요.");
			return;
		}

		const postData = {
			content,
			temperature,
			location,
			mediaFiles: files.map(file => file.name),
			hashtags
		};

		try {
			const response = await axios.post(
				"https://us-central1-weather-eottae-49fe1.cloudfunctions.net/project",
				postData
			);
			console.log("Post saved:", response.data);
			// 성공 처리, 예를 들어 폼 초기화 또는 성공 메시지 표시
		} catch (error) {
			console.error("Error saving post:", error);
			// 오류 처리, 예를 들어 사용자에게 오류 메시지 표시
		}
	};

	const handleCancel = () => {
		// 취소 모달 또는 다른 취소 로직을 추가할 수 있습니다.
	};

	return (
		<Layout>
			<Container>
				<PostTopWrap
					onLocationUpdate={handleLocationChange}
					onTemperatureChange={handleTemperatureChange}
				/>
				<PostImage initialFiles={files} onFilesChange={handleFilesChange} />
				<PostContent
					content={content}
					hashtags={hashtags}
					onContentChange={handleContentChange}
					onHashtagsChange={handleHashtagsChange}
				/>
				<PostButton onSave={handleSave} onCancel={handleCancel} />
			</Container>
		</Layout>
	);
};

export default NewPost;
