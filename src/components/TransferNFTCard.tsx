import React, {FC, useState} from 'react';
import {useTransferNFT} from "@thirdweb-dev/react";
import {getNFTContract} from "@/util/getContracts";
import {useRouter} from "next/router";

interface TransferNftCardProps {
    address: string;
    onUpdateAddress: (newAddress: string) => void;
    id: string;
}
const TransferNftCard: FC<TransferNftCardProps> = ({ address, onUpdateAddress, id }) => {

    const router = useRouter();

    const {nft_contract} = getNFTContract();

    // transfer nft structure added
    const {
        mutate: transferNFT,
        isLoading,
        error,
    } = useTransferNFT(nft_contract);

    // handle when address input change
    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onUpdateAddress(event.target.value);
    };

    // handle when transfer button click
    const handleTransfer = () => {

        try{

            transferNFT({
                to: address,
                tokenId: router.query['id'] as string
            })
        }
        catch (e) {

            console.log("Error Transferring", e);
        }
    }

    return (
        <div className="relative bg-gray-800 text-white p-6 rounded-lg w-full shadow-md mt-4">
            <h1 className="w-full text-center text-2xl font-semibold mb-2 ">Wallet Address</h1>

            <div>
                <label className="font-bold text-xl">Address:</label>
                <input
                    className="ml-2 bg-gray-800 w-80"
                    placeholder="Wallet Address"
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                />
            </div>

            <button
                onClick={handleTransfer}
                className="w-full mt-4 bg-blue-500 bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Transfer
            </button>

            {
                (error as unknown as boolean) ? <div className="text-center mt-4">Error Transfer</div> : null
            }
            {
                isLoading && <div className="text-center mt-4">Transferring in progress...</div>
            }
        </div>
    );
};

export default TransferNftCard;