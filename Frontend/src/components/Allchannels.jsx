import Navbar from "./Navbar";
import allchnlcss from './Allchannels.module.css'

const ChannelCard = ({ name, description, tags, joinedCount }) => {
    return (
        <div className={allchnlcss.channelCard}>
            <div className={allchnlcss.topsection}>
                <div className={allchnlcss.channelName}>{name}</div>
                <div className={allchnlcss.joinedCount}>
                    {joinedCount} <span className={allchnlcss.icon}>👥</span>
                </div>
            </div>
            <div className={allchnlcss.channelDescription}>{description}</div>
            <div className={allchnlcss.bottomsection}>
                <div className={allchnlcss.tagList}>
                    {tags.map((tag, index) => (
                        <span key={index} className={allchnlcss.tag}>
                            {tag}
                        </span>
                    ))}

                </div>
                <button className={allchnlcss.joinButton}>
                    <span className={allchnlcss.buttonIcon}>🔗</span> Join Channel
                </button>

            </div>
            
        </div>
    );
};

function Allchannels() {
    
    const channels = [];
    for (let i = 1; i <= 100; i++) {
        channels.push({
            id: i,
            name: `Channel ${i}`,
            description: `Description for Channel ${i}`,
            tags: ['Technology', 'Programming'],
            joinedCount: Math.floor(Math.random() * 100), // Random joined count for demonstration
        });
    }

    return (
        <>
            <Navbar/>
            <div className={allchnlcss.row1}>
                <input className={allchnlcss.searchBar} type="text" placeholder="Search Channels..." />
                <button className={allchnlcss.createButton}>Create Channel</button>
            </div>
            <div className={allchnlcss.row2}>
                {/* List of channel cards */}
                {channels.map((channel) => (
                    <ChannelCard
                        key={channel.id}
                        name={channel.name}
                        description={channel.description}
                        tags={channel.tags}
                        joinedCount={channel.joinedCount}
                    />
                ))}
            </div>
        </>
    );
}

export default Allchannels