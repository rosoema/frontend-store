import styled from "styled-components";

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    margin: 1.5rem 6% 0 6%;
    height: 2.2rem;
    z-index: 90;

    .cart-num {
        position: absolute;
        right: calc(6% + 0.3rem);
        top: .4rem;
        background-color: black;
        color: white;
        border-radius: 50%;
        text-align: center;
        padding: 0.2rem 0.4rem .2rem .35rem;
        font-size: .7rem;
        font-weight: bold;
        font-family: "Roboto", sans-serif;
    }
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
`;

export { Nav, List, ListItem, Image, Bag };