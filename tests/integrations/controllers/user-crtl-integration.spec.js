require('dotenv').config();
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const User = require('../../../src/schemas/User');
const UserController = require('../../../src/controllers/user-ctrl');
const {requestMock, requestMockWithoutEmail, requestMockWithoutPassword, requestMockByParam, responseMock} = require('../../mocks/controllers-mocks')

describe ('[Integration] User Controller', () =>{
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_DB_URL);
        
    });

    afterAll(async () => {
        await User.deleteMany({});
        mongoose.connection.close();
    });

    it('Should return 400 if an invalid email is provided', async() =>{
        const res = await UserController.create(requestMockByParam({
            name: faker.name.fullName(),
            email: 'invalidMail@mail',
            password: faker.internet.password()
        }), responseMock )

        expect(res.status).toBe(400);
        expect(res.data).toBe('Email inválido');
    });

   it('Should return 400 if password if not provided', async()=>{
        const res = await UserController.create(requestMockByParam({
            name: faker.name.fullName(),
            email: faker.internet.email(),
        }), responseMock);

        expect(res.status).toBe(400);
        expect(res.data).toBe('Senha inválida')
   }); 

   it('Should return 200 if data is valid and object is created', async()=>{

    const res = await UserController.create(requestMock, responseMock);
    expect(res.status).toBe(200);
    expect(res.data).toHaveProperty('id');
    });




});