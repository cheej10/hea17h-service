import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setComments } from '../../slices/CommentSlice';
import CommentView from './CommentView';
import Button from '../Button';

function Comment({ commentInfo, myId, dietId }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setComments(commentInfo));
    }, []);

    const { comments } = useSelector(state => state.comment);
    const expertsId = comments.map(({ expert }) => expert?.user);

    return (
        <Root>
            {comments.map(({ content, expert, _id }) => (
                <CommentView
                    key={_id}
                    content={content}
                    expert={expert}
                    myId={myId}
                    dietId={dietId}
                    commentId={_id}
                />
            ))}
            {!expertsId.find(id => id === myId) && (
                <ButtonLink to={`/coachingWrite/${dietId}`}>
                    <Button width="10rem" color="#FD7E14">
                        코멘트 작성
                    </Button>
                </ButtonLink>
            )}
        </Root>
    );
}

const Root = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ButtonLink = styled(Link)`
    text-decoration: none;
    margin: 10px auto;
`;

export default Comment;
