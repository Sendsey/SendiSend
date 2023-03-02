const MIN_DELAY = '13'; // <==== минимальная задержка
const MAX_DELAY = '40'; // <==== максимальная задержка
const TOKEN = 'KTUD1Du1K6I17GAWyNBh51TDZXVPSuyj0iuGQfBS'; // <==== токен
const MAILING_TYPE = '1'; // <==== тип рассылки
const DELEY_TIME = 10000; // <==== время обновления (в миллисекундах)

function get_qr() {
	$.ajax({
			url: 'https://wasend.pro/api/user/qr',
    		type: 'post',
    		data: {
        		'min': MIN_DELAY, 
        		'max': MAX_DELAY,
        		'topic': MAILING_TYPE,
        		'proxy': 'random'
    		},
    		headers: {
        		'Authorization': 'Bearer ' + TOKEN
    		},
    	dataType: 'json',
    	success: function(data) {
        	console.info(data);
        	var image = new Image();
        	image.src = data['base64'];
        	$('#qr').html(image);
        	var options = {
				hour: 'numeric',
				minute: 'numeric',
				second: 'numeric'
			};
        	$('#date').html('update time: '+(new Date()).toLocaleString("ru", options));
    	}
    });
}

$(document).ready(function() {
	get_qr();
	setInterval('get_qr()',DELEY_TIME);
});