import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import * as Api from '../../api';
import Button from '../Button';

function CommentInput({ dietId }) {
    const [comment, setComment] = useState('');
    const navigate = useNavigate();

    const inputComment = e => {
        setComment(e.target.value);
    };

    const addComment = async () => {
        const res = await Api.post('/diets/addComment', {
            dietId,
            comment,
        });

        if (res.status === 200) {
            navigate(`/coachingRead/${dietId}`);
        }
    };

    return (
        <Root>
            <textarea onChange={inputComment} />
            <div>
                <Button width="10rem" color="#51CF66" onClick={addComment}>
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
    }

    & > div {
        display: flex;
        justify-content: center;
    }
`;

export default CommentInput;