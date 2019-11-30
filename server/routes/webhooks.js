const express = require("express")
const axiosBase = require("axios")
const bodyParser = require("body-parser")
const _ = require("underscore")
const sqlite3 = require("sqlite3")
const async = require("async")
const path = require("path")

const tankadb = path.resolve(__dirname, "datastore/tanka.db")
const vocabdb = path.resolve(__dirname, "datastore/vocab.db")

const axios = axiosBase.create({
    baseURL: (process.env.NODE_ENV === "production") ? "https://madokatanka.herokuapp.com" : "http://localhost:3000",
    headers: {
        "ContentType": "application/json",
        "X-Requested-With": "XMLHttpRequest"
    },
    timeout: 4000,
    responseType: "json"
})

const router = express.Router()
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({
    extended: true
}))


/**
 * @api {post} /webhooks/poem
 * @apiGroup WEBHOOKS/POEM
 * @apiName PoemCreation
 * @apiParam {String} keyphrase.phraselast Last term of keyphrase.
 * @apiParam {string} keyphrase.phrase Phrase body.
 * @apiParam {Number} keyphrase.mora Mora count of keyphrase
 * @apiSuccess {String} info Poem body.
 */
router.all("/poem", (req, res, next) => {
	
	// console.log(req.body)
	next()

}).post("/poem", (req, res) => {

    /**
     * PoemGenerator
     * @param {String} prefix - Prefix phrase.
     * @param {Number} expectation - Length of phrase coming out.
     * @return {Promise<string>} Poem body.
     */
    function generatePhrases(prefix, expectation) {
        if (expectation <= 0) {
            return {
                data: ""
            }
        }
        if (!_.isEmpty(prefix)) {
            return axios.put("/webhooks/find", {
                pref: prefix,
                expec: expectation
            }).then(response => {
                // console.log(response.data);
                return response.data.body
            });
        } else {
            return axios.put("/webhooks/random", {
                expec: expectation
            }).then(response => {
                // console.log(response.data);
                return response.data.body
            });
        }
    };

    /**
     * ConcatPhrases
     * @param {String[]} arr - Array of phrases.
     * @return {String} Phrase body.
     */
    function concatPhrases(arr) {
        const tmp = _.reduce(arr, (memo, str) => {
            return memo.concat(str)
        });
        return tmp
    }

    (async (keyphrase) => { console.info(keyphrase);

        try {
            const mora = Number(keyphrase.mora)

            if (mora <= 6) { // 6以下なら3句

                const one = await generatePhrases("", 5)
                const two = await generatePhrases("", 7)
                const four = await generatePhrases(keyphrase.phraselast, 7)
                const five = await generatePhrases("", 7)
                const text = concatPhrases([one, two, keyphrase.phrase, four, five])
                res.status(200).json({
                    info: text
                })

            } else if (mora >= 7 && mora <= 8) { // 7なら2句

                const one = await generatePhrases("", 5)
                const three = await generatePhrases(keyphrase.phraselast, 5)
                const four = await generatePhrases("", 7)
                const five = await generatePhrases("", 7)
                const text = concatPhrases([one, keyphrase.phrase, three, four, five])
                res.status(200).json({
                    info: text
                })

            } else if (mora >= 9 && mora <= 13) { // 2句3句

                const one = await generatePhrases("", 5)
                const four = await generatePhrases(keyphrase.phraselast, 7)
                const five = await generatePhrases("", 7)
                const text = concatPhrases([one, keyphrase.phrase, four, five])
                res.status(200).json({
                    info: text
                });

            } else if (mora >= 14 && mora <= 16) { // 14以上16以下なら下の句

                const one = await generatePhrases("", 5)
                const twothree = await generatePhrases("", 12)
                const text = concatPhrases([one, twothree, keyphrase.phrase])
                res.status(200).json({
                    info: text
                })

            } else if (mora >= 17 && mora <= 18) { // 上の句

                const four = await generatePhrases(keyphrase.phraselast, 7)
                const five = await generatePhrases("", 7)
                const text = concatPhrases([keyphrase.phrase, four, five])
                res.status(200).json({
                    info: text
                })

            } else if (mora === 19) { // 19なら先頭5を3句にして下の句

                const onetwo = await generatePhrases("", 12)
                const text = concatPhrases([onetwo, keyphrase.phrase])
                res.status(200).json({
                    info: text
                })

            } else {

                const onetwo = generatePhrases("", 31 - mora)
                const text = concatPhrases([onetwo, keyphrase.phrase])
                res.status(200).json({
                    info: text
                })

            }
        } catch (err) {
            console.error(err)
            const text = "うーん、いいのが思いつかないや……ごめんね。";
            res.status(200).json({
                info: text
            })
        }
    })(req.body)
});

/**
 * @api {put} /webhooks/find
 * @apiGroup WEBHOOKS/POEM
 * @apiName FindPhrasesComingAfterPrefix
 * @apiParam {String} pref Prefix.
 * @apiParam {Number} expec Expected length.
 * @apiError (500) error Unable to access database.
 * @apiSuccess {String} body Generated phrase.
 */
router.all("/find", (req, res, next) => {
	
	console.log(req.body)
	next()

}).put("/find", (req, res) => {

    const db = new sqlite3.Database(tankadb, sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err)
    })
    db.configure("busyTimeout", 3000)

    let prefix = decodeURIComponent(req.body.pref)
    let expectation = Number(req.body.expec)
    let moracount = 0

    let strArray = []

    async.whilst(
        () => {
            return (moracount < expectation)
        },
        (next) => {
            try {
                db.all("SELECT * FROM collection WHERE prefix = $pref AND slength <= $expec ORDER BY Random() LIMIT 1", {
                    $pref: prefix,
                    $expec: (expectation - moracount)
                }, (err, rows) => {
                    if (err) {
                        throw err
                    }
                    if (_.isEmpty(rows)) {
                        db.all("SELECT * FROM chunks WHERE ROWID IN (SELECT ROWID FROM chunks WHERE clength <= $expec ORDER BY Random() LIMIT 1)", {
                            $expec: (expectation - moracount)
                        }, (err, rows) => {
                            if (err) {
                                throw err
                            }
                            console.log(moracount)
                            console.log(rows)
                            prefix = rows[0].index
                            moracount += Number(rows[0].clength)
                            strArray.push(rows[0].chunk)
                            next(null)
                        })
                    } else {
                        console.log(moracount)
                        console.log(rows)
                        prefix = rows[0].suffix
                        moracount += Number(rows[0].plength)
                        strArray.push(rows[0].suffix)
                        next(null)
                    }
                })
            } catch (err) {
                moracount += 31
                next(err)
            }
        },
        (err) => {
            db.close()
            if (_.isError(err)) {
                res.status(500).send({
                    error: err
                })
            }
            const text = _.reduce(strArray, (memo, str) => {
                return memo.concat(str)
            })
            res.status(200).json({
                body: text
            })
        }
    )
})

/**
 * @api {put} /webhooks/random
 * @apiGroup WEBHOOKS/POEM
 * @apiName RandomPharaseGeneration
 * @apiParam {Number} expec Expected length.
 * @apiError (500) error Unable to access database.
 * @apiSuccess {String} body Generated phrase.
 */
router.all("/random", (req, res, next) => {
	
	console.log(req.body)
	next()

}).put("/random", (req, res) => {

    const db = new sqlite3.Database(tankadb, sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err)
    })
    db.configure("busyTimeout", 3000)

    let expectation = Number(req.body.expec)
    let moracount = 0

    let strArray = []

    async.whilst(
        () => {
            return (moracount < expectation)
        },
        (next) => {
            try {
                db.all("SELECT * FROM chunks WHERE ROWID IN (SELECT ROWID FROM chunks WHERE clength = $expec ORDER BY Random() LIMIT 1)", {
                    $expec: (expectation - moracount)
                }, (err, rows) => {
                    if (err) {
                        throw err
                    }
                    if (_.isEmpty(rows)) {
                        db.all("SELECT * FROM chunks WHERE ROWID IN (SELECT ROWID FROM chunks WHERE clength <= $expec ORDER BY Random() LIMIT 1)", {
                            $expec: expectation
                        }, (err, rows) => {
                            if (err) {
                                throw err
                            }
                            console.log(moracount);
                            console.log(rows);
                            moracount += Number(rows[0].clength)
                            strArray.push(rows[0].chunk)
                            next(null)
                        })
                    } else {
                        console.log(moracount)
                        console.log(rows)
                        moracount += Number(rows[0].clength)
                        strArray.push(rows[0].chunk)
                        next(null)
                    }
                })
            } catch (err) {
                moracount += 31
                next(err)
            }
        },
        (err) => {
            db.close()
            if (_.isError(err)) {
                res.status(500).send({
                    error: err
                })
            }
            const text = _.reduce(strArray, (memo, str) => {
                return memo.concat(str)
            })
            res.status(200).json({
                body: text
            })
        }
    )
})

/**
 * @api {get} /webhooks/vocab
 * @apiGroup WEBHOOKS/POEM
 * @apiName GetVocabulary
 * @apiError (500) error Unable to access database.
 * @apiSuccess {Object[]} vocab Vocabulary.
 */
router.get("/vocab", (req, res) => {

    const db = new sqlite3.Database(vocabdb, sqlite3.OPEN_READONLY, (err) => {
        if (err) console.error(err)
    })
    db.configure("busyTimeout", 3000)

    async.parallel([
            (callback) => {
                db.all("SELECT * FROM vocab ORDER BY Random() LIMIT 200", (err, rows) => {
                    callback(err, rows)
                })
            }
        ],
        (err, results) => {
            db.close()
            if (err) {
                res.status(500).send({
                    error: err
                });
            } else {
                res.status(200).json({
                    vocab: results[0]
                })
            }
        })
})


module.exports = router
