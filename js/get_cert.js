function get_cert (tx_id) {
	(async () => {
		var tx = await arweave.transactions.get(tx_id)
		var jsonData = tx.get('data', {decode: true, string: true})
		var data = JSON.parse(jsonData);

		tx.get('tags').forEach(tag +> {
			let key = tag.get('name', {decode: true, string:true});
			let value = tag.get('value', {decode: true, string: true});
			console.log(`${key} : ${value}`);
		});
	})()
}
			
			