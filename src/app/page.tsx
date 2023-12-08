"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Demo from "./component/demo";
import styled from "styled-components";
const TextContainer = styled.div`
    margin-top:25vh;
    margin-left:7.2vw;
    @media (max-width:451px) {
        margin-top:40vw;
        margin-left:10vw;
    }
    z-index:10;
`
const Title = styled.h1`
    font-size:5vw;
    font-weight:700;
    padding:1vw 0vw;  
    color:#4e4e4e;
    @media (max-width:451px) {
        font-size:10vw;        
    }
`
const SubTitle = styled.h2`
    font-size:2vw;
    padding:1vw 0.4vw;
    color:#676767;
    @media (max-width:451px) {
        font-size:4vw;
        padding:2vw 0.8vw;    
    }
`
const StartButton = styled.div`
    width:fit-content;
    padding:1.2vw;
    margin-top:1vw;
    margin-left:0.5vw;
    border-width:2px;
    border-color:black;
    border-style:solid;
    border-radius:5vw;
    font-size:1vw;
    font-weight:800;
    position:relative;
    z-index:10;
    &:hover{
        cursor: pointer;
    }
    @media (max-width: 451px) {
        font-size:4vw;
        padding:3vw;
        margin-top:8vw;
    }
`
const DemoBlock = styled.div`
    z-index:0;
    @media (max-width:451px) {    
        transform:scale(2) translate(-25vw,-19vw);
    }
`
const DemoContainer = styled.div`
    width:100vw;
    height:100vh;
    top:0;
    position:absolute;
    overflow:hidden;
    z-index:0;
`
const Circle = styled.div`
    width:60vw;
    height:60vw;
    border-radius:50%;  
    background-color:#d3d3d3;
    position:absolute;
    top:15vh;
    left:50vw;
    z-index:-1;    
`
const CircleContainer = styled.div`
    width:100vw;
    height:100vh;
    top:0;
    position:absolute;
    overflow:hidden;
    z-index:-1;
`

const Home = () => {
    const router = useRouter()
    const startSearch = () => {
        router.push("/search")        
    }
    return(
        <div>
            <TextContainer>
                <Title>每一個選擇背後</Title>
                <Title>代表著一種立場</Title>
                <SubTitle>透過比較新聞來分辨媒體立場</SubTitle>
                <StartButton onClick={startSearch}>開始使用</StartButton>
            </TextContainer>
            <CircleContainer>
                <Circle/>
            </CircleContainer>
            <DemoContainer>
                <DemoBlock>
                    <Demo/>
                </DemoBlock>
            </DemoContainer>
        </div>
    )
}

export default Home