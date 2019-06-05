function getData(id) {
	
 var txid = 'YA5iRvvYMKLTxfMQKANaqBIQs2VCdLG8py5Uh37tnoU';

        const transaction = arweave.transactions.get(txid).then(transaction => {
			//var data = transaction.get('tags', {decode: true, string: true});
			//console.log(data);
			
			
			
transaction.get('tags').forEach(tag => {
	let key = tag.get('name', {decode: true, string: true});
	let value = tag.get('value', {decode: true, string: true}); 
	console.log(`${key} : ${value}`); });

			
		})

}
