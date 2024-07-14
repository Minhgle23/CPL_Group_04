import React, { useEffect, useState } from "react";
import Rating from './Rating';

const CommentSection = ({ productId, user, isAuthenticated }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editCommentStates, setEditCommentStates] = useState({});
  const [review, setReview] = useState(null);

  useEffect(() => {
    if (productId) {
      fetch(`http://localhost:9999/reviews?productId=${productId}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.length > 0) {
            setComments(json[0].comment);
            setReview(json[0]);
          } else {
            setComments([]);
            setReview(null);
          }
        });
    }
  }, [productId]);

  const handleAddComment = () => {
    if (!isAuthenticated) {
      alert("You must be logged in to comment.");
      return;
    }

    if (!newComment.trim()) {
      alert("Comment cannot be empty or contain special characters.");
      return;
    }

    const newCommentObject = {
      id: new Date().getTime(),
      text: newComment,
      userId: user.id,
      username: user.username,
      date: new Date().toLocaleDateString(),
      rate: 0 // Default rating
    };

    fetch(`http://localhost:9999/reviews?productId=${productId}`)
      .then(res => res.json())
      .then(reviews => {
        if (reviews.length > 0) {
          const review = reviews[0];
          const updatedComments = [...review.comment, newCommentObject];
          review.comment = updatedComments;
          review.overallRate = calculateOverallRate(updatedComments);

          fetch(`http://localhost:9999/reviews/${review.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(review),
          })
            .then((res) => res.json())
            .then(() => {
              setComments(updatedComments);
              setReview(review);
              setNewComment("");
            });
        } else {
          const newReview = {
            id: new Date().getTime(),
            userid: user.id,
            productId: productId,
            comment: [newCommentObject],
            overallRate: 0
          };

          fetch(`http://localhost:9999/reviews`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newReview),
          })
            .then((res) => res.json())
            .then(() => {
              fetch(`http://localhost:9999/reviews?productId=${productId}`)
                .then(res => res.json())
                .then((updatedReviews) => {
                  if (updatedReviews.length > 0) {
                    setComments(updatedReviews[0].comment);
                    setReview(updatedReviews[0]);
                    setNewComment("");
                  }
                });
            });
        }
      });
  };

  const handleEditComment = (id) => {
    const commentToEdit = comments.find((comment) => comment.id === id);
    if (!commentToEdit) {
      alert("Comment not found.");
      return;
    }

    if (user.id !== commentToEdit.userId) {
      alert("You are not authorized to edit this comment.");
      return;
    }

    setEditCommentStates(prevState => ({
      ...prevState,
      [id]: commentToEdit.text
    }));
  };

  const handleSaveComment = (id) => {
    const updatedComments = comments.map((comment) => 
      comment.id === id ? { ...comment, text: editCommentStates[id] } : comment
    );

    updateReviewWithComments(updatedComments);
  };

  const handleDeleteComment = (id) => {
    const updatedComments = comments.filter((comment) => comment.id !== id);
    updateReviewWithComments(updatedComments);
  };

  const handleCommentRatingChange = (commentId, newRating) => {
    if (!isAuthenticated) {
      alert("You must be logged in to change the rating.");
      return;
    }

    const updatedComments = comments.map(comment => 
      comment.id === commentId ? { ...comment, rate: newRating } : comment
    );

    updateReviewWithComments(updatedComments);
  };

  const updateReviewWithComments = (updatedComments) => {
    fetch(`http://localhost:9999/reviews?productId=${productId}`)
      .then(res => res.json())
      .then(reviews => {
        if (reviews.length > 0) {
          const review = reviews[0];
          review.comment = updatedComments;
          review.overallRate = calculateOverallRate(updatedComments);

          fetch(`http://localhost:9999/reviews/${review.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(review),
          })
            .then((res) => res.json())
            .then(() => {
              setComments(updatedComments);
              setReview(review);
              setEditCommentStates({});
            })
            .catch((error) => {
              console.error("Error updating review:", error);
              alert("Failed to update review. Please try again.");
            });
        }
      });
  };

  const calculateOverallRate = (comments) => {
    if (comments.length === 0) return 0;
    const sum = comments.reduce((acc, comment) => acc + comment.rate, 0);
    return sum / comments.length;
  };

  return (
    <section className="comment-section">
      <div className="container my-5 py-5 text-body">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 col-lg-10 col-xl-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="text-body mb-0">Comments ({comments.length})</h4>
              {review && (
                <div className="d-flex align-items-center">
                  <span className="me-2">Overall Rating:</span>
                  <Rating 
                    rating={review.overallRate} 
                    editable={false}
                  />
                </div>
              )}
            </div>
            {comments.map((c) => (
              <div key={c.id} className="card mb-3">
                <div className="card-body">
                  <div className="d-flex flex-start">
                    <img
                      className="rounded-circle shadow-1-strong me-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp"
                      alt="avatar"
                      width="40"
                      height="40"
                    />
                    <div className="w-100">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h6 className="text-primary fw-bold mb-0">
                          {c.username}
                          <span className="text-body ms-2">{c.text}</span>
                        </h6>
                        <p className="mb-0">{c.date}</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        {isAuthenticated && user.id === c.userId && (
                          <p className="small mb-0" style={{ color: "#aaa" }}>
                            <a href="#!" className="link-grey" onClick={() => handleDeleteComment(c.id)}>
                              Remove
                            </a>{" "}
                            <a href="#!" className="link-grey" onClick={() => handleEditComment(c.id)}>
                              Edit
                            </a>
                          </p>
                        )}
                        <Rating 
                          rating={c.rate} 
                          onRatingChange={(newRating) => handleCommentRatingChange(c.id, newRating)}
                          editable={isAuthenticated && user.id === c.userId}
                        />
                      </div>
                    </div>
                  </div>
                  {editCommentStates.hasOwnProperty(c.id) && (
                    <div className="mt-3">
                      <textarea
                        value={editCommentStates[c.id]}
                        onChange={(e) => setEditCommentStates(prevState => ({
                          ...prevState,
                          [c.id]: e.target.value
                        }))}
                      />
                      <button className="save" onClick={() => handleSaveComment(c.id)}>Save</button>
                      <button className="cancel" onClick={() => setEditCommentStates(prevState => {
                        const newState = {...prevState};
                        delete newState[c.id];
                        return newState;
                      })}>Cancel</button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isAuthenticated && (
              <div>
                <textarea
                  id="newComment"
                  placeholder="Add a comment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                ></textarea>
                <button className="btn btn-primary" onClick={handleAddComment}>
                  Add Comment
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentSection;