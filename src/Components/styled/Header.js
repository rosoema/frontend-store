import styled from "styled-components";

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    margin: 1.5rem 6% 0 6%;
    height: 2.2rem;
`;

const List = styled.ul`
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
`;

const ListItem = styled.li`
    padding: 0 1rem;
    text-decoration: none;
    height: 35px;
    font-family: "Raleway", sans-serif;
    font-size: 0.9rem;
    text-transform: uppercase;
    color: black;

    &:hover{
        border-bottom: 1px solid #5ece7b;
    }
`;

const Image = styled.img`
    margin-left: -4.4rem;
    width: 2rem;
`;

export { Nav, List, ListItem, Image };