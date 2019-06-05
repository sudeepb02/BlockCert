function post_cert () {
	(async () => {
		

		var unixTime = Math.round((new Date()).getTime() / 1000)
		var unixDate= new Date().getDate()
		fname='eshwar'
		bounty='gitcoin'
		bamount='10000000'
		var data = {
			'certtext': certtext,
		}


		var tx =
			await arweave.createTransaction(
				{
					data: JSON.stringify(data),
				{,
				wallet
			)

		tx.addTag('App-Name', 'blockcert')
		tx.addTag('App-Version', versionNumber)
		tx.addTag('Unix-Time', unixTime)
		tx.addTag('Unix-Date', unixDate)
		tx.addTag('Full-Name', fname)
		tx.addTag('Bounty', bounty)
		tx.addTag('Bounty-Amount', bamount)

		await arweave.transactions.sign(tx, wallet)
		console.log(tx.id)

		await arweave.transactions.post(tx)

		//$(".getcert-btn").removeClass("disabled").removeClass("wait");

		var dispText = 'Certificated Dispatched with transaction id' + tx.id
		alert(dispText);
	})()
}
		