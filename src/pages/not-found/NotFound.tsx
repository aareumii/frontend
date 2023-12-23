import React from "react";
import {Link} from "react-router-dom";

import logoIcon from "../../assets/img/not-found/logoIcon.png";
import {
	ErrorContainer,
	LogoContainer,
	ErrorMessage,
	HomeButton
} from "./NotFoundStyles";

const NotFound: React.FC = () => {
	return (
		<ErrorContainer>
			<LogoContainer>
				<img src={logoIcon} alt="날씨어때" />
			</LogoContainer>

			<ErrorMessage>
				<p>
					죄송합니다.
					<br />
					원하시는 페이지를 찾을 수 없습니다.
				</p>
				<span>
					잘못된 주소거나 주소의 변경/삭제로 인해 사용하실 수 없습니다.
					<br />
					입력하신 페이지 주소를 다시 한번 확인해 주세요.
				</span>
			</ErrorMessage>

			<Link to={"/"}>
				<HomeButton>메인페이지 바로가기</HomeButton>
			</Link>
		</ErrorContainer>
	);
};

export default NotFound;
