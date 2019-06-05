$(function(){
	var question_id_param = $.url('?q');
	if (typeof question_id_param === 'undefined') {
		get_questions();
		switch_to_page("index-page");
	} else {
		get_question(question_id_param);
	    get_answers(question_id_param);
	    switch_to_page("detail-page");
	}

	$("#home-icon").click(function() {
		window.history.replaceState(null, null, window.location.pathname);
		switch_to_page("index-page");
	})

	$("#question-card-list").on('click', '.question-card', function() {
		var question_id = $(this).attr('card-id');
		var question_author = $(this).attr('author-id');
		var question_datetime = $(this).find('.card-datetime').html();
		var question_title = $(this).find('.card-title').html();
		var question_description = $(this).find('.card-description').html();

		var address = $("#public-address").html();
		if (address === question_author) question_author = "You created this";

		$("#detail-page .question-author").html(question_author);
		$("#detail-page .question-datetime").html(question_datetime);
		$("#detail-page .question-title").html(question_title);
		$("#detail-page .question-description").html(question_description);
		$("#answer-btn").attr("question-id", question_id);

		window.history.pushState({},"", window.location.href + "?=" + question_id);
	    get_answers(question_id);
	    switch_to_page("detail-page");
	});

	$("#answer-card-list").on('click', '.tip-toggle', function() {
		$(this).parents(".tip-form").find('.tip-close').show();
		$(this).parents(".tip-form").find('.tip-btn').show();
		$(this).parents(".tip-form").find('.tip-input').show();
		$(this).parents(".tip-form").find('.tip-radio-group').show();
		$(this).parents(".tip-form").find('.tip-toggle').hide();
	});

	$("#answer-card-list").on('click', '.tip-close', function() {
		$(this).parents(".tip-form").find('.tip-close').hide();
		$(this).parents(".tip-form").find('.tip-btn').hide();
		$(this).parents(".tip-form").find('.tip-input').hide();
		$(this).parents(".tip-form").find('.tip-radio-group').hide();
		$(this).parents(".tip-form").find('.tip-toggle').show();
	});

	$("#answer-card-list").on('click', '.tip-btn', function() {
		var question_id = $('#answer-btn').attr('question-id');
		var answer_id = $(this).parents(".answer-card").attr('card-id');
		var answer_author = $(this).parents(".answer-card").find('.card-author').html();
		var tip_amount = $(this).parents(".input-group-btn").find('.active input').val();
		tip_answer(question_id, answer_id, answer_author, tip_amount);
	});

	$("#answer-card-list").on('click', '.comment-toggle', function() {
		var comments = $(this).siblings(".comments-list");
		if ($(comments).is(":visible")) {
			$(comments).hide();
		} else {
			$(comments).show();
		}
	});

	$("#answer-card-list").on('click', '.comment-btn', function() {
		var question_id = $('#answer-btn').attr('question-id');
		var answer_id = $(this).parents(".answer-card").attr('card-id');
		var comment_form = $(this).parents("form[name='comment-form']")
		var comment_field = comment_form.find("textarea");

		if (!$(comment_field).valid()) return;

		post_comment(question_id, answer_id, $(comment_field).val());
	});

	$("#answer-btn").click(function() {
		var question_id = $('#answer-btn').attr('question-id');
		answer_question(question_id);
	});
});

function switch_to_page(page) {
	let pages =
		[
			"index-page",
			"detail-page",
		];
	pages.forEach(function(p) {
		$("#"+p).hide();
	});$("#"+page).show();
}

function update_login_state(is_logged_in, address) {
	if (is_logged_in) {
		$(".not-logged-in").hide();
		$(".logged-in").show();
		$("#public-address").html(address);
		mark_owned_questions()
	} else {
		$(".not-logged-in").show();
		$(".logged-in").hide();
		$("#public-address").html();
	}
}

function mark_owned_questions() {
	var address = $("#public-address").html();

	if (address.length > 0) {
		$("#question-card-list .question-card").each(function(index) {
			if ($(this).attr('author-id') == address) {
				$(this).find('.card-is-owner').html('You created this - ')
			}
		});

	}
}