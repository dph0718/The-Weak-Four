//To Do:
//  [x]     select fighter
//  [x]     remove fighter from array, 
//  [x]     pop him in arena.
//  [x]     highlight p2 once p2 is chosen.
//  [x]     select opponent, remove from array, pop on arena
//  [x]     add logic for win, lose
//  [x]     replace with skull when defeated.
//  [ ]     put .fighterName under <img> within .fighterCard, flex display as column. see if that works.
//  [ ]     HTML: Font link: Link to "metal mania" instead of "bungee inline"
// []       find out why when blanka attacks and damage < 100, it still defeats.
// []       and why it doesn't say you defeated everyone
// []       make wins increase just once per opponent defeat.


//Object constructor for the Fighter object type
var Fighter = function (name, attack, defense, hp) {
    this.name = name;
    this.attack = attack;
    this.defense = defense;
    this.hp = hp;
    this.defeated = false;
}

//randomNum function
function randomNum(x) {
    return Math.floor(Math.random() * x);
}

//calculates the hit strength based on the attacker's attack value
function hitStrength(attacker) {
    return attacker.attack - Math.floor((randomNum(6) * 0.1 * attacker.attack));
}

//calculates the block strength based on the defender's defense value
function blockStrength(defender) {
    return defender.defense - Math.floor((randomNum(6) * 0.1 * defender.defense));
}

//subtracts from the defender's hp, based on calculated hit strength & block strength
//also adds defense xp to defender and attack xp to attacker
//Hit code===================================================================================================================
Fighter.prototype.hit = function (defender) {
    var hitAmount = hitStrength(this);
    var blockAmount = blockStrength(defender);

    if (hitAmount > blockAmount) {
        console.log(defender.name + " hp-before: " + defender.hp);
        defender.hp -= (hitAmount - blockAmount);
        this.attack += hitAmount / 5;
        defender.defense += blockAmount / 5;
        console.log("hit: " + hitAmount);
        console.log("block: " + blockAmount);
        console.log(defender.name + " hp-after: " + defender.hp);
        //alert the user about how much damage was done, change health bar
        $('.boom1').html(this.name + " attacked " + defender.name + " for " + (hitAmount - blockAmount) + ' damage!');
        $('.healthbar1').width(300 * (p1.hp / 100) + 'px');
        $('.healthbar2').width(300 * (p2.hp / 100) + 'px');
        if (p1.hp < 0) {
            var lose = new Audio('./assets/sounds/youlose.mp3');
            lose.play();
            setTimeout(function () {
                $('.boom1').html("You lose.");
            }, 2000);
        } else if (p2.hp < 0) {
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
                window.scrollTo(0, 0);
                if(wins >= 5){
                    $('.gameMessage').html("You have defeated everyone.");
                }
            }, 4000);
        }
        console.log("p1: " + p1.hp, "p2: " + p2.hp, p2.hp / 100);
    } else {
        console.log("hit: " + hitAmount);
        console.log("block: " + blockAmount);
        $('.boom1').html(defender.name + " dodged " + this.name + "'s attack!");
        return;
    }
}
//hit code end================================================================================================================

//list of the fighters
var vader = new Fighter("Darth Vader", 10, 10, 100);
var blanka = new Fighter("Blanka", 100, 5, 100);
var wahlberg = new Fighter("Mark Wahlberg", 10, 15, 100);
var tire = new Fighter("Big-O", 10, 10, 100);
var walterWhite = new Fighter("Walter White", 10, 10, 100, );
var subzero = new Fighter("Sub-Zero", 10, 10, 100);
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

var p1Selected = false;
var p2Selected = false;

Fighter.prototype.select = function () {
    if (p1selected == false) {
        p1 = this;
        $('.gameMessage').html("Choose your Opponent");
        p1Selected = true;
        console.log(p1);
    } else if (p1Selected == true) {
        p2 = this;
        p2Selected = true;
    }
}

function enableSelect() {
    $('.fighterPic').on('click', function () {
        if (p2Selected == true) {
            console.log("nothing else is gonna happen. except this.");
            return;
        } else if (p1Selected == false) {
            p1 = fighterArray[this.index];
            console.log(this.index);
            console.log(p1.name);
            $('.gameMessage').text("Choose your Opponent");
            p1Selected = true;
            fighterArray.splice(this.index, 1);
            //put in <divs> for the arena space: health bar/hp, p1 picture, p2 picture.
            //reassign the div's <img src within this function
            // or create a duplicate fighterPic element?? appendTo()? append()?
            $('.fighterCard').last().remove();
            $('.fighterName').last().remove();
            $('.fighterName').html("");
            popPics();
        } else if (p1Selected == true) {
            if (fighterArray[this.index].defeated == false) {
                p2 = fighterArray[this.index];
                console.log(p2.name);
                $(this).css('opacity', '0.7');
                $(this).parent().css('border', '3px orange solid');
                p2Selected = true;
                $('.healthbar2').width('300px');
                $('.name1').html(p1.name);
                $('.name2').html(p2.name);
                $('.fighter1').attr('src', p1.photo);
                $('.fighter2').attr('src', p2.photo);
                $('.gameMessage').text("Begin the Battle");
                $('.arena').css('visibility', 'visible');
                $('.arena').css('background-image', 'url("./assets/images/background.png")');
                enableAttack();
            } else if (fighterArray[this.index].defeated == true) {
                $('.gameMessage').html(fighterArray[this.index].name + " has been defeated.");
            }

        }
    })
}

function hideArena() {
    $('.arena').css('visibility', 'hidden');
}
function enableAttack() {
    var tired = false;
    $('#attack').click(function () {
        if (p1.hp > 0 && p2.hp > 0 && tired == false) {
            p1.hit(p2);
            tired = true;
            if (p2.hp > 0) {
                setTimeout(function () {
                    console.log("now, counterattack:");
                    p2.hit(p1);
                    tired = false;
                }, 2000);

            }
        } else {
            return;
        }
    })
    document.onkeydown = function() {
        console.log(wins);
    }
}

//puts the fighter pictures up on window load. and lets them be clicked.
window.onload = function () {
    popPics();
    enableSelect();
    hideArena();
    enableAttack();
}


//add to the hit method:
    //p2selected = false, p2 or p1.defeated = true, re-pop Pics, re-enable select function, 