const User = require('../models/user.js');

exports.list = async () => {
    try {
        let users = await User.findAll();
        return {
            status: 200,
            data: users
        };

    } catch (error) {
        return error
    }
}

exports.get = async (id) => {
    try {
        let user = await User.findByPk(id);
        return {
            status: 200,
            data: user
        };

    } catch (error) {
        return error
    }
}

exports.create = async (data) => {
    try {
        let user = await User.create({
            name: data.name,
            age: data.age,
            email: data.email
        });
        return {
            status: 201,
            data: user
        };

    } catch (error) {
        return error
    }
}

exports.update = async (data, id) => {
    try {
        let user = await User.findByPk(id);

        user.name = data.name;
        user.age = data.age;
        user.email = data.email;

        let savedResult = await user.save();
        return {
            status: 201,
            data: savedResult
        };

    } catch (error) {
        return error
    }
}

exports.delete = async (id) => {
    try {
        let user = await User.findByPk(id);

        user.destroy()

        return {
            status: 200
        };
    } catch (error) {
        return error
    }
}