import homecss from './Home.module.css';
import Navbar from './Navbar';

const channels = Array.from({ length: 500 }, (_, index) => ({
    id: index + 1,
    name: `Channel ${index + 1}`,
    link: `/channel${index + 1}`,
}));

const projectList = Array.from({ length: 300 }, (_, index) => ({
    id: index + 1,
    owner: `Owner ${index + 1}`,
    name: `Project ${index + 1}`,
    description: `Description for Project ${index + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    imageUrl: '/images.jpg', // Replace with your image URL
}));

const ProjectCard = ({ owner, name, description, imageUrl }) => {
    return (
        <div className={homecss.projectCard}>
            {/* Left Section */}
            <div className={homecss.textSection}>
                <h4>{owner}</h4>
                <h1>{name}</h1>
                <p>{description}</p>
                <button className={homecss.see_more}>See More</button>
            </div>

            {/* Right Section */}
            <div className={homecss.imageSection}>
                <img src={imageUrl} alt="Project" />
            </div>
        </div>
    );
};

function Home() {
    return (
        <>
            <div className={homecss.mainroot}>
                <Navbar />
                <main className={homecss.maincontent}>
                    <div className={homecss.leftsection1}>
                        <h2 className={homecss.header}>My Channels</h2>
                        <hr className={homecss.horizontalRow} />
                        <ul className={homecss.channelList}>
                            {channels.map((channel) => (
                                <li key={channel.id}>
                                    <a href={channel.link}>{channel.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className={homecss.leftsection2}>
                        <textarea
                            placeholder="Enter your feedback"
                            className={homecss.feedbackTextarea}
                        ></textarea>
                        {/* Submit button with adjusted width */}
                        <button className={homecss.submitButton}>Submit</button>
                    </div>
                    <div className={homecss.rightsection1}>
                        {/* Search Bar with Search Icon */}
                        <div className={homecss.searchContainer}>
                            <input
                                type="text"
                                placeholder="Search..."
                                className={homecss.searchBar}
                            />
                        </div>
                        <button className={homecss.searchButton}>Search</button>
                        <button className={homecss.createButton}><a href='/createproject' className={homecss.createButton}>Create</a></button>
                        
                    </div>
                    <div className={homecss.rightsection2}>
                        {/* List of Cards */}
                        {projectList.map((project) => (
                            <ProjectCard
                                key={project.id}
                                owner={project.owner}
                                name={project.name}
                                description={project.description}
                                imageUrl={project.imageUrl}
                            />
                        ))}
                    </div>
                </main>
            </div>
        </>
    );
}

export default Home;
