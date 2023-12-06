"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Demo from "./component/demo";
import styled from "styled-components";
const TextContainer = styled.div`
    margin-top:25vh;
    margin-left:7.2vw;    
`
const Title = styled.h1`
    font-size:5vw;
    font-weight:700;
    padding:1vw 0vw;  
    color:#4e4e4e; 
`
const SubTitle = styled.h2`
    font-size:2vw;
    padding:1vw 0.4vw;
    color:#676767;
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
    &:hover{
        cursor: pointer;
    }
`

const Home = () => {
    const router = useRouter()
    const startSearch = () => {
        router.push("/search")
        console.log("start")
    }
    return(
        <div>
            <TextContainer>
                <Title>每一個選擇背後</Title>
                <Title>代表著一種立場</Title>
                <SubTitle>透過比較新聞來分辨媒體立場</SubTitle>
                <StartButton onClick={startSearch}>開始使用</StartButton>
            </TextContainer>
            <Demo/>
        </div>
    )
}

export default Home