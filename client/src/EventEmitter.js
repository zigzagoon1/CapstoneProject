import Phaser from "phaser";
import {EventEmitter} from 'phaser';

let instance = null;
class EventEmitterSingleton extends Phaser.Events.EventEmitter {
    constructor() {
        super();
    }

    static instance() {
        if (instance == null) {
            instance = new EventEmitterSingleton();
        }
        return instance
    }
}

export default EventEmitterSingleton;