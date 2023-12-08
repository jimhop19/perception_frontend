import logoGrey from "../../../public/logo_gray.png"
import Image from "next/image"

const NavigationBar = () => {
    
    return(        
            <Image 
                src={logoGrey} 
                alt="logo" 
                style={{
                    width:"auto",
                    height:"35px",
                    position:"absolute",
                    left:"5.5vw",
                    top:"3.6vh",                 
                    opacity:"0.3",
                    zIndex:"10000001",              
                }}
                priority={true}
                >            
            </Image>
    )
}

export default NavigationBar