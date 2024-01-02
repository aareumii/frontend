import React, {useState, useEffect} from "react";
import {IoIosArrowBack, IoIosArrowForward} from "react-icons/io";
import {
	Container,
	ImagePreviewContainer,
	PrevButton,
	NextButton,
	UploadWrap,
	UploadButton,
	UploadText,
	DeleteButton,
	ImageUploader
} from "./EditImageStyles";

interface EditImagesProps {
	uploadedUrls: (string | File)[];
	onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onImageDelete: (index: number) => void;
	maxFiles: number;
}

const EditImage: React.FC<EditImagesProps> = ({
	uploadedUrls,
	onImageChange,
	onImageDelete,
	maxFiles
}) => {
	const [currentSlide, setCurrentSlide] = useState(0);

	const nextSlide = () => {
		setCurrentSlide(prev => (prev + 1) % uploadedUrls.length);
	};

	const prevSlide = () => {
		setCurrentSlide(
			prev => (prev - 1 + uploadedUrls.length) % uploadedUrls.length
		);
	};

	const handleFileDeletion = () => {
		onImageDelete(currentSlide);
	};

	useEffect(() => {
		console.log("Uploaded URLs:", uploadedUrls);
	}, [uploadedUrls]);

	return (
		<Container>
			{uploadedUrls.length > 0 && (
				<ImagePreviewContainer>
					{uploadedUrls.map((url, index) => {
						if (url instanceof File) {
							const isVideo = url.type.startsWith("video/");
							return isVideo ? (
								<video
									key={index}
									controls
									style={{display: index === currentSlide ? "block" : "none"}}
								>
									<source src={URL.createObjectURL(url)} type={url.type} />
									비디오를 표시할 수 없습니다.
								</video>
							) : (
								<img
									key={index}
									src={URL.createObjectURL(url)}
									alt={`Media at ${index}`}
									style={{display: index === currentSlide ? "block" : "none"}}
								/>
							);
						} else {
							return (
								<img
									key={index}
									src={url}
									alt={`Media at ${index}`}
									style={{display: index === currentSlide ? "block" : "none"}}
								/>
							);
						}
					})}
					<PrevButton onClick={prevSlide} isDisabled={uploadedUrls.length <= 1}>
						<IoIosArrowBack />
					</PrevButton>

					<NextButton onClick={nextSlide} isDisabled={uploadedUrls.length <= 1}>
						<IoIosArrowForward />
					</NextButton>
				</ImagePreviewContainer>
			)}
			<ImageUploader>
				<input
					type="file"
					multiple={maxFiles > 1}
					accept="image/*,video/*"
					onChange={onImageChange}
					disabled={uploadedUrls.length >= maxFiles}
					id="media-upload"
					hidden
				/>
				<UploadWrap>
					<UploadButton
						htmlFor="media-upload"
						disabled={uploadedUrls.length >= maxFiles}
					>
						{uploadedUrls.length < maxFiles
							? "이미지/동영상 추가하기"
							: "업로드 제한 도달"}
					</UploadButton>
					<UploadText>업로드된 미디어 수: {uploadedUrls.length}</UploadText>
					<DeleteButton onClick={handleFileDeletion}>Delete</DeleteButton>
				</UploadWrap>
			</ImageUploader>
		</Container>
	);
};

export default EditImage;
