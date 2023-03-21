let web3;

// Check if the browser has MetaMask or another Ethereum wallet installed
if (window.ethereum) {
    web3 = new Web3(window.ethereum);
} else {
    alert('Please install MetaMask or another Ethereum wallet extension.');
}



// Connect to the user's wallet
async function connectWallet() {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        document.getElementById('connect-btn').style.display = 'none';
        document.getElementById('wallet-info').style.display = 'flex';
        updateBalance();
    } catch (error) {
        console.error('Error connecting wallet:', error);
    }
}

// Fetch and update the user's balance
async function updateBalance() {
    if (web3) {
        try {
            const accounts = await web3.eth.getAccounts();
            const balance = await web3.eth.getBalance(accounts[0]);
            const formattedBalance = (parseFloat(web3.utils.fromWei(balance, 'ether')).toFixed(3)) + ' ETH';
            document.getElementById('wallet-balance').textContent = 'Balance: ' + formattedBalance;
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    }
}

function setWalletName() {
    const walletNameInput = document.getElementById('wallet-name-input');
    const walletName = document.getElementById('wallet-name');
  
    walletName.textContent = walletNameInput.value;
    walletNameInput.style.display = 'none';
    walletName.style.display = 'inline';
  
    // Move wallet name and balance to the top right
    const walletInfo = document.getElementById('wallet-info');
    walletInfo.style.position = 'fixed';
    walletInfo.style.top = '1rem';
    walletInfo.style.right = '2rem';
    walletInfo.style.transform = 'none';
  }
  

// Other code in app.js

function moveHeroText() {
    const content = document.querySelector('.content');
    const hero = document.getElementById('hero');
    const walletContainer = document.getElementById('wallet-container');

    content.style.justifyContent = 'flex-start';
    hero.style.marginTop = '2rem';
    walletContainer.style.position = 'absolute';
    walletContainer.style.top = '50%';
    walletContainer.style.left = '50%';
    walletContainer.style.transform = 'translate(-50%, -50%)';
}

// Add event listeners
document.getElementById('connect-btn').addEventListener('click', async () => {
    await connectWallet();
    moveHeroText();
});
document.getElementById('wallet-name-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        setWalletName();
    }
});
