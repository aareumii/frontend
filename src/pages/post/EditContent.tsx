// eslint-disable-next-line @typescript-eslint/naming-convention
import React, {ChangeEvent} from "react";
import {Container, ContentTextarea, HashtagTextarea} from "./PostContentStyles";

interface EditContentProps {
	content: string;
	hashtags: string;
	handleContentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
	handleHashtagsChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const EditContent: React.FC<EditContentProps> = ({
	content,
	hashtags,
	handleContentChange,
	handleHashtagsChange
}) => {
	return (
		<Container>
			<label htmlFor="contentField">내용</label>
			<ContentTextarea
				id="contentField"
				value={content}
				onChange={handleContentChange}
				maxLength={300}
				placeholder=" 내용을 입력하세요."
			/>
			<label htmlFor="hashtagsField">해시태그</label>
			<HashtagTextarea
				id="hashtagsField"
				value={hashtags}
				onChange={handleHashtagsChange}
				maxLength={200}
				placeholder=" #해시태그를 입력하세요."
			/>
		</Container>
	);
};

export default EditContent;
