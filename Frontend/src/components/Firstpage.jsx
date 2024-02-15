
import logotext from '/logotext.png'
import sqphoto from '/images.jpg'
import Navbar from './Navbar'
import firstpagecss from './Firstpage.module.css'

function Firstpage() {
    return (
        <div className={firstpagecss.mainroot}>
            <Navbar />
            <div className={firstpagecss.imagecontainer}>
                <img src={logotext} className={firstpagecss.imagecontainer}></img>
            </div>
            <div class={firstpagecss.imagesqr}>
                <div class={firstpagecss.row}>
                    <div class={firstpagecss.column}>
                        <img src={sqphoto} alt="Photo 1"></img>
                    </div>
                    <div class={firstpagecss.column}>
                        <img src={sqphoto} alt="Photo 2"></img>
                    </div>
                </div>
                <div class={firstpagecss.row}>
                    <div class={firstpagecss.column}>
                        <img src={sqphoto} alt="Photo 3"></img>
                    </div>
                    <div class={firstpagecss.column}>
                        <img src={sqphoto} alt="Photo 4"></img>
                    </div>
                </div>
            </div>
            <p className={firstpagecss.copyright}><span>Copyright : ProCollab</span></p>
        </div>
    );
}
export default Firstpage