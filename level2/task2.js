//Time controll/---------------------------------

let time;

if (sessionStorage.getItem('timekey') != null){
	time = +sessionStorage.getItem('timekey');
} else {
	time = 200;
	sessionStorage.setItem('timekey', time)
}

//------------------------------------------------

let answer = [
	["гаррі поттер", "гарри поттер","harry potter"],
	["губка боб","sponge bob", "spongebob", "губка боб квадратные штаны", "губка боб квадратні штани"],
	["пірати", "пірати карибского моря", "капитан джек горобець", "пираты","пираты карибского моря", "капитан джек воробей", "pirates of the caribbean"],
	["сімпсони", "симпсоны","simpsons", "the simpsons"],
	["зоряні війни", "звездные войны","star wars", "имперский марш", "імперский марш"],
	["lion king","the lion king", "король лев", "симба", "сімба"],
	["frozen","холодное сердце", "холодне серце", "эльза", "ельза"],
	["shrek","шрек"],
	["shrek","шрек"],
	["rocky","рокки", "роккі"],
	["индиана джонс","indiana jones"],
	["один вдома", "один дома","home alone"],
	["термінатор", "терминатор","terminator"],
	["назад у майбутнє", "назад в будущее", "back to the future", "марти макфлай"],
	["мисливці за привидами", "охотники за привидениями","ghost busters"]
];

let was = [];

let progress = 0;

let num = Math.floor(1 + Math.random() * answer.length);

$(document).ready(function () {
	$(".progress").knob({
		'min': 0, 
		'max': 5,
		'angleOffset': -60,
		'angleArc': 120,
		'readOnly': true,
		'width' : '100%',
		'thickness': 0.2,
		'lineCap': 'round',
		'displayInput' : false,
		'bgColor' : '#cecae3',
		'fgColor' : '#3b1b5b'
	});
	$(".time").knob({
		'min': 0, 
		'max': 200,
		'angleOffset': 0,
		'angleArc': 360,
		'readOnly': true,
		'width' : '100%',
		'thickness': 0.2,
		'lineCap': 'butt',
		'displayInput' : false,
		'bgColor' : '#cecae3',
		'fgColor' : '#3b1b5b'
	});

	$(".slideRules").click(function () {
		$("#rules").slideToggle();
	});

	$("#start").click(function() {
		$('#start').css({
			display: 'none'
		})
		$('.sound').css({
			display: 'block'
		})
		startRebus(num)
		startTime();
	})

	$('#btnTask').click(function(){
		const ans = $("#inputTask").val().toLowerCase()
		$('#inputTask').val('');
		if(answer[num-1].indexOf(ans) != -1) {
			alertify.success("Nice!");
			progress++;
			$('.progress').val(progress).trigger('change');
            was.push(num);

			if (progress < 5) {
				do {
                    num = Math.floor(1 + Math.random() * answer.length)
                } while (was.includes(num))

                startRebus(num);
			} else {
                $('.sound, .answer').css({
                    'display': 'none'
                })
                $('.nextLevel').css({
                    'display': 'flex'
                })
            }


		} else {
			alertify.error("BAD!")
		}

	})




});

function startRebus(num) {
    $('#melody').attr('src', `./sound/${num}.mp3`)
}

function startTime() {
	setInterval(function(){
		time = +sessionStorage.getItem('timekey') - 1;
		$('.time').val(time).trigger('change');
		if (time > 0) {
			sessionStorage.setItem('timekey', time);
		} else {
			alertify.error("Game over!");
			setTimeout(function(){
				window.open('../index.html', '_self', false);
			}, 2000)
			sessionStorage.removeItem('timekey');
		}
	}, 1000)
}




