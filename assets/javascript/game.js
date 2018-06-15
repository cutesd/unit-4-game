$(function () {

    var StarWarsRPG = function () {

        var player_arr = [
            {
                name: 'Luke Skywalker',
                img: 'assets/images/luke.jpg',
                cont: undefined,
                health: 120,
                pwr: { powerBase: 8, attack: 8, counter: 10 }
            },
            {
                name: 'Chewbacca',
                img: 'assets/images/chewy.jpg',
                cont: undefined,
                health: 90,
                pwr: { powerBase: 4, attack: 4, counter: 5 }
            },
            {
                name: 'Darth Vader',
                img: 'assets/images/darth.jpg',
                cont: undefined,
                health: 150,
                pwr: { powerBase: 10, attack: 10, counter: 20 }
            },
            {
                name: 'The Emperor',
                img: 'assets/images/emperor.jpg',
                cont: undefined,
                health: 180,
                pwr: { powerBase: 12, attack: 12, counter: 25 }
            },
            {
                name: 'Boba Fett',
                img: 'assets/images/boba.jpg',
                cont: undefined,
                health: 180,
                pwr: { powerBase: 12, attack: 12, counter: 25 }
            },
            {
                name: 'Yoda',
                img: 'assets/images/yoda.jpg',
                cont: undefined,
                health: 180,
                pwr: { powerBase: 12, attack: 12, counter: 25 }
            },
            {
                name: 'Jabba the Hutt',
                img: 'assets/images/jabba.jpg',
                cont: undefined,
                health: 180,
                pwr: { powerBase: 12, attack: 12, counter: 25 }
            },
            {
                name: 'Leia',
                img: 'assets/images/leia.jpg',
                cont: undefined,
                health: 180,
                pwr: { powerBase: 12, attack: 12, counter: 25 }
            },
            {
                name: 'Ewok',
                img: 'assets/images/ewok.jpg',
                cont: undefined,
                health: 180,
                pwr: { powerBase: 12, attack: 12, counter: 25 }
            },
            {
                name: 'R2D2',
                img: 'assets/images/R2.jpg',
                cont: undefined,
                health: 180,
                pwr: { powerBase: 12, attack: 12, counter: 25 }
            },
            {
                name: 'Obi Wan Kenobe',
                img: 'assets/images/obi.jpg',
                cont: undefined,
                health: 180,
                pwr: { powerBase: 12, attack: 12, counter: 25 }
            },
            {
                name: 'Storm Trooper',
                img: 'assets/images/trooper.jpg',
                cont: undefined,
                health: 180,
                pwr: { powerBase: 12, attack: 12, counter: 25 }
            }
        ];

        var player;
        var opponent;
        var firstTime = true;

        var main = $('#game-container');
        var instr = $('<h1>');
        var playerChoose = $('<div>');
        var battleground = $('<div>');
        var playerSlot = $('<div>');
        var opponentSlot = $('<div>');
        var comment = $('<div>');

        var attack_btn = $('<btn>');
        var playAgain_btn = $('<btn>');
        var restart_btn = $('<btn>');

        // var audio = {};
        // audio["walk"] = new Audio();
        // audio["walk"].src = "http://www.rangde.org/static/bell-ring-01.mp3"
        // audio["walk"].addEventListener('load', function () {
        //     audio["walk"].play();
        // });


        this.play = function () {
            //
            init();
        }

        function init() {
            playerChoose.addClass("playerChoose");
            battleground.addClass("battleground");
            comment.addClass('commentArea');

            playerSlot.addClass("playerSlot");
            opponentSlot.addClass("playerSlot");
            //
            attack_btn.addClass('btn btn-lg btn-danger attack-btn');
            attack_btn.text('ATTACK');
            //
            playAgain_btn.addClass('btn btn-lg btn-info playAgain-btn');
            playAgain_btn.text('Play Again');
            //
            restart_btn.addClass('btn btn-lg btn-warning restart-btn');
            restart_btn.text('Restart');
            //
            startGame();
        }

        function startGame() {
            if (firstTime) {
                $.each(player_arr, createPlayer);
                instrUpdate('Choose Your Player');
                main.append(instr);
                main.append(playerChoose);
                firstTime = !firstTime;
            }
            playerChoose.removeClass('d-none');
        }

        function createPlayer(i, player) {
            player.pNum = i;
            player.orig = { ap: player.pwr.attack, hp: player.health };
            //
            var newDiv = $('<div>');
            newDiv.addClass('player');
            newDiv.attr('id', 'p' + i);
            //
            var pic = $('<img>');
            pic.attr('src', player.img);
            //
            var healthDiv = $('<div>');
            healthDiv.addClass('health');
            var heart = $('<div>');
            heart.addClass('heart-shape');
            healthDiv.append(heart);
            //<span class="hp">90</span>
            var hp = $('<span>');
            hp.addClass('hp');
            hp.text(player.health);
            healthDiv.append(hp);
            //span>&nbsp;Health Points</span>
            var span = $('<span>');
            span.html('&nbsp;Health Points');
            healthDiv.append(span);
            //
            var nameDiv = $('<div>');
            nameDiv.addClass('name');
            nameDiv.text(player.name);
            //
            newDiv.append(pic);
            newDiv.append(healthDiv);
            newDiv.append(nameDiv);
            newDiv.on("click", playerSelect);
            player.cont = newDiv;
            //
            playerChoose.append(player.cont);
        }



        function playerSelect(e) {
            console.log($(this)[0].id);
            if (player == undefined) {
                player = player_arr[$(this)[0].id.substr(-1)];
                playerSlot.append($(this));
                instrUpdate('Choose Your Opponent');
                console.log(player);
            } else if (opponent == undefined) {
                opponent = player_arr[$(this)[0].id.substr(-1)];
                opponentSlot.append($(this));
                console.log(opponent);
                beginAttack();
            }
        }

        function beginAttack() {
            instrUpdate(' ');
            battleground.append(playerSlot);
            battleground.append(attack_btn);
            attack_btn.on("click", attack);
            battleground.append(opponentSlot);
            playerChoose.addClass('d-none');
            main.append(battleground);
        }

        function attack(e) {
            // PLAYER ATTACKS
            opponent.health -= player.pwr.attack;
            healthUpdate(opponent);

            if (opponent.health <= 0) {
                // You beat them all
                if ($(playerChoose).children().length === 0) {
                    reset();
                    instrUpdate('You Won!  GAME OVER!!');
                    main.append(instr);
                    return;
                }
                // YOU WIN
                commentaryUpdate('<p>You have defeated ' + opponent.name + '. Choose another opponent.</p');
                player.pwr.attack += player.pwr.powerBase;
                attack_btn.replaceWith(playAgain_btn);
                playAgain_btn.on("click", playAgain);
                return;
            }

            // OPPONENT COUNTERATTACKS
            player.health -= opponent.pwr.counter;
            //
            healthUpdate(player);

            //
            if (player.health <= 0) {
                //YOU LOSE
                commentaryUpdate('<p>You have been defeated ... GAME OVER!!</p>');
                attack_btn.replaceWith(restart_btn);
                restart_btn.on("click", restart);
                return;
            }

            commentaryUpdate();
            player.pwr.attack += player.pwr.powerBase;
        }

        function healthUpdate(player) {
            var pID = "#p" + player.pNum;
            $(pID).find('.hp').text(player.health);
        }

        function commentaryUpdate(str) {
            console.log($.contains(comment));
            if (!$.contains(comment)) {
                battleground.append(comment);
            }
            if (str == undefined) {
                comment.html('<p>You attacked ' + opponent.name + ' for ' + player.pwr.attack + ' damage.</p><p>' + opponent.name + ' attacked you back for ' + opponent.pwr.counter + ' damage.</p >');
            } else {
                comment.html(str);
            }
        }

        function instrUpdate(str) {
            instr.text(str);
        }

        function playAgain() {
            opponent = undefined;
            commentaryUpdate('');
            instrUpdate('Choose Your Opponent');
            opponentSlot.empty();
            battleground.empty();
            battleground.remove();
            startGame();
        }

        function restart() {
            reset();
            firstTime = true;
            startGame();
        }

        function reset() {
            player = opponent = undefined;
            playerSlot.empty();
            opponentSlot.empty();
            comment.empty();
            $.each(player_arr, function (i, player) {
                player.pwr.attack = player.orig.ap;
                player.health = player.orig.hp;
            });
            playerChoose.empty();
            battleground.empty();
            main.empty();
        }

    }


    var myGame = new StarWarsRPG();
    myGame.play();


});