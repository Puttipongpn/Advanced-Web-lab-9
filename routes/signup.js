const expressFunction = require('express');
const bcrypt = require('bcrypt');
var router = expressFunction();

const animal = require('../data/animal_data');


const makeHash = async (myText) => {
    const resultPromise = await bcrypt.hash(myText, 10);
    return resultPromise;
}

const insertAnimal = (dataUser) => {
    return new Promise((resolve, reject) => {
        var new_animal = {
            animal_id: dataUser.stdid,
            password: dataUser.password,
            name: dataUser.name,
            sex: dataUser.sex,
            age: dataUser.age,
        }
        console.log(new_animal);
        animal.push(new_animal)
        resolve({ message: 'Singn up successfully' });
    })
}

router.route('/signup')
    .post((req, res) => {
        makeHash(req.body.password)
            .then(hashText => {
                const payload = {
                    animal_id: req.body.animal_id,
                    password: hashText,
                    name: req.body.name,
                    sex: req.body.sex,
                    age: req.body.age,
                }
                insertAnimal(payload)
                    .then(result => {
                        console.log(result);
                        res.status(200).json({result,payload});
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
    })

module.exports = router

