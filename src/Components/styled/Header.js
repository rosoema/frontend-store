import styled from "styled-components";

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    margin: 1.5rem 6% 0 6%;
    height: 2.2rem;
    z-index: 90;
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

    &:hover{
        border-bottom: 1px solid #5ece7b;

        a {
            color: #5ece7b;
        }
    }
`;

const Image = styled.img`
    margin-left: -4rem;
    width: 2rem;
`;

const Bag = styled.div`
    display: flex;
    position: absolute;
    flex-direction: column;
    width: 16rem;
    max-height: 40rem;
    overflow-y: scroll;
    overflow-x: hidden;
    top: 3.7rem;
    right: 6%;
    background-color: white;
    opacity: 100%;
    padding: 1rem;
    margin-right: 0;
    z-index: 100;

    div {
        margin-right: 0;
    }
`;

export { Nav, List, ListItem, Image, Bag };