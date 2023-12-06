import styled from "styled-components";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useRef } from "react";

const Card = styled.div<{$inputColor:string,$left:string,$toggle:boolean}>`
    width:11vw;
    height:${props => props.$toggle? "50vh":"35vh"};
    background-color:rgba(255,255,255,1);
    border-color: ${props => props.$inputColor};
    border-width:2px;
    border-style:solid;
    border-radius:2vw;
    padding:1vw;
    box-sizing:border-box;
    overflow:hidden;
    position:absolute;
    top:40vh;
    left:${props => props.$left};
    z-index:1;
`
const Skeleton = styled.div<{$width:string,$height:string,$color:string}>`
    width:${props => props.$width};
    height:${props => props.$height};
    background-color:${props => props.$color};
    margin:0.4vw 0;
`
const DropDownArrow = styled(RiArrowDropDownLine)`
    transform:translate(-0.2vw,-0.5vh);
    position:absolute;
    color:rgba(200,200,200,1);
`
const transferToColor = (index:number) => {
    const opacity = 0.15 * index + 0.3
    return `rgba(200,200,200,${opacity})`
}


const DemoCard = ({$inputColor, $left, $index, $toggle}:{$inputColor:string, $left:string, $index:number, $toggle:boolean}) => {
    const ref = useRef<HTMLDivElement | null>(null)

    return (
            <Card $inputColor={$inputColor} $left={$left} $toggle={$toggle}  ref={ref}>
                <Skeleton $width="4vw" $height="0.8vw" $color={transferToColor($index)}/>
                <Skeleton $width="6vw" $height="0.8vw" $color={transferToColor($index)}/>
                <Skeleton $width="8.8vw" $height="6vw" $color={transferToColor($index)}/>
                <Skeleton $width="8.8vw" $height="1.2vw" $color={transferToColor($index)}/>
                <Skeleton $width="8.8vw" $height="1.2vw" $color={transferToColor($index)}/>
                <Skeleton $width="8.8vw" $height="3vw" $color={transferToColor($index)}/>
                {ref.current!=undefined && <DropDownArrow/>}
                <br />
                <Skeleton $width="8.8vw" $height="3vh" $color={transferToColor($index)}/>
                <Skeleton $width="8.8vw" $height="3vh" $color={transferToColor($index)}/>
            </Card>        
    )
}

export default DemoCard