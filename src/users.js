const users = [
    {
        id: "1",
        name: "user1",
        role: "CUST"
    },
    {
        id: "2",
        name: "user2",
        role: "ADMIN"
    },
    {
        id: "3",
        name: "user3"
    }
]

export const getUser =  (name) => users.find(user => user.name == name)