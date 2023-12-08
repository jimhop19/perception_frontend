import { keyframes } from "styled-components"
import styled from "styled-components"
import DemoCard from "./demoCard"
import { useState } from "react"
import { LiaHandPointer } from "react-icons/lia";
import { PiHandGrabbing } from "react-icons/pi";

const move1_1 = keyframes`
    0% {transform:translate(0vw,0vw);}
    70% {transform:translate(12vw,-1vw);}
    100% {transform:translate(12vw,0vw);}    
`
const CardMove1_1 = styled.div`
    animation:${move1_1} 2s ease-in-out 1 1s;
    animation-fill-mode: forwards;
`
const move1_2 = keyframes`
    0% {transform:translate(0vw,0vw);}
    70% {transform:translate(0vw,0vw);}
    100% {transform:translate(-12vw,0vw);}
`
const CardMove1_2 = styled.div`
    animation:${move1_2} 2s ease-in-out 1 1s;
    animation-fill-mode: forwards;
`
const move2_1 = keyframes`
    0% {transform:translate(0vw,0vw);}
    70% {transform:translate(-12vw,-1vw);}
    100% {transform:translate(-12vw,0vw);}    
`
const CardMove2_1 = styled.div`
    animation:${move2_1} 2s ease-in-out 1 4s;
    animation-fill-mode: forwards;
`
const move2_2 = keyframes`
    0% {transform:translate(0vw,0vw);}
    70% {transform:translate(0vw,0vw);}
    100% {transform:translate(12vw,0vw);}
`
const CardMove2_2 = styled.div`
    animation:${move2_2} 2s ease-in-out 1 4s;
    animation-fill-mode: forwards;
`
const Cursor = styled.div`    
    position: absolute;
    top:28vw;
    left:62vw;
    @media (max-width:451px) {
        top:84.5vw;
        width:30vw;
    }
`
const cursorMove = keyframes`
    0% {transform:translate(0vw,0vw)}
    28% {transform:translate(12vw,0vw)}
    60% {transform:translate(36vw,1vw)}
    84% {transform:translate(24vw,1vw)}
    100% {transform:translate(20vw,10vw)}    
`
const cursorMoveMobile = keyframes`
    0% {transform:translate(0vw,0vw)}
    28% {transform:translate(12vw,0vw)}
    60% {transform:translate(36vw,1vw)}
    84% {transform:translate(24vw,1vw)}
    100% {transform:translate(20vw,8.5vw)}    
`
const CursorMove1and2 = styled.div`
    animation:${cursorMove} 5s ease-in-out 1 1s;
    animation-fill-mode:forwards;
    @media (max-width:451px) {
        animation:${cursorMoveMobile} 5s ease-in-out 1 1s;
        animation-fill-mode:forwards;
    }
`
const toggleChange = keyframes`
    0%{}
    100%{}
`
const ToggleChange = styled.div`
    animation:${toggleChange} 2s ease-in-out 1 7s;
    animation-fill-mode:forwards;
`

const cards = [0,1,2,3,4]

const Demo = () => {
    const [animation1Ended,setAnimation1Ended] = useState<boolean>(false)
    const [animation2Ended,setAnimation2Ended] = useState<boolean>(false)
    const [toggleTimeLine,setToggleTimeLine] = useState<boolean>(false)
    const [pointer,setPointer] = useState<boolean>(false)
    const [grab,setGrab] = useState<boolean>(false)

    const calculateCardColor = (index:number) =>{        
        let r = 0
        let g = 0
        let b = 0
        if(cards.length%2 === 0){
            if(index < cards.length/2){
                r = 0 + (35-0)/(cards.length/2-0.5)*index
                g = 154 + (201-154)/(cards.length/2-0.5)*index
                b = 0 + (201-0)/(cards.length/2-0.5)*index
            }else{
                r = 35 + (0-35)/(cards.length/2-0.5)*(index-(cards.length/2-0.5))
                g = 201 + (0-201)/(cards.length/2-0.5)*(index-(cards.length/2-0.5))
                b = 201 + (172-201)/(cards.length/2-0.5)*(index-(cards.length/2-0.5))
            }
        }else{
            if(index === 0){
                r = 0
                g = 154
                b = 0
            }else if (index === cards.length/2-0.5){
                r = 35
                g = 201
                b = 201
            }else if (index === cards.length-1){
                r = 0
                g = 0
                b = 172
            }else if (index < cards.length/2-0.5){
                r = 0 + (35-0)/(cards.length/2-0.5)*index
                g = 154 + (201-154)/(cards.length/2-0.5)*index
                b = 0 + (201-0)/(cards.length/2-0.5)*index
            }else{
                r = 35 + (0-35)/(cards.length/2-0.5)*index/(cards.length/2-0.5)
                g = 201 + (0-201)/(cards.length/2-0.5)*index/(cards.length/2-0.5)
                b = 201 + (172-201)/(cards.length/2-0.5)*index/(cards.length/2-0.5)
            }
        }
        return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},0.7)`
    }
    const handleSwitchColor = (animationIndex:number,originalIndex:number,nextIndex:number) => {
        if(animationIndex === 1){
            if(animation1Ended){
                return calculateCardColor(nextIndex)
            }else{
                return calculateCardColor(originalIndex)
            }
        }else{
            if(animation2Ended){
                return calculateCardColor(nextIndex)
            }else{
                return calculateCardColor(originalIndex)
            }
        }
    }

    return(
        <div style={{width:"100vw",height:"100vh",overflow:"hidden",position:"absolute",top:"0",zIndex:"-1"}}>
            <CardMove2_2>
                <DemoCard $inputColor={handleSwitchColor(2,3,4)} $left={81} $index={4} $toggle={false}></DemoCard>
            </CardMove2_2>
            <CardMove2_1 onAnimationEnd={() => setAnimation2Ended(true)}>
                <DemoCard $inputColor={handleSwitchColor(2,4,3)} $left={93} $index={5} $toggle={toggleTimeLine}></DemoCard>
            </CardMove2_1>

            <CardMove1_2>
                <DemoCard $inputColor={handleSwitchColor(1,2,1)} $left={69} $index={2} $toggle={false}></DemoCard>
            </CardMove1_2>
            <CardMove1_1 onAnimationEnd={()=> setAnimation1Ended(true)}>
                <DemoCard $inputColor={handleSwitchColor(1,1,2)} $left={57} $index={1} $toggle={false}></DemoCard>
            </CardMove1_1>            
            <DemoCard $inputColor={calculateCardColor(0)} $left={45} $index={3} $toggle={false}></DemoCard>
            <ToggleChange                
                onAnimationStart={() => 
                    setToggleTimeLine(true)}
                onAnimationEnd={() => {
                    setToggleTimeLine(false)
                    setPointer(false)
                }}    
            />
            
            <CursorMove1and2
                onAnimationStart={() => {
                   setGrab(true)
                }}
                onAnimationEnd={() => {
                    setPointer(true)
                    setGrab(false)}}>
                <Cursor>
                    {pointer && <LiaHandPointer/>}
                    {grab &&<PiHandGrabbing/>}
                </Cursor>
            </CursorMove1and2>
        </div>  
    )
}

export default Demo