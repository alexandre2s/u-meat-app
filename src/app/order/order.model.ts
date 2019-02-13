
class Order{
    constructor(
        public address: string,
        public number: number,
        public optionalAddress: string,
        public paymentOption: string,
        public orderItems: OrdemItem[] = [],
        public id?: string
    ){}

}

class OrdemItem{
    constructor(
        public quantity: number,
        public menuId: string
    ){}
}

export { Order , OrdemItem}