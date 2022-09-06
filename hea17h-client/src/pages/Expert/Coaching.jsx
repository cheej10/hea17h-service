import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Nav from '../../components/Nav';
import Box from '../../components/Box';
import Button from '../../components/Button';
import DietTheme from '../../components/DietInfo/DietTheme';
import TopButton from '../../components/TopButton';
import Loading from '../../components/Loading';
import convertDate from '../../utils';
import * as Api from '../../api';

function Coaching() {
    const [dietList, setDietList] = useState([]);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);

        const { data } = await Api.get('/diets/getAllDiet');

        // 최신순 정렬
        const sortedData = data.payload.payload.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        );

        setDietList(sortedData);
        setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>
            <Nav />
            {loading ? <Loading /> : null}
            <MainContainer>
                <h2>코칭</h2>
                <Container width="100%" color="white">
                    {dietList.map(diet => (
                        <DietTheme
                            key={diet._id}
                            date={convertDate(diet.createdAt)}
                            name={diet.name}
                            totalCalories={diet.totalCalories}
                        >
                            {diet.comment.length > 0 ? (
                                <ButtonLink to={`/coachingRead/${diet._id}`}>
                                    <Button width="10rem" color="#51CF66">
                                        코멘트 보기
                                    </Button>
                                </ButtonLink>
                            ) : (
                                <ButtonLink to={`/coachingWrite/${diet._id}`}>
                                    <Button width="10rem" color="#FD7E14">
                                        코멘트 작성
                                    </Button>
                                </ButtonLink>
                            )}
                        </DietTheme>
                    ))}
                </Container>
                <TopButton />
            </MainContainer>
        </div>
    );
}

const MainContainer = styled.div`
    width: 85vw;
    margin: 50px auto 0;

    & > h2 {
        margin-bottom: 20px;
    }
`;

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    padding: 50px 0;
`;

const ButtonLink = styled(Link)`
    text-decoration: none;
`;

export default Coaching;
