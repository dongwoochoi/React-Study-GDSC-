import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from "react";
import {Navbar, Container, Nav } from 'react-bootstrap';
import {  Routes, Route, Link, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { useSelector, useDispatch } from "react-redux";
import { addCount, addItem } from '../store'



function Detail(props){

    

    let dispatch = useDispatch()
    let {id} = useParams();
    let find_product = props.shoes.find(function(x){
        return x.id == id
      });
    // let [alert, setAlert] = useState(true)
    // useEffect(()=>{
    //     setTimeout(()=>{ setAlert(false) }, 2000)
    // }, [])
    let [tab, set_tab] = useState();
    let s =  useSelector((state)=> state)

    useEffect(()=>{
        let watched_Item = localStorage.getItem('watched')
        watched_Item = JSON.parse(watched_Item)
        watched_Item.unshift(find_product.id)
        watched_Item = [...new Set(watched_Item)]
        localStorage.setItem('watched', JSON.stringify(watched_Item))
    }, [])

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
                {console.log(find_product)}
                <div className="col-md-6">
                    <img src={"http://codingapple1.github.io/shop/shoes" + (find_product.id + 1 )+ ".jpg"} width="100%" alt="A" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{find_product.title}</h4>
                    <p>{find_product.content}</p>
                    <p>{find_product.price}원</p>
                    <button className="btn btn-danger" onClick={()=>{
                        let check = s.stock.findIndex((e) => e.id == find_product.id );
                        console.log(check) 
                        check == -1
                        ? dispatch(
                            addItem({
                              id: find_product.id,
                              name: find_product.title,
                              count: 1,
                            })
                        )
                        : dispatch(addCount( find_product.id ))
                    }}>주문하기</button>
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