import React, {useState, useEffect} from "react";
import {ChangeEvent} from "react";
import {useParams} from "react-router-dom";
import fetchPost from "../../api/fetchPost";
import Layout from "../../components/layout/Layout";
import EditPostTop from "./EditPostTop";
import EditImage from "./EditImage";
import EditContent from "./EditContent";
import {Container} from "./NewPostStyles";
import PostButton from "./PostButton";
import updatePost from "../../api/updatePost";
import deletePost from "../../api/deletePost";
import {useNavigate} from "react-router-dom";

const maxFiles = 3;

// Define the PostData interface
interface PostData {
	content: string;
	hashtags: string;
	location: string;
	temperature: number;
	currentDateAndTime: string;
	uploadedUrls: (string | File)[];
}

const EditPost: React.FC = () => {
	const navigate = useNavigate();
	const {documentId} = useParams<{documentId: string}>();
	const [postData, setPostData] = useState<PostData | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			if (documentId) {
				// Fetch post data using fetchPost
				const data = await fetchPost(documentId);
				if (data) {
					// Update postData state
					setPostData({
						content: data.content,
						hashtags: data.hashtags,
						location: data.location,
						temperature: data.temperature,
						uploadedUrls: data.uploadedUrls,
						currentDateAndTime: data.currentDateAndTime
					});
				}
			}
		};
		fetchData();
	}, [documentId]);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const newFiles = Array.from(event.target.files);

			// 이미지와 비디오 파일 모두 필터링
			const mediaFiles = newFiles.filter(
				file => file.type.startsWith("image/") || file.type.startsWith("video/")
			);

			setPostData(prevData => {
				if (!prevData) {
					return null;
				}
				// 기존 파일과 새 파일을 합치고, maxFiles 제한 적용
				const updatedUrls = [...prevData.uploadedUrls, ...mediaFiles].slice(
					0,
					maxFiles
				);
				return {
					...prevData,
					uploadedUrls: updatedUrls
				};
			});
		}
	};

	const handleFileDeletion = (index: number) => {
		setPostData(prevData => {
			if (!prevData) return null;
			const updatedUploadedUrls = [...prevData.uploadedUrls];
			updatedUploadedUrls.splice(index, 1);
			return {...prevData, uploadedUrls: updatedUploadedUrls};
		});
	};

	const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setPostData((prevData: PostData | null) => ({
			...prevData!,
			content: e.target.value
		}));
	};

	const handleHashtagsChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setPostData((prevData: PostData | null) => ({
			...prevData!,
			hashtags: e.target.value // Update hashtags property
		}));
	};

	const handleSave = async () => {
		if (documentId && postData) {
			try {
				await updatePost(documentId, postData);
				console.log("Post updated successfully");
				// Redirect to My Page after a successful update
				navigate("/"); // Replace "/my-page" with your actual route
			} catch (error) {
				console.error("Failed to update post:", error);
			}
		}
	};

	const handleCancel = () => {
		navigate("/");
	};

	const handleDelete = async () => {
		if (documentId) {
			try {
				// Call your deletePost API function with the documentId
				await deletePost(documentId);
				console.log("Post deleted successfully");
				navigate("/");
			} catch (error) {
				console.error("Failed to delete post:", error);
			}
		}
	};

	const isEditing = true;

	return (
		<Layout>
			<Container>
				{postData ? (
					<>
						<EditPostTop
							temperature={postData.temperature}
							location={postData.location}
							currentDateAndTime={postData.currentDateAndTime}
						/>
						<EditImage
							uploadedUrls={postData.uploadedUrls}
							onImageChange={handleImageChange}
							onImageDelete={handleFileDeletion}
							maxFiles={maxFiles}
						/>
						<EditContent
							content={postData.content}
							hashtags={[postData.hashtags]}
							handleContentChange={handleContentChange}
							handleHashtagsChange={handleHashtagsChange}
						/>
						<PostButton
							onSave={handleSave}
							onCancel={handleCancel}
							isEditing={isEditing}
							onDelete={handleDelete}
						/>
					</>
				) : (
					<p>Loading post data...</p>
				)}
			</Container>
		</Layout>
	);
};

export default EditPost;
