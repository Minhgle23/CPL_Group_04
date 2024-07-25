import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import './BlogList.css'

function BlogDetail() {

    const { blogId } = useParams();
    const [blog, setBlog] = useState({});
    console.log(blogId);

    useEffect(() => {
        fetch(`http://localhost:9999/blog/${blogId}`)
            .then(res => res.json())
            .then(result => setBlog(result))
    }, [blogId]);

    console.log(blog);
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <div className="effect-lily tm-post-link tm-pt-40">
                        <div className="tm-post-link-inner align-items-center">
                            <img
                                src={`/assets/images/${blog.image}`}
                                alt={blog.title}
                                className="img-fluid custom-image"
                            />
                        </div>
                    </div>
                    <div className="blog-entry-detail mt-4">
                        {blog.title && <h2 className="post-title">{blog.title}</h2>}
                        {blog.dateCreate && (
                            <div className="date">
                                {format(new Date(blog.dateCreate), "dd-MM-yyyy")}
                            </div>
                        )}
                        <ReactQuill
                            value={blog.data}
                            readOnly={true}
                            theme={"bubble"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogDetail;
