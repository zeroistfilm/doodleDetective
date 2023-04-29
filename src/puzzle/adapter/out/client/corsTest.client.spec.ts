
import {Test, TestingModule} from "@nestjs/testing";
import {CorsTestClient} from "./corsTest.client";


describe('client', () => {
    let corsTestClient: CorsTestClient;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({

            providers: [CorsTestClient],
        }).compile();

        corsTestClient = module.get<CorsTestClient>(CorsTestClient);
    });

    it('should be defined', async () => {
        await corsTestClient.test()
    }, 10 * 1000);

});
