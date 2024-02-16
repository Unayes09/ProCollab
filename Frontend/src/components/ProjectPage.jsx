import React, { useState } from 'react';
import ProjectPageCss from'./ProjectPage.module.css'; // Make sure to import your CSS file
import Navbar from './Navbar';

const ProjectPage = () => {
  const [photoIndex, setPhotoIndex] = useState(1);
  const [userComment, setUserComment] = useState('');
  
  const [comments, setComments] = useState(Array.from({ length: 50 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    comment: `Comment for Project ${index + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  })));

  const CommentCard = ({ name, comment }) => (
    <div className={ProjectPageCss.commentCard}>
      <div className={ProjectPageCss.textSection}>
        <h4>{name}</h4>
        <p>{comment}</p>
      </div>
    </div>
  );

  // Now you can use this array in your component where you render the list of comments.


  const handleLike = () => {
    // Logic for handling the like button click
  };

  const handleDislike = () => {
    // Logic for handling the dislike button click
  };

  const handleComment = () => {
    // Logic for handling the comment button click
  };

  const handleDelete = () => {
    // Logic for handling the delete button click
  };

  const imageUrls = [
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    'https://via.placeholder.com/300',
    // Add more image URLs as neededS
  ];

  return (

    <>
      
      <Navbar />
      
    <div className={ProjectPageCss.wrapper}>
      <div className={ProjectPageCss.leftsection}>
        <h1>Project Title</h1>
        <p>@John Doe</p>
        <p>Short Description: This is a short description of the project. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis dignissimos ipsam unde quos exercitationem magni amet vitae? Tempore culpa porro commodi vel numquam dolorum quaerat, illum blanditiis ipsam voluptatibus dolores assumenda ea vitae earum exercitationem omnis neque ducimus ipsa eius nostrum quia ratione. Assumenda, est quos. Magni, expedita laboriosam! Atque quam, minima vero harum quia voluptatum. Ipsa ab fugit deserunt alias inventore voluptatibus facere a enim accusamus ut illo, ea adipisci culpa corporis distinctio perferendis expedita dolore molestiae tempore sed quas aliquam eius delectus! Minima modi, deleniti iure quas fugiat accusamus dolorum porro necessitatibus esse laborum nostrum voluptates animi dolorem doloribus inventore? Rem, dicta velit mollitia vero voluptas libero iure optio odit eaque recusandae. Eos a autem, impedit culpa iste omnis quisquam voluptate, dolorem nulla nesciunt, temporibus nemo magni libero provident sapiente rem adipisci minima qui. Officia tenetur amet ab assumenda doloribus provident atque, tempore natus voluptatum quas qui molestias. Maxime consectetur eius asperiores distinctio libero nulla dignissimos laborum. Autem velit consectetur atque, beatae eius aperiam sunt accusantium iste nemo impedit porro eum unde est asperiores! Quaerat, corporis accusantium. Amet unde quisquam dignissimos sunt porro exercitationem! Culpa nam id eum ut cumque non vitae. Officiis laudantium nemo dolorum labore atque?</p>
        <p>Full Description: This is the full description of the project. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta, unde a. Culpa accusamus neque voluptatum corporis reiciendis impedit ducimus atque eos ex debitis autem, molestiae molestias odio consectetur doloribus non qui consequuntur dolor nisi quo minima at in quam. Temporibus nulla, adipisci dignissimos beatae magnam ratione architecto, eveniet doloremque soluta voluptatibus dolore deserunt ad voluptatem ab a voluptatum, quo dolores odio corporis ipsum tempore quaerat quis repudiandae. Voluptates doloribus dolor itaque rerum maxime nihil numquam repellendus distinctio. Enim, veniam praesentium rerum consectetur hic numquam reiciendis veritatis cumque porro, neque libero voluptate sapiente quisquam a! Officiis enim earum deserunt eos ipsum laudantium tenetur magnam error, sequi quidem tempora, id saepe at quisquam doloremque unde dolores fugit dicta impedit. Nisi nemo facilis ullam aperiam, laboriosam labore! Quas in veniam itaque quod quisquam recusandae quis! Iure aperiam accusantium nobis ullam? Numquam dolores tenetur itaque minima tempore fugiat vero libero animi sint, voluptates in magnam expedita laborum ab ex. In libero maiores, laborum sit cupiditate quos voluptate error facere! Corrupti assumenda laboriosam temporibus exercitationem eius omnis incidunt iusto est ab accusantium nihil distinctio eveniet aliquid magnam mollitia dolore soluta deleniti sit, ullam vero. Maiores fuga alias ab est ducimus tempore amet exercitationem nihil soluta.</p>
        <div className={ProjectPageCss.buttons}>
          <button onClick={handleLike}>Like</button>
          <button onClick={handleDislike}>Dislike</button>
            {/* Add conditional rendering for the delete button */}
            
          {true && <button onClick={handleDelete}>Delete</button>}
        </div>
          <div className={ProjectPageCss.commentSection}>
            <textarea className={ProjectPageCss.comment_area }
              placeholder="Write your comment..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            />
            <button
              className={ProjectPageCss.commentButton}
              onClick={handleComment}
            >
              Comment
            </button>
            <div className={ProjectPageCss.allComments}>
              {comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  name={comment.name}
                  comment={comment.comment}
                >
                  <button
                    className={ProjectPageCss.deleteButton}
                    onClick={() => handleDelete(comment.id)}
                  >
                    Delete
                  </button>
                </CommentCard>
              ))}
            </div>
          </div>  
      </div>
      <div className={ProjectPageCss.rightsection}>
        <div className={ProjectPageCss.photocontainer}>
          {imageUrls.map((url, index) => (
            <div key={index} className={ProjectPageCss.photo}>
              <img src={url} alt={`Figure ${index + 1}`} />
              <p>Figure {index + 1}</p>
            </div>
          ))}
        </div>
      </div>
      </div>
      </>
  );
};

export default ProjectPage;
