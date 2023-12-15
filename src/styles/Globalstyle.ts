import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

export const GlobalStyle = createGlobalStyle`
  ${reset}
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Jua', sans-serif;
    color: #000;
  
  }

  /* 다른 HTML 요소들에 대한 스타일 */
  a {
    text-decoration: none;
    color: inherit;
  }

  input textarea {
    font-family: inherit;

  }

	button {
		width: 80px;
		border: none;
		padding: 8px;
		border-radius: 15px;
		margin-left: 10px;
		background-color: #adadad;
		color: #fff;
		font-family: 'jua', sans-serif;
		&:hover {
			background-color: #8c8c8c; // 호버 시 배경색 변경
		}
		&:last-child {
			background-color: #5d6dbe;
			&:hover {
				background-color: #4c5ca7; // 호버 시 배경색 변경
			}
		}
	}
`;
