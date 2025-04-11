const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545"); // Connect to Hardhat Local Network
let signer;
let contractInstance;
const contractABI = [ 
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_buyer",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_price",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_quantity",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_contractYears",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "farmer",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "quantity",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "contractYears",
        "type": "uint256"
      }
    ],
    "name": "ContractCreated",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "paymentsMade",
        "type": "uint256"
      }
    ],
    "name": "PaymentMade",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "farmer",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "buyer",
        "type": "address"
      }
    ],
    "name": "ProductDelivered",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "buyer",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "confirmDelivery",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "contractYears",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "farmer",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getPaymentsMade",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isContractComplete",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isPaid",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "makePayment",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "paymentsMade",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "price",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "quantity",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
    ];
const contractBytecode = "0x608060405234801561001057600080fd5b506040516104b63803806104b683398101604081905261002f916100be565b600080546001600160a01b031990811633908117909255600180546001600160a01b038716921682179055600284905560038390556004805460ff191690556040805192835260208301919091528101839052606081018290527ffab0e42748281d7ded0b8035c108061734a19fc87373b21ab917a4550826cbaf9060800160405180910390a1505050610101565b6000806000606084860312156100d357600080fd5b83516001600160a01b03811681146100ea57600080fd5b602085015160409095015190969495509392505050565b6103a6806101106000396000f3fe6080604052600436106100705760003560e01c80637150d8ae1161004e5780637150d8ae146100df578063a035b1fe14610117578063d811fcf01461012d578063d8d797001461014d57600080fd5b806317fc45e214610075578063209ebc081461009e5780635e10177b146100c8575b600080fd5b34801561008157600080fd5b5061008b60035481565b6040519081526020015b60405180910390f35b3480156100aa57600080fd5b506004546100b89060ff1681565b6040519015158152602001610095565b3480156100d457600080fd5b506100dd610155565b005b3480156100eb57600080fd5b506001546100ff906001600160a01b031681565b6040516001600160a01b039091168152602001610095565b34801561012357600080fd5b5061008b60025481565b34801561013957600080fd5b506000546100ff906001600160a01b031681565b6100dd610290565b6000546001600160a01b031633146101b45760405162461bcd60e51b815260206004820152601960248201527f4f6e6c79206661726d65722063616e2063616c6c20746869730000000000000060448201526064015b60405180910390fd5b60045460ff166102065760405162461bcd60e51b815260206004820152601860248201527f5061796d656e74206e6f7420726563656976656420796574000000000000000060448201526064016101ab565b600080546002546040516001600160a01b039092169281156108fc029290818181858888f19350505050158015610241573d6000803e3d6000fd5b50600054600154604080516001600160a01b0393841681529290911660208301527f7b2375ea59e583d947bfdaa1092d9c1f3b3a3bc8218ce55fb7976286ea48b32191015b60405180910390a1565b6001546001600160a01b031633146102ea5760405162461bcd60e51b815260206004820152601860248201527f4f6e6c792062757965722063616e2063616c6c2074686973000000000000000060448201526064016101ab565b600254341461032e5760405162461bcd60e51b815260206004820152601060248201526f125b98dbdc9c9958dd08185b5bdd5b9d60821b60448201526064016101ab565b6004805460ff19166001179055604080513381523460208201527f3a2d0e41c506b136330c6e5e0295ccbf0966daece99bfe7c89020cc01dbfb8d6910161028656fea264697066735822122065c7c2e329b39ebb0ffd231aaeaf2e19b00700cf34ffa9371a3e814b2799206c64736f6c634300081c0033"; // Add your compiled contract bytecode
const contractAddressInput = document.getElementById("contractAddress");

// Hardcoded contract address (optional, can be removed if deploying dynamically)

// ✅ Ensure the element exists before setting the value
if (contractAddressInput) {
    contractAddressInput.value = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
}

// Connect MetaMask

async function connectWallet() {
    if (!window.ethereum) {
        alert("MetaMask is required.");
        return;
    }
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    signer = provider.getSigner(accounts[0]);
    console.log(`✔ Connected MetaMask account: ${accounts[0]}`);
}

// 🚀 Deploy Smart Contract (Farmer)
async function deployContract() {
  try {
      await connectWallet();
      const ContractFactory = new ethers.ContractFactory(contractABI, contractBytecode, signer);

      const buyerAddress = document.getElementById("buyerWallet").value.trim();
      if (!buyerAddress || !ethers.utils.isAddress(buyerAddress)) {
          alert("Enter a valid buyer wallet address.");
          return;
      }

      const priceInput = document.getElementById("price").value.trim();
      if (!priceInput || isNaN(priceInput) || Number(priceInput) <= 0) {
          alert("Enter a valid price.");
          return;
      }
      const price = ethers.utils.parseEther(priceInput);

      const quantityInput = document.getElementById("quantity").value.trim();
      if (!quantityInput || isNaN(quantityInput) || Number(quantityInput) <= 0) {
          alert("Enter a valid quantity.");
          return;
      }
      const quantity = Number(quantityInput);

      const contractYearsInput = document.getElementById("contractYears").value.trim();
      if (!contractYearsInput || isNaN(contractYearsInput) || Number(contractYearsInput) <= 0) {
          alert("Enter a valid contract duration in years.");
          return;
      }
      const contractYears = Number(contractYearsInput);

      console.log(`🚀 Deploying contract with Buyer: ${buyerAddress}, Price: ${price.toString()}, Quantity: ${quantity}, Years: ${contractYears}`);

      contractInstance = await ContractFactory.deploy(buyerAddress, price, quantity, contractYears);
      await contractInstance.deployed();

      const contractAddress = contractInstance.address; 
      alert(`✅ Contract Deployed at: ${contractAddress}`);

      // ✅ Store contract address and contract years in localStorage
      localStorage.setItem("contractAddress", contractAddress);
      localStorage.setItem("contractYears", contractYears); // ✅ Store contract years

      const contractDisplayElement = document.getElementById("contractAddressDisplay");
      if (contractDisplayElement) {
          contractDisplayElement.innerText = `Contract Deployed at: ${contractAddress}`;
      }

  } catch (error) {
      console.error("❌ Error deploying contract:", error);
      alert("Failed to deploy contract. Check console for more details.");
  }
}


// 📌 Fetch Contract Details (Buyer)


async function fetchContractDetails() {
  try {
      const contractAddress = document.getElementById("contractAddress").value.trim();
      if (!contractAddress) {
          alert("Enter a valid contract address.");
          return;
      }

      contractInstance = new ethers.Contract(contractAddress, contractABI, provider);

      // ✅ Verify if contract is deployed at the given address
      const contractCode = await provider.getCode(contractAddress);
      if (contractCode === "0x") {
          console.error("❌ No contract deployed at this address:", contractAddress);
          alert("❌ No contract found at this address. Please check.");
          return;
      }

      const buyer = await contractInstance.buyer().catch(() => null);
      const farmer = await contractInstance.farmer().catch(() => null);
      const price = ethers.utils.formatEther(await contractInstance.price().catch(() => "0"));

      // ✅ Fetch Contract Years from localStorage instead of contract.js
      let contractYears = localStorage.getItem("contractYears") || "N/A";
      console.log("📅 Contract Years Retrieved from Farmer Page:", contractYears);

      const isPaid = await contractInstance.isPaid().catch(() => false);

      if (!buyer || !farmer) {
          alert("❌ Failed to fetch contract details. Ensure contract is deployed and address is correct.");
          return;
      }

      document.getElementById("contractDetails").innerHTML = `
          <p>👨‍🌾 Farmer: ${farmer}</p>
          <p>🛒 Buyer: ${buyer}</p>
          <p>💰 Price: ${price} ETH</p>
          <p>📅 Contract Duration: ${contractYears} years</p>
          <p>✅ Payment Status: ${isPaid ? "Paid" : "Pending"}</p>
      `;

      if (document.getElementById("makePaymentBtn")) {
          document.getElementById("makePaymentBtn").disabled = false;
      }

  } catch (error) {
      console.error("❌ Failed to fetch contract details:", error);
      alert("❌ An error occurred while fetching contract details.");
  }
}


async function makePayment() {
  try {
      await connectWallet();

      const contractAddress = document.getElementById("contractAddress").value.trim();
      if (!contractAddress) {
          alert("Enter a valid contract address.");
          return;
      }

      contractInstance = new ethers.Contract(contractAddress, contractABI, signer);
      const connectedAccount = await signer.getAddress();
      const buyer = await contractInstance.buyer();

      if (connectedAccount.toLowerCase() !== buyer.toLowerCase()) {
          alert("❌ You are not the buyer! Please switch to the buyer’s account.");
          return;
      }

      const price = await contractInstance.price();
      console.log(`🚀 Making payment of: ${ethers.utils.formatEther(price)} ETH`);

      const tx = await contractInstance.makePayment({ value: price });
      await tx.wait();

      alert("✅ Payment successful!");
      await fetchContractDetails();

  } catch (error) {
      console.error("❌ Error making payment:", error);
      alert("❌ Failed to make payment.");
  }
}


async function confirmDelivery() {
  try {
      await connectWallet();

      // ✅ Get contract address from input field instead of localStorage
      const contractAddress = document.getElementById("contractAddress").value.trim();
      if (!contractAddress) {
          alert("❌ Enter a valid contract address before confirming delivery.");
          return;
      }

      contractInstance = new ethers.Contract(contractAddress, contractABI, signer);

      const connectedAccount = await signer.getAddress();
      const farmer = await contractInstance.farmer();

      if (connectedAccount.toLowerCase() !== farmer.toLowerCase()) {
          alert("❌ Only the farmer can confirm delivery. Please switch to the farmer's account.");
          return;
      }

      console.log(`🚀 Confirming delivery from account: ${connectedAccount}`);

      // ✅ Attempt to confirm delivery and wait for success
      const tx = await contractInstance.confirmDelivery();
      await tx.wait();

      // ✅ Show success message only if transaction is successful
      alert("✅ Delivery confirmed!");

      // ✅ Refresh contract details to update UI
      await fetchContractDetails();

  } catch (error) {
      console.error("⚠️ Error confirming delivery:", error);

      // ✅ Log the error but do not show an alert to the user
      if (error.message.includes("Transaction reverted")) {
          console.warn("⚠️ Transaction reverted. Check contract conditions.");
      }
  }
}





// ✅ Ensure script runs after the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const contractAddressInput = document.getElementById("contractAddress");
  const savedContractAddress = localStorage.getItem("contractAddress");

  // ✅ Only update if the element exists and we have a saved contract address
  if (contractAddressInput && savedContractAddress) {
      contractAddressInput.value = savedContractAddress;
  }
});


// ✅ Clear previous values when the page loads
document.addEventListener("DOMContentLoaded", function () {
  localStorage.removeItem("contractAddress");  // Remove stored contract address
  localStorage.removeItem("paymentStatus");    // Remove payment status
  localStorage.removeItem("updateTime");       // Remove update timestamp
});
