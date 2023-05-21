import admin from "firebase-admin";
import express, { Request } from "express";
import { db, connectToDb } from "./db";
import cors from "cors";
import path from "path";
import "dotenv/config";
import { DecodedIdToken } from "firebase-admin/auth";
const app = express();
app.use(express.json());
app.use(cors());

interface RequestWithUser extends Request {
  user?: DecodedIdToken;
}

const credentials = JSON.parse(process.env.FIREBASE_CREDENTIALS!);

admin.initializeApp({
  credential: admin.credential.cert(credentials),
});

app.use(express.static(path.join(__dirname, "../../my-blog/dist")));

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../my-blog/dist/index.html"));
});

app.use(async (req: RequestWithUser, res, next) => {
  // VALIDATE WITH ZOD - OR WITH IF
  const { authtoken } = req.headers;

  if (authtoken) {
    try {
      req.user = await admin.auth().verifyIdToken(authtoken as string);
    } catch (error) {
      return res.sendStatus(400);
    }
  }
  next();
});

app.get("/api/article/:name", async (req: RequestWithUser, res) => {
  const { name } = req.params;

  if (!req.user) {
    return res.json("404");
  }

  const { uid } = req.user;

  const article = await db.collection("article").findOne({ name });

  if (article) {
    const upvoteIds = article.upvoteIds || [];
    article.canUpvote = uid && !upvoteIds.includes(uid);
    res.json(article);
  } else {
    res.sendStatus(404);
  }
});

app.use((req: RequestWithUser, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
});

app.put("/api/article/:name/upvote", async (req: RequestWithUser, res) => {
  const { name } = req.params;

  if (!req.user) {
    return res.json("404");
  }
  const { uid } = req.user;

  const article = await db.collection("article").findOne({ name });

  if (article) {
    const upvoteIds = article.upvoteIds || [];
    const canUpvote = uid && !upvoteIds.includes(uid);

    if (canUpvote) {
      await db.collection("article").updateOne(
        { name },
        {
          $inc: { upvotes: 1 },
          $push: { upvoteIds: uid },
        }
      );
    }

    const updatedArticle = await db.collection("article").findOne({ name });
    res.json(updatedArticle);
  } else {
    res.send("That article doesn't exist");
  }
});

app.post("/api/article/:name/comments", async (req: RequestWithUser, res) => {
  const { name } = req.params;
  const { text } = req.body;

  if (!req.user) {
    return res.json("404");
  }

  const { email } = req.user;

  await db.collection("article").updateOne(
    { name },
    {
      $push: { comments: { postedBy: email, text } },
    }
  );
  const article = await db.collection("article").findOne({ name });

  if (article) {
    res.json(article);
  } else {
    res.send("That article doesn't exist!");
  }
});

const PORT = process.env.PORT || 8000;
connectToDb(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
});
