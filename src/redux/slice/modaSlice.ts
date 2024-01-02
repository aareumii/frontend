import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ModalTypes} from "../../components/modal/modalTypes";

interface ModalPayload {
	// payload의 type 예시
	// message: string;
	// obj: object;
}

interface ModalState {
	isOpen: boolean;
	type: ModalTypes | null;
	payload: ModalPayload | null | undefined;
}

const initialState: ModalState = {
	isOpen: false,
	type: null,
	payload: null
};

export const modalSlice = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openModal: (
			state,
			action: PayloadAction<{type: ModalTypes; payload?: ModalPayload}>
		) => {
			state.isOpen = true;
			state.type = action.payload.type;
			state.payload = action.payload.payload;
		},
		closeModal: state => {
			state.isOpen = false;
			state.type = null;
			state.payload = null;
		}
	}
});

export const {openModal, closeModal} = modalSlice.actions;

export default modalSlice.reducer;
