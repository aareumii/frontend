// eslint-disable-next-line @typescript-eslint/naming-convention
import React from "react";
import {useNavigate} from "react-router-dom";
import {HiArrowLeft} from "react-icons/hi";
import {MdPlace} from "react-icons/md";
// eslint-disable-next-line @typescript-eslint/naming-convention
import LocationInfo from "../../components/location/Location";
// eslint-disable-next-line @typescript-eslint/naming-convention
import WeatherInfo from "../../components/weather/weather";
import {
	Wrap,
	Top,
	BackButton,
	Title,
	Bottom,
	Place,
	DateInfo
} from "./PostTopWrapStyles";

interface TopWrapProps {
	onLocationUpdate: (location: string) => void;
	onTemperatureChange: (temperature: number | null) => void;
	currentDateAndTime: string;
}

const PostTopWrap: React.FC<TopWrapProps> = ({
	onTemperatureChange,
	onLocationUpdate
}) => {
	const navigate = useNavigate();
	const formatDate = (date: Date): string => {
		return date.toISOString().replace("T", " ").substring(0, 19);
	};
	const currentDateAndTime = formatDate(new Date());
	const handleBack = () => {
		navigate(-1);
	};

	const handleTemperatureChange = (temperature: number | null) => {
		const tempValue = temperature !== null ? temperature : -999;
		console.log(tempValue);
		onTemperatureChange(tempValue); // 숫자 타입을 그대로 전달
	};

	const handleLocationUpdate = (location: string) => {
		console.log(location);
		onLocationUpdate(location);
	};

	return (
		<Wrap>
			<Top>
				<BackButton onClick={handleBack}>
					<HiArrowLeft />
				</BackButton>
				<Title>새 게시물</Title>
			</Top>
			<Bottom>
				<Place>
					<MdPlace color="#5d6dbe" />
					<LocationInfo onLocationUpdate={handleLocationUpdate} />
					&nbsp;
					<WeatherInfo onWeatherUpdate={handleTemperatureChange} />
				</Place>
				<DateInfo>
					<span>{currentDateAndTime}</span>
				</DateInfo>
			</Bottom>
		</Wrap>
	);
};

export default PostTopWrap;
