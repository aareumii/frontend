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
}

const PostTopWrap: React.FC<TopWrapProps> = ({
	onTemperatureChange,
	onLocationUpdate
}) => {
	const navigate = useNavigate();

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

	const date = new Date();
	const currentDateAndTime = `${date.getFullYear()}-${String(
		date.getMonth() + 1
	).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
		date.getHours()
	).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

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
