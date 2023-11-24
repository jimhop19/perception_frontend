"use client"
import React, { useEffect, useRef, useState} from "react"
import CardList from "./component/cardList"
import { store } from "./store"
import { Provider } from "react-redux"
import { SearchComponent, Input, SearchButton, SearchIcon } from "./style/page.style"



interface DatasOfSearchResult{
  "spider_name":string,
  "items":any[],
  "mediaIndex":number,
} 

const mediaList = ["ltn","cna","pts","ettoday","udn"]



const Perception = () => {  
  const [searchResultsArray,setSearchResultsArray] = useState<Array<DatasOfSearchResult>>([])
  const [searchKeyword, setSearchKeyword] = useState<string>("")

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
  
  if(ref.current != null){
    
  }
  return(
          <Provider store={store}>
            <SearchComponent action="" onSubmit={onSearch}>
                <Input type="text" name="searchKeyword"/>              
                <SearchButton type="submit"><SearchIcon/></SearchButton>
            </SearchComponent>
            <CardList searchResultsArray={searchResultsArray}/>
          </Provider>
  )

}



export default Perception
