import React, {FC, ReactNode, useEffect} from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

interface ModallProps {
	onClose: () => void;
	children: ReactNode;
}

const Modal: FC<ModallProps> = ({children, onClose}) => {
	const modalRoot = document.getElementById("modal-root");

	useEffect(() => {
		if (!modalRoot) return;

		const scrollY = window.scrollY;
		document.body.style.cssText = `
      position: fixed;
      top: -${scrollY}px;
      overflow-y: scroll;
      width: 100%;`;

		return () => {
			document.body.style.cssText = "";
			window.scrollTo(0, scrollY);
		};
	}, [modalRoot]);

	return ReactDOM.createPortal(
		<ModalBg onClick={onClose}>
			<div onClick={e => e.stopPropagation()}>{children}</div>
		</ModalBg>,
		modalRoot!
	);
};

export default Modal;

const ModalBg = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
`;
