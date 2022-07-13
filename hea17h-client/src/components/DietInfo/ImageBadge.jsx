import React from 'react';
import styled from 'styled-components';

function ImageBadge() {
    return <Div />;
}

const Div = styled.div`
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    background-color: white;

    @media (max-width: 768px) {
        width: 3rem;
        height: 3rem;
    }
`;

export default ImageBadge;