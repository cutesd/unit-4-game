$(function () {

    var StarWarsRPG = function () {

        var player;
        var opponent;
        var firstTime = true;

        // Player Object
        var player_arr = [
            {
                name: 'Luke Skywalker',
                img: 'assets/images/luke.jpg',
                sndName: 'luke',
                cont: undefined,
                health: 120,
                pwr: { powerBase: 8, attack: 8, counter: 10 }
            },
            {
                name: 'Chewbacca',
                img: 'assets/images/chewy.jpg',
                sndName: 'chewy',
                cont: undefined,
                health: 90,
                pwr: { powerBase: 4, attack: 4, counter: 5 }
            },
            {
                name: 'Darth Vader',
                img: 'assets/images/darth.jpg',
                sndName: 'darth',
                cont: undefined,
                health: 150,
                pwr: { powerBase: 10, attack: 10, counter: 20 }
            },
            {
                name: 'Darth Sidious',
                img: 'assets/images/emperor.jpg',
                sndName: 'emperor',
                cont: undefined,
                health: 180,
                pwr: { powerBase: 12, attack: 12, counter: 25 }
            }//,
            // {
            //     name: 'Boba Fett',
            //     img: 'assets/images/boba.jpg',
            //     sndName: 'boba',
            //     cont: undefined,
            //     health: 180,
            //     pwr: { powerBase: 12, attack: 12, counter: 25 }
            // },
            // {
            //     name: 'Yoda',
            //     img: 'assets/images/yoda.jpg',
            //     sndName: 'yoda',
            //     cont: undefined,
            //     health: 350,
            //     pwr: { powerBase: 30, attack: 30, counter: 50 }
            // },
            // {
            //     name: 'Jabba the Hutt',
            //     img: 'assets/images/jabba.jpg',
            //     sndName: 'jabba',
            //     cont: undefined,
            //     health: 180,
            //     pwr: { powerBase: 12, attack: 12, counter: 25 }
            // },
            // {
            //     name: 'Leia',
            //     img: 'assets/images/leia.jpg',
            //     sndName: 'leia',
            //     cont: undefined,
            //     health: 180,
            //     pwr: { powerBase: 12, attack: 12, counter: 25 }
            // },
            // {
            //     name: 'Ewok',
            //     img: 'assets/images/ewok.jpg',
            //     sndName: 'ewok',
            //     cont: undefined,
            //     health: 180,
            //     pwr: { powerBase: 12, attack: 12, counter: 25 }
            // },
            // {
            //     name: 'R2D2',
            //     img: 'assets/images/R2.jpg',
            //     sndName: 'R2',
            //     cont: undefined,
            //     health: 180,
            //     pwr: { powerBase: 12, attack: 12, counter: 25 }
            // },
            // {
            //     name: 'Obi Wan Kenobe',
            //     img: 'assets/images/obi.jpg',
            //     sndName: 'obi',
            //     cont: undefined,
            //     health: 150,
            //     pwr: { powerBase: 10, attack: 10, counter: 20 }
            // },
            // {
            //     name: 'Storm Trooper',
            //     img: 'assets/images/trooper.jpg',
            //     sndName: 'trooper',
            //     cont: undefined,
            //     health: 180,
            //     pwr: { powerBase: 12, attack: 12, counter: 25 }
            // }
        ];

        // Content Containers
        var main = $('#game-container');
        var opener = $('<div>');
        var instr = $('<h1>');
        var playerChoose = $('<div>');
        var battleground = $('<div>');
        var playerSlot = $('<div>');
        var opponentSlot = $('<div>');
        var comment = $('<div>');

        // Button Containers
        var attack_btn = $('<btn>');
        var playAgain_btn = $('<btn>');
        var restart_btn = $('<btn>');

        // Audio
        var audio = {};
        var curr_snd;

        this.play = init;
        this.skip = function () {
            if (firstTime) {
                opener.remove();
                startGame();
            }
        }

        //===============  SET UP & OPENING SCREEN ==================== //

        // Initializes Game
        function init() {
            // Load Game Sounds
            addSnd("main-title");
            addSnd("win");
            addSnd("lose");
            addSnd("complete");
            for (var i = 1; i <= 4; i++) {
                addSnd("saber" + i);
            }
            // 
            playerChoose.addClass("playerChoose");
            battleground.addClass("battleground");
            comment.addClass('commentArea');
            //
            playerSlot.addClass("playerSlot");
            opponentSlot.addClass("playerSlot");
            //
            attack_btn.addClass('btn btn-lg btn-danger attack-btn');
            attack_btn.text('ATTACK');
            //
            playAgain_btn.addClass('btn btn-lg btn-info playAgain-btn');
            playAgain_btn.text('Play Again');
            //
            restart_btn.addClass('btn btn-lg btn-warning');
            restart_btn.text('Restart');
            //
            opening();
        }

        // Opening screen/animation
        function opening() {
            opener.addClass('opener');
            var img = $('<img>');
            img.addClass('img-fluid');
            img.attr('src', 'assets/images/starwars-title.png')
            opener.append(img);
            //
            var instr = $('<h1>');
            instr.addClass('open-instr');
            instr.text('Click HERE to begin.');
            opener.append(instr);
            //
            var note = $('<h4>');
            note.text('** turn on your speakers **');
            opener.append(note);
            // 
            var btn = $('<div>');
            btn.addClass('open-btn');
            opener.append(btn);
            //
            main.append(opener);
            //
            btn.on("click", function () {
                img.animate({
                    width: "0px",
                    height: "0px",
                    left: "50%",
                    bottom: "-40%"
                }, 15000, 'easeInCirc', function () {
                    opener.remove();
                    startGame();
                });
                playSnd("main-title");
                btn.remove();
                note.remove();
                instr.remove();
            });
        }

        // Start the Game
        function startGame() {
            if (firstTime) {
                // Create all Players
                $.each(player_arr, buildPlayer);
                instrUpdate('Choose Your Player');
                main.append(instr);
                main.append(playerChoose);
                firstTime = !firstTime;
            }
            // Display the Player Options
            playerChoose.removeClass('d-none');
        }

        //===============  PLAYER CREATION & SELECTION  ==================== //

        // Function to Create all Players
        function buildPlayer(i, player) {
            // Player number
            player.pNum = i;
            // Original player settings for resets
            player.orig = { ap: player.pwr.attack, hp: player.health };
            // Adding the player sound
            addSnd(player.sndName);

            // Player Div 
            var playerDiv = $('<div>');
            playerDiv.addClass('player');
            playerDiv.attr('id', 'p' + i);

            // Picture
            var pic = $('<img>');
            pic.attr('src', player.img);

            // Health
            var healthDiv = $('<div>');
            healthDiv.addClass('health');
            // heart
            var heart = $('<div>');
            heart.addClass('heart-shape');
            healthDiv.append(heart);
            // health points #
            var hp = $('<span>');
            hp.addClass('hp');
            hp.text(player.health);
            healthDiv.append(hp);
            // health points text
            var span = $('<span>');
            span.html('&nbsp;Health Points');
            healthDiv.append(span);

            // Name
            var nameDiv = $('<div>');
            nameDiv.addClass('name');
            nameDiv.text(player.name);
            //
            playerDiv.append(pic);
            playerDiv.append(healthDiv);
            playerDiv.append(nameDiv);
            playerDiv.on("click", playerSelect);
            player.cont = playerDiv;
            //
            playerChoose.append(player.cont);
        }

        // CHOOSE PLAYER & OPPONENT
        function playerSelect(e) {
            if (player == undefined) {
                player = player_arr[$(this)[0].id.substr(1)];
                playerSlot.append($(this));
                instrUpdate('Choose Your Opponent');
                playSnd(player.sndName);
            } else if (opponent == undefined) {
                opponent = player_arr[$(this)[0].id.substr(1)];
                opponentSlot.append($(this));
                playSnd(opponent.sndName);
                beginAttack();
            }
        }

        //===============  SOUND  ==================== //

        // Creating sound objects
        function addSnd(str) {
            audio[str] = new Audio();
            audio[str].src = "assets/snds/" + str + ".mp3"
        }

        // Play Sound
        function playSnd(str) {
            stopSnd();
            curr_snd = audio[str];
            curr_snd.play();
        }

        // Stop Sound
        function stopSnd() {
            if (curr_snd !== undefined) {
                curr_snd.pause(); // Stop playing
                curr_snd.currentTime = 0; // Reset time
            }
        }

        //===============  BATTLE  ==================== //

        // Turn on Battleground
        function beginAttack() {
            //
            instrUpdate(' ');
            //
            battleground.append(playerSlot);
            // Attack Button
            battleground.append(attack_btn);
            attack_btn.on("click", attack);
            //
            battleground.append(opponentSlot);
            // Turn off player choice array
            playerChoose.addClass('d-none');
            main.append(battleground);
        }

        // On Attack btn press
        function attack(e) {
            // PLAYER ATTACKS
            opponent.health -= player.pwr.attack;
            healthUpdate(opponent);

            // YOU BEAT OPPONENT
            if (opponent.health <= 0) {
                // YOU BEAT ALL OPPONENTS
                if ($(playerChoose).children().length === 0) {
                    playSnd("complete");
                    reset();
                    instrUpdate('You Won!  GAME OVER!!');
                    main.append(instr);
                    restart_btn.addClass('restart-btn');
                    instr.append(restart_btn);
                    restart_btn.on("click", restart);
                    return;
                }
                // YOU WIN
                playSnd("win");
                commentaryUpdate('<p>You have defeated ' + opponent.name + '. Choose another opponent.</p');
                player.pwr.attack += player.pwr.powerBase;
                opponentSlot.find('.name').css('background-color', '#CC0000');
                attack_btn.replaceWith(playAgain_btn);
                playAgain_btn.on("click", playAgain);
                return;
            }

            // OPPONENT COUNTERATTACKS
            player.health -= opponent.pwr.counter;
            //
            healthUpdate(player);

            // YOU LOSE
            if (player.health <= 0) {
                playSnd("lose");
                commentaryUpdate('<p>You have been defeated ... GAME OVER!!</p>');
                playerSlot.find('.name').css('background-color', '#CC0000');
                attack_btn.replaceWith(restart_btn);
                restart_btn.on("click", restart);
                return;
            }

            // BATTLE CONTINUES
            var rnd = Math.floor(Math.random() * 4) + 1;
            playSnd("saber" + rnd);
            commentaryUpdate();
            player.pwr.attack += player.pwr.powerBase;
        }

        // ===============  DISPLAYS  ==================== //

        function healthUpdate(player) {
            var pID = "#p" + player.pNum;
            $(pID).find('.hp').text(player.health);
        }

        function commentaryUpdate(str) {
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

        //===============  BUTTONS  ==================== //

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
            restart_btn.removeClass('restart-btn');
            firstTime = true;
            startGame();
        }

        // ===============  RESET  ==================== //

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

    // SKIP BUTTON --- skips opening scene
    $(document).on('keypress', function (e) {
        if (e.key === "S") {
            myGame.skip();
        }
    });


});