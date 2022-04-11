import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 calc(6% + 1rem);
    margin: 2rem auto;

    h1 {
        font-family: "Raleway", sans-serif;
        font-size: 2.5rem;
        font-weight: 400;
        text-transform: capitalize;
    }
`;

const ProductsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex-wrap: wrap;
    width: 100%;
`;

const ProductDiv = styled.div`
    min-width: 21rem;
    min-height: 25rem;
    margin: 1rem;
    padding: .5rem;

    div {
        width: 100%;
        height: 23rem;
        background-position: top center;
        background-repeat: no-repeat;
        background-size: cover;
    }

    p {
        font-family: "Raleway", sans-serif;
        font-size: 1rem;
        font-weight: 100;
        color: #1D1F22;
    }

    .price {
        font-weight: 600;
    }
`;

export { ProductsContainer, Wrapper, ProductDiv };