
import {Test, TestingModule} from "@nestjs/testing";
import {CorsTestClient} from "./corsTest.client";
import {ImgDownloadClient} from "./imgDownload.client";


describe('client', () => {
    let corsTestClient: ImgDownloadClient;

    beforeEach(async () => {

        const module: TestingModule = await Test.createTestingModule({

            providers: [ImgDownloadClient],
        }).compile();

        corsTestClient = module.get<ImgDownloadClient>(ImgDownloadClient);
    });

    it('should be defined', async () => {
        await corsTestClient.downloadImageAndSave('http://res.cloudinary.com/dpyp2ng96/image/upload/v1683787326/c5nymf6ahwkuhgelqczc.png');
    }, 10 * 1000);

});
