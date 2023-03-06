const SessionController = require('../../../src/controllers/session-ctrl');
const SessionService = require('../../../src/services/session-service')
const User = require('../../../src/schemas/User');
const UserService = require('../../../src/services/user-service');
const {userSessionMock, userExistsAndCheckPasswordMock} = require('../../mocks/session-mock');
const {requestMockByParam, requestMock, responseMock } = require('../../mocks/controllers-mocks');
const user = require('../../mocks/user-mock');
const Email = require('../../../src/utils/email-validator');
const { isValid } = require('../../../src/utils/email-validator');


const UserServiceMock = class User {
    static async findOne() {

        return ({ userSessionMock })
    }
}

describe('SESSION CONTROLLER', ()=>{



    it('Should return 400 if email is invalid', async()=>{
        const res = await SessionController.create(requestMockByParam({
            email:'mail@mail'}),
            responseMock);
        expect(res.status).toBe(400);
        expect(res.data).toBe('Email inválido');
    });

    it('Should return 404 if user does not exist', async () => {
        jest.spyOn(UserService, 'userExistsAndCheckPassword').mockImplementationOnce(userExistsAndCheckPasswordMock);
       
        const res = await SessionController.create(requestMockByParam({
            email:'fake@email.com',
            password:'pass123'}), responseMock);

        expect(res.status).toBe(404);
        expect(res.data).toBe('Usuário não encontrado');

    }); 

    it('Should return 400 if user password no match', async  ()=>{
        jest.spyOn(UserService, 'userExistsAndCheckPassword').mockImplementationOnce(userExistsAndCheckPasswordMock);
      
        const res = await SessionController.create(requestMock, responseMock);
        
        expect(res.status).toBe(400);
        expect(res.data).toBe('As senhas não batem');


    });

    it('Should return 200 if create session and token generate', async ()=>{
        jest.spyOn(UserService, 'userExistsAndCheckPassword').mockImplementationOnce(userExistsAndCheckPasswordMock);
        jest.spyOn(SessionService, 'generateToken').mockImplementationOnce(() => '123')

        const res = await SessionController.create(requestMockByParam(userSessionMock), responseMock);

        expect(res.status).toBe(200);
        expect(res.data).toHaveProperty('token');

    });


});