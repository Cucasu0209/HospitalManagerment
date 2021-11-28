import ItemEdittable from "./ItemEdittable";

export default class OtherItem extends ItemEdittable {
    constructor(data) {
        super(data);

        this.tag = 'furniture';
    }
}