import React, { useEffect, useState } from "react";

const CommentSection = ({ productId, user, isAuthenticated }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (productId) {
      fetch(`http://localhost:9999/reviews?productId=${productId}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.length > 0) {
            
            setComments(json[0].comment);
          } else {
            setComments([]);
          }
        });
    }
  }, [productId]);

  const handleAddComment = () => {
    if (!isAuthenticated) {
      alert("You must be logged in to comment.");
      return;
    }

    const newCommentObject = {
      id: comments.length + 1,
      text: newComment
    };

    const updatedComments = [...comments, newCommentObject];

    fetch(`http://localhost:9999/reviews?productId=${productId}`)
      .then(res => res.json())
      .then(reviews => {
        if (reviews.length > 0) {
          const review = reviews[0];
          review.comment = updatedComments;

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
              setNewComment("");
            });
        } else {
          let id = new Date().getTime()
          const newReview = {
            id: id.toString(),
            userid: user.id,
            productId: productId,
            comment: updatedComments,
            rate: 5
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
              setComments(updatedComments);
              setNewComment("");
            });
        }
      });
  };

  return (
    <section style={{ backgroundColor: "#f7f6f6" }}>
      <div className="container my-5 py-5 text-body">
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 col-lg-10 col-xl-8">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="text-body mb-0">Comments ({comments.length})</h4>
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
                          {user ? user.username : "Anonymous"}
                          <span className="text-body ms-2">{c.text}</span>
                        </h6>
                        <p className="mb-0">2 days ago</p>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="small mb-0" style={{ color: "#aaa" }}>
                          <a href="#!" className="link-grey">
                            Remove
                          </a>{" "}
                          •
                          <a href="#!" className="link-grey">
                            Reply
                          </a>{" "}
                          •
                          <a href="#!" className="link-grey">
                            Translate
                          </a>
                        </p>
                        <div className="d-flex flex-row">
                          <i className="fas fa-star text-warning me-2"></i>
                          <i className="far fa-check-circle" style={{ color: "#aaa" }}></i>
                        </div>
                      </div>
                    </div>
                  </div>
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
                <button onClick={handleAddComment}>
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
