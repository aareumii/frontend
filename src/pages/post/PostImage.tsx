// eslint-disable-next-line @typescript-eslint/naming-convention
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

const maxFiles = 3;

interface ImageWrapProps {
	initialFiles?: File[];
	onFilesChange: (newFiles: File[]) => void;
}

const isVideo = (file: File) => {
	return file.type.split("/")[0] === "video";
};

const PostImage: React.FC<ImageWrapProps> = ({initialFiles, onFilesChange}) => {
	const [files, setFiles] = useState<File[]>(initialFiles || []);
	const [currentFileIndex, setCurrentFileIndex] = useState(0);
	const [fileUrls, setFileUrls] = useState<string[]>([]);

	useEffect(() => {
		const newUrls = files.map(file => URL.createObjectURL(file));
		setFileUrls(prevUrls => [...prevUrls, ...newUrls]);

		return () => {
			newUrls.forEach(url => URL.revokeObjectURL(url));
		};
	}, [files]);

	const handleFileDeletion = (index: number) => {
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const updatedFiles = files.filter((_, fileIndex) => fileIndex !== index);
		// eslint-disable-next-line @typescript-eslint/naming-convention
		const updatedUrls = fileUrls.filter((_, urlIndex) => urlIndex !== index);
		setFiles(updatedFiles);
		setFileUrls(updatedUrls);
		setCurrentFileIndex(0);
		onFilesChange(updatedFiles);
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files) {
			const filesArray = Array.from(event.target.files).slice(
				0,
				maxFiles - files.length
			);
			setFiles(prevFiles => [...prevFiles, ...filesArray]);
			onFilesChange([...files, ...filesArray]);
			setCurrentFileIndex(files.length > 0 ? currentFileIndex : 0);
		}
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
							onClick={() => {
								if (currentFileIndex > 0) {
									handlePrev();
								}
							}}
							isDisabled={currentFileIndex === 0}
						>
							<IoIosArrowBack />
						</PrevButton>
						{isVideo(files[currentFileIndex]) ? (
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
							onClick={() => {
								if (currentFileIndex < files.length - 1) {
									handleNext();
								}
							}}
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
