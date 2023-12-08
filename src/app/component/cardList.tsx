import Card from "./card"
import { useState, useRef, useEffect } from "react";
import { FaArrowsAltH } from "react-icons/fa";
import { ButtonToScrollLeft, ButtonToScrollRight, CardListContainer, ScrollArrow, Spectrum, SpectrumBackgournd,MediaTagContainer,  MediaTagForMobile} from "../style/cardList.style"


interface SearchResult {
  spider_name: string;
  items: any[];
  mediaIndex: number;  
}
const mediaChineseName:any = {
  spider_ltn:"自由時報",
  spider_cna:"中央社",
  spider_pts:"公視",
  spider_ettoday:"東森新聞雲",
  spider_udn:"聯合報",
}


const CardList = ({ searchResultsArray,mediaList }: { searchResultsArray: SearchResult[],mediaList:Array<string> }) => {  
  const [cards,setCards] = useState(searchResultsArray)
  const [draggedIndex, setDraggedIndex] = useState<number>(0)
  const [draggedOverIndex, setDraggedOverIndex] = useState<number>(0)
  const [fetchingFinished, setFetchingFinished] = useState<boolean>(false)
  
  const cardListContainerRef = useRef<HTMLDivElement | null>(null)
  const spectrumRef = useRef<HTMLDivElement | null>(null)
  const amountOfCards = searchResultsArray.length

  useEffect(() => {
    if(searchResultsArray.length === mediaList.length){
      setFetchingFinished(true)
    }
  },[searchResultsArray,mediaList])
  
  useEffect(() => {
    let filteredArray = searchResultsArray.filter((media)=>media.items.length>0)
    filteredArray.sort((a,b) => {return a.mediaIndex - b.mediaIndex})
    setCards(filteredArray)
  },[searchResultsArray])

  const center = () => {
    if(cardListContainerRef.current != null){
      const valueToCenter = (cardListContainerRef.current.scrollWidth-cardListContainerRef.current.offsetWidth)/2      
      cardListContainerRef.current.scrollLeft = valueToCenter     
    }    
  }

  
  
  const handleSort = () => {    
    let cloneSearchResultsArray = [...cards]
    let draggedCardIndex = draggedIndex
    let draggedOverCardIndex = draggedOverIndex
    let draggedCardData = cloneSearchResultsArray[draggedCardIndex]
    //swap
    cloneSearchResultsArray[draggedCardIndex] = cloneSearchResultsArray[draggedOverCardIndex]
    cloneSearchResultsArray[draggedOverCardIndex] = draggedCardData
    setCards(cloneSearchResultsArray)         
  }
  const handleScroll = () => {
    if(cardListContainerRef.current != null && spectrumRef.current != null){       
      spectrumRef.current.scrollLeft = cardListContainerRef.current.scrollLeft      
    }
  }
  const spectrumHandleScroll = () => {
    if(cardListContainerRef.current != null && spectrumRef.current != null){       
      cardListContainerRef.current.scrollLeft = spectrumRef.current.scrollLeft      
    }
  }
  const clickThenScrollLeft = () => {    
    if(cardListContainerRef.current != null){      
      const scrollDistance = cardListContainerRef.current.offsetWidth    
      cardListContainerRef.current.scrollBy({left:-scrollDistance})        
    }
  }
  const clickThenScrollRight = () => {
    if(cardListContainerRef.current != null){      
      const scrollDistance = cardListContainerRef.current.offsetWidth    
      cardListContainerRef.current.scrollBy({left:scrollDistance})        
    }
  }
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
    return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},0.5)`
}
  
  return (
      <div>        
        <Spectrum ref={spectrumRef} onScroll={spectrumHandleScroll} $fetchingFinished={fetchingFinished} >
          <ScrollArrow $left={160*amountOfCards}>
            <FaArrowsAltH />
          </ScrollArrow>
          <SpectrumBackgournd $width={320*amountOfCards}/>
        </Spectrum>
        <MediaTagContainer>
          {cards.map((cards,index) => {
            return(
              <MediaTagForMobile 
                key={cards.spider_name} 
                $backgroundColor={calculateCardColor(index)} 
                draggable 
                onDragStart={() => {
                  setDraggedIndex(index)
                }}                
                onDragEnter={() =>{                        
                    setDraggedOverIndex(index)                                        
                }}                        
                onDragEnd={handleSort}
                onDragOver={(e) => {
                    e.preventDefault()
                }}
              >
                {mediaChineseName[cards.spider_name]}
              </MediaTagForMobile>
            )
          })}
        </MediaTagContainer>
        {searchResultsArray.length > 0 &&
          <div>
            <ButtonToScrollLeft onClick={clickThenScrollLeft} $fetchingFinished={fetchingFinished}/>
            <ButtonToScrollRight onClick={clickThenScrollRight} $fetchingFinished={fetchingFinished}/>
          </div>        
        }
        <CardListContainer ref={cardListContainerRef} onScroll={handleScroll} $fetchingFinished={fetchingFinished}>
            {cards
              .filter((e) => e.items.length > 0)          
              .map((card,index) => {
                return (
                  <div key={index}>
                    <Card key={card.spider_name} data={card} index={index} cardListLength={cards
              .filter((e) => e.items.length > 0).length} setDraggedIndex={setDraggedIndex} setDraggedOverIndex={setDraggedOverIndex} handleSort={handleSort} calculateCardColor={calculateCardColor(index)} center={() => center()}/>
                  </div>                  
                  );
              })}
        </CardListContainer>    
      </div>   
  );    
};


export default CardList