import { HomeContext } from "@/contexts/stakingContext";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React, { useContext } from "react";

function Header() {
  const { isOwner, stakingContractOwner } = useContext(HomeContext);

  return (
    <nav className="p-5 flex flex-col justify-center items-center">
      <div className="flex flex-row items-center">
        <nav className="flex flex-row justify-center">
          <ConnectButton />

          {isOwner ? (
            <div>
              <Link href="/" className="bg-teal-500 hover:bg-yellow-400 rounded-xl px-5 py-1 mx-5 transition duration-300 ease-in-out shadow-lg text-lg">
                Home
              </Link>
              <Link href="/owner" className="bg-teal-500 hover:bg-yellow-400 rounded-xl px-2 py-1 mx-5 transition duration-300 ease-in-out shadow-lg text-lg">
                For Owner Only
              </Link>
            </div>
          ) : null}
        </nav>
      </div>
    </nav>
  );
}

export default Header;
