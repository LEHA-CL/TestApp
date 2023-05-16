import { authReducer, types } from "../../../src/auth";


describe('Pruebas en authReducer', () => {
    
    test('debe de retornar el estado por defecto', () => {

        const state = authReducer({ logged: false }, {});
        expect( state ).toEqual({ logged: false });

    });

    test('debe de  llamar el login autenticar y establecer el user', () => {

        const action = {
            type: types.login,
            payload: {
                fristName: 'Juan',
                lastName: '123',
                correo : 'juan@gmail.com',
                avatar : 'jaun.jpg'
            }
        }

        const state = authReducer({ logged: false }, action );
        expect( state ).toEqual({
            logged: true,
            user: action.payload
        })

    });

    test('debe de (logout) borrar el name del usuario y logged en false ', () => {

        const state = {
            logged: true,
            user: {  fristName: 'Juan',
            lastName: '123',
            correo : 'juan@gmail.com',
            avatar : 'jaun.jpg' }
        }

        const action = {
            type: types.logout
        }

        const newState = authReducer( state, action );
        expect( newState ).toEqual({ logged: false })

    });



});