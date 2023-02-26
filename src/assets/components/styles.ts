import styled from "styled-components";

export const Container = styled.div`
display: flex;
flex-direction: column;
width: 100vw;
height: 100vh;
justify-content: center;
align-items: center;
background: var(--color-secondary);

button {
	background: var(--color-tertiary);
  border: 0;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  position: relative;
  text-align: center;
  transition: all .3s;
  font-family: 'Montserrat', sans-serif;
  
  height: 50px;
  width: 100px;
  margin: 10px;
}

input {
  height: 50px;
  width: 200px;
  border: transparent;
  border-radius: 10px;
  margin: 5px;
  padding: 10px;
}

button:hover {
  box-shadow: rgba(255, 255, 255, .2) 0 3px 15px inset, rgba(0, 0, 0, .1) 0 3px 5px, rgba(0, 0, 0, .1) 0 10px 13px;
  transform: scale(1.05);
}
`;

export const List = styled.div`
display: flex;
flex-direction: row;
width: 90%;
height: 200px;
background: none;

  h1{
    text-align: center;
  }

  table, th, td {
    border: 1px solid rgba(255, 255, 255, 0.1);
    
  }

table {
border-collapse: collapse;
margin: auto;
}

th, td{
padding: 10px;
text-align: center;
width: 320px;
}

th{
font-weight: bold;
}


tr:nth-child(even) {
background-color: var(--color-secondary);
}

tr:hover:nth-child(1n + 2) {
background-color: rgba(0, 0, 0, 0.1);
color: #fff;
}



`;