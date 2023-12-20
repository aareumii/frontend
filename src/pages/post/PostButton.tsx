// ButtonWrap.tsx

// eslint-disable-next-line @typescript-eslint/naming-convention
import React from "react";
import {Wrap} from "./PostButtonStyles";

interface PostButtonProps {
	onSave: () => void;
	onCancel: () => void;
}

const PostButton: React.FC<PostButtonProps> = ({onSave, onCancel}) => {
	return (
		<Wrap>
			<button onClick={onCancel}>취소</button>
			<button onClick={onSave}>저장</button>
		</Wrap>
	);
};

export default PostButton;
