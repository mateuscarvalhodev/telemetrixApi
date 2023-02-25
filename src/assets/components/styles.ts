import styled from "styled-components";

export const Container = styled.div`
display: flex;
flex-direction: column;
width: 100vw;
height: 100vh;
justify-content: center;
align-items: center;
background: var(--color-secondary);

`;
export const List = styled.div`
width: 80%;
height: 200px;
background: black;

  h1{
    text-align: center;
  }

  table, th, td {
    /* border: 1px solid black; */
  }

table {
border-collapse: collapse;
margin: auto;
}

th, td{
padding: 10px;
text-align: center;
width: 220px;
}

th{
font-weight: bold;
}


tr:nth-child(even) {
background-color: var(--color-secondary);
}

tr:hover:nth-child(1n + 2) {
background-color: #085F63;
color: #fff;
}

`;