import profilecss from "./ProfilePage.module.css";
import Navbar from "./Navbar";
import { FaLock, FaSignOutAlt } from "react-icons/fa";

const tags = ["React", "JavaScript", "CSS", "Node.js", "Express", "MongoDB"];

const myProjects = [];
for (let i = 1; i <= 5; i++) {
  myProjects.push({
    keys: i,
    owner: "John Doe",
    name: `Project ${i}`,
    description: `Descriptij lorem200 on for Project ${i}`,
    imageUrl: `https://via.placeholder.com/300?text=Project${i}`,
    tags: tags,
  });
}

const ProjectCard = ({ keys, owner, name, description, imageUrl, tags }) => {
  //console.log(key+owner+name+description)
  return (
    <div className={profilecss.projectCard}>
      {/* Left Section */}
      <div className={profilecss.textSection}>
        <h3>{name}</h3>
        <p>{description}</p>
        <div className={profilecss.tagsSection}>
          {tags &&
            tags.map((tag, index) => (
              <span key={index} className={profilecss.tag}>
                {tag}
              </span>
            ))}
        </div>
        <a href="#">
          <button className={profilecss.see_more}>See More</button>
        </a>
      </div>

      {/* Right Section */}
      <div className={profilecss.imageSection}>
        <img src={imageUrl} alt="Project" />
      </div>
    </div>
  );
};

const Profilepage = () => {
  const tags = ["djjnf", "jhdf", "djf", "kjsfh", "ksjdbfh", "skjdfh", "lkdjfh"];

  return (
    <>
      <div className={profilecss.mainroot}>
        <Navbar />
        <div className={profilecss.profilesection}>
          <div className={profilecss.leftsection}>
            <div className={profilecss.accountinfo}>
              <h1 style={{ textAlign: "center" }}>Account Info</h1>
              <hr className={profilecss.horizontalRow} />
              <h2 className={profilecss.fullname}>Nayem Ahmed Khan</h2>
              <p className={profilecss.normaltext}>User name : </p>
              <p className={profilecss.normaltext}>Email ; </p>
              <span className={profilecss.normaltext}>My Interest : </span>
              <div className={profilecss.tagList}>
                {tags.map((tag, index) => (
                  <span key={index} className={profilecss.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button className={profilecss.forgetpassword}>
              <FaLock className={profilecss.icon} />
              Forget Password
            </button>

            <button className={profilecss.signout}>
              <FaSignOutAlt className={profilecss.icon} />
              Sign Out
            </button>
          </div>
          <div className={profilecss.rightsection}>
            <div className={profilecss.projectlist}>
              <div className={profilecss.myprojects}>
                {myProjects.map((project) => (
                  <ProjectCard
                    key={project.keys}
                    owner={project.owner}
                    name={project.name}
                    description={project.description}
                    imageUrl={project.imageUrl}
                    tags={project.tags}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profilepage;
