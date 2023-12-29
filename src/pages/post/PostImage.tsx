import React, {useState, useEffect, useRef} from "react";
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

	const uploadFileToStorage = async (file: File): Promise<string> => {
		const timestamp = new Date().getTime();
		const storageRef = ref(storage, `images/${timestamp}-${file.name}`);
		await uploadBytes(storageRef, file);
		return getDownloadURL(storageRef);
	};

	// onFilesChange 함수에 대한 ref를 생성
	const onFilesChangeRef = useRef(onFilesChange);
	// 컴포넌트가 렌더링될 때마다 최신의 onFilesChange 함수를 ref에 할당
	onFilesChangeRef.current = onFilesChange;

	useEffect(() => {
		const uploadFiles = async () => {
			try {
				const urls = await Promise.all(files.map(uploadFileToStorage));
				setFileUrls(urls);
				// 최신 onFilesChange 함수를 ref에서 가져와 사용
				onFilesChangeRef.current(urls);
			} catch (error) {
				console.error("Error uploading files:", error);
				alert("파일 업로드 중 에러가 발생했습니다.");
			}
		};

		if (files.length > 0) {
			uploadFiles();
		} else {
			setFileUrls([]);
			onFilesChangeRef.current([]); // 여기도 ref를 사용
		}
	}, [files]); // onFilesChange를 의존성 배열에서 제거

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
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const updatedFiles = files.filter((_, fileIndex) => fileIndex !== index);
		// eslint-disable-next-line @typescript-eslint/naming-convention
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
