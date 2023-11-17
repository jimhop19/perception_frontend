"use client"
import styled from "styled-components";
import {RiArrowDropDownLine} from "react-icons/ri"
import {IoIosArrowDropright} from "react-icons/io"
import { useState } from "react";
import Draggable from 'react-draggable';
import { useAppSelector, useAppDispatch } from '../hooks/hooks'
import { increment } from "../zIndexManage/zIndexManage";
import { DraggableEvent,DraggableEventHandler,DraggableData } from "react-draggable";

interface News {
    title: string;
    photo: string;
    content:string;
    time:string;
}
interface CardProps {
    data?: {
        items: News[];
        spider_name:string;       
    };        
}


const Bind = styled.div<{$zIndex?: number;}>`
    display: flex;
    z-index:${props => props.$zIndex || 0};
`
const CardContainer = styled.div`
    width: 300px;
    padding: 25px 25px 10px;
    margin:20px;
    border:1px solid #6c6c6c;
    border-radius:30px;
    height: fit-content;
    background-color: #fff;
`
const MainContent = styled.div`
    position: relative;
`
const MediaName = styled.div`
    font-weight:900;
    margin-bottom:10px;
`
const ImageContainer = styled.div`    
    height: 225px;
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
`
const TimelineBlock = styled.div`
    border-left:2px solid #b3b3b3;
    transform:translateX(7px);
    padding-left:10px;    
    margin-top:10px;
`
const Circle = styled.span`
    width: 10px;
    height: 10px;    
    border: 1px solid #b3b3b3;
    background-color:#b3b3b3;
    border-radius: 50%;
    display: block;
    position: absolute;
    left:-17px;
    top:6.5px;
`
const ExtendedTitle = styled.div`
    line-height:25px;
    margin:0px 0px 15px;
    position: relative;    
`
const ExtendRightArrow = styled(IoIosArrowDropright)`
    transform:scale(1);
    position: absolute;
    right: -20px;
    top:50%;
`
const ContentBlock = styled.div`
    width: 300px;
    height: fit-content;
    margin:20px 0px 0px -40px;
    padding: 25px 25px 25px 45px;    
    background-color: #fff;
    border:1px solid #6c6c6c;
    border-radius:30px;
    z-index:-1;
    position:absolute;
    left:380px;
`


const Card: React.FC<CardProps> = ({ data }) => {
    const [toggleTimeline, setToggleTimeline] = useState<boolean>(false);
    const [toggleContent, setToggleContent] = useState<boolean>(false); 
    const [zIndex, setZIndex] = useState<number>(0)  
    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()
  
    if (!data) {      
      return null; 
    }
  
    const { spider_name, items } = data;

    const eventLogger:DraggableEventHandler = (e: DraggableEvent, data: DraggableData) => {     
        setZIndex(count)   
        console.log(window.getComputedStyle(data.node).getPropertyValue("z-index"));
        // console.log(count);
      };
    
    const handleDragStart :DraggableEventHandler = (e: DraggableEvent, data: DraggableData) => {        
        dispatch(increment())
      };
    const moveForward = () => {
        setZIndex(count)
    }
    const clickHandler = () => {
        dispatch(increment())
        setZIndex(count)
        console.log("click")        
    }

    return (
        <Draggable  onStart={handleDragStart} onDrag={moveForward} onStop={eventLogger} >
            <Bind $zIndex={zIndex} onClick={clickHandler}>            
                <CardContainer>
                    <MediaName>{spider_name}</MediaName>
                    <div>{items[0].time}</div>      
                    {items.length > 0 && (
                        <MainContent>
                            <ImageContainer >
                                <MainImage
                                    src={items[0].photo} 
                                    alt=""/>
                                </ImageContainer>
                            <TitleContainer>                            
                                <H1>{items[0].title}</H1>
                            </TitleContainer>
                            <ExtendRightArrow onClick={
                                () => {
                                    clickHandler();
                                    setToggleContent(!toggleContent)}}>

                            </ExtendRightArrow>
                        </MainContent>
                    )}
                    <DropDownArrow onClick={() => setToggleTimeline(!toggleTimeline)} />
                    <TimelineBlock>
                        {toggleTimeline &&
                            items
                                .slice(1)
                                .map((news) => (
                                    <ExtendedTitle key={news.title}>
                                        <p>{news.time}</p>
                                        {news.title}
                                        <Circle/>
                                    </ExtendedTitle>
                        ))}
                    </TimelineBlock>
                </CardContainer>
                {toggleContent&&(
                    <ContentBlock>
                        {items[0].content}
                    </ContentBlock>
                )}
            </Bind>
        </Draggable>
    );
  };
  
export default Card