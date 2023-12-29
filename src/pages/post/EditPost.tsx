// eslint-disable-next-line @typescript-eslint/naming-convention
import React, {useState, ChangeEvent, useEffect} from "react";
import {useParams} from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/naming-convention
import Layout from "../../components/layout/Layout";
import {Container} from "./NewPostStyles";
// eslint-disable-next-line @typescript-eslint/naming-convention
import EditPostTop from "./EditPostTop";
// eslint-disable-next-line @typescript-eslint/naming-convention
import EditImage from "./EditImage";
// eslint-disable-next-line @typescript-eslint/naming-convention
import EditContent from "./EditContent";
// eslint-disable-next-line @typescript-eslint/naming-convention
import PostButton from "./PostButton";
import {fetchPost} from "../../api/fetchPost";

const maxFiles = 3;

interface EditPostProps {}

interface PostData {
	date: string;
	temperature: number;
	location: string;
	mediaFiles: (string | File)[];
	content: string;
	hashtags: string;
	createdAt: string;
}

const EditPost: React.FC<EditPostProps> = () => {
	const {postId} = useParams();
	const [postData, setPostData] = useState<PostData>({
		date: "",
		temperature: 0,
		location: "",
		mediaFiles: [],
		content: "",
		hashtags: "",
		createdAt: ""
	});

	useEffect(() => {
		const loadPost = async () => {
			if (!postId) {
				console.error("postId is undefined");
				return;
			}
			try {
				const fetchedData = await fetchPost(postId);
				setPostData({
					date: fetchedData.createdAt ?? "",
					temperature: fetchedData.temperature,
					location: fetchedData.location,
					mediaFiles: fetchedData.mediaFiles || [], // 이미지 데이터를 빈 배열로 초기화
					content: fetchedData.content,
					hashtags: Array.isArray(fetchedData.hashtags)
						? fetchedData.hashtags.join(" ")
						: fetchedData.hashtags || "",
					createdAt: new Date(fetchedData.createdAt).toLocaleDateString(
						"ko-KR",
						{
							year: "numeric",
							month: "long",
							day: "numeric"
						}
					)
				});
				console.log("Media Files:", fetchedData.mediaFiles);
			} catch (error) {
				console.error("Error loading post:", error);
			}
		};

		loadPost();
	}, [postId]);

	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const newFiles = Array.from(event.target.files);

			// Filter out non-image files (if any) before adding
			const imageFiles = newFiles.filter(file =>
				file.type.startsWith("image/")
			);

			setPostData(prevData => ({
				...prevData,
				mediaFiles: [...prevData.mediaFiles, ...imageFiles].slice(0, maxFiles)
			}));
		}
	};

	const handleFileDeletion = (index: number) => {
		setPostData(prevData => {
			const updatedMediaFiles = [...prevData.mediaFiles];
			updatedMediaFiles.splice(index, 1);
			return {
				...prevData,
				mediaFiles: updatedMediaFiles
			};
		});
	};

	const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setPostData(prevData => ({
			...prevData,
			content: e.target.value
		}));
	};

	const handleHashtagsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setPostData(prevData => ({
			...prevData,
			hashtags: e.target.value
		}));
	};

	const handleSave = () => {
		// 수정 내용 저장 로직
	};

	const handleDelete = () => {
		// 포스트 삭제 로직
	};

	const handleCancel = () => {
		// 취소 로직
	};

	return (
		<Layout>
			<Container>
				<EditPostTop
					temperature={postData.temperature}
					location={postData.location}
					date={postData.createdAt}
				/>
				<EditImage
					mediaFiles={postData.mediaFiles}
					onImageChange={handleImageChange}
					onImageDelete={handleFileDeletion}
					maxFiles={maxFiles}
				/>
				<EditContent
					content={postData.content}
					hashtags={postData.hashtags}
					handleContentChange={handleContentChange}
					handleHashtagsChange={handleHashtagsChange}
				/>
				<PostButton
					onSave={handleSave}
					onDelete={handleDelete}
					onCancel={handleCancel}
					isEditing={true}
				/>
			</Container>
		</Layout>
	);
};

export default EditPost;
