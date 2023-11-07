import Layout from "@/layout/Layout";
import { getMarketplaceContract, getNFTContract } from "@/util/getContracts";
import { useContractMetadata } from "@thirdweb-dev/react";
import ContractMetadata from "@/components/ContractMetadata";
import { Metadata } from "@/types/metadata";


const Info = () => {

    const { marketplace } = getMarketplaceContract();
    const { nft_contract } = getNFTContract();

    const { data:marketplace_metadata, isLoading:marketplaceMetadata_loading } = useContractMetadata(marketplace);
    const { data:nft_metadata, isLoading:nftMetadata_loading } = useContractMetadata(nft_contract);

    return (
        <Layout>
            <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    Contract Details
                </h1>
                {
                    nftMetadata_loading ||
                    (marketplaceMetadata_loading && <div className="text">Loading contract info...</div>)
                }
                {
                    marketplace_metadata &&
                    <ContractMetadata
                        metadata={marketplace_metadata as Metadata}
                        title="NFT Marketplace Contract Metadata"
                    />
                }
                {
                    nft_metadata &&
                    <ContractMetadata
                        metadata={nft_metadata as Metadata}
                        title="NFT Collection Contract Metadata"
                    />
                }
            </div>
        </Layout>
    );
}
export default Info;