// ButtonWrapStyles.ts

import styled from "styled-components";

export const Wrap = styled.div`
	max-width: 600px;
	width: 100%;
	margin: 0 auto;
	display: flex;
	justify-content: flex-end;
`;

export const Button = styled.button`
	width: 80px;
	border: none;
	padding: 8px;
	border-radius: 15px;
	margin-left: 10px;
	font-family: "jua", sans-serif;
	cursor: pointer;

	&:first-child {
		background-color: #adadad;
		color: #fff;

		&:hover {
			background-color: #8c8c8c;
		}
	}

	&:last-child {
		background-color: #5d6dbe;
		color: #fff;

		&:hover {
			background-color: #4c5ca7;
		}
	}
`;
