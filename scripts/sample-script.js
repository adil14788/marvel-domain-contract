const hre = require("hardhat");

async function main() {
	const [owner, add1, add2] = await hre.ethers.getSigners();
	const DomainContract = await hre.ethers.getContractFactory("Domain");
	const Domain = await DomainContract.deploy("marvel");

	await Domain.deployed();

	console.log("Contact deployed to:", Domain.address);

	let txn = await Domain.register("Adil", {
		value: hre.ethers.utils.parseEther("0.5"),
	});
	await txn.wait();

	console.log("Owner Caller ", owner.address);
	txn = await Domain.setRecord("Adil", "Billionaire");
	await txn.wait();
	console.log("Set record for banana.ninja");

	const address = await Domain.getAddress("Adil");
	console.log("The address is ", address);

	const balance = await hre.ethers.provider.getBalance(Domain.address);
	console.log(
		"Balance of the contarct is ",
		hre.ethers.utils.formatEther(balance)
	);
}

const runMain = async () => {
	try {
		await main();
		process.exit(0);
	} catch (err) {
		console.log(err);
		process.exit(1);
	}
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
runMain();
