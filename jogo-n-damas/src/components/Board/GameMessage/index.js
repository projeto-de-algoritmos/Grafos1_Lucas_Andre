/* eslint-disable object-curly-newline */
import React from 'react';
import GameOverMessage from './GameOverMessage';
import * as Styles from './styles';
import { useQueensContext } from 'components/App/context';

const GameMessage = () => {
    const { newGame, gameOver, moves } = useQueensContext();

    return (
        <Styles.Wrapper visible={gameOver}>
            {moves <= 0 ? 
                <><GameOverMessage /></> 
                : 
                <><GameOverMessage /><Styles.NewGame onClick={() => newGame()}>New Game</Styles.NewGame></>
            }
           
        </Styles.Wrapper>
    );
};

GameMessage.propTypes = {};

export default GameMessage;
