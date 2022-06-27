// eslint-disable-next-line import/no-unresolved
import { useQueensContext } from 'components/App/context';
import React from 'react';
import Moves from './Moves';
import DropDown from './DropDown';
import * as Styles from './styles';

function Header() {
    const { reset } = useQueensContext();

    return (
        <Styles.Header>
            <Styles.Heading>
                <Styles.Title>N-Damas</Styles.Title>
                <Moves />
            </Styles.Heading>

            <Styles.Instructions>
                <Styles.Text>
                    Coloque todas as rainhas no tabuleiro de modo que <br />
                    não há duas rainhas que se ameacem!
                </Styles.Text>

                <Styles.Actions>
                    <Styles.Restart onClick={() => reset()}>
                        Reset<i className="fa fa-repeat" aria-hidden="true"></i>
                    </Styles.Restart>

                    <DropDown />

                </Styles.Actions>
            </Styles.Instructions>
        </Styles.Header>
    );
}

export default Header;
