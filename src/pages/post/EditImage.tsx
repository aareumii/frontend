/* eslint-disable indent */
// eslint-disable-next-line @typescript-eslint/naming-convention
import React, {useState, useEffect} from "react";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {
	Container,
	ButtonGroup,
	ImagePreviewContainer,
	PrevButton,
	NextButton,
	ImageUploader,
	UploadWrap,
	UploadButton,
	UploadText,
	DeleteButton
} from "./EditImageStyles";

interface EditImageProps {
	mediaFiles: (string | File)[];
	onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onImageDelete: (index: number) => void;
	maxFiles: number;
}

const EditImage: React.FC<EditImageProps> = ({
	mediaFiles,
	onImageChange,
	onImageDelete,
	maxFiles
}) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		setCurrentSlide(prev => (prev + 1) % mediaFiles.length);
	};

	const prevSlide = () => {
		setCurrentSlide(prev => (prev - 1 + mediaFiles.length) % mediaFiles.length);
	};

	const handleFileDeletion = () => {
		onImageDelete(currentSlide);
	};
	// 이미지 불러오기 확인을 위해 useEffect 사용
	useEffect(() => {
		console.log("Media Files:", mediaFiles);
	}, [mediaFiles]);

	return (
		<Container>
			{mediaFiles.length > 0 && (
				<ImagePreviewContainer>
					{typeof mediaFiles[currentSlide] === "string" ? (
						<img
							src={mediaFiles[currentSlide] as string}
							alt={`Image ${currentSlide}`}
						/>
					) : (
						<div>Image not available</div>
					)}
					<ButtonGroup>
						<PrevButton onClick={prevSlide} isDisabled={mediaFiles.length <= 1}>
							<IoIosArrowBack />
						</PrevButton>
						<NextButton onClick={nextSlide} isDisabled={mediaFiles.length <= 1}>
							<IoIosArrowForward />
						</NextButton>
					</ButtonGroup>
				</ImagePreviewContainer>
			)}

			<ImageUploader>
				<input
					type="file"
					multiple={maxFiles > 1}
					accept="image/*,video/*"
					onChange={onImageChange}
					disabled={mediaFiles.length >= maxFiles}
					id="media-upload" // 아이디 변경
					hidden
				/>
				<UploadWrap>
					<UploadButton
						htmlFor="media-upload" // 아이디 변경
						disabled={mediaFiles.length >= maxFiles}
					>
						{mediaFiles.length < maxFiles
							? "이미지 추가하기"
							: "업로드 제한 도달"}
					</UploadButton>
					<UploadText>업로드된 미디어 수: {mediaFiles.length}</UploadText>
					<DeleteButton onClick={handleFileDeletion}>Delete</DeleteButton>
				</UploadWrap>
			</ImageUploader>
		</Container>
	);
};

export default EditImage;
