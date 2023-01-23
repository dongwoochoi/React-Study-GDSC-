import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import {Navbar, Container, Nav } from 'react-bootstrap';
import {  Routes, Route, Link, useParams } from 'react-router-dom';
import styled from 'styled-components'



function Detail(props){
    let {id} = useParams();
    let find_product = props.shoes.find(function(x){
        return x.id == id
      });
    // let [alert, setAlert] = useState(true)
    // useEffect(()=>{
    //     setTimeout(()=>{ setAlert(false) }, 2000)
    // }, [])
    let [tab, set_tab] = useState();

    return (
        <div className="container">
            {/* {
                alert == true
                ? <div className="alert alert-warning">
                    2초이내 구매시 할인
                </div>
                : null
            } */}
            
            <div className="row">
                <div className="col-md-6">
                <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" alt="A" />
                </div>
                <div className="col-md-6 mt-4">
                <h4 className="pt-5">{find_product.title}</h4>
                <p>{find_product.content}</p>
                <p>{find_product.price}원</p>
                <button className="btn btn-danger">주문하기</button>
                </div>
            </div> 
            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=>{ set_tab(0) }} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{ set_tab(1) }} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{ set_tab(2) }} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <Tcontent status={ tab }/>
        </div>
    );
}

function Tcontent(props){
    let [fade, setFade] = useState('')

    useEffect(()=>{
        setTimeout(()=>{ setFade('end') }, 100)
    return ()=>{
        setFade('')
    }
    }, [props.status])
    return (
        <div className={"start " + fade}>
          { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.status] }
        </div>
      )
  }
export default Detail;