const database ={
    users: [
        {
            id: '123',
            name: 'test',
            email: 'test@test.pl',
            password: 'test',
            entries: 0,
            joined: new Date(),
        },
        {
            id: '14',
            name: 'Miłosz',
            email: 'mil@sz.com',
            password: 'milosz',
            entries: 0,
            joined: new Date(),
        },
        {
            id: '1234',
            name: 'Gosia',
            email: 'gosia@wp.pl',
            password: 'gosia',
            entries: 0,
            joined: new Date(),
        },
    ]
}

module.exports = {
    database: database
}