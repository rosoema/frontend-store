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
    padding: .7rem;
    transition: .3s;

    p {
        font-family: "Raleway", sans-serif;
        font-size: 1rem;
        font-weight: 100;
        color: #1D1F22;
    }

    &:hover {
        box-shadow: 0 4px 35px rgba(0, 0, 0, 0.2);

        .addToCart {
            display: block;
        }
    }
`;

export { ProductsContainer, Wrapper, ProductDiv };