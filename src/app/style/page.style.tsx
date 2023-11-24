import styled from "styled-components";
import {CiSearch} from "react-icons/ci"
const SearchComponent = styled.form`
  width:90vw;
  margin:0 5vw;
  display: flex;
  justify-content:center;
`
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
`
const SearchButton = styled.button`    
  background:none;
  border:none;
  padding:0px;
`
const SearchIcon = styled(CiSearch)`
  transform:scale(2.5) translate(5px,3px);
  color:#6c6c6c;  
`


export { SearchComponent, Input, SearchButton, SearchIcon};