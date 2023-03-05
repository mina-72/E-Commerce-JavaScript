const { User } = require('../models/userModel')
const bcrypt = require('bcryptjs')

exports.createUser = async (req, res) => {
    const salt = await bcrypt.genSaltSync(10)
    let user = new User({
        // passwordHash: await req.body.password,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartement: req.body.apartement,
        zip: req.body.zip,
        passwordHash: bcrypt.hashSync(req.body.password, salt),
    })
    const newuser = await user.save()

    if (!newuser) {
        res.status(500).json({ message: `can not create user` })
    } else {
        return res.status(201).json(newuser)
    }
}

exports.getAllUser = async (req, res) => {
    const userList = await User.find()
    if (!userList) {
        res.status(500).json({ message: `can not create user` })
    } else {
        return res.status(201).json({
            results: userList.length,
            data: userList,
        })
    }
}

exports.getUser = async (req, res) => {
    //.select('-passwordHash')
    const user = await User.findById(req.params.id)
    if (!user) {
        res.status(500).json({ message: `can not find user` })
    } else {
        return res.status(201).json({
            data: user,
        })
    }
}

exports.loginUser = async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send('can not find user')
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        res.status(200).send('user Authenticated')
    } else {
        res.status(400).send('password is wrong')
    }
}
