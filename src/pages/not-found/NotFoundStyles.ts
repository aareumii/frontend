import styled from "styled-components";

export const ErrorContainer = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const LogoContainer = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 30px;
	img {
		width: 40%;
		max-width: 300px;
	}
`;

export const ErrorMessage = styled.div`
	width: 90%;
	text-align: center;
	p {
		font-size: 1.875rem;
		font-weight: bold;
		color: #5d6dbe;
		margin-bottom: 10px;
	}
	span {
		line-height: 1.5rem;
	}
	@media (max-width: 430px) {
		p {
			font-size: 1.375rem;
		}
		span {
			font-size: 0.75rem;
			line-height: 0.875rem;
		}
	}
`;

export const HomeButton = styled.button`
	width: 100%;
	font-size: 1.125rem;
	font-weight: bold;
	color: #fff;
	text-align: center;
	border: none;
	border-radius: 10px;
	background-color: #5d6dbe;
	padding: 10px 25px;
	margin-top: 30px;
	cursor: pointer;
	&:hover {
		background-color: #4f5da1;
		transition: all 0.3s ease-in-out;
	}
`;
