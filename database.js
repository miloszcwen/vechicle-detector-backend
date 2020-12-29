const database ={
    users: [
        {
            id: '123',
            name: 'test',
            email: 'test@test.pl',
            password: 'test',
            carCounter: 0,
            joined: new Date(),
        },
        {
            id: '14',
            name: 'Miłosz',
            email: 'mil@sz.com',
            password: 'milosz',
            carCounter: 0,
            joined: new Date(),
        },
        {
            id: '1234',
            name: 'Gosia',
            email: 'gosia@wp.pl',
            password: 'gosia',
            carCounter: 0,
            joined: new Date(),
        },
    ]
}

module.exports = {
    database: database
}