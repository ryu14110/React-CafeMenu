import React, { useState } from 'react';
import axios from 'axios';


function Cafes() {
    const [cafe, setCafe] = useState([]);
    
    // 카페 메뉴를 불러오는 함수입니다.
    async function fetchCafe() {
        const response = await axios.get(
            `https://${window.location.hostname}:8190/data`
        );
        setCafe(response.data);
    };
    
    const menuName = cafe.map(
        (menu) => (<li key={menu.id}> {menu.item} </li>)
    );
    
    // 지시사항을 참고하여 카페 메뉴를 등록하는 기능을 완성하세요.
    const [id, setId] = useState('');
    const [item, setItem] = useState('');
    const [errorMessage, setErrorMessage] =useState('');
    async function handleSave() {
        const newMenu = {
            id,
            item,
        };
        
         await axios.post(`https://${window.location.hostname}:8190/data`,newMenu)
            .then((response) => {
                if (response.status === 200) {
                    setCafe([...cafe, newMenu]);
                    setErrorMessage('')
                } else  {
                    // alert('메뉴 등록에 실패했습니다.');
                    setErrorMessage('메뉴 등록에 실패했습니다.');
                }
            })
            .catch((error) => {
                console.log(error);
                
            });
            
    }
    return (
        <>
            <h4>카페 메뉴</h4>
            <div> {menuName} </div> 
            <button id='load' onClick={fetchCafe}>불러오기</button> <br/><br/>

            <p>ID</p>
            <input type="text" id="save_id" placeholder="" value={id} onChange={(e) => setId(e.target.value)} />
            <br />
            <p>카페 메뉴</p>
            <input type="text" id="save_item" placeholder="" value={item} onChange={(e) => setItem(e.target.value)} />
            <br />
            <button id="save" onClick={handleSave}>등록하기</button>
            <div id="fail" >{errorMessage}</div>
        </>
    );
}


function App() {
  return (
    <div className="App">
      <Cafes/>
    </div>
  );
}

export default App;
