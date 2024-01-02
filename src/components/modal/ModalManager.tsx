import React from "react";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../redux/store/store";
import {closeModal} from "../../redux/slice/modaSlice";
import {ModalTypes} from "./modalTypes";

const ModalManager: React.FC = () => {
	const {isOpen, type} = useSelector((state: RootState) => state.modal);
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(closeModal());
	};

	const renderModal = () => {
		// 예시(아래와 같이 생성한 모달을 import해서 타입에 따라 return해주세요)
		// switch (type) {
		// 	case ModalTypes.error:
		// 		return <ErrorModal onClose={handleClose} />;
		// 	default:
		// 		return null;
		// }
	};

	return <>{isOpen && renderModal()}</>;
};

export default ModalManager;
