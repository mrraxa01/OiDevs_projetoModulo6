const jwt = require('jsonwebtoken');
const auth = require('../../../src/middlewares/auth')
const { authMock, responseMock} = require('../../mocks/controllers-mocks');

describe('AUTH MIDDLEWARES', ()=>{

    it('Should return 401 if token no provided', async ()=>{
        const res = await auth(authMock(""), responseMock);

        expect(res.status).toBe(401);
    });

    it('Should call next function if token is valid', async () => {
        const next = jest.fn();
        let spy = jest.spyOn(jwt, 'verify').mockImplementationOnce(() => ({email: 'email@mail.com'}))
        const res = await auth(authMock("token"), responseMock, next )
        expect(spy).toHaveBeenCalled()
        expect(next).toHaveBeenCalled()
    });

    it('Should return 401 if email is not provided', async () =>{
        const res = await auth(authMock('token'), responseMock);

        expect(res.status).toBe(401);
    });

});