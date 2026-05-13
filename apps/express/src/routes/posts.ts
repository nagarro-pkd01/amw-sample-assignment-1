import express from "express";
import { dbPromise } from "../config/db";
import { authMiddleware, AuthRequest } from "../middleware/auth";
import { upload } from "../config/multer";

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const db = await dbPromise;

    const posts = await db.all(`
      SELECT posts.*, users.username as createdBy
      FROM posts
      LEFT JOIN users ON posts.userId = users.id
      ORDER BY createdAt DESC
    `);

    res.json(posts);
  } catch {
    res.status(500).json({ message: "Error fetching posts" });
  }
});

router.post(
  "/",
  authMiddleware,
  upload.single("image"),
  async (req: AuthRequest, res) => {
    const { title, description } = req.body;

    try {
      const db = await dbPromise;

      const imageUrl = req.file
        ? `/uploads/${req.file.filename}`
        : null;

      const now = new Date().toISOString();

      const result = await db.run(
        `INSERT INTO posts (title, description, imageUrl, userId, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [title, description, imageUrl, req.user!.id, now, now]
      );

      res.json({ id: result.lastID });
    } catch {
      res.status(500).json({ message: "Error creating post" });
    }
  }
);

router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  async (req: AuthRequest, res) => {
    const { title, description } = req.body;
    const { id } = req.params;

    try {
      const db = await dbPromise;

      const post = await db.get(
        "SELECT * FROM posts WHERE id = ?",
        [id]
      );

      if (!post) return res.status(404).json({ message: "Not found" });

      if (post.userId !== req.user!.id)
        return res.status(403).json({ message: "Not allowed" });

      const imageUrl = req.file
        ? `/uploads/${req.file.filename}`
        : post.imageUrl;

      const now = new Date().toISOString();

      await db.run(
        `UPDATE posts
         SET title=?, description=?, imageUrl=?, updatedAt=?
         WHERE id=?`,
        [title, description, imageUrl, now, id]
      );

      res.json({ message: "Updated" });
    } catch {
      res.status(500).json({ message: "Error updating" });
    }
  }
);

router.delete("/:id", authMiddleware, async (req: AuthRequest, res) => {
  const { id } = req.params;

  try {
    const db = await dbPromise;

    const post = await db.get(
      "SELECT * FROM posts WHERE id = ?",
      [id]
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== req.user!.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await db.run("DELETE FROM posts WHERE id = ?", [id]);

    res.json({ message: "Post deleted" });
  } catch {
    res.status(500).json({ message: "Error deleting post" });
  }
});

export default router;