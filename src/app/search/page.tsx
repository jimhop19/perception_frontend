"use client"
import React, { useEffect, useRef, useState} from "react"
import CardList from "../component/cardList"
import { SearchComponent, Input, SearchButton, SearchIcon , SearchIconForMenu , InputForMenu, DotDot, LoadingBlock, LoadingText} from "../style/page.style"
import { store } from "../store"
import { Provider } from "react-redux"


interface DatasOfSearchResult{
  "spider_name":string,
  "items":any[],
  "mediaIndex":number,
} 

const mediaList = ["ltn","cna","pts","ettoday","udn"]


const PerceptionSearch = () => {  
  const [searchResultsArray,setSearchResultsArray] = useState<Array<DatasOfSearchResult>>([])
  const [searchKeyword, setSearchKeyword] = useState<string>("")
  const [startSearching, setStartSearching] = useState<boolean>(false)
  const [placeholder, setPlaceholder] = useState<string>("")
  const [count, setCount] = useState<number>(0);
  const [searchMenu, setSearchMenu] = useState<boolean>(false)

  
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
        }).then(() => {
          if (searchResultsArray.length === mediaList.length){
            setStartSearching(false)
          }
          return
        })
      })
    }
  },[searchKeyword])
  
  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {       
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const searchKeyword = formData.get("searchKeyword") as string | null;
    setSearchMenu(false)    

    if (searchKeyword !== null) {
      if(searchResultsArray.length!=0){
        setSearchResultsArray([])
        setSearchKeyword(searchKeyword);        
      }else{
        setStartSearching(true)
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
            
            {startSearching &&
              <div>
                {/* <HighlightIconForMenu $searchMenu={searchMenu}/> */}
                <form action="" onSubmit={onSearch}>
                  <SearchIconForMenu onClick={toggleSearchMenu} $searchMenu={searchMenu}/>
                  {searchMenu &&
                    <InputForMenu type="text" name="searchKeyword" placeholder="重新搜尋"/>
                  }
                  <button type="submit" style={{display:"none"}}>submit</button>
                </form>
              </div>
            }              
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
          </Provider>
  )

}


export default PerceptionSearch
