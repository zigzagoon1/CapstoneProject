import React, { useContext } from "react";
import PhaserGameConfig from "./PhaserGameConfig";
import EventEmitter from "./EventEmitter";
import { CurrentUserContext } from "./context/current_user";

function TicTacToe() {
    return(
        {PhaserGameConfig}
    )
}

export default TicTacToe;