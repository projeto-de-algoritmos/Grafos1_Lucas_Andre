/* eslint-disable import/no-unresolved */
import React from 'react';
import styled from 'styled-components';
import Header from 'components/Header';
import { QueensContextProvider } from './context';
import GlobalStyle from './globalStyles';

const Wrapper = styled.div`
    margin: auto;
    max-width: 730px;

    @media(max-width: 730px) {
        padding: 0 5px;
    }
`;

export default function App() {
    return (
        <QueensContextProvider>
            <GlobalStyle />
            <Wrapper>
                <Header />
            </Wrapper>
        </QueensContextProvider>
    );
}
