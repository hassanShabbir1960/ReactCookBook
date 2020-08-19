const Menu = require('../Schemas/Menu');
exports.create = async (req, res) => {
    try {
        let { foodName, image, price, serves, discount } = req.body;
        let body = new Menu({
            foodName: foodName,
            image: image,
            price: price,
            serves: serves,
            discount: discount ? discount : 0,
            active: true
        })
        await body.save();
        return res.send("Your New Menu Saved SuccessFully!!")
    } catch (error) {
        res.status(400).send(error.message)
    }
}

exports.getAllMenu = async (req, res) => {
    try {
        let query = {
            "active": true
        }
        let response = await Menu.aggregate([
            { $match: query },
            {
                $project: {
                    menu: "$$ROOT"
                }
            }
        ])
        return res.send(response)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
