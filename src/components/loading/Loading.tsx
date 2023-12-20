// eslint-disable-next-line @typescript-eslint/naming-convention
import React from "react";

import sun from "../../assets/img/loading/sun.svg";
import cloud from "../../assets/img/loading/cloud.svg";
import {
	LoadingContainer,
	LoadingIconContainer,
	LoadingTextContainer,
	Sun,
	Cloud
} from "./LoadingStyles";

const Loading: React.FC = () => {
	return (
		<LoadingContainer>
			<LoadingIconContainer>
				<Sun src={sun} alt="Sun" />
				<Cloud src={cloud} alt="Cloud" />
			</LoadingIconContainer>
			<LoadingTextContainer>
				<p>로딩중입니다</p>
			</LoadingTextContainer>
		</LoadingContainer>
	);
};

export default Loading;
