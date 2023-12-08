"use client"
import { useEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from '../hooks/hooks'
import zIndexManage, { increment } from "../zIndexManage/zIndexManage";
import { Bind, CardContainer, MainContent, MediaName, ImageContainer, MainImage, H1, TitleContainer, ContentPreview, DropDownArrow, TimelineBlock, Circle, TimeLineRow, ExtendRightArrow, ContentBlock, ContentTitleContainer, HighLightWordStyle, IconsContainer, CloseX, PushUp, LinkToNewTab, LinkIcon, TimeLineText } from "../style/card.style"

interface News {
    title: string;
    photo: string;
    content:Array<string>;
    time:string;
    link:string;
    tag:Array<string>;

}
interface CardProps {
    data: {
        items: News[];
        spider_name:string;             
    };
    index:number;
    cardListLength:number;
    setDraggedIndex:React.Dispatch<React.SetStateAction<number>>;
    setDraggedOverIndex:React.Dispatch<React.SetStateAction<number>>;
    handleSort:any;
    calculateCardColor:string;
    center:any;
}

const mediaChineseName:any = {
    spider_ltn:"自由時報",
    spider_cna:"中央社",
    spider_pts:"公視",
    spider_ettoday:"ETtoday新聞雲",
    spider_udn:"聯合報",
}


const Card: React.FC<CardProps> = ({ data, index, cardListLength, setDraggedIndex, setDraggedOverIndex, handleSort, calculateCardColor, center }) => {

    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()
    const [zIndex, setZIndex] = useState<number>(0)
    const [newsArray,setNewsArray] = useState<any>([])
    const [toggleTimeline, setToggleTimeline] = useState<boolean>(false)
    const [toggleContent, setToggleContent] = useState<boolean>(false)
    const [toggleContentIndex, setToggleContentIndex] = useState<number>(0)
    const [toggleContentTop, setToggleContentTop] = useState<number>(0)
    const [toggleMainContentPreview, setToggleMainContentPreview] = useState<boolean>(false)
    const [highlightedText, setHightlightedText] = useState<Array<string>>([])
    
    const { spider_name, items } = data;
    
    useEffect(() => {
        setNewsArray(items)
    },[items])

    useEffect(() => {
        center()
    },[newsArray])
    
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
        handleSort()        
    }

    return (        
        <Bind $zIndex={zIndex}>                
            {newsArray.length > 0 && (
                <CardContainer $inputColor={calculateCardColor} 
                    draggable
                    onDragStart={() => {
                        setDraggedIndex(index)
                    }}                
                    onDragEnter={() =>{                        
                        setDraggedOverIndex(index)                                        
                    }}                        
                    onDragEnd={handleDragEnd}
                    onDragOver={(e) => {
                        e.preventDefault()
                    }}
                    onClick={() => {
                        clickHandler()
                    }}                  
                >
                    <LinkToNewTab $zIndex={zIndex+1} $left="260px" $top="25px">
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
                        <TitleContainer                    
                            $zIndex={zIndex+1}  
                            onClick={() => {
                                clickHandler()                                
                                setToggleMainContentPreview(!toggleMainContentPreview)
                            }}
                            // onMouseEnter={() => {
                            //     setToggleMainContentPreview(true)
                            //     // setToggleTimeline(false)                                
                            // }}
                            // onMouseLeave={() => {
                            //     setToggleMainContentPreview(false)
                            // }}
                        >
                            {/* <a href={newsArray[0].link} target="_blank">
                                <H1>{newsArray[0].title}</H1>
                            </a>    */}
                            <H1>{newsArray[0].title}</H1>
                        </TitleContainer>
                        {toggleMainContentPreview &&                         
                            <ContentPreview>{newsArray[0].content}</ContentPreview>
                        }
                        {/* <ExtendRightArrow></ExtendRightArrow> */}
                    </MainContent>                
                    <DropDownArrow onClick={() => {
                            setToggleTimeline(!toggleTimeline)
                            {toggleTimeline && toggleContent && setToggleContent(false)}
                            clickHandler()
                        }} 
                    />
                    <TimelineBlock >
                        {toggleTimeline &&
                            newsArray
                                .slice(1)
                                .map((news:any,newsIndex:number) => (
                                    <TimeLineRow key={newsIndex}>
                                        <IconsContainer>
                                            <PushUp onClick={() => pushUpToFirst(newsIndex+1)}/>
                                            <CloseX onClick={() => deleteNews(newsIndex+1)}/>
                                            <LinkToNewTab $zIndex={zIndex+1} $left="200px" $top="2px">
                                                <a href={news.link} target="_blank">
                                                    <LinkIcon></LinkIcon>
                                                </a>
                                            </LinkToNewTab>
                                        </IconsContainer>                                     
                                        <Circle/>
                                        <TimeLineText
                                            onClick={(e) => {     
                                                    let y = e.currentTarget.getBoundingClientRect().top
                                                    if(newsIndex+1 === toggleContentIndex && toggleContent === true){
                                                        setToggleContent(false)
                                                    }else{
                                                        setToggleContentTop(y + window.scrollY - 150)
                                                        setToggleContentIndex(newsIndex+1)
                                                        clickHandler()
                                                        setToggleContent(true)
                                                    }
                                                }}        
                                        >
                                            <p>{news.time}</p>
                                            <ContentTitleContainer>
                                                {news.title}
                                            </ContentTitleContainer>
                                        </TimeLineText>
                                    </TimeLineRow>
                        ))}
                    </TimelineBlock>
                </CardContainer>
            )}                 
            {toggleContent&&(
                <ContentBlock onMouseUp={getSelection} $leftOrRight={index === cardListLength-1} $inputColor={calculateCardColor} $toggleContentIndex={toggleContentIndex} $toggleContentTop={toggleContentTop} $zIndex={zIndex+1} >
                    {newsArray[toggleContentIndex].content}   
                    {/* {newsArray[0].content.map((paragraph:string,index:number) => 
                        <div key={index}>
                            <div>{paragraph}</div>
                            <br/>
                        </div>
                    )} */}
                </ContentBlock>
            )}                 
        </Bind>                            
    );
  };
  
export default Card