
import sqphoto1 from '/sq1.jpg'
import sqphoto2 from '/sq2.jpg'
import sqphoto3 from '/sq3.jpg'
import sqphoto4 from '/sq4.jpg'

import Navbar1 from './Navbar1'
import firstpagecss from './Firstpage.module.css'

function Firstpage() {
    return (
        <div className={firstpagecss.mainroot}>
            <Navbar1 />
            <div className={firstpagecss.imagecontainer}>
                <div className={firstpagecss.logotextpart}>
                    <h1><span className={firstpagecss.logotext} data-text="ProCollab">ProCollab</span></h1>
                </div>
            </div>
            <div class={firstpagecss.imagesqr}>

                    <div class={firstpagecss.img1}>
                        <img src={sqphoto1} alt="Photo 1"></img>
                    </div>
                    <div class={firstpagecss.img2}>
                        <img src={sqphoto2} alt="Photo 2"></img>
                    </div>
                    <div class={firstpagecss.img3}>
                        <img src={sqphoto3} alt="Photo 3"></img>
                    </div>
                    <div class={firstpagecss.img4}>
                        <img src={sqphoto4} alt="Photo 4"></img>
                    </div>

            </div>
            <p className={firstpagecss.copyright}><span>Copyright : ProCollab</span></p>
        </div>
    );
}
export default Firstpage