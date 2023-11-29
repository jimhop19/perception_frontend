import styled from "styled-components";
import { MdOpenInNew } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri"
import { IoMdClose } from "react-icons/io";
import { LiaUploadSolid } from "react-icons/lia";


const Bind = styled.div<{$zIndex?:number;}>`
    display: flex;
    z-index:${props => props.$zIndex || 2};
    position:relative;
`
const CardContainer = styled.div<{$inputColor?:string;}>`
    width: 250px;
    padding: 25px 25px 10px;
    margin:10px 10px;
    border-width:1px;
    border-style: solid;
    border-color: ${props => props.$inputColor || "#6c6c6c"};
    border-radius:30px;
    height: fit-content;    
    position:relative;
    background-color: #fff;
`
const MainContent = styled.div`
    position: relative;
    cursor:move;
    &:active{
        cursor:grabbing;
    }
    &:hover{
        cursor: grab;
    } 
`
const MediaName = styled.div`
    font-weight:900;
    margin-bottom:10px;
`
const LinkToNewTab = styled.div<{$zIndex?: number;}>`
    position:absolute;
    left:260px;
    top:25px;
    z-index:${props => props.$zIndex || 2};
    &:hover{
        cursor: pointer;
    }
`
const LinkIcon = styled(MdOpenInNew)`
    z-index:2;
    &:hover{
        cursor: pointer;
    }
`
const ImageContainer = styled.div< {$hasPhoto? : boolean;}>`    
    height: ${props => props.$hasPhoto? "225px" : "0px" };
    overflow:hidden;
    display:flex;
    justify-content:center;
    align-items:center;
    margin:20px 0px;
    pointer-events:none;
`
const MainImage = styled.img`
    height:225px;
    min-height:225px;
`
const H1 = styled.h1`
    font-size:25px;
    font-weight: 500;    
    margin:10px 0px;
    line-height:30px;    
`
const TitleContainer = styled.div`
    position: relative;
`
const DropDownArrow = styled(RiArrowDropDownLine)`    
    transform:scale(2.5);
    &:hover{
        cursor: pointer;
    }  
`
const TimelineBlock = styled.div`
    border-left:2px solid #b3b3b3;
    transform:translateX(7px);
    padding-left:10px;    
    margin-top:10px;
    position:relative;        
`
const Circle = styled.div`    
    width: 10px;
    height: 10px;    
    border: 1px solid #b3b3b3;
    background-color:#b3b3b3;
    border-radius: 5px;
    display: block;
    position: absolute;
    left:-17px;
    top:6.5px;
`
const TimeLineText = styled.div`
    box-sizing:border-box;    
`
const PushUp = styled(LiaUploadSolid)`
    position:absolute;
    left:190px;
    top:4px;
    color:#7a7a7a;
    &:hover{
        cursor: pointer;
    }  
`
const CloseX = styled(IoMdClose)`
    position:absolute;
    left:220px;
    top:4px;
    color:red;
    &:hover{
        cursor: pointer;
    }  
`
const TimeLineRow = styled.div`
    line-height:25px;
    margin:0px 0px 15px;
    padding-left:10px;
    position: relative;    
`
const ExtendRightArrow = styled(MdKeyboardArrowRight)`
    transform:scale(1.5);
    position: absolute;
    right: -20px;
    top:50%;
    &:hover{
        cursor: pointer;
    }
`
const ContentBlock = styled.div<{$leftOrRight?:boolean,$inputColor?:string;}>`
    width: 300px;
    height: fit-content;
    margin:10px 0px 0px -40px;
    padding: 25px 35px 25px 35px;    
    background-color: #fff;
    border-width:1px;
    border-style: solid;
    border-color: ${props => props.$inputColor || "#6c6c6c"};
    border-radius:30px;
    z-index:-1;
    position:absolute;
    left:${props => props.$leftOrRight? -290:330}px;
`
const HighLightWordStyle = styled.span`
    background-color:yellow;
`

export{ Bind, CardContainer, MainContent, MediaName, ImageContainer, MainImage, H1, TitleContainer, DropDownArrow, TimelineBlock, Circle, TimeLineRow, ExtendRightArrow, ContentBlock, HighLightWordStyle, CloseX, PushUp, LinkToNewTab, LinkIcon, TimeLineText }