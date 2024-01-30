import React, {useEffect} from 'react'
import Phaser from 'phaser';
import TicTacToe from './scenes/TicTacToe';
import MemoryGame from './scenes/MemoryGame';

//import scenes from ./scenes (once made)
const PhaserGameConfig = ({gameType, onGamePlayed}) => {
    useEffect(() => {
      const config = {
        type: Phaser.AUTO,
        width: 700,
        height: 500,
        backgroundColor: '#ffffff',

        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: true,
            },
        },
        parent: 'phaser-game',
        scene: getScene(gameType)
      };
  
      new Phaser.Game(config);

    }, []);

    const getScene = (gameType) => {
        switch (gameType) {
            case 'TicTacToe': return TicTacToe;
            case 'MemoryGame': return MemoryGame;

            default: return null;
        }
    }

    const handler = () => {
      onGamePlayed()
    }

    eventEmitter.on("gameEnd", handler)


    return <div id="phaser-game" className='text-center'></div>;
  };
  
  export const eventEmitter = new Phaser.Events.EventEmitter();
  export default PhaserGameConfig;