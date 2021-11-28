import ItemBase from "./ItemBase.js";

export default class Gate extends ItemBase {
    constructor(data) {
        super(data);

        this.tag = 'furniture';
    }
}