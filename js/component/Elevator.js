import ItemBase from "./ItemBase.js";

export default class Elevator extends ItemBase {
    constructor(data) {
        super(data);

        this.tag = 'path';
        this.depth = 1000;
    }
}