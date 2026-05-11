import { useEffect, useState } from "react";
import { deletePost, getPosts } from "../services/postService";
import { API_BASE_URL } from "../services/api";
import { getUser, isLoggedIn } from "../utils/auth";

import "../styles/Home.scss";
import { useNavigate } from "react-router-dom";
import type { Post } from "../types/posts";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const loggedIn = isLoggedIn();
  const user = getUser();

  const fetchPosts = async () => {
    const data = await getPosts();
    setPosts(data);
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch {
        console.error("Failed to fetch posts");
      }
    };

    loadPosts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm(t("areYouSure"))) return;

    try {
      await deletePost(id);
      fetchPosts();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="home">
      <main className="posts">
        {posts.length === 0 ? (
          <div className="empty-posts">
            <h2>{t("noPosts")}</h2>
          </div>
        ) : (
          posts.map((post) => {
            const isOwner = user && user.id === post.userId;
            return (
              <article className="card" key={post.id}>
                <h2>{post.title}</h2>
                <p>{post.description}</p>

                {post.imageUrl && (
                  <img
                    src={`${API_BASE_URL}${post.imageUrl}`}
                    alt="post"
                    width={40}
                    height={40}
                    style={{ objectFit: "contain" }}
                  />
                )}

                {loggedIn && isOwner && (
                  <div className="actions">
                    <button onClick={() => navigate(`/post/${post.id}`)}>
                      {t("edit")}
                    </button>
                    <button
                      className="delete"
                      onClick={() => handleDelete(post.id)}
                    >
                      {t("delete")}
                    </button>
                  </div>
                )}
              </article>
            );
          })
        )}
      </main>
    </div>
  );
};

export default Home;
