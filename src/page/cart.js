
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import {addCount} from '../store.js'

function Cart(){

    let a =  useSelector((state)=> state)
    let dispatch = useDispatch()
    console.log(a.stock)

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                {
                    a.stock.map((aa, i)=>
                    <tr key={i}>
                        <td>{a.stock[i].id}</td>
                        <td>{a.stock[i].name}</td>
                        <td>{a.stock[i].count}</td>
                        <td>
                        <button onClick={()=>{ dispatch(addCount(a.stock[i].id)) }}>+</button>
                        </td>
                    </tr>
                    )
                }
                </tbody>
            </Table> 
        </div>
    );
}
export default Cart