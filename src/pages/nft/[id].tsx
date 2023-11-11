import Layout from "@/layout/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {getMarketplaceContract, getNFTContract} from "@/util/getContracts";
import {useNFT, useTransferNFT, useValidDirectListings} from "@thirdweb-dev/react";
import NFTDetails from "@/components/NFTDetails";
import CancelSellingCard from "@/components/CancelSelling";
import SellNFTCard from "@/components/SellNFTCard";
import TransferNftCard from "@/components/TransferNFTCard";

function NFTDetailsPage() {

    const router = useRouter();
    const [price, setPrice] = useState(0.01);
    const [symbol, setSymbol] = useState("");
    const [listingID, setListingID] = useState("");
    const [nftID, setNftID] = useState("");

    // address state added
    const [address, setAddress] = useState('');

    const {nft_contract} = getNFTContract();
    const {marketplace} = getMarketplaceContract();

    const {data: nft, isLoading: isNftLoading} = useNFT(nft_contract, nftID);
    const {data: directListings} = useValidDirectListings(marketplace, {
        start:0,
        count:100
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const { id } = router.query;
            setNftID(id as string);
        }
        let listedNFT = directListings?.find((item) => item.tokenId === nftID);
        if (listedNFT) {
            setListingID(listedNFT.id);
            setPrice(Number(listedNFT.currencyValuePerToken.displayValue));
            setSymbol(listedNFT.currencyValuePerToken.symbol);
        }
    }, [directListings, price, listingID, router.query]);



    return (
        <Layout>
            <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    NFT Details
                </h1>
                {
                    isNftLoading || !nft
                        ?
                            <div className="text-center">
                                {`Loading NFT with id ${nftID}`}
                            </div>
                        :
                            <>
                                <NFTDetails {...nft} />
                                {
                                    listingID
                                    ? <CancelSellingCard price={price} symbol={symbol} listingID={listingID}/>
                                    : <SellNFTCard price={price} onUpdatePrice={setPrice} id={nftID} />
                                }
                                {
                                    <TransferNftCard address={address} onUpdateAddress={setAddress} id={nftID} />
                                }
                                {
                                    console.log(nftID)
                                }
                            </>
                }
            </div>
        </Layout>
    );
}
export default NFTDetailsPage;
