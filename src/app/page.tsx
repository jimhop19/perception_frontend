"use client"
import React, { useEffect, useRef, useState} from "react"
import CardList from "./component/cardList"
import { store } from "./store"
import { Provider } from "react-redux"
import { SearchComponent, Input, SearchButton, SearchIcon , SearchIconForMenu , InputForMenu, DotDot, LoadingBlock, LoadingText, LogoContainer } from "./style/page.style"
import perception_logo from "../../public/perception_logo.png"
import Image from "next/image"



interface DatasOfSearchResult{
  "spider_name":string,
  "items":any[],
  "mediaIndex":number,
} 

const mediaList = ["ltn","cna","pts","ettoday","udn"]



const Perception = () => {  
  const [searchResultsArray,setSearchResultsArray] = useState<Array<DatasOfSearchResult>>([])
  const [searchKeyword, setSearchKeyword] = useState<string>("")
  const [startSearching, setStartSearching] = useState<boolean>(false)
  const [placeholder, setPlaceholder] = useState<string>("")
  const [count, setCount] = useState<number>(0);
  const [searchMenu, setSearchMenu] = useState<boolean>(false)
  
  const ref = useRef<any>(null)
  
  
  useEffect(() => {   
    if(searchKeyword !== ""){
      mediaList.forEach((media) => {      
        fetch(`https://perception.run/crawl.json?spider_name=spider_${media}&start_requests=true&crawl_args={"keyword":"${searchKeyword}"}`)
        .then((response) => {
          return response.json()
        }).then((result) => {          
          result.keyword = searchKeyword
          result.media = media
          result.mediaIndex = mediaList.indexOf(media)
          setSearchResultsArray(searchResultsArray => [...searchResultsArray, result])        
          console.log(result)
        })    
      })
    }
  },[searchKeyword])
  
  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {       
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const searchKeyword = formData.get("searchKeyword") as string | null;

    if (searchKeyword !== null) {
      setStartSearching(true)
      if(searchResultsArray.length!=0){
        setSearchResultsArray([])
        setSearchKeyword(searchKeyword);
      }else{
        setSearchKeyword(searchKeyword);
      }
    } else {
      return 
    }   
  }
  const text = "輸入關鍵字搜尋新聞"
  useEffect(() => {
    if (count < text.length){    
      const intervalId = setInterval(() => {        
        setCount(prevCount => prevCount + 1);      
        setPlaceholder(preText => preText + text.charAt(count))
      }, 250);      
      return () => clearInterval(intervalId);
    }else{
      return
    }
  }, [count])
  
  const toggleSearchMenu = () => [
    setSearchMenu(!searchMenu)
  ]  
  return(
          <Provider store={store}>
            {searchResultsArray.length != mediaList.length &&
              <LoadingBlock $startSearching={startSearching}>
                <LoadingText>載入中</LoadingText>
                <DotDot/>
              </LoadingBlock>        
            }
              <SearchComponent action="" onSubmit={onSearch} $startSearching={startSearching}>
                  <Input type="text" name="searchKeyword" $startSearching={startSearching} placeholder={placeholder}/>              
                  <SearchButton type="submit"><SearchIcon/></SearchButton>
              </SearchComponent>
              <CardList searchResultsArray={searchResultsArray} mediaList={mediaList}/>
            {startSearching &&
              <SearchIconForMenu onClick={toggleSearchMenu} $searchMenu={searchMenu}/>
            }
            {startSearching && searchMenu &&              
              <InputForMenu placeholder="重新搜尋"/>
            }
              <LogoContainer $startSearching={startSearching}>
                <Image 
                  src={perception_logo} 
                  alt="perception" 
                  style={{
                    width:"12vw",
                    height:"auto",
                    position:"absolute",
                    left:"-1vw",
                    top:"33vh",                    
                  }}/>                
              </LogoContainer>
          </Provider>
  )

}



export default Perception
