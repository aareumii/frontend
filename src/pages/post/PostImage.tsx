import React, {useState, useEffect} from "react";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {
	Container,
	ImageUploadWrap,
	ImageUploader,
	UploadWrap,
	UploadButton,
	UploadText,
	ImagePreviewContainer,
	ImagePreview,
	VideoPreview,
	PrevButton,
	NextButton,
	DeleteButton
} from "./PostImageStyles";

import {storage} from "../../firebaseConfig";
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

const maxFiles = 3;

interface ImageWrapProps {
	initialFiles?: File[];
	onFilesChange: (urls: string[]) => void;
}

const isVideoFile = (file: File) => {
	return file.type.split("/")[0] === "video";
};

const PostImage: React.FC<ImageWrapProps> = ({initialFiles, onFilesChange}) => {
	const [files, setFiles] = useState<File[]>(initialFiles || []);
	const [currentFileIndex, setCurrentFileIndex] = useState<number>(0);
	const [fileUrls, setFileUrls] = useState<string[]>([]);

	const uploadFileToStorage = async (file: File): Promise<string | null> => {
		if (!file || file.size === 0) {
			return null;
		}
		const timestamp = new Date().getTime();
		const storageRef = ref(storage, `images/${timestamp}-${file.name}`);
		await uploadBytes(storageRef, file);
		return getDownloadURL(storageRef);
	};

	useEffect(() => {
		const uploadFiles = async () => {
			const urls = await Promise.all(files.map(uploadFileToStorage));
			const validUrls = urls.filter((url): url is string => url !== null);
			setFileUrls(validUrls);
			onFilesChange(validUrls);
		};

		if (files.length > 0) {
			uploadFiles();
		} else {
			setFileUrls([]);
			onFilesChange([]);
		}
	}, [files]);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const newFiles = Array.from(event.target.files).slice(
				0,
				maxFiles - files.length
			);
			setFiles(prevFiles => [...prevFiles, ...newFiles]);
		}
	};

	const handleFileDeletion = (index: number) => {
		const updatedFiles = files.filter((_, fileIndex) => fileIndex !== index);
		const updatedUrls = fileUrls.filter((_, urlIndex) => urlIndex !== index);
		setFiles(updatedFiles);
		setFileUrls(updatedUrls);
		onFilesChange(updatedUrls);
	};

	const handlePrev = () => {
		setCurrentFileIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
	};

	const handleNext = () => {
		setCurrentFileIndex(prevIndex =>
			prevIndex < files.length - 1 ? prevIndex + 1 : prevIndex
		);
	};

	return (
		<Container>
			<ImageUploadWrap>
				<ImageUploader>
					<input
						type="file"
						multiple
						accept="image/*,video/*"
						onChange={handleFileChange}
						id="image-upload"
						hidden
						disabled={files.length >= maxFiles}
					/>
				</ImageUploader>
				{files.length > 0 && (
					<ImagePreviewContainer>
						<PrevButton
							onClick={handlePrev}
							isDisabled={currentFileIndex === 0}
						>
							<IoIosArrowBack />
						</PrevButton>
						{isVideoFile(files[currentFileIndex]) ? (
							<VideoPreview controls>
								<source
									src={URL.createObjectURL(files[currentFileIndex])}
									type={files[currentFileIndex].type}
								/>
								Your browser does not support the video tag.
							</VideoPreview>
						) : (
							<ImagePreview
								src={URL.createObjectURL(files[currentFileIndex])}
								alt="Uploaded content"
							/>
						)}
						<NextButton
							onClick={handleNext}
							isDisabled={currentFileIndex === files.length - 1}
						>
							<IoIosArrowForward />
						</NextButton>
					</ImagePreviewContainer>
				)}
			</ImageUploadWrap>
			<UploadWrap>
				<UploadButton
					htmlFor="image-upload"
					isDisabled={files.length >= maxFiles}
				>
					{files.length < maxFiles
						? "사진/동영상 추가하기"
						: "업로드 제한 도달"}
				</UploadButton>
				<UploadText>업로드된 파일 수: {files.length}</UploadText>
				<DeleteButton onClick={() => handleFileDeletion(currentFileIndex)}>
					Delete
				</DeleteButton>
			</UploadWrap>
		</Container>
	);
};

export default PostImage;
