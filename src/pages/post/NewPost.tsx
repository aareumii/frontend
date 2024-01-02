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

import {useNavigate} from "react-router";

import axios from "axios";

interface NewPostProps {}

const NewPost: React.FC<NewPostProps> = () => {
	const navigate = useNavigate();
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [location, setLocation] = useState<string>("");
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [temperature, setTemperature] = useState<number | null>(null);
	const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
	const [content, setContent] = useState<string>("");
	const [hashtags, setHashtags] = useState<string>("");

	const formatDate = (date: Date): string => {
		return date.toISOString().replace("T", " ").substring(0, 19);
	};
	const currentDateAndTime = formatDate(new Date());

	const handleLocationChange = (newLocation: string) => {
		setLocation(newLocation);
	};

	const handleTemperatureChange = (newTemperature: number | null) => {
		setTemperature(newTemperature);
	};

	const handleFilesChange = (urls: string[]) => {
		setUploadedUrls(urls); // 업로드된 파일 URL을 상태에 저장
	};

	const handleContentChange = (newContent: string) => {
		setContent(newContent);
	};

	const handleHashtagsChange = (newHashtags: string) => {
		setHashtags(newHashtags);
	};

	const handleSave = async () => {
		if (!content.trim() || uploadedUrls.length === 0) {
			alert("내용과 이미지를 모두 입력해주세요.");
			return;
		}

		// FormData 객체를 생성
		const formData = new FormData();
		formData.append("content", content);
		if (temperature !== null) {
			formData.append("temperature", temperature.toString());
		}
		formData.append("location", location);
		formData.append("hashtags", hashtags);
		formData.append("currentDateAndTime", currentDateAndTime);

		// 업로드된 URL을 FormData에 추가
		uploadedUrls.forEach(url => {
			formData.append("uploadedUrls[]", url);
		});

		try {
			const response = await axios.post(
				"https://us-central1-weather-eottae-49fe1.cloudfunctions.net/api",
				formData,
				{
					headers: {
						// eslint-disable-next-line @typescript-eslint/naming-convention
						"Content-Type": "multipart/form-data" // 이 줄 추가
					}
				}
			);
			console.log("Post saved:", response.data);
			navigate("/");
			alert("게시물이 성공적으로 저장되었습니다.");
		} catch (error) {
			console.error("Error saving post:", error);
			alert("게시물 저장 중 오류가 발생했습니다.");
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
					currentDateAndTime={currentDateAndTime}
				/>
				<PostImage
					onFilesChange={(urls: string[]) => handleFilesChange(urls)}
				/>
				<PostContent
					content={content}
					hashtags={hashtags}
					onContentChange={handleContentChange}
					onHashtagsChange={handleHashtagsChange}
				/>
				<PostButton
					onSave={handleSave}
					onCancel={handleCancel}
					isEditing={false}
				/>
			</Container>
		</Layout>
	);
};

export default NewPost;
