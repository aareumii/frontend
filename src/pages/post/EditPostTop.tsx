// eslint-disable-next-line @typescript-eslint/naming-convention
import React from "react";
import {useNavigate} from "react-router-dom";
import {HiArrowLeft} from "react-icons/hi";
import {MdPlace} from "react-icons/md";
import {
	Wrap,
	Top,
	BackButton,
	Title,
	Bottom,
	Place,
	DateInfo
} from "./EditPostTopStyles"; // 스타일 컴포넌트 경로

interface PostTopProps {
	temperature: number;
	location: string;
	currentDateAndTime: string;
}

const EditPostTop: React.FC<PostTopProps> = ({
	temperature,
	location,
	currentDateAndTime
}) => {
	const navigate = useNavigate();

	const handleBack = () => {
		navigate(-1);
	};

	// 날짜 형식을 읽기 쉬운 형태로 변환

	return (
		<Wrap>
			<Top>
				<BackButton color="#000" onClick={handleBack}>
					<HiArrowLeft />
				</BackButton>
				<Title>게시물 수정</Title>
			</Top>
			<Bottom>
				<Place>
					<MdPlace color="#5d6dbe" />
					<p>{location}</p>
					&nbsp;
					<p>{temperature ? `${temperature}°C` : "온도 정보 없음"}</p>
				</Place>
				<DateInfo>
					<span>{currentDateAndTime}</span> {/* 수정된 날짜 형식 사용 */}
				</DateInfo>
			</Bottom>
		</Wrap>
	);
};

export default EditPostTop;
