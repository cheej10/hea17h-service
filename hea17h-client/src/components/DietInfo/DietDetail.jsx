import React from 'react';
import styled from 'styled-components';
import TitleText from './TitleText';
import ImageBadge from './ImageBadge';
import Badge from '../Badge';

function DietDetail({ meal }) {
    let imgName = '';

    if (meal.mealType === '아침') {
        imgName = 'morning';
    } else if (meal.mealType === '점심') {
        imgName = 'afternoon';
    } else {
        imgName = 'night';
    }

    return (
        <DietContainer key={meal._id}>
            <ImageBadgeContainer>
                <ImageBadge
                    imgUrl={`${process.env.PUBLIC_URL}/assets/${imgName}.png`}
                />
                <p>{meal.mealType}</p>
            </ImageBadgeContainer>
            {meal.foods.map(({ category, categoryFoods }) => {
                let calorieByCategory = 0;

                categoryFoods.forEach(({ foodCalories }) => {
                    calorieByCategory += 1 * foodCalories;
                });

                return (
                    <Category key={category}>
                        <div>
                            <TitleText>{category}</TitleText>
                            <Badge fontColor="#999999">
                                {calorieByCategory} kcal
                            </Badge>
                        </div>
                        {categoryFoods.map(
                            ({ image, name, foodCalories, _id }) => (
                                <div key={_id}>
                                    <ImageBadge imgUrl={image} />
                                    <Badge fontColor="#999999">
                                        {`${name} X ${1} = ${
                                            foodCalories * 1
                                        } kcal`}
                                    </Badge>
                                </div>
                            ),
                        )}
                    </Category>
                );
            })}

            <TotalCalorie>
                <TitleText>총합</TitleText>
                <Badge fontColor="#999999">{meal.mealCalories} kcal</Badge>
            </TotalCalorie>
        </DietContainer>
    );
}

const DietContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ImageBadgeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;

    & > p {
        font-weight: bold;
    }
`;

const Category = styled.div`
    margin: 10px 0;

    & > div {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 5px;
    }
`;

const TotalCalorie = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 15px;
`;

export default DietDetail;
