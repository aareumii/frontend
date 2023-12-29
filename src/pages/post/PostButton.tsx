// ButtonWrap.tsx

// eslint-disable-next-line @typescript-eslint/naming-convention
import React from "react";
import {Wrap} from "./PostButtonStyles";

interface PostButtonProps {
	onSave: () => void;
	onCancel: () => void;
	onDelete?: () => void; // onDelete 함수를 선택적으로 받도록 수정
	isEditing: boolean; // isEditing 프롭스를 추가
}

const PostButton: React.FC<PostButtonProps> = ({
	onSave,
	onCancel,
	onDelete, // onDelete 함수 추가
	isEditing
}) => {
	return (
		<Wrap>
			{isEditing ? (
				<>
					<button onClick={onCancel}>취소</button>
					{onDelete && <button onClick={onDelete}>삭제</button>}{" "}
					{/* onDelete 함수가 존재할 때만 렌더링 */}
					<button onClick={onSave}>수정</button>
				</>
			) : (
				<>
					<button onClick={onCancel}>취소</button>
					<button onClick={onSave}>저장</button>
				</>
			)}
		</Wrap>
	);
};

export default PostButton;
