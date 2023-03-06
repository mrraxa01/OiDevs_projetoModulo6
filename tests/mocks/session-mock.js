const Email = require("../../src/utils/email-validator");

const userSessionMock = {
    name: 'Faker',
    email: 'faker@email.com',
    password: 'pass123'
}




 const userExistsAndCheckPasswordMock = async ({email, password}) => {
  
    if(email == 'fake@email.com'){
       
        return false;
    }
    
    if(password !== 'pass123') {
        throw { status: 400, message: 'As senhas não batem' }
    }
   
    return true;
}

module.exports = {
    userSessionMock,
    userExistsAndCheckPasswordMock,
    
}