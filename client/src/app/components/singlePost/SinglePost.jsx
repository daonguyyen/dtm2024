import {
  Link,
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom";
import "./singlepost.scss";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authContext/authContext";
import DOMPurify from "dompurify";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  XIcon,
} from "react-share";
import Dialog from "../dialog/Dialog";

const SinglePost = () => {
  const { currentUser } = useContext(AuthContext);

  const history = useHistory();

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [dialog, setDialog] = useState({
    message: "",
    isLoading: false,
  });

  const handleDialog = (message, isLoading) => {
    setDialog({
      message,
      isLoading,
    });
  };

  const handleDelete = () => {
    handleDialog("Are you sure you want to delete?", true);
  };

  const confirmDelete = async (choose) => {
    if (choose) {
      try {
        await axios.delete(
          process.env.REACT_APP_API_URL + `/posts/${post._id}`,
          {
            headers: { token: "Bearer " + currentUser.accessToken },
          }
        );
        handleDialog("", false);
        history.push("/posts");
      } catch (err) {
        console.log(err);
      }
    } else {
      handleDialog("", false);
    }
  };

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get(
        process.env.REACT_APP_API_URL + "/posts/" + path
      );
      setPost(res.data);
    };
    getPost();
  }, [path]);

  return (
    <>
      <div className="singlePost">
        <div className="singlePostWrapper">
          {/* {post.photo && (
          <img
            src={`../upload/${post.photo}`}
            className="singlePostImg"
            alt=""
          />
        )} */}
          <h1 className="singlePostTile">
            {post.title}

            {currentUser && currentUser.username === post.username && (
              <div className="singlePostEdit">
                <Link
                  to={{
                    pathname: "/write",
                    search: `?edit=${post._id}`,
                    state: { post },
                  }}
                  title="Edit"
                >
                  <svg
                    className="singlePostIcon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                  >
                    <path
                      d="M22.7437 16.8608V22.2008C22.7437 22.7312 22.5329 23.2399 22.1579 23.615C21.7828 23.9901 21.2741 24.2008 20.7437 24.2008H6.74365C6.21322 24.2008 5.70451 23.9901 5.32944 23.615C4.95437 23.2399 4.74365 22.7312 4.74365 22.2008V8.20081C4.74365 7.67037 4.95437 7.16166 5.32944 6.78659C5.70451 6.41152 6.21322 6.20081 6.74365 6.20081H12.0837M20.7437 4.20081L24.7437 8.20081L14.7437 18.2008H10.7437V14.2008L20.7437 4.20081Z"
                      stroke="teal"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>

                <span onClick={handleDelete} title="Delete">
                  <svg
                    className="singlePostIcon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                  >
                    <path
                      d="M5.59863 8.20081H23.5986M10.5986 8.20081V6.20081C10.5986 5.67037 10.8093 5.16166 11.1844 4.78659C11.5595 4.41152 12.0682 4.20081 12.5986 4.20081H16.5986C17.1291 4.20081 17.6378 4.41152 18.0128 4.78659C18.3879 5.16166 18.5986 5.67037 18.5986 6.20081V8.20081M21.5986 8.20081V22.2008C21.5986 22.7312 21.3879 23.2399 21.0128 23.615C20.6378 23.9901 20.1291 24.2008 19.5986 24.2008H9.59863C9.0682 24.2008 8.55949 23.9901 8.18442 23.615C7.80935 23.2399 7.59863 22.7312 7.59863 22.2008V8.20081H21.5986Z"
                      stroke="tomato"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            )}
          </h1>

          <div className="singlePostInfo">
            <span className="singlePostAuthor">
              Author:
              <Link to={`/posts/?user=${post.username}`} className="link">
                {" "}
                <b>{post.username}</b>
              </Link>
            </span>
            <span className="singlePostDate">
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>
          <p
            className="singlePostDesc"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(post.desc),
            }}
          ></p>

          <div className="singleShare">
            <span>Share post:</span>
            <span>
              <FacebookShareButton
                url={"https://datamind.vn"}
                quote={"Dummy text!"}
                hashtag="#datamind"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
            </span>
            <span>
              <TwitterShareButton
                url={"https://datamind.vn"}
                quote={"Dummy text!"}
                hashtag="#datamind"
              >
                <XIcon size={32} round />
              </TwitterShareButton>
            </span>
          </div>
        </div>
      </div>
      {dialog.isLoading && (
        <Dialog onDialog={confirmDelete} message={dialog.message} />
      )}
    </>
  );
};

export default SinglePost;
