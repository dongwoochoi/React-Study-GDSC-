//Local app
import Detail from './page/detail';
import data from './data.js';
import Cart from './page/cart';

//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Container, Nav } from 'react-bootstrap';

//library
import { useState, useEffect } from "react";
import {  Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios'

//Style
import './App.css';



function App() {


  let [shoes, set_shoes] = useState(data)
  let navigate = useNavigate();
  let [btn, setBtn] = useState(2);
  let [btnState, setBtnState] = useState(true);

  return (
    <div id="main" className="App">
      <Navbar id="nav" bg="ligth" variant="ligth">
        <Container>
          <Navbar.Brand className='page_name' href="/">D-Market</Navbar.Brand>
          <Nav>
            <Nav.Link href="#home">Menu1</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail') }} >Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />

      <Routes>
        <Route path="/detail/:id" element={ <Detail shoes={shoes}/> }/>
        <Route path='/cart' element={ <Cart/> }/>
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
            {btnState == true ? (
              <button onClick={()=>{
                axios.get("https://codingapple1.github.io/shop/data" + btn + ".json"
                ).then((결과)=>{
                  console.log(결과.data)
                  let copy = [...shoes, ...결과.data];
                  set_shoes(copy);
                  setBtn(btn + 1);

                  if (btn == 3) {
                    setBtnState(false);
                  }

                })
                .catch(()=>{
                  console.log('실패함')
                })
              }}>더 보기</button>) : null}

          </div> } />
          <Route path="/cart" element={ <Cart/> } /> 
      </Routes>
      
       
    </div>  
  );
}

function Post(props){
  console.log(props)
  let navigate = useNavigate();

  return(
    <div className="col-md-4">
        <img 
        onClick={() => {
          navigate("/detail/" + (props.i - 1));
        }}
        src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"} width="80%" alt='a'/>

      { console.log(props.shoes) }
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
