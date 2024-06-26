const User = require("../../models/User")

const user = async() => {
    const user = {
        firstName: "Josephine",
        lastName: "March",
        email: "josephine@gmail.com",
        password: "josephine1234",
        phone: "987654321"
    }
    await User.create(body)
}

module.exports = user;