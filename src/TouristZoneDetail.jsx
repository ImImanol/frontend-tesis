import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  getTouristZoneDetail,
  addFavorite,
  removeFavorite,
  getComments,
  addComment,
  getUserFavorites,
} from "./apiService";
import { AuthContext } from "./AuthContext";
import { format } from "date-fns";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./TouristZoneDetail.css";

const TouristZoneDetail = () => {
  const { zoneId } = useParams();
  const [zone, setZone] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const fetchZoneDetail = async () => {
      try {
        const zoneData = await getTouristZoneDetail(zoneId);
        setZone(zoneData);
        if (isAuthenticated) {
          const userFavorites = await getUserFavorites();
          setIsFavorite(userFavorites.some((fav) => fav._id === zoneId));
        }
      } catch (err) {
        console.error("Error fetching tourist zone detail", err);
      }
    };

    const fetchComments = async () => {
      try {
        const commentsData = await getComments(zoneId);
        setComments(commentsData);
      } catch (err) {
        console.error("Error fetching comments", err);
      }
    };

    fetchZoneDetail();
    fetchComments();
  }, [zoneId, isAuthenticated]);

  const handleFavoriteClick = async () => {
    if (!isAuthenticated) {
      console.log("Please log in to manage favorites.");
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite(zoneId);
        console.log("Removed from favorites!");
      } else {
        await addFavorite(zoneId);
        console.log("Added to favorites!");
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("Error managing favorite", err);
      alert("Error managing favorite.");
    }
  };

  const handleAddComment = async () => {
    if (!isAuthenticated) {
      alert("Please log in to add a comment.");
      return;
    }

    try {
      const comment = await addComment(zoneId, newComment);
      setComments([...comments, comment]);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment", err);
      alert("Error adding comment.");
    }
  };

  if (!zone) {
    return <div>Loading...</div>;
  }

  return (
    <div className="tourist-zone-detail-container">
      <div className="zone-header">
        <h1>{zone.name}</h1>
        <button onClick={handleFavoriteClick} className="favorite-button">
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>
      <img src={zone.image} alt={zone.name} className="zone-image" />
      <div className="zone-details">
        <p>{zone.description}</p>
        <p>{zone.longDescription}</p>
        <div className="iframe-container">
          <iframe src={zone.address} title="Mapa de la zona"></iframe>
        </div>
      </div>
      <div className="comments-section">
        <h2>Comentarios</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <div className="comment-header">
                <img
                  src={
                    comment.user.profileIcon
                      ? comment.user.profileIcon
                      : "/icons/icon1.png"
                  }
                  alt="User Icon"
                  className="comment-user-icon"
                />
                <div className="comment-user-info">
                  <strong>{comment.user.username}</strong>
                  <small>
                    {format(new Date(comment.createdAt), "dd/MM/yyyy HH:mm")}
                  </small>
                </div>
              </div>
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <p>Aun no hay comentarios sobre esta zona</p>
        )}

        {isAuthenticated ? (
          <div className="add-comment">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario"
            ></textarea>
            <button onClick={handleAddComment}>Comentar</button>
          </div>
        ) : (
          <p className="centered-heading">
            No tienes cuenta para comentar?{" "}
            <a href="/auth/register">Regístrate aquí</a>
          </p>
        )}
      </div>
    </div>
  );
};

export default TouristZoneDetail;
