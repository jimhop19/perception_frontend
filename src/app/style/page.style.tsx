import styled from "styled-components"
import {CiSearch} from "react-icons/ci"
import { PiHighlighterCircleThin } from "react-icons/pi";

const LoadingBlock = styled.div<{$startSearching:boolean;}>`
  display: ${props => props.$startSearching? "flex":"none"};
  justify-content:center;
  position:absolute;
  top:43vh;
  left:50vw;
  opacity:${props => props.$startSearching? 1:0};  
  transition: opacity 7s;
`
const LoadingText = styled.h4`
  font-size:1.5vw;
  transform:translate(-3vw, -0.4vh);
  color:#a6a6a6;
  @media (max-width:451px) {
    font-size:5vw;
    transform:translate(-15vw, -0.4vh);
  }
`
const DotDot = styled.div`
  width: 1vw;
  height:1vw;
  aspect-ratio: 1;
  border-radius: 50%;
  animation: l5 1s infinite linear alternate;
  @media (max-width:451px) {
    width:3vw;
    height:3vw;
    transform:translate(-5vw, 0);
  }

  @keyframes l5 {
      0%  {box-shadow: 20px 0 #cccccc, -20px 0 #a6a6a6;background: #cccccc }
      33% {box-shadow: 20px 0 #cccccc, -20px 0 #a6a6a6;background: #a6a6a6}
      66% {box-shadow: 20px 0 #a6a6a6,-20px 0 #cccccc; background: #a6a6a6}
      100%{box-shadow: 20px 0 #a6a6a6,-20px 0 #cccccc; background: #cccccc }
  }
`
const SearchComponent = styled.form<{$startSearching:boolean;}>`
  width:90vw;
  margin:-10vh 5vw;
  display: flex;
  justify-content:center;
  position:absolute;
  z-index:10000;
  transition: opacity 1s;
  opacity:${props => props.$startSearching? 0:1};
`
const InputPrototype = styled.input`
  border:none;
  border-bottom:2px solid gray;
  text-align:center;  
  &:focus{
    outline:none;
    &::placeholder{
      color:transparent;
    }
  }
`
const Input = styled(InputPrototype)<{$startSearching:boolean;}>`  
  width:${props => props.$startSearching? "0vw":"20vw"};
  transition: width 0.5s;
  height: 30px;
  font-size:2vw;
  padding: 1vw 5vw;
  letter-spacing:0.2vw;
  &::placeholder{
    color:#D3D3D3;
  }
  @media(max-width:431px){
    font-size:4vw;
    width:${props => props.$startSearching? "0vw":"40vw"};
  }  
`

const InputForMenu = styled(InputPrototype)`
  position:absolute;
  top:4.7vh;
  left:80vw;
  padding:1vw;
  opacity:0.9;
  text-align:left;
  padding:0vw 0.5vw;
  line-height:28px;
  letter-spacing:0.2vw;
  transform:translate(-0.5vw, -0.5vw);
  z-index:10000001;
  background-color: #fff;
  @media(max-width:1400px){
    width:8vw;
  }  
  @media(max-width:431px){
    left:64vw;
    top:4.5vh;
    width:15vw;
    padding:1vw 3vw;
    line-height:4vw;
  }
  @media(max-width:350px){
    font-size:3vw;
  }
`
const SearchButton = styled.button`    
  background:none;
  border:none;
  padding-left:2vw;
  &:hover{
    cursor: pointer;
  }
  @media(max-width:431px){
    transform:scale(0.5);
  }
`
const SearchIcon = styled(CiSearch)`
  transform:scale(4) translate(0.2vw, 0.1vh);
  color:#6c6c6c;
`
const SearchIconForMenu = styled(SearchIcon)<{$searchMenu:boolean}>`
  transform:scale(2);
  position:absolute;
  top:5vh;
  left:91vw;
  opacity:0.9;
  z-index:10000001;
  color:${props => props.$searchMenu? "#6c6c6c" : "#8d8d8d"};
  &:hover{
    cursor:pointer;
  }
  @media(max-width:431px){
    transform:scale(1.8)translate(0,-0.1vh);
    left:87vw;
  }
`
const LogoContainer = styled.div<{$startSearching:boolean;}>`
  display: ${props => props.$startSearching? "none":"block"};
  position:absolute;  
`
const HighlightIconForMenu = styled(PiHighlighterCircleThin)<{$searchMenu:boolean}>`
  transform:scale(2);
  z-index:20000;
  color:${props => props.$searchMenu? "#6c6c6c" : "#D3D3D3"};
  &:hover{
    cursor:pointer;
  }color:#D3D3D3;
`


export { SearchComponent, Input, SearchButton, SearchIcon, SearchIconForMenu, InputForMenu, DotDot, LoadingBlock, LoadingText, LogoContainer , HighlightIconForMenu};