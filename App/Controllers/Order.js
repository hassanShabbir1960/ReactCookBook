const Order = require("../Schemas/Order");
const moment = require('moment')
const GlobalCount = require("../Schemas/GlobalCounter")
exports.create = async (req, res) => {
    try {
        let { orderedFoods, totalPrice, NofPersons, discount, delivery, gst, amountPayed, delivered } = req.body;
        let deliveryTime = moment().add(5, "hours")
        let globalCount = await GlobalCount.findOneAndUpdate({ active: true }, { $inc: { count: 1 } }).lean();
        let orderId = null
        if (globalCount) {
            orderId = `OID-${globalCount.count}`
        } else {
            let body = new GlobalCount({
                count: 1
            })
            let result = await body.save();
            orderId = `OID-${result.count}`
        }

        let body = new Order({
            orderID: orderId,
            orderedFoods: orderedFoods,
            totalPrice: totalPrice,
            NofPersons: NofPersons,
            deliveryTime: deliveryTime,
            total_gst: gst,
            discount: discount,
            delivery: delivery,
            amountPayed: amountPayed
        })
        await body.save();
        return res.send(`Your Order created Successfully. Track your order against OrderID=${orderId}...`)
    } catch (err) {
        return res.status(400).send(err.message)
    }
}
exports.trackOrder = async (req, res) => {
    try {
        let { orderNumber } = req.params;
        let query = {
            orderID: new RegExp(`^${orderNumber}`, "i")
        }
        let response = await Order.aggregate([
            { $match: query },
            {
                $addFields: {
                    duration: { $round: [{ $divide: [{ $subtract: ["$deliveryTime", moment().toDate()] }, 3600000] }, 1] }
                }
            },
            { $sort: { createdAt: -1 } },
        ])
        return res.send(response[0])
    } catch (error) {
        return res.status(400).send(error.message)
    }
}
exports.getTodayOrder = async (req, res) => {
    try {

        let query = {};
        query["createdAt"] = { $gte: new Date(moment().startOf('day')), $lte: new Date(moment().endOf('day')) }

        let response = await Order.aggregate([
            { $match: query },
            {
                "$group": {
                    "_id": null,

                    "tags": { "$addToSet": "$orderedFoods" }
                }
            },
            {
                "$addFields": {
                    "foodsArray": {
                        "$reduce": {
                            "input": "$tags",
                            "initialValue": [],
                            "in": { "$setUnion": ["$$value", "$$this"] }
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    orderedFoods: "$foodsArray"
                }
            },
            { $unwind: "$orderedFoods" },
            {
                "$group": {
                    "_id": "$orderedFoods.food_id",
                    "count": { "$sum": 1 },
                }
            },
            {
                $lookup:
                {
                    from: "menus",
                    localField: "_id",
                    foreignField: "_id",
                    as: "menu"
                }
            },
            {
                $addFields: {
                    menu: { $arrayElemAt: ['$menu', 0] }
                }
            }


        ])
        return res.send(response)
    } catch (error) {
        return res.status(400).send(error.message)
    }
}
