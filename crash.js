const Web3 = require('web3');

async function main() {
	const web3 = new Web3('http://localhost:8545');
	const account = web3.eth.accounts.privateKeyToAccount(
		'0x8d4408014d165ec69d8cc9f091d8f4578ac5564f376f21887e98a6d33a6e3549'
	);
	web3.eth.accounts.wallet.add(account);
	const tx = await web3.eth.sendTransaction({
		from: account.address,
		to: '0x9c7f9f45a22ad3d667a5439f72b563df3aa70aae',
		value: web3.utils.toWei('1', 'ether'),
		gas: 8000000,
		nonce: 0,
	});

	return tx;
}

main()
	.then(console.log)
	.catch(console.error);
