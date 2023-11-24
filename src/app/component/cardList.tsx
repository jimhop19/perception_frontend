import styled from "styled-components";
import Card from "./card"
import { useState, useRef, useEffect } from "react";
import { FaArrowsAltH } from "react-icons/fa";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";


interface SearchResult {
  spider_name: string;
  items: any[];
  mediaIndex: number;  
}
const ButtonToScrollLeft = styled(MdKeyboardArrowLeft)`
  transform:scale(10);
  color:#D3D3D3;
  opacity:0.6;
  position:absolute;
  left:4vw;
  top:40vh;
  z-index:100000;
`
const ButtonToScrollRight = styled(MdKeyboardArrowRight)`
  transform:scale(10);
  color:#D3D3D3;
  opacity:0.6;
  position:absolute;
  left:94vw;
  top:40vh;
  z-index:100000;
`
const CardListContainer = styled.div`
  display: flex;
  position: relative;
  overflow: scroll;
  margin:0 5vw;  
  width:90vw;
  -ms-overflow-style: none; 
  scrollbar-width: none;
  &::-webkit-scrollbar{
    display:none;
  }
`
const ScrollArrow = styled.div<{$left:number}>`
  position:absolute;
  left:${props => props.$left || 0 }px;
  top:2px;
  color:rgba(256,256,256,1);
  display:none;
`
const Spectrum = styled.div`
  height: 20px;
  width: 90vw;
  background-color:transparent;
  margin:20px 5vw;
  border-radius:20px;
  position: relative;
  overflow:scroll;
  -ms-overflow-style: none; 
  scrollbar-width: none;
  &::-webkit-scrollbar{
    display:none;    
  }
  &:hover{
    div{
      display:block;
    }
  }
`
const SpectrumBackgournd = styled.div<{$width:number}>`
  background-image:linear-gradient(90deg,rgba(0,154,0,0.7),rgba(35,201,201,0.7),rgba(0,0,172,0.7));
  width: ${props => props.$width || 0 }px;
  height:20px;
  border-radius:20px;
  transition:0.5s;
  transition-timing-function: ease;
`


const CardList = ({ searchResultsArray }: { searchResultsArray: SearchResult[] }) => {  
  const [cards,setCards] = useState(searchResultsArray)  

  const draggedCard = useRef<number>(0)
  const draggedOverCard = useRef<number>(0)

  const cardContainerRef = useRef<HTMLDivElement | null>(null)
  const spectrumRef = useRef<HTMLDivElement | null>(null)

  const amountOfCards = searchResultsArray.length  

  useEffect(() => {
    searchResultsArray.sort((a,b) => {return a.mediaIndex - b.mediaIndex})
    setCards(searchResultsArray)
  },[searchResultsArray])

  useEffect(() => {    
    if(cardContainerRef.current != null){
      const valueToCenter = (cardContainerRef.current.scrollWidth-cardContainerRef.current.offsetWidth)/2      
      cardContainerRef.current.scrollLeft=valueToCenter
    }    
  },[cardContainerRef.current?.scrollWidth])
  
  const handleSort = () => {
    let cloneSearchResultsArray = [...cards]
    let draggedCardIndex = draggedCard.current
    let draggedOverCardIndex = draggedOverCard.current
    let draggedCardData = cloneSearchResultsArray[draggedCardIndex]
    //swap
    cloneSearchResultsArray[draggedCardIndex] = cloneSearchResultsArray[draggedOverCardIndex]
    cloneSearchResultsArray[draggedOverCardIndex] = draggedCardData
    setCards(cloneSearchResultsArray)         
  }
  const handleScroll = () => {
    if(cardContainerRef.current != null && spectrumRef.current != null){       
      spectrumRef.current.scrollLeft = cardContainerRef.current.scrollLeft      
    }
  }
  const spectrumHandleScroll = () => {
    if(cardContainerRef.current != null && spectrumRef.current != null){       
      cardContainerRef.current.scrollLeft = spectrumRef.current.scrollLeft      
    }
  }
  const clickThenScrollLeft = () => {
    if(cardContainerRef.current != null){      
      const scrollDistance = cardContainerRef.current.offsetWidth    
      cardContainerRef.current.scrollBy({left:-scrollDistance})        
    }
  }
  const clickThenScrollRight = () => {
    if(cardContainerRef.current != null){      
      const scrollDistance = cardContainerRef.current.offsetWidth    
      cardContainerRef.current.scrollBy({left:scrollDistance})        
    }
  }
  
  return (
      <div>
        <Spectrum ref={spectrumRef} onScroll={spectrumHandleScroll} >
          <ScrollArrow $left={160*amountOfCards}>
            <FaArrowsAltH />
          </ScrollArrow>
          <SpectrumBackgournd $width={320*amountOfCards}/>
        </Spectrum>
        {searchResultsArray.length > 0 &&
          <div>
            <ButtonToScrollLeft onClick={clickThenScrollLeft}/>
            <ButtonToScrollRight onClick={clickThenScrollRight}/>
          </div>        
        }
        <CardListContainer ref={cardContainerRef} onScroll={handleScroll}>
            {cards
              .filter((e) => e.items.length > 0)          
              .map((cards,index) => {
                return (
                  <div key={index}
                  draggable
                    onDragStart={() => {
                        draggedCard.current = index
                    }}                
                    onDragEnter={() =>{
                        draggedOverCard.current = index
                    }}
                    onDragEnd={handleSort}
                    onDragOver={(e) => {e.preventDefault()}}
                  >
                    <Card key={cards.spider_name} data={cards} index={index}/>
                  </div>
                  );
              })}
        </CardListContainer>    
      </div>   
  );    
};


export default CardList