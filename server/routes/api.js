const express = require("express")
const admin = require("firebase-admin")
const nanoid = require("nanoid")
const _ = require("underscore")
const sanitizeHtml = require("sanitize-html")

const serviceAccount = require("./adminsdk.js")
const firebase = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://madokatanka.firebaseio.com",
})
const database = firebase.database().ref().child("madokatanka")
const userdata = firebase.database().ref().child("userdata")
const router = express.Router()


router.all("/tanka", (req, res, next) => {

    next()

/**
 * @api {get} /api/tanka?month
 * @apiGroup API/TANKA
 * @apiName GetTanka
 * @apiParam {String} month Month (YYYYMM)
 * @apiSuccess {Object} contents Tanka poems.
 */
}).get("/tanka", (req, res) => {

    database.orderByChild("month").limitToLast(200).once("value", snapshot => {
        const w = snapshot.val()
        const contents = _.chain(w)
            .map((val, key) => {
                return {
                    id: key,
                    body: val.body,
                    month: val.month
                }
            })
            .where({ month: req.query.month })
            .map(val => {
                return {
                    id: val.id,
                    body: val.body
                }
            })
            .value()
        res.status(200).json({ data: contents })
    })
    .catch(error => {
        res.status(500).send({ e: error })
    })

/**
 * @api {post} /api/tanka
 * @apiGroup API/TANKA
 * @apiName PostTanka
 * @apiParam {String} data Poem body.
 * @apiParam {String} month Month (YYYYMM)
 * @apiSuccess (200) success
 */
}).post("/tanka", (req, res) => {

    const sanitized = sanitizeHtml(req.body.data, {
        allowedTags: ["span", "ruby", "rb", "rt", "rp", "pack"],
        allowedAttributes: {
            "*": ["name"]
        },
        allowedClasses: {
            span: [
                "tcy",
                "empha-dot-open",
                "empha-dot-filled",
                "empha-circle-open",
                "empha-circle-filled",
                "empha-double-circle-open",
                "empha-double-circle-filled",
                "empha-triangle-open",
                "empha-triangle-filled",
                "empha-sesame-open"
            ],
            ruby: ["tcy"]
        },
        parser: {
            decodeEntities: true,
            lowerCaseTags: true,
            lowerCaseAttributeNames: true
        }
    })

    database.child(nanoid())
        .set({
            body: sanitized,
            month: req.body.month
        })
        .then(() => {
            res.status(200).end()
        })
        .catch(error => {
            console.error(error)
            res.status(403).send({ e: error })
        })

/**
 * @api {put} /api/tanka
 * @apiGroup API/TANKA
 * @apiName RemoveTanka
 * @apiParam {String} data Poem id.
 * @apiSuccess (200) success
 */
}).put("/tanka", (req, res) => {

    database.child(req.body.data)
        .remove()
        .then(() => {
            res.status(200).end();
        })
        .catch(error => {
            res.status(403).send({ e: error });
        })

})


router.all("/albums", (req, res, next) => {

    next()

/**
 * @api {get} /api/albums/:id
 * @apiGroup API/ALBUMS
 * @apiName GetAlbums
 * @apiParam {String} id User id.
 * @apiSuccess {Object} data User data.
 */
}).get("/albums/:id", (req, res) => {

    if (req.params.id) {
        userdata.once("value", snapshot => {
            const w = snapshot.val()
            const contents = _.chain(w)
                .map((val, key) => {
                    return {
                        id: val.id,
                        authuser: key,
                        name: val.name,
                        albums: val.albums
                    }
                })
                .where({ id: req.params.id })
                .map(val => {
                    return {
                        id: val.id,
                        name: val.name,
                        albums: val.albums
                    }
                })
                .value()
            res.status(200).json({ data: contents[0] })
        })
        .catch(error => {
            res.status(500).send({ e: error })
        })
    } else {
        res.status(403).end()
    }

/**
 * @api {put} /api/albums
 * @apiGroup API/ALBUMS
 * @apiName GetUserData
 * @apiParam {String} authuser User id.
 * @apiSuccess {Object} data User data.
 */
}).put("/albums", (req, res) => {

    userdata.once("value", snapshot => {
        const w = snapshot.val()
        const contents = _.chain(w)
            .map((val, key) => {
                return {
                    id: val.id,
                    authuser: key,
                    name: val.name,
                    albums: val.albums
                }
            })
            .where({ authuser: req.body.authuser })
            .map(val => {
                return {
                    id: val.id,
                    name: val.name,
                    albums: val.albums
                }
            })
            .value()
        res.status(200).json({ data: _.isEmpty(contents)
            ? {
                id: nanoid(8),
                name: "匿名のユーザー",
                albums: [{
                    key: 0,
                    title: "まだ１件も保存されていません",
                    url: ""
                }]
            }
            : contents[0]
        })
    })
    .catch(error => {
        res.status(500).send({ e: error })
    })

/**
 * @api {post} /api/albums
 * @apiGroup API/ALBUMS
 * @apiName UpdateUserData
 * @apiParam {String} authuser User id.
 * @apiParam {Object} data User data
 * @apiSuccess (200) success
 */
}).post("/albums", (req, res) => {

    userdata.child(req.body.authuser)
        .set(req.body.data)
        .then(() => {
            res.status(200).end()
        })
        .catch(error => {
            res.status(403).send({ e: error })
        })

})

module.exports = router
