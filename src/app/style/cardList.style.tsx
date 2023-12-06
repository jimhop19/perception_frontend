import styled from "styled-components";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";

const ButtonToScrollLeft = styled(MdKeyboardArrowLeft)<{$fetchingFinished:boolean}>`
  transform:scale(10);
  width:0.5vw;
  height:0.5vw;
  color:#D3D3D3;
  opacity:${props => props.$fetchingFinished? 0.6:0};
  position:absolute;
  left:6vw;
  top:92vh;
  z-index:100000;
  &:hover{
    cursor: pointer;
  }  
`
const ButtonToScrollRight = styled(MdKeyboardArrowRight)<{$fetchingFinished:boolean}>`
  transform:scale(10);
  width:0.5vw;
  height:0.5vw;
  color:#D3D3D3;
  opacity:${props => props.$fetchingFinished? 0.6:0};
  position:absolute;
  left:94vw;
  top:92vh;
  z-index:1;  
  &:hover{
    cursor: pointer;
  }
`
const CardListContainer = styled.div<{$fetchingFinished:boolean}>`
  display: flex;
  position: relative;
  overflow: scroll;
  margin:0 7vw;  
  width:86vw;
  -ms-overflow-style: none; 
  scrollbar-width: none;
  transition:2s;
  opacity:${props => props.$fetchingFinished? 1:0};
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
const Spectrum = styled.div<{$fetchingFinished:boolean}>`
  height: 20px;
  width: 86vw;  
  background-color:transparent;
  margin:${props => props.$fetchingFinished? "12vh 7vw 3vh":"50vh 7vw 3vh"};
  border-radius:20px;
  position: relative;
  overflow:scroll;
  -ms-overflow-style: none; 
  scrollbar-width: none;
  transition:2s;
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

export { ButtonToScrollLeft, ButtonToScrollRight, CardListContainer, ScrollArrow, Spectrum, SpectrumBackgournd}