export const getUsers = () => {
    try {
        const users = [
            {id: "1", email: "john@gmail.com", pwd: "12345"},
            {id: "2", email: "anna@gmail.com", pwd: "123"},
            {id: "3", email: "andy@gmail.com", pwd: "00000"},
            {id: "4", email: "maria@gmail.com", pwd: "54321"},
            {id: "5", email: "george@gmail.com", pwd: "56789"}
        ];

        return users;
    } catch (error) {
        console.log('Error', error);
    }
};

export const validateUser = (email, password) => {
    let logged = getUsers().find(rad => rad.email === email);

    const validated = logged && logged.pwd == password;

    return validated;
};

export const getProducts = () => {
    try {
        const products = [
            {
                id: "1",
                name: "Skor",
                descr: "Fina Skor",
                stock: 100,
                price: 40,
                src: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            },
            {
                id: "2",
                name: "Väska",
                descr: "Praktisk liten väska",
                stock: 1000,
                price: 140,
                src: "https://images.unsplash.com/photo-1620786514669-06e2340fce71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGJhZ3xlbnwwfDJ8MHx8&auto=format&fit=crop&w=800&q=60"
            },
            {
                id: "3",
                name: "Hörlurar",
                descr: "Noisecancelling hörlurar",
                stock: 200,
                price: 2340,
                src: "https://images.unsplash.com/photo-1638803782506-d975a6809f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjl8fGhlYWRwaG9uZXN8ZW58MHwyfDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
            },
            {
                id: "4",
                name: "Vattenflaska",
                descr: "Hållbar vattenflaska",
                stock: 10,
                price: 7989123,
                src: "https://images.unsplash.com/photo-1625708458528-802ec79b1ed8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym90dGxlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=800&q=60"
            },
        ];
        return products;
    } catch (error) {
        console.log('Error', error);
    }
};