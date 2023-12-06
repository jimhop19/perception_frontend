import logoGrey from "../../../public/logo_gray.png"
import Image from "next/image"

const NavigationBar = () => {
    return(
        <Image 
            src={logoGrey} 
            alt="logo" 
            style={{
                width:"auto",
                height:"40px",
                position:"absolute",
                left:"6vw",
                top:"3vh",                 
                opacity:"0.3",
                zIndex:"10000001",              
            }}
            priority={true}
            >            
        </Image>
    )
}

export default NavigationBar