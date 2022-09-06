import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as Api from '../../api';
import Button from '../Button';

function CommentInput({
    dietId,
    content,
    commentId,
    clickEditBtn,
    handleClick,
    updateComment,
}) {
    const comment = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (clickEditBtn) {
            comment.current.value = content;
        }
    }, []);

    const inputComment = e => {
        comment.current = e.target.value;
    };

    const addComment = async () => {
        const res = await Api.post('/diets/addComment', {
            dietId,
            comment: comment.current,
        });

        if (res.status === 200) {
            navigate(`/coachingRead/${dietId}`);
        }
    };

    const editComment = async () => {
        await Api.patch('/diets/modifyComment', {
            dietId,
            commentId,
            content: comment.current,
        });

        handleClick();
        updateComment(comment.current);
    };

    return (
        <Root>
            <textarea onChange={inputComment} ref={comment} />
            <div>
                <Button
                    width="10rem"
                    color="#51CF66"
                    onClick={clickEditBtn ? editComment : addComment}
                >
                    작성 완료
                </Button>
            </div>
        </Root>
    );
}

const Root = styled.div`
    & > textarea {
        padding: 10px;
        width: 100%;
        height: 200px;
        resize: none;
        outline: none;
        border: 1px solid #d9d9d9;

        @media (max-width: 768px) {
            font-size: 0.8rem;
        }
    }

    & > div {
        display: flex;
        justify-content: center;
    }
`;

export default CommentInput;
