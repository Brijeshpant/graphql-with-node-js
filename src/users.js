const users = [
    {
        name: "Brij",
        id: "1",
        role: "USER"
    },
    {
        name: "BP",
        id: "2",
        role: "ADMIN"
    },
    {
        name: "invalid",
        id: "3"
    }
]

export const getValidUser = (auth) => users.find(user => user.name == auth)