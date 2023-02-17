import * as IpfsClient from 'ipfs-http-client';
import { concat } from 'uint8arrays'
import { ctx } from '../processor';

const infuraAuth =
    'Basic ' + Buffer.from(process.env.INFURA_IPFS_PROJECT_ID + ':' + process.env.INFURA_IPFS_KEY).toString('base64');

export const pinToIPFS = async (uri: string) => {
    if (!uri.startsWith('ipfs://')) return;

    const ipfs = IpfsClient.create ({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
        headers: { authorization: infuraAuth }
    });
    
    // Pin the NFT metadata
    uri = uri.replace('ipfs://', '');
    ipfs.pin.add(uri).then((res: any) => {
        ctx.log.info(`Metadata pinned: ${res}`);
    });

    // Pin the image
    const chunks = [];
    for await (const chunk of ipfs.cat(uri)) {
        chunks.push(chunk);
    }
    const metadata = concat(chunks);
    const decodedMetadata = JSON.parse(new TextDecoder().decode(metadata).toString());
    if (decodedMetadata?.image) {
        if (!decodedMetadata.image.startsWith('ipfs://')) return;
        ipfs.pin.add(decodedMetadata.image.replace('ipfs://', '')).then((res: any) => {
            ctx.log.info(`Metadata pinned: ${res}`);
        });
    }
}