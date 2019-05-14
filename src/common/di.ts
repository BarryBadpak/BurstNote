import 'reflect-metadata';
import Container from './container';

class DI
{
    public static container: Container = new Container();

    constructor() {
        // http://inversify.io/
        // DI.container.bind<>().to();
    }
}

export default new DI();
