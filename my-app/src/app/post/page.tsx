'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import questToken from '../contractData/Quest.json'
import { BrowserProvider, ethers } from 'ethers';
// import { WalletSelector } from "./WalletSelector";
import { toast } from "@/app/components/ui/use-toast";
import { QUEST_ABI } from "@/utils/questflow";
import { useWalletClient } from "@thalalabs/surf/hooks";
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { aptosClient } from "@/utils/aptosClient"


const BountyFormPage: React.FC = () => {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();
    const { account, connected, disconnect, wallet } = useWallet();


    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null; // Prevent router usage until mounted
    }

    const { client } = useWalletClient();

    const handleMint = async () => {

        if (!account || !client) {
            return;
        }

        try {
            const committedTransaction = await client.useABI(QUEST_ABI).transfer({
                type_arguments: [],
                arguments: ["0x5a5d125b5d1c3b57cc8b0901196139bff53c53d7d27dc8c27edea4190fa7f381", 100000000],
            });
            const executedTransaction = await aptosClient().waitForTransaction({
                transactionHash: committedTransaction.hash,
            });
            // queryClient.invalidateQueries({
            //   queryKey: ["message-content"],
            // });
            toast({
                title: "Success",
                description: `Transaction succeeded, hash: ${executedTransaction.hash}`,
            });
            alert('Withdraw your earned QF coins!');

        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // const contractAddress = '0x63846e146420ff19C6b870878A189A922f2b2739'
        // const earnedEDU = 1;
        // const provider = new BrowserProvider(window.ethereum);

        // const signer = await provider.getSigner()
        // const movieRev = new ethers.Contract(contractAddress, questToken.abi, signer)
        // const walletAddress = await signer.getAddress();
        // // mint();
        // console.log(earnedEDU, "========inside withdraw===")

        // await (await movieRev.donate(walletAddress, "0xB702203B9FD0ee85aeDB9d314C075D480d716635", ethers.parseUnits(earnedEDU.toString(), 18))).wait();

        await handleMint()

        // Show the popup
        setIsPopupVisible(true);

        // Simulate posting the bounty (this would normally be an API call)
        // You can use await here if you have a real API call
        // await postBounty();

        // Redirect to home page after displaying the popup
        setTimeout(() => {
            // Close the popup before redirecting (optional)
            setIsPopupVisible(false);
            router.replace('/home'); // Use replace to simulate redirect
        }, 3000);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 rounded-lg shadow-lg p-8 max-w-lg w-full">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Create a New Bounty</h2>
                <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-white mb-2" htmlFor="bountyName">Bounty Name</label>
                        <input
                            type="text"
                            id="bountyName"
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white"
                            placeholder="Enter Bounty Name"
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-2" htmlFor="deadline">Deadline</label>
                        <input
                            type="date"
                            id="deadline"
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-2" htmlFor="details">Details</label>
                        <textarea
                            id="details"
                            required
                            rows={4}
                            className="w-full p-2 rounded bg-gray-700 text-white"
                            placeholder="Enter Details"
                        />
                    </div>
                    <div>
                        <label className="block text-white mb-2" htmlFor="skillsNeeded">Skills Needed</label>
                        <input
                            type="text"
                            id="skillsNeeded"
                            required
                            className="w-full p-2 rounded bg-gray-700 text-white"
                            placeholder="Enter Skills Needed"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition duration-200"
                    >
                        Create Bounty
                    </button>
                    <p className='font-light text-white'>* 1 QF to confirm your post</p>
                </form>
            </div>

            {/* Popup Notification */}
            {isPopupVisible && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold">Bounty Posted!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BountyFormPage;
