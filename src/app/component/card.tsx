"use client"
import { useEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from '../hooks/hooks'
import zIndexManage, { increment } from "../zIndexManage/zIndexManage";
import { Bind, CardContainer, MainContent, MediaName, ImageContainer, MainImage, H1, TitleContainer, ContentPreview, DropDownArrow, TimelineBlock, Circle, TimeLineRow, ExtendRightArrow, ContentBlock, ContentTitleContainer, HighLightWordStyle, CloseX, PushUp, LinkToNewTab, LinkIcon, TimeLineText } from "../style/card.style"

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
    setDraggedIndex:React.Dispatch<React.SetStateAction<number>>;
    setDraggedOverIndex:React.Dispatch<React.SetStateAction<number>>;
    handleSort:any;
    calculateCardColor:string;
}

const mediaChineseName:any = {
    spider_ltn:"自由時報",
    spider_cna:"中央社",
    spider_pts:"公視",
    spider_ettoday:"ETtoday新聞雲",
    spider_udn:"聯合報",
}


const Card: React.FC<CardProps> = ({ data, index, setDraggedIndex, setDraggedOverIndex, handleSort, calculateCardColor }) => {

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
                        <TitleContainer                    
                            $zIndex={zIndex+1}  
                            onClick={() => {
                                // clickHandler()
                                // setToggleContent(!toggleContent)                                                                
                            }}
                            onMouseEnter={() => {
                                setToggleMainContentPreview(true)
                                // setToggleTimeline(false)                                
                            }}
                            onMouseLeave={() => {
                                setToggleMainContentPreview(false)
                            }}
                        >
                            <a href={newsArray[0].link} target="_blank">
                                <H1>{newsArray[0].title}</H1>
                            </a>   
                        </TitleContainer>
                        {toggleMainContentPreview &&                         
                            <ContentPreview>{newsArray[0].content}</ContentPreview>
                        }
                        {/* <ExtendRightArrow></ExtendRightArrow> */}
                    </MainContent>                
                    <DropDownArrow onClick={() => setToggleTimeline(!toggleTimeline)} />
                    <TimelineBlock >
                        {toggleTimeline &&
                            newsArray
                                .slice(1)
                                .map((news:any,newsIndex:number) => (
                                    <TimeLineRow key={newsIndex}>                                       
                                        <PushUp onClick={() => pushUpToFirst(newsIndex+1)}/>
                                        <CloseX onClick={() => deleteNews(newsIndex+1)}/>                                        
                                        <Circle/>
                                        <TimeLineText 
                                            onMouseEnter={(e) => {     
                                                let y = e.currentTarget.getBoundingClientRect().top
                                                setToggleContentTop(y + window.scrollY - 150)
                                                setToggleContentIndex(newsIndex+1)
                                                clickHandler()
                                                setToggleContent(true)
                                            }}
                                            onMouseLeave={() => {
                                                setToggleContent(false)
                                            }}
                                        >
                                            <p>{news.time}</p>
                                            <a href={news.link} target="_blank">
                                                <ContentTitleContainer>
                                                    {news.title}
                                                </ContentTitleContainer>
                                            </a>
                                        </TimeLineText>
                                    </TimeLineRow>
                        ))}
                    </TimelineBlock>
                </CardContainer>
            )}                 
            {toggleContent&&(
                <ContentBlock onMouseUp={getSelection} $leftOrRight={index === newsArray.length-1} $inputColor={calculateCardColor} $toggleContentIndex={toggleContentIndex} $toggleContentTop={toggleContentTop}>
                    {newsArray[toggleContentIndex].content }   
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