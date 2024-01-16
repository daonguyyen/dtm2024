import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./post.scss";
import DOMPurify from "dompurify";
import defaultImg from "../../../assets/images/icon/no-img.png";
export default function Post({ post }) {
const PF = "http://api.datamind.vn/uploads/";
  return (
    <Link to={`/post/${post._id}`}>
      <div className="post">
        {post.photo ? (
          <img
            src={PF + post.photo}
            className="postImg"
            alt=""
          />
        ) : (
          <img src={defaultImg} className="postImg" alt="" />
        )}

        <div className="postInfo">
          <div className="postCats">
            {/* {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))} */}
          </div>

          <span className="postTitle">{post.title}</span>

          <hr />
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
          <p
            className="postDesc"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.desc),
            }}
          ></p>
        </div>
      </div>
    </Link>
  );
}
