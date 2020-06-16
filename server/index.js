const express = require("express");
const consola = require("consola");
const { Nuxt, Builder } = require("nuxt");
const moesif = require("moesif-express");
const rateLimit = require("express-rate-limit");
const Redis = require("ioredis");
const RedisStore = require("rate-limit-redis");
const session = require("express-session");
const cors = require("cors");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");

const app = express();
const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;
let memorystore;
if (process.env.NODE_ENV == "production") {
  const MemcachedStore = require("connect-memjs")(session);
  memorystore = new MemcachedStore({
    servers: [process.env.MEMCACHEDCLOUD_SERVERS],
    username: process.env.MEMCACHEDCLOUD_USERNAME,
    password: process.env.MEMCACHEDCLOUD_PASSWORD,
    remove: true,
  });
} else {
  const MemoryStore = require("memorystore")(session);
  memorystore = new MemoryStore({
    checkPeriod: 1000 * 60 * 6, // prune every 6 min
  });
}

// Import and Set Nuxt.js options
let config = require("../nuxt.config.js");
config.dev = !(process.env.NODE_ENV === "production");

app.set("port", port);
app.set("trust proxy", 1); // trust first proxy

// middlewares
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    store: memorystore,
    secret: process.env.SESSION_SECRET || "bbseries",
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      httpOnly: config.dev, // true on development
      maxAge: 1000 * 60 * 25, // 25 min window
    },
  })
);
app.use(
  cors({
    origin: true,
  })
);
app.use(helmet());

if (!config.dev) {
  // moesif
  const moesifMiddleware = moesif({
    applicationId: process.env.MOESIF_APPLICATION_ID,
  });
  moesifMiddleware.startCaptureOutgoing();
  app.use(moesifMiddleware);
  const rateLimiter = rateLimit({
    store: new RedisStore({
      expiry: 3 * 60 * 1000, // 3 min window
      client: new Redis(process.env.REDIS_URL),
    }),
    statusCode: 429,
    max: 1000,
  });
  app.use(rateLimiter);
}

// CSRF
app.use(
  csrf({
    cookie: true,
    ignoreMethods: ["GET", "HEAD", "OPTIONS"],
  })
);
app.use((err, req, res, next) => {
  if (err.code !== "EBADCSRFTOKEN") {
    next(err);
  } else {
    // handle CSRF token errors here
    res.status(403).send({
      text: "Invalid csrf token",
    });
  }
});
app.use("/api", require("./routes/api"));

async function start() {
  const nuxt = new Nuxt(config);
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build().catch((error) => {
      console.error(error);
      process.exit(1);
    });
  }
  app.use(nuxt.render);
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}
start();
