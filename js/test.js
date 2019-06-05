function test() {
(async () => {
        $(".comment-btn").addClass("disabled").addClass("wait");

		var name = $("#input_name").val();
        var bounty = $("#input_bounty").val();
		var amount = $("#input_amount").val();
		
        var unixTime = Math.round((new Date()).getTime() / 1000)
		
		var comment = name +" "+ bounty +" "+ amount 
        var data = {
            'comment': comment,
        }

		
        var tx =
            await arweave.createTransaction(
                {
                    data: JSON.stringify(data),
                },
                wallet
            )

        tx.addTag('App-Name', 'BlockCert')
        tx.addTag('App-Version', versionNumber)
        tx.addTag('Unix-Time', unixTime)
        tx.addTag('Name', name)
        tx.addTag('Bounty', bounty)
		tx.addTag('Amount', amount)
        tx.addTag('comment', comment)
        await arweave.transactions.sign(tx, wallet)
        console.log(tx.id)
        await arweave.transactions.post(tx)

        $("textarea[name='input_comment']").val('');
        $(".comment-btn").removeClass("disabled").removeClass("wait");
        alert('Data dispatched!')
		$('#askQuestionModal').modal('hide');
		//getData();
    })()
}
