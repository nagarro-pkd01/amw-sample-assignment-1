import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createPost,
  updatePost,
  getPostById,
} from "../services/postService";
import { API_BASE_URL } from "../services/api";
import "../styles/PostForm.scss";
import { useTranslation } from "react-i18next";

const PostForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();
  const isEdit = !!id;

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      getPostById(id!).then((data) => {
        if (data) {
          setForm({
            title: data.title,
            description: data.description,
          });
          setExistingImage(data.imageUrl);
        }
      });
    }
  }, [id, isEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];

    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);

    if (file) {
      formData.append("image", file);
    }

    try {
      if (isEdit) {
        await updatePost(id!, formData);
      } else {
        await createPost(formData);
      }

      navigate("/");
    } catch {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form-page">
      <div className="post-card">
        <h1>{isEdit ? t("editPost") : t("createPost")}</h1>

        <form onSubmit={handleSubmit}>
          
          <div className="input-group">
            <label htmlFor="title">{t("title")}</label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          
          <div className="input-group">
            <label htmlFor="description">{t("description")}</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>

          
          <div className="input-group">
            <label>{t("uploadImage")}</label>
            <input type="file" accept="image/*" onChange={handleFile} />
          </div>

          
          {(preview || existingImage) && (
            <img
              src={
                preview
                  ? preview
                  : `${API_BASE_URL}${existingImage}`
              }
              alt="preview"
              className="preview"
            />
          )}

          <button type="submit" disabled={loading}>
            {loading
              ? "Saving..."
              : isEdit
              ? t("editPost")
              : t("createPost")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;