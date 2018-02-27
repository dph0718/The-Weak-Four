//To Do:
//  [x]     select fighter
//  [x]     remove fighter from array, 
//  [x]     pop him in arena.
//  [x]     highlight p2 once p2 is chosen.
//  [x]     select opponent, remove from array, pop on arena
//  [x]     add logic for win, lose
//  [x]     replace with skull when defeated.
//  [ ]     put .fighterName under <img> within .fighterCard, flex display as column. see if that works.
//  [x]     HTML: Font link: Link to "metal mania" instead of "bungee inline"
//  [x]       make wins increase just once per opponent defeat.
//  [x]      attack button faded when "tired"
//  [x]      math.floor the attack amounts.
//  [ ]    style the gameMessage a little better. no, it's the .boom1, not .gameMessage
//--[x]---------------For these, the p1.hit(p2) is being called twice.... debug that.
//  [x]           find out why when blanka attacks and damage < 100, it still defeats.
//  [x]           and why it doesn't say you defeated everyone -- because wins increases by 2 each time???
//  [x]         what the hell is the health bar doing? it goes down when they dodge. debug the health bar or the ##'s of the hit function.

//Object constructor for the Fighter object type
var Fighter = function (name, attack, defense, hp) {
    this.name = name;
    this.attack = attack;
    this.defense = defense;
    this.hp = hp;
    this.defeated = false;
    this.hpOrig = this.hp;
}

//randomNum function
function randomNum(x) {
    return Math.floor(Math.random() * x);
}

//calculates the hit strength based on the attacker's attack value
function hitStrength(attacker) {
    return Math.floor(attacker.attack) - Math.floor((randomNum(6) * 0.1 * attacker.attack));
}

//calculates the block strength based on the defender's defense value
function blockStrength(defender) {
    return Math.floor(defender.defense) - Math.floor((randomNum(6) * 0.1 * defender.defense));
}

//subtracts from the defender's hp, based on calculated hit strength & block strength
//also adds defense xp and attack xp to user (but not opponent)
//includes some punch, grunt, lightsaber, and hubcap sounds
//Hit code===================================================================================================================
Fighter.prototype.hit = function (defender) {
    var hitAmount = hitStrength(this);
    var blockAmount = blockStrength(defender);
    var hitSound;
    var attackSound;
    if (hitAmount > blockAmount) {
        var damage = (hitAmount - blockAmount);
        defender.hp -= damage;
        if (this == p1) {
            this.attack += damage / 8;
        }
        console.log("p1 attack: " + p1.attack);
        console.log("p2 attack: " + p2.attack);
        if (defender == p1) {
            defender.defense += damage / 5;
        }
        console.log("p1 defense: " + p1.defense);
        console.log("p2 defense: " + p2.defense);
        if (this == vader) {
            attackSound = new Audio('./assets/sounds/lightsaber.mp3');
        } else {
            attackSound = new Audio('./assets/sounds/punch1.mp3');
        }
        hitSound = new Audio('./assets/sounds/grunt.mp3');
        attackSound.play();
        setTimeout(function () { hitSound.play() }, 100);
        //alert the user about how much damage was done, change health bar
        $('.boom1').html(this.name + " attacked " + defender.name + " for " + (hitAmount - blockAmount) + ' damage!');
        $('.healthbar1').width(300 * (p1.hp / p1.hpOrig) + 'px');
        $('.healthbar2').width(300 * (p2.hp / p2.hpOrig) + 'px');
        var defeatSound;
        var winSound;
        var loseSound;
        if (p1.hp <= 0) {
            if (p1 == tire) {
                defeatSound = new Audio('./assets/sounds/hubcap.mp3');
                defeatSound.play();
            }
            if (p2 == vader) {
                setTimeout(function () {
                    loseSound = new Audio('./assets/sounds/vader.mp3');
                    loseSound.play();

                }, 1000)
            } else {
                loseSound = new Audio('./assets/sounds/youlose.mp3');
                loseSound.play();
            }
            setTimeout(function () {
                $('.boom1').html("You lose.");
            }, 2000);
        } else if (p2.hp <= 0) {
            wins++;
            if (p2 == tire) {
                defeatSound = new Audio('./assets/sounds/hubcap.mp3');
                defeatSound.play();
            } if (p1 == vader) {
                setTimeout(function () {
                    loseSound = new Audio('./assets/sounds/vader.mp3');
                    loseSound.play();
                }, 1000)
            }
            setTimeout(function () {
                $('.boom1').html("You defeated " + p2.name + "!");
                p2.defeated = true;
                p2Selected = false;
                $('.fighterName').html("");
                $('.gameMessage').html("Choose your next Opponent");
                popPics();
                enableSelect();
            }, 2000);
            setTimeout(function () {
                document.querySelector('.gameMessage').scrollIntoView({
                    behavior: 'smooth'
                })
                $('.boom1').html("");
                if (wins >= 5) {
                    $('.gameMessage').html("You have defeated everyone.");
                    var ahhSound = new Audio('./assets/sounds/ahh.mp3');
                    ahhSound.play();
                }
            }, 4000);
        }
        console.log("attacker: " + this.hp, "defender: " + defender.hp, defender.hp / 100);
    } else {
        if (this == vader) {
            attackSound = new Audio('./assets/sounds/lightsaber.mp3');
        } else {
            attackSound = new Audio('./assets/sounds/swoosh.mp3');
        }
        attackSound.play();
        console.log("hit: " + hitAmount);
        console.log("block: " + blockAmount);
        $('.boom1').html(defender.name + " dodged " + this.name + "'s attack!");
        return;
    }
}
//hit code end================================================================================================================

//list of the fighters
var vader = new Fighter("Darth Vader", 50, 20, 100);
var blanka = new Fighter("Blanka", 45, 15, 150);
var wahlberg = new Fighter("Mark Wahlberg", 22, 20, 100);
var tire = new Fighter("Big-O", 16, 15, 200);
var walterWhite = new Fighter("Walter White", 30, 20, 70);
var subzero = new Fighter("Sub-Zero", 30, 20, 100);

//assigning their pictures
vader.pic = 'url(./assets/images/vader.png)';
blanka.pic = 'url(./assets/images/blanka.png)';
tire.pic = 'url(./assets/images/tire.png)';
wahlberg.pic = 'url(./assets/images/wahlberg.png)';
walterWhite.pic = 'url(./assets/images/walter-white.png)';
subzero.pic = 'url(./assets/images/sub-zero.png)';

vader.photo = './assets/images/vader.png';
blanka.photo = './assets/images/blanka.png';
tire.photo = './assets/images/tire.png';
wahlberg.photo = './assets/images/wahlberg.png';
walterWhite.photo = './assets/images/walter-white.png';
subzero.photo = './assets/images/sub-zero.png';

//array of the fighers
fighterArray = [vader, blanka, wahlberg, tire, walterWhite, subzero]

//declares variables for storing p1 and opponent objects. And the 'win' counter.
var p1;
var p2;
var wins = 0;

//makes the fighter roster from the fighter array, replaces with skull if they've been defeated.
function popPics() {
    var i = 0;
    $('.fighterPic').each(function () {
        this.index = i;
        if (fighterArray[this.index].defeated == false) {
            $(this).attr('src', fighterArray[i].photo);
        } else if (fighterArray[this.index].defeated == true) {
            $(this).attr('src', './assets/images/skull.png');
        }
        // $(this).parent().append("<h2 class='row'>" + fighterArray[i].name + "</h2>");
        i++;
    })
    var i = 0;
    $('.fighterName').each(function () {
        $(this).append('<h2>' + fighterArray[i].name + '</h2>');
        i++;
    })
}

//variables for determining if the user has selected a player and an opponent
var p1Selected = false;
var p2Selected = false;

//logic for player selection, opponent selection, removes selected opponent from array of available opponents, puts the healthbars on the arena
function enableSelect() {
    $('.fighterPic').on('click', function () {
        if (p2Selected == true) {
            return;
        } else if (p1Selected == false) {
            p1 = fighterArray[this.index];
            $('.gameMessage').text("Choose your Opponent");
            p1Selected = true;
            fighterArray.splice(this.index, 1);
            $('.fighterCard').last().remove();
            $('.fighterName').last().remove();
            $('.fighterName').html("");
            popPics();
        } else if (p1Selected == true) {
            if (fighterArray[this.index].defeated == false) {
                p2 = fighterArray[this.index];
                $(this).css('opacity', '0.7');
                $(this).parent().css('border', '3px orange solid');
                p2Selected = true;
                $('.healthbar2').css('width', '300px');
                $('.name1').html(p1.name);
                $('.name2').html(p2.name);
                $('.fighter1').attr('src', p1.photo);
                $('.fighter2').attr('src', p2.photo);
                $('.gameMessage').text("Begin the Battle");
                $('.arena').css('display', 'flex');
                $('.arena').css('background-image', 'url("./assets/images/background.png")');
                setTimeout(function () {
                    document.querySelector('.arena').scrollIntoView({
                        behavior: 'smooth'
                    })
                }, 1000)
            } else if (fighterArray[this.index].defeated == true) {
                $('.gameMessage').html(fighterArray[this.index].name + " has been defeated.");
            }
        }
    })
}

//hides the arena...
function hideArena() {
    $('.arena').css('display', 'none');
}

//times the attack/counterattack; gussies up the attack button to reflect if user can attack
function enableAttack() {
    var tired = false;
    $('#attack').click(function () {
        if (p1.hp > 0 && p2.hp > 0 && tired == false) {
            p1.hit(p2);
            tired = true;
            $('#attack').css('border', '4px gray inset').css('background-blend-mode', "multiply");
            if (p2.hp > 0) {
                setTimeout(function () {
                    p2.hit(p1);
                    $('#attack').css('border', '4px gray outset').css('background-blend-mode', "initial");
                    tired = false;
                }, 1000);
            } else if (p2.hp <= 0) {
                tired = false;
                $('#attack').css('border', '4px gray outset').css('background-blend-mode', "initial");
            }
        } else {
            return;
        }
    })
}

//puts the fighter pictures up on window load. and lets them be clicked.
window.onload = function () {
    window.scrollTo(0, 0);

    popPics();
    enableSelect();
    hideArena();
    enableAttack();
}