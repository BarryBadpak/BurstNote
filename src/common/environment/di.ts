import {Container} from 'inversify';
import 'reflect-metadata';

export default class DI
{
    container: Container = new Container();

    public TYPE_XXXXX: Symbol = Symbol('TYPE_XXXXX');

    constructor() {

        // http://inversify.io/
        // this.container.bind<>().to();
    }
}
