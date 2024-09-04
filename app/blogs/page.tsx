type blog = {
  id:number;
  title:string;
  content:string;
  tags:object;
}

export default async function Blogs () {
  const response = await fetch("http://localhost:3001/blogs");
  const blogs= await response.json();

  return (
   <div>
    {blogs.map((blog:blog)=> (
      <div key={blog.id}>
        <h2>{blog.title}</h2>
        <p>{blog.content}</p>
      </div>
    ))}
   </div>
  )
}
