import Navbar1 from "./Navbar1";
import firstpagecss from "./Firstpage.module.css";

function Firstpage() {
  return (
    <div className={firstpagecss.mainroot}>
      <Navbar1 />
      <div className={firstpagecss.imagecontainer}>
        <div className={firstpagecss.logotextpart}>
          <h1>
            <span className={firstpagecss.logotext} data-text="ProCollab">
              ProCollab
            </span>
          </h1>
          <div className={firstpagecss.slogan}>
            Empowering Dreams, Building Together: Where Projects Unite!
          </div>
        </div>
      </div>

      <div class={firstpagecss.imagesqr}>
        <div class={`${firstpagecss.box1} ${firstpagecss.descriptionBox}`}>
          <h2>Channels</h2>

          <p>
            Discover our "Channel" module – a hub for project enthusiasts.
            Explore curated channels, engage in discussions through the comment
            box, and join a vibrant community shaping the future of
            collaborative projects. Unleash collective creativity with
            ProCollab!
          </p>
        </div>
        <div class={`${firstpagecss.box2} ${firstpagecss.descriptionBox}`}>
          <h2>Projects</h2>
          <p>
            Step into our Project Hub, a dynamic space for innovators to
            showcase projects and build connections. Express appreciation with
            likes and offer constructive feedback in our thriving community.
            Join us in celebrating diversity, shaping a collective journey of
            innovation and collaboration.
          </p>
        </div>
        <div class={`${firstpagecss.box3} ${firstpagecss.descriptionBox}`}>
          <h2>Resources</h2>
          <p>
            Explore our integrated "Resources" section tailored to your
            interests. Discover curated learning paths and valuable resources
            for a personalized experience. Enhance your knowledge and skills on
            ProCollab's platform.
          </p>
        </div>
      </div>
      <p className={firstpagecss.copyright}>
        <span>Copyright : ProCollab</span>
      </p>
    </div>
  );
}
export default Firstpage;
