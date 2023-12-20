import styled, {keyframes} from "styled-components";

const RotationSun = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingContainer = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const LoadingIconContainer = styled.div`
	position: relative;
	width: 110px;
	height: 73px;
`;

const LoadingTextContainer = styled.div`
	width: 110px;
	text-align: center;
	margin-top: 10px;
	p {
		color: #5d6dbe;
	}
`;

const Sun = styled.img`
	position: absolute;
	width: 70px;
	height: 70px;
	animation: ${RotationSun} 3s infinite linear;
	top: 0px;
	right: 3px;
`;

const Cloud = styled.img`
	position: absolute;
	width: 80px;
	height: 80px;
	left: 7px;
	bottom: -11px;
`;

export {
	RotationSun,
	LoadingContainer,
	LoadingIconContainer,
	LoadingTextContainer,
	Sun,
	Cloud
};
