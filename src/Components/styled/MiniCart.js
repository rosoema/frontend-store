import styled from "styled-components";

const Overlay = styled.div`
    position: absolute;
    width: 100%;
    height: ${props => props.height};
    background-color: rgba( 0, 0, 0, 0.4);
    left: 0;
    top: 3.75rem;
    z-index: 99;
    background-attachment: fixed;
`;

const Title = styled.p`
    margin: 0;
    padding: 0;
    font-family: "Raleway", sans-serif;
    font-size: 1rem;
    font-weight: 800 !important;

    span {
        font-weight: 400;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    div {
        margin-right: 0;
    }
`;

const ProductWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1rem 0 0 0;
    
    p {
        margin: 0 0 .6rem 0;
        font-size: 1rem;
    }
`;

export { Title, Wrapper, ProductWrapper, Overlay };