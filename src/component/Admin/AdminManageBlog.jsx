import { useEffect, useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { format } from "date-fns";

function AdminManageBlog() {
  const [blogList, setBlogList] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/blog")
      .then((res) => res.json())
      .then((result) => setBlogList(result));
  }, []);

  const updateStatus = (id, currentStatus) => {
    const newStatus = !currentStatus;
    const blogToUpdate = blogList.find(blog => blog.id === id);
    if (!blogToUpdate) return;

    const updatedBlog = { ...blogToUpdate, status: newStatus };

    fetch(`http://localhost:9999/blog/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBlog),
    })
    .then((res) => res.json())
    .then((updatedBlogFromServer) => {
      setBlogList((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog.id === id ? updatedBlogFromServer : blog
        )
      );
    });
  };

  return (
    <Container>
      <Button variant="primary" href="/manage/add-blog">Add New</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Image</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogList.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td>{format(new Date(blog.dateCreate), 'yyyy-MM-dd')}</td>
              <td>
                <img src={`asset/image/blog/${blog.image}`} alt={blog.title} width="100" />
              </td>
              <td>
                <Button
                  variant={blog.status ? "success" : "danger"}
                  onClick={() => updateStatus(blog.id, blog.status)}
                >
                  {blog.status ? "Active" : "Inactive"}
                </Button>
              </td>
              <td>
                <Button variant="warning" href={`/edit/${blog.id}`}>Edit</Button>{' '}
                <Button variant="danger" href={`/delete/${blog.id}`}>Delete</Button>{' '}
                <Button variant="info" href={`/view/${blog.id}`}>View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminManageBlog;
