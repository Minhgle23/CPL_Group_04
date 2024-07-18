import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './style/HomeBlog.css'; // Custom CSS file

function HomeBlog() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9999/blog')
            .then(res => res.json())
            .then(result => {
                // Shuffle the array and take the first 4 elements
                const shuffled = result.sort(() => 0.5 - Math.random());
                setBlogs(shuffled.slice(0, 4));
            });
    }, []);

    return (
        <section className="home-blog-section">
            <div className="container">
                <h1 className="home-blog-title">Featured Blogs</h1>
                <div className="row">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="col-md-3">
                            <div className="home-blog-entry">
                                <Link to={`/blogs/${blog.id}`} className="home-blog-img-link">
                                    <div className="home-blog-image-container">
                                        <img src={`/assets/images/${blog.image}`} alt={blog.title} className="img-fluid home-blog-img-large" />
                                    </div>
                                    <h2 className="home-blog-post-title">{blog.title}</h2>
                                </Link>
                                <p>{blog.brief}</p>
                                <span className="home-blog-date">
                                    {/* {format(new Date(blog.dateCreate), 'dd-MM-yyyy')} */}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HomeBlog;
