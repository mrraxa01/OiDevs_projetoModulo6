const dotenv = require('dotenv');
dotenv.config();
const SessionService = require('../../../src/services/session-service');

describe('SESSION SERVICE', () => {

    it('Should return Token if valid email provided', async ()=>{

        const res = await SessionService.generateToken({email:'fake@mail.com'})
        const tokenPrototype = new RegExp(/^[A-Za-z0-9-=]+.[A-Za-z0-9-=]+.?[A-Za-z0-9-_.+/=]*$/)
        expect(res).toMatch(tokenPrototype);

    });

});