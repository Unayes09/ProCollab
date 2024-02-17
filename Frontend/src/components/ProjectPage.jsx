import React, { useState, useEffect } from 'react';
import ProjectPageCss from'./ProjectPage.module.css'; // Make sure to import your CSS file
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

const ProjectPage = () => {

  const navigate = useNavigate()
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get('id');
  let [user, setUser] = useState();
  function routetohome(){
    navigate('/signin')
  }
  const [projectData, setProject] = useState(
{
    title: '',
    name:'',
    short:'',
    description: '',
    photos:[],
    like:0,
    dislike:0
  });

  const [imageUrls, setImage] = useState([])
  const [likes, setlike] = useState(false)
  const [dislikes, setdislike] = useState(false)

    useEffect(() => {
      const checkLoggedIn = async () => {
          try {
              const token = localStorage.getItem('token')
              const response = await fetch('http://localhost:8000/api/verify/'+token, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                  }
  
              });
              if (response.ok) {
                  //routetohome()
              }
          } catch (error) {
              routetohome();
          }
      };
  
      checkLoggedIn();
  }, []);
  useEffect(() => {
      const checkUsername = async () => {
          try {
              const token = localStorage.getItem('token')
              await fetch('http://localhost:8000/api/username/'+token, {
                  method: 'GET',
                  headers: {
                      'Content-Type': 'application/json',
                  }
  
              })
              .then(async response => {
                const data = await response.json()
                user = data.username
                setUser(data.username)
            })
          } catch (error) {
              console.error('Error checking login status:', error);
          }
      };
  
      checkUsername();
  }, []);

  const [photoIndex, setPhotoIndex] = useState(1);
  const [userComment, setUserComment] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [messageSent, setMessageSent] = useState(false);

  useEffect(() => {
    // Fetch projects from the server when the component mounts
    if (!user) return;
    const fetchChannels = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/projects?id='+id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }

            });
            const ress = await response.json()
            //setProjects(ress)
            if (response.ok) {
              const updateProjects = async () => {
                
                setProject({ ...projectData, title: ress.title, short:ress.shareable_links, 
                  description: ress.description,name: ress.project_holder,photos: ress.photos, like:ress.like, dislike:ress.dislike })
  
                }
              await updateProjects();
              const updateimages = async () => {
                setImage(ress.photos)
                
                }
                await updateimages();
              const updatetalks = async () => {
                setChatMessages(ress.comments)
                setMessageSent(false)
                    
                }
                await updatetalks();
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
      }
    }
    fetchChannels();
}, [user,likes,dislikes,messageSent]);


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


  const handleLike = async(e) => {
    e.preventDefault();
    // Logic for handling the like button click
    try {
      const response = await fetch('http://localhost:8000/auth/like', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            id:id
          })

      });
      const ress = await response.json()
      if (response.ok) {
        setlike(!likes)
      }
      } catch (error) {
          console.error('Error fetching projects:', error);
    }
  };

  const handleDislike = async(e) => {
    e.preventDefault();
    // Logic for handling the dislike button click
    try {
      const response = await fetch('http://localhost:8000/auth/dislike', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            id:id
          })

      });
      const ress = await response.json()
      if (response.ok) {
        setdislike(!dislikes)
      }
      } catch (error) {
          console.error('Error fetching projects:', error);
    }
  };

  const handleComment = async(e) => {
    // Logic for handling the comment button click
    e.preventDefault();

        try {
            const formData = {
                projectId:id,
                username: user,
                comment:userComment
            }
            console.log(formData)
            let jsonData = "";
            await fetch('http://localhost:8000/auth/comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)

            })
            .then(async response => {
                const data = await response.json()
                console.log(id)
                if (response.ok) {
                  const updatetalks = async () => {
                      setMessageSent(true)
                    }
                    await updatetalks();
                }
                else {
                  console.log(error)
                }
            })
            .catch(err=>console.log(err))
        } catch (error) {
            console.error('Error submitting form:', error);
        }
  };

  const handleDelete = () => {
    // Logic for handling the delete button click
  };

  return (

    <>
      
      <Navbar />
      
    <div className={ProjectPageCss.wrapper}>
      <div className={ProjectPageCss.leftsection}>
        <h1>{projectData.title}</h1>
        <p>@ {projectData.name}</p>
        <p>Associated links: <b>{projectData.short}</b></p>
        <p>{projectData.description}</p>
        <div className={ProjectPageCss.buttons}>
          <button onClick={handleLike}>Like {projectData.like}</button>
          <button onClick={handleDislike}>Dislike {projectData.dislike}</button>
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
              {chatMessages.map((comment) => (
                <CommentCard
                  key={comment._id}
                  name={comment.name}
                  comment={comment.comment}
                >
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
