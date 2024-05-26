

let answer = ["яблоко", "груша", "город", "школа", "сайт", "браузер",
    "плагин", "цвет", "стиль", "язык", "узор", "сорока"];

let was = [];

let num = Math.floor(1 + Math.random() * answer.length)

let progress = 0;


$(document).ready(function () {
    $('.progress').knob({
        'min': 0,
        'max': 5,
        'bgColor': 'red',
        'fgColor': 'black'
    })

    $('#rules').slideUp();

    startRebus(num);

    $('.desc-rul').click(function () {
        $('#rules').slideToggle();
    })

    $('#buttonAnswer').click(function () {
        if ($('#inputAnswer').val().toLowerCase() == answer[num-1]) {
            alertify.success('NICE!');
            $('#inputAnswer').val("");
            progress++;
            $('.progress').val(progress).trigger('change');

            was.push(num);

            if(progress<5){

                do {
                    num = Math.floor(1 + Math.random() * answer.length)
                } while (was.includes(num))

                startRebus(num)
            } else {
                $('.cont-img').css({
                    'display': 'none'
                })
                $('.nextLevel').css({
                    'display': 'flex'
                })
            }

        } else {
            alertify.error('NO!');
            $('#inputAnswer').val("");
        }
    })

})


function startRebus(num) {
    $('#picture').attr('src', `./rebuses/${num}.jpg`)
}


/*
document.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
            if ($('#inputAnswer').val().toLowerCase() == answer[num-1]) {
                alertify.success('NICE!');
                $('#inputAnswer').val("");
                progress++;
                $('.progress').val(progress).trigger('change');
    
                was.push(num);
    
                if(progress<5){
    
                } else {
    
                }
    
            } else {
                alertify.error('NO!');
                $('#inputAnswer').val("");
            }
        }})
*/