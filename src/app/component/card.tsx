"use client"
import { useEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from '../hooks/hooks'
import zIndexManage, { increment } from "../zIndexManage/zIndexManage";
import { Bind, CardContainer, MainContent, MediaName, ImageContainer, MainImage, H1, TitleContainer, DropDownArrow, TimelineBlock, Circle, TimeLineRow, ExtendRightArrow, ContentBlock, HighLightWordStyle, CloseX, PushUp, LinkToNewTab, LinkIcon, TimeLineText } from "../style/card.style"

interface News {
    title: string;
    photo: string;
    content:string;
    time:string;
    link:string;
}
interface CardProps {
    data: {
        items: News[];
        spider_name:string;             
    };
    index:number;
    setDraggedIndex:any;
    setDraggedOverIndex:any;
    handleSort:any;
}

const mediaChineseName:any = {
    spider_ltn:"自由時報",
    spider_cna:"中央社",
    spider_pts:"公視",
    spider_ettoday:"ETtoday新聞雲",
    spider_udn:"聯合報",
}


const Card: React.FC<CardProps> = ({ data, index, setDraggedIndex, setDraggedOverIndex, handleSort }) => {

    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()
    const [zIndex, setZIndex] = useState<number>(0)
    const [newsArray,setNewsArray] = useState<any>([])
    const [toggleTimeline, setToggleTimeline] = useState<boolean>(false)
    const [toggleContent, setToggleContent] = useState<boolean>(false)  
    const [highlightedText, setHightlightedText] = useState<Array<string>>([])
    
    const { spider_name, items } = data;
    const calculateCardColor = (index:number) =>{
        let r = 0
        let g = 0
        let b = 0
        if(items.length%2 === 0){
            if(index < items.length/2){
                r = 0 + (35-0)/(items.length/2-0.5)*index
                g = 154 + (201-154)/(items.length/2-0.5)*index
                b = 0 + (201-0)/(items.length/2-0.5)*index
            }else{
                r = 35 + (0-35)/(items.length/2-0.5)*(index-(items.length/2-0.5))
                g = 201 + (0-201)/(items.length/2-0.5)*(index-(items.length/2-0.5))
                b = 201 + (172-201)/(items.length/2-0.5)*(index-(items.length/2-0.5))
            }
        }else{
            if(index === 0){
                r = 0
                g = 154
                b = 0
            }else if (index === items.length/2-0.5){
                r = 35
                g = 201
                b = 201
            }else if (index === items.length-1){
                r = 0
                g = 0
                b = 172
            }else if (index < items.length/2-0.5){
                r = 0 + (35-0)/(items.length/2-0.5)*index
                g = 154 + (201-154)/(items.length/2-0.5)*index
                b = 0 + (201-0)/(items.length/2-0.5)*index
            }else{
                r = 35 + (0-35)/(items.length/2-0.5)*index/(items.length/2-0.5)
                g = 201 + (0-201)/(items.length/2-0.5)*index/(items.length/2-0.5)
                b = 201 + (172-201)/(items.length/2-0.5)*index/(items.length/2-0.5)
            }
        }
        return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},0.7)`
    }
    useEffect(() => {
        setNewsArray(items)
    },[items])
    
    // const getSelection = () => {
    //     let selectedWord:any = window.getSelection()?.toString().trim()        
    //     if (selectedWord != ""){
    //         setHightlightedText([...highlightedText,selectedWord])
    //     }        
    // }
    // const eventLogger:DraggableEventHandler = (e: DraggableEvent, data: DraggableData) => {     
    //     setZIndex(count);
    //     console.log(data.node.offsetLeft);
    //     console.log(data.x)
    //   };
    
    // const handleDragStart :DraggableEventHandler = (e: DraggableEvent, data: DraggableData) => {        
    //     dispatch(increment())
    //   };
    // const moveForward = () => {
    //     setZIndex(count)
    // }
    const clickHandler = () => {
        dispatch(increment())
        setZIndex(count)        
    }
    const checkIfPhoto = (input:string) => {
        if (input === null){
            return false
        }
        return true
    }
    const pushUpToFirst = (index:number) => {        
        let updatedItems = [...newsArray]        
        const selectedNews = updatedItems[index]
        updatedItems.splice(index,1)
        updatedItems.unshift(selectedNews)
        setNewsArray(updatedItems)        
    }
    const deleteNews = (index:number) => {
        let updatedItems = [...newsArray]
        updatedItems.splice(index,1)
        setNewsArray(updatedItems)
    }
    const handleDragEnd = () => {
        console.log("end")
        handleSort()
    }

    return (        
        <Bind $zIndex={zIndex}>                
            {newsArray.length > 0 && (
                <CardContainer $inputColor={calculateCardColor(index)} 
                    draggable
                    onDragStart={() => {
                        setDraggedIndex(index)                        
                    }}                
                    onDragEnter={() =>{                        
                        setDraggedOverIndex(index)                                        
                    }}                        
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => {e.preventDefault()}} 
                >
                    <LinkToNewTab $zIndex={zIndex+1}>
                        <a href={newsArray[0].link} target="_blank">
                            <LinkIcon></LinkIcon>
                        </a>
                    </LinkToNewTab>                    
                    <MainContent>
                        <MediaName>{mediaChineseName[spider_name]}</MediaName>
                        <div>{newsArray[0].time}</div>
                        <ImageContainer $hasPhoto ={checkIfPhoto(newsArray[0].photo)}>                                
                            <MainImage
                                src={newsArray[0].photo} 
                                alt=""/>
                        </ImageContainer>
                        <TitleContainer>                            
                            <H1>{newsArray[0].title}</H1>
                        </TitleContainer>
                        <ExtendRightArrow onClick={
                            () => {
                                clickHandler()
                                setToggleContent(!toggleContent)}}>
                        </ExtendRightArrow>
                    </MainContent>                
                    <DropDownArrow onClick={() => setToggleTimeline(!toggleTimeline)} />
                    <TimelineBlock >
                        {toggleTimeline &&
                            newsArray
                                .slice(1)
                                .map((news:any,index:number) => (
                                    <TimeLineRow key={index} >                                       
                                        <PushUp onClick={() =>pushUpToFirst(index+1)}/>
                                        <CloseX onClick={() =>deleteNews(index+1)}/>                                        
                                        <Circle/>
                                        <TimeLineText>
                                            <p>{news.time}</p>
                                            {news.title}
                                        </TimeLineText>
                                    </TimeLineRow>
                        ))}
                    </TimelineBlock>
                </CardContainer>
            )}                 
            {toggleContent&&(
                <ContentBlock onMouseUp={getSelection} $leftOrRight={index==newsArray.length-1} $inputColor={calculateCardColor(index)}>
                    {newsArray[0].content}             
                </ContentBlock>
            )}                 
        </Bind>                            
    );
  };
  
export default Card