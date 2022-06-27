import React, { Fragment } from 'react';
import * as Styles from './styles';
import { useQueensContext } from 'components/App/context';


function GameOverMessage() {

    const { moves } = useQueensContext();

    return (
        <Fragment>
            {moves <= 0 ? 
                <Styles.P>Você encontrou todas as soluções!</Styles.P>
                :
                <Styles.P>Parabéns! Restam {moves} possibilidades!</Styles.P>
            }
            <Styles.Star>★</Styles.Star>
            <Styles.Star>★</Styles.Star>
            <Styles.Star>★</Styles.Star>
        </Fragment>
    );
}

export default GameOverMessage;
