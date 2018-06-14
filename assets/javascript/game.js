$(function () {

    var StarWarsRPG = function () {

        var player_arr = [
            {
                name: 'Luke Skywalker',
                img: 'http://placehold.it/150x150',
                cont: undefined,
                health: 250,
                pwr: { powerBase: 5, attack: 5, counter: 10 }
            },
            {
                name: 'Chewbacca',
                img: 'http://placehold.it/150x150',
                cont: undefined,
                health: 90,
                pwr: { powerBase: 4, attack: 4, counter: 8 }
            },
            {
                name: 'Darth Vader',
                img: 'http://placehold.it/150x150',
                cont: undefined,
                health: 250,
                pwr: { powerBase: 15, attack: 15, counter: 25 }
            },
            {
                name: 'The Emperor',
                img: 'http://placehold.it/150x150',
                cont: undefined,
                health: 300,
                pwr: { powerBase: 20, attack: 20, counter: 40 }
            },
        ];

        var player;
        var opponent;

        var main = $('#game-container');
        var playerChoose = $('<div>');
        var battleground = $('<div>');
        var playerSlot = $('<div>');
        var opponentSlot = $('<div>');
        var comment = $('<div>');

        var attack_btn = $('<btn>');
        var playAgain_btn = $('<btn>');
        var restart_btn = $('<btn>');


        this.play = function () {
            console.log('ready');
            $.each(player_arr, createPlayer);
            //
            playerChoose.addClass("playerChoose");
            battleground.addClass("battleground");
            comment.addClass('commentArea');
            comment.text('This is commentary text.');
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
            main.append(playerChoose);
            startGame();
        }

        function createPlayer(i, player) {
            player.pNum = i;
            var newDiv = $('<div>');
            newDiv.css("background", "url(" + player.img + ")");
            newDiv.addClass('player');
            newDiv.attr('id', 'p' + i);
            //
            var healthDiv = $('<div>');
            healthDiv.addClass('health');
            healthDiv.text(player.health);
            //
            var nameDiv = $('<div>');
            nameDiv.addClass('playerName');
            nameDiv.text(player.name);
            //
            newDiv.append(healthDiv);
            newDiv.append(nameDiv);
            newDiv.on("click", playerSelect);
            player.cont = newDiv;
            //
            playerChoose.append(player.cont);
        }

        function startGame() {
            playerChoose.removeClass('d-none');
        }

        function playerSelect(e) {
            console.log($(this)[0].id);
            if (player == undefined) {
                player = player_arr[$(this)[0].id.substr(-1)];
                playerSlot.append($(this));
                console.log(player);
            } else if (opponent == undefined) {
                opponent = player_arr[$(this)[0].id.substr(-1)];
                opponentSlot.append($(this));
                console.log(opponent);
                beginAttack();
            }
        }

        function beginAttack() {
            battleground.append(playerSlot);
            battleground.append(attack_btn);
            attack_btn.on("click", attack);
            battleground.append(opponentSlot);
            battleground.append(comment);
            playerChoose.addClass('d-none');
            main.append(battleground);
        }

        function attack(e) {
            // PLAYER ATTACKS
            opponent.health -= player.pwr.attack;
            // OPPONENT COUNTERATTACKS
            player.health -= opponent.pwr.counter;
            //
            healthUpdate(player);
            healthUpdate(opponent);
            //
            if (player.health <= 0) {
                //YOU LOSE
                commentaryUpdate('<p>You have been defeated ... GAME OVER!!</p>');
            } else if (opponent.health <= 0) {
                //YOU WIN
                commentaryUpdate('<p>You have defeated '+ opponent.name+ '. Choose another opponent.</p');
                attack_btn.replaceWith(playAgain_btn);
                playAgain_btn.on("click",playAgain);
            } else {
                commentaryUpdate();
                player.pwr.attack += player.pwr.powerBase;
            }
        }

        function healthUpdate(player) {
            var pID = "#p" + player.pNum;
            $(pID).find('.health').text(player.health);
        }

        function commentaryUpdate(str) {
            if (str == undefined) {
                comment.html('<p>You attacked ' + opponent.name + ' for ' + player.pwr.attack + ' damage.</p><p>' + opponent.name + ' attacked you back for ' + opponent.pwr.counter + ' damage.</p >');
            }else{
                comment.html(str);
            }
        }

        function playAgain(){
            opponent = undefined;
            commentaryUpdate('');
            opponentSlot.empty();
            battleground.empty();
            battleground.remove();
            startGame();
        }

    }


    var myGame = new StarWarsRPG();
    myGame.play();


});