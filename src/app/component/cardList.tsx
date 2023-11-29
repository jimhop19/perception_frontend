import Card from "./card"
import { useState, useRef, useEffect } from "react";
import { FaArrowsAltH } from "react-icons/fa";
import { ButtonToScrollLeft, ButtonToScrollRight, CardListContainer, ScrollArrow, Spectrum, SpectrumBackgournd} from "../style/cardList.style"


interface SearchResult {
  spider_name: string;
  items: any[];
  mediaIndex: number;  
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

  useEffect(() => {
    if(cardListContainerRef.current != null){  
      const valueToCenter = (cardListContainerRef.current.scrollWidth-cardListContainerRef.current.offsetWidth)/2      
      cardListContainerRef.current.scrollLeft = valueToCenter
    }    
  },[fetchingFinished])
  
  const handleSort = () => {
    console.log("cardlist",draggedIndex,draggedOverIndex) 
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
  
  return (
      <div>        
        <Spectrum ref={spectrumRef} onScroll={spectrumHandleScroll} $fetchingFinished={fetchingFinished} >
          <ScrollArrow $left={160*amountOfCards}>
            <FaArrowsAltH />
          </ScrollArrow>
          <SpectrumBackgournd $width={320*amountOfCards}/>
        </Spectrum>
        {searchResultsArray.length > 0 &&
          <div>
            <ButtonToScrollLeft onClick={clickThenScrollLeft} $fetchingFinished={fetchingFinished}/>
            <ButtonToScrollRight onClick={clickThenScrollRight} $fetchingFinished={fetchingFinished}/>
          </div>        
        }
        <CardListContainer ref={cardListContainerRef} onScroll={handleScroll} $fetchingFinished={fetchingFinished}>
            {cards
              .filter((e) => e.items.length > 0)          
              .map((cards,index) => {
                return (
                  <div key={index}>
                    <Card key={cards.spider_name} data={cards} index={index} setDraggedIndex={setDraggedIndex} setDraggedOverIndex={setDraggedOverIndex} handleSort={handleSort}/>
                  </div>
                  );
              })}
        </CardListContainer>    
      </div>   
  );    
};


export default CardList