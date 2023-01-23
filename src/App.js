//Local app
import Detail from './page/detail';
import data from './data.js';
import Cart from './page/cart';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav } from 'react-bootstrap';

//library
import { useState } from "react";
import {  Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios'

//Style
import './App.css';



function App() {

  let [shoes, set_shoes] = useState(data)
  let navigate = useNavigate();

  return (
    <div id="main" className="App">
      <Navbar id="nav" bg="ligth" variant="ligth">
        <Container>
          <Navbar.Brand href="#home">D-Market</Navbar.Brand>
          <Nav>
            <Nav.Link href="#home">Menu1</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail') }} >Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />

      <Link to="/">홈</Link>
      <Link to="/detail">상세페이지</Link>

      <Routes>
        <Route path="/detail/:id" element={ <Detail shoes={shoes}/> }/>
        <Route path="/event" element={ <About/> } >  
          <Route path="one" element={ <div>첫 주문시 양배추즙 서비스</div> } />
          <Route path="two" element={ <div>생일기념 쿠폰받기</div> } />
        </Route>
        <Route path="/detail" element={ <Detail shoes={shoes}/> } />
        <Route path="*" element={ <div>404</div> } />
        <Route path="/" element={ 
          <div>
            <div className="main-bg">
            </div>
            <div className="container">
              <div className="row">
                {
                  shoes.map(function(aa, i){
                    return (
                      <Post shoes={shoes[i]} i = {i+1}></Post>
                    )
                  })
                }
              </div>
            </div>
              <button onClick={()=>{
                axios.get('https://codingapple1.github.io/shop/data2.json').then((결과)=>{
                  console.log(결과.data)
                  let copy = [...shoes, ...결과.data];
                  set_shoes(copy);
                })
                .catch(()=>{
                  console.log('실패함')
                })
              }}>버튼</button> 

          </div> } />
          <Route path="/cart" element={ <Cart/> } /> 
      </Routes>
      
       
    </div>  
  );
}

function Post(props){
  return(
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes'+props.i+'.jpg'} width="80%" alt='a'/>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.content}</p>
      <p>{props.shoes.price}</p>
    </div>
  )
}

function About(){
  return (
    <div>
      <h2>오늘의 이벤트</h2>
      <Outlet></Outlet>
    </div>
  )
}
export default App;
