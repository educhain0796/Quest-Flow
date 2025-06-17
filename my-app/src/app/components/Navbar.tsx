'use client';

import { useState, useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js
import Link from 'next/link'; // Use Link to navigate
import questAbi from '../contractData/Quest.json'
import { BrowserProvider, ethers } from "ethers";
import questAddress from "../contractData/address.json";
import LoginButton from '@/app/components/LoginButton';
import { useOCAuth } from '@opencampus/ocid-connect-js';
import { WalletSelector } from "./WalletSelector";
import { toast } from "./ui/use-toast";
import { QUEST_ABI } from "@/utils/questflow";
import { useWalletClient } from "@thalalabs/surf/hooks";
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { aptosClient } from "@/utils/aptosClient"


declare global {
  interface Window {
    ethereum?: any; // Declare the ethereum object
  }
}


const Navbar: React.FC = () => {

  // const { authState, ocAuth } = useOCAuth() as {
  //   authState: { isLoading: boolean; isAuthenticated: boolean; error?: { message: string } };
  //   ocAuth: { getAuthState: () => { OCId: string } };
  // };



  // if (!authState) {
  //   return <div>Loading authentication...</div>;
  // }

  // if (authState.error) {
  //   return <div>Error: {authState.error.message}</div>;
  // }

  // if (authState.isLoading) {
  //   return <div>Loading...</div>;
  // }

  const [isConnected, setIsConnected] = useState<boolean>(false);
  // const [account1, setAccount] = useState<string>("reset");
  const [balance, setBalance] = useState<string>('0 QF'); // Set initial balance to '0 MQ'
  const [showPopdown, setShowPopdown] = useState<boolean>(false); // State to handle pop-down visibility
  const router = useRouter(); // Initialize the router
  const logoRef = useRef<HTMLDivElement>(null); // Ref for logo animation
  const [quest, setQuest] = useState<ethers.Contract | undefined>(undefined);
  const { account, connected, disconnect, wallet } = useWallet();


  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    } else {
      console.error('MetaMask is not detected');
    }
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        // const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);
        // setAccount(accounts[0]); // Store the first account address
        // Set a sample balance (You can replace this with actual balance fetching logic)
        setBalance('10 QF');
        // console.log('Connected account:', account);
        // console.log('Connected balance:', balance);

        // Redirect to home page after successful connection
        router.push('/home'); // Automatically redirect to the home page
      } catch (error) {
        console.error("User denied wallet connection or another error occurred:", error);
      }
    } else {
      alert("Aptos compatible wallet is not installed. Try again.");
    }

  };

  // const handleWithdraw = async () => {
  //   // Withdraw logic here (You can call your contract function or any other logic)


  //   alert('Withdrawing. Transaction Processing..............');

  //   const provider = new BrowserProvider(window.ethereum);
  //   const signer = await provider.getSigner()
  //   const questContract = new ethers.Contract(questAddress.contractAddress, questAbi.abi, signer)
  //   setQuest(questContract);
  //   // mint();
  //   // console.log(balance, "========inside withdraw===")

  //   await (await questContract.mint(account, ethers.parseUnits(parseInt(balance).toString(), 18))).wait();
  //   alert('Withdraw your earned EDU coins!');

  // };

  const { client } = useWalletClient();

  const handleWithdraw = async () => {

    if (!account || !client) {
      return;
    }

    try {
      const committedTransaction = await client.useABI(QUEST_ABI).mint({
        type_arguments: [],
        arguments: [account.address.toString(), 1000000000],
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


  const togglePopdown = () => {
    setShowPopdown(prev => !prev); // Toggle pop-down visibility
  };

  return (
    <nav className="absolute top-0 left-0 right-0 flex justify-between items-center p-6 bg-transparent z-50">
      <div
        ref={logoRef}
        className="flex items-center font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
      >
        <Link href="/home">Quest Flow</Link>
      </div>

      <div className="flex items-center space-x-4 relative">
        {/* Balance with clickable popdown */}
        <div
          className="text-white font-semibold relative cursor-pointer"
          onClick={togglePopdown} // Toggle on click
        >
          Balance: {balance}

          {/* Pop-down content */}
          {showPopdown && (
            <div className="text-sm absolute top-full mt-2 w-40 bg-white text-black p-4 rounded-lg shadow-lg z-10 right-[1px]">
              <p className="font-semibold">Balance Details</p>
              <p>Total Balance: {balance}</p>
              {/* <p>Pending Transactions: 2</p> */}

              {/* Withdraw Button */}
              <button
                onClick={handleWithdraw}
                className="mt-2 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-400 transition duration-300"
              >
                Withdraw
              </button>

              {/* Optional Close Button */}
              <button
                onClick={() => setShowPopdown(false)}
                className="mt-2 w-full bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300"
              >
                Close
              </button>
            </div>
          )}
        </div>

        <Link href={`/profile?account=${account}&balance=${balance}`}>
          <button
            className="text-white bg-blue-500 hover:bg-blue-400 transition duration-300 px-4 py-2 rounded-lg flex items-center space-x-2 transform hover:scale-105"
          >
            <FaUserCircle className="text-2xl" />
            <span>Profile</span>
          </button>
        </Link>
        {/* <button
          className="text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 transition duration-300 px-4 py-2 rounded-lg transform hover:scale-105"
        >
       
        
          <LoginButton />
        
        </button> */}
        <button
          onClick={isConnected ? undefined : connectWallet}
          className="text-white bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-400 hover:to-purple-600 transition duration-300 px-4 py-2 rounded-lg transform hover:scale-105"
        >
          {<WalletSelector />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
