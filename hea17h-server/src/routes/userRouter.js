/* eslint-disable no-console */
import { Router } from 'express';
import is from '@sindresorhus/is';
import axios from 'axios';
import { userService } from '../services/index.js';
import { isLoggedIn } from '../middlewares/index.js';
import { uploadExpert } from '../utils/index.js';

const userRouter = Router();

userRouter.get('/getUser', isLoggedIn, async (req, res, next) => {
    try {
        const userInfo = req.tokenInfo;
        const foundUser = await userService.getUser(userInfo);
        console.log(`불러오기 성공!${foundUser.name}`);
        res.json(foundUser);
    } catch (err) {
        next(err);
    }
});

userRouter.get('/getExpertInfo', isLoggedIn, async (req, res, next) => {
    try {
        const userInfo = req.tokenInfo;
        const result = await userService.getCertificate(userInfo);
        res.status(result.statusCode).json(result);
    } catch (err) {
        next(err);
    }
});

userRouter.get('/kauth/callback', async (req, res, next) => {
    const { code } = req.query;
    try {
        await axios
            .post(
                `${process.env.KAKAO_OAUTH_TOKEN_API_URL}?grant_type=authorization_code&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}`,
                {
                    headers: {
                        'Content-type':
                            'application/x-www-form-urlencoded;charset=utf-8',
                    },
                },
            )
            .then(async result => {
                if (!result) {
                    res.status(404).redirect('http://localhost:3000/login');
                } else {
                    await axios
                        .get('https://kapi.kakao.com/v2/user/me', {
                            headers: {
                                Authorization: `Bearer ${result.data.access_token}`,
                            },
                        })
                        .then(async resultData => {
                            const result = await userService.addUser({
                                id: resultData.data.id,
                                name: resultData.data.properties.nickname,
                                password: 'kakaoUser',
                            });
                            console.log(result);
                            res.status(200).redirect(
                                'http://localhost:3000/signup/complete',
                            );
                        });
                }
            });
    } catch (err) {
        next(err);
    }
});

userRouter.patch('/updateUser', isLoggedIn, async (req, res, next) => {
    try {
        const userInfo = req.body;
        const afterUpdateUserInfo = await userService.updateUser(userInfo);
        console.log(afterUpdateUserInfo);
        res.json(afterUpdateUserInfo);
    } catch (err) {
        next(err);
    }
});

userRouter.patch('/signUpDetail', async (req, res, next) => {
    try {
        const userInfo = req.body;
        const updatedUser = await userService.updateUser(userInfo);
        res.json(updatedUser);
    } catch (err) {
        next(err);
    }
});

userRouter.post('/signUp', async (req, res, next) => {
    try {
        const { id, name, password } = req.body;
        const newUser = await userService.addUser({
            id,
            name,
            password,
        });
        console.log(`삽입 성공! ${newUser.name} 가 회원가입되었습니다`);
        res.json(newUser);
    } catch (err) {
        next(err);
    }
});

userRouter.post('/login', async (req, res, next) => {
    try {
        const { id, password } = req.body;
        const loginInfo = { id, password };
        const result = await userService.login(loginInfo);
        res.status(result.statusCode).json(result);
    } catch (err) {
        next(err);
    }
});

userRouter.post(
    '/registerExpert',
    isLoggedIn,
    uploadExpert.single('image'),
    async (req, res, next) => {
        try {
            if (is.emptyObject(req.body)) {
                res.status(400).json(
                    'header의 ContentType을 multipart/formdata 로 설정해주세요',
                );
            }
            const userInfo = req.tokenInfo;
            const image = req.file.location;
            const { name } = req.body;
            const certificateInfo = { name, image };
            const result = await userService.addExpert(
                userInfo,
                certificateInfo,
            );
            res.status(result.statusCode).json(result);
        } catch (err) {
            next(err);
        }
    },
);

userRouter.delete('/deleteUser', isLoggedIn, async (req, res, next) => {
    try {
        const { id, password } = req.body;
        const result = await userService.deleteUser(id, password);
        res.status(result.statusCode).json(result);
    } catch (err) {
        next(err);
    }
});

export default userRouter;
