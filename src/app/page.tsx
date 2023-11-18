"use client"
import React, { useEffect, useState} from "react"
import CardList from "./component/cardList"
import {CiSearch} from "react-icons/ci"
import styled from "styled-components"
import {store} from "./store"
import { Provider } from "react-redux"


interface DatasOfSearchResult{
  "spider_name":string,
  "items":any[],
} 

const mediaList = ["udn","ettoday","pts","cna","ltn"]
const Input = styled.input`
  border:none;
  border-bottom:1px solid gray;
  width:200px;
  height: 30px;
  font-size:20px;
  padding: 10px 20px;
  &:focus{
    outline:none;
  }
`;
const SearchButton = styled.button`    
  background:none;  
  border:none;
  padding:0px;
`
const SearchIcon = styled(CiSearch)`
  transform:scale(2.5) translate(5px,3px);
  color:#6c6c6c;  
`
const CardListContainer = styled.div`
  display: flex;
  position: relative;
  flex-wrap:wrap;
`

const Perception = () => {  
  const [searchResultsArray,setSearchResultsArray] = useState<Array<DatasOfSearchResult>>([])
  const [searchKeyword, setSearchKeyword] = useState<String>("")
  

  useEffect(() => {   
    if(searchKeyword !== ""){
      mediaList.forEach((media) => {      
        fetch(`https://perception.run/crawl.json?spider_name=spider_${media}&start_requests=true&crawl_args={"keyword":"${searchKeyword}"}`)
        .then((response) => {
          return response.json()
        }).then((result) => {
          result.keyword = searchKeyword
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
      setSearchKeyword(searchKeyword);
    } else {
      return 
    }   
  }

  
  return(
          <Provider store={store}>
            <div>
              <form action="" onSubmit={onSearch}>
                <Input type="text" name="searchKeyword"/>              
                <SearchButton type="submit"><SearchIcon/></SearchButton>      
              </form>
              <CardListContainer>
                <CardList searchResultsArray={searchResultsArray}/>
              </CardListContainer>        
            </div>        
          </Provider>
  )

}



export default Perception
