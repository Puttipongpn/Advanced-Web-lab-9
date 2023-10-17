const expressFunction = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = expressFunction.Router();

const animal = require("../data/animal_data");
const key = 'MY_KEY'
const comparaHash = async (plainText, hashText) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plainText, hashText, (err, data) => {
            if (err) {
                reject(new Error('Error bcrypt compare'))
            } else {
                resolve({ status: data })
            }
        })
    });
}

const findAnimal = (animal_id) => {
    return new Promise((resolve, reject) => {
        if (animal_id == "33333") {
            console.log("find animal")
            resolve(animal[2])
        } else {
            console.log("errorssadfsaf")
            reject(new Error('Cannot find animal'));
        }
    })
}

router.route('/signin')
    .post(async (req, res) => {
        const playload = {
            animal_id: req.body.animal_id,
            password: req.body.password
        }
        console.log(playload);

        try {
            const result = await findAnimal(playload.animal_id);
            const loginStatus = await comparaHash(playload.password, result.password);

            const status = loginStatus.status;

            if (status) {
                const token = jwt.sign(result, key, { expiresIn: 60 * 5 * 5 });
                res.status(200).json({ result, token, status });
            } else {
                res.status(200).json({ status })
            }
        } catch (error) {
            res.status(404).send(error)
        }
    })
module.exports = router