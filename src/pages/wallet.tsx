import Layout from "@/layout/Layout";
import {getNFTContract} from "@/util/getContracts";
import {useAddress, useOwnedNFTs} from "@thirdweb-dev/react";
import NFTCard from "@/components/NFTCard";

export default function Wallet() {

    const { nft_contract } = getNFTContract();
    const address = useAddress();

    const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(nft_contract, address);

    return (
        <Layout>
            <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    My NFTs
                </h1>

                <div className="grid grid-rows-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 ">
                    {!address && <div>No Wallet Detected...</div>}
                    {
                        isLoading
                            ? <div>Loading NFT Data...</div>
                            :
                            <>
                                {
                                    ownedNFTs &&
                                    ownedNFTs.map((nft,id) =>
                                        <NFTCard key={id} {...nft}/>
                                    )}
                            </>
                    }
                </div>
            </div>
        </Layout>
    );
}
