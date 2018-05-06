
document.getElementById('go').addEventListener('click',startMove);

function Station(name, posX, posY) {
    this.name = name;
    this.posX = posX;
    this.posY = posY;
}

var aDotsPosition=[
    new Station("a0", '61px' , '107px'),
    new Station("a1", '115px' , '101px'),
    new Station("ac", '168px' , '96px'),
    new Station("a2", '206px' , '91px'),
    new Station("ab", '241px' , '87px'),
    new Station("a3", '288px' , '80px'),
    new Station("a4", '337px' , '75px'),

];


var cDotsPosition=[
    new Station("c0", '122px' , '49px'),
    new Station("c1", '140px' , '67px'),
    new Station("ac", '168px' , '96px'),
    new Station("bc", '218px' , '146px'),
    new Station("c3", '251px' , '176px'),
    new Station("c4", '293px' , '219px'),
];

var bDotsPosition=[
    new Station("b0", '190px' , '223px'),
    new Station("b1", '203px' , '187px'),
    new Station("ab", '240px' , '87px'),
    new Station("bc", '218px' , '146px'),
    new Station("b3", '253px' , '51px'),
    new Station("b4", '266px' , '16px'),
];



function startMove() {
    document.getElementById('go').disabled=true;
    var aWay=['a0','a1','ac','a2','ab','a3','a4'];
    var bWay=['b0','b1','bc','ab','b3','b4'];
    var cWay=['c0','c1','ac','bc','c3','c4'];
    var aPassengersCount=document.getElementById('aTrainCount').value || 10;
    var cPassengersCount=document.getElementById('bTrainCount').value || 12;
    var bPassengersCount=document.getElementById('cTrainCount').value || 20;
    var aRealWay=document.getElementById('aTrainStation').value || 'a0';
    var bRealWay=document.getElementById('bTrainStation').value || 'b0';
    var cRealWay=document.getElementById('cTrainStation').value || 'c0';
    console.log(aRealWay,bRealWay,cRealWay);
    var startPointA=aWay.indexOf(aRealWay);
    var startPointB=bWay.indexOf(bRealWay);
    var startPointC=cWay.indexOf(cRealWay);
    console.log(startPointA,startPointB,startPointC);
    if (startPointA!=-1 && startPointB!=-1 && startPointC!=-1) {
        var moveInterval=setInterval(function() {
            // var a=startCheck(aWay,startPointA);
            var a=checkWay(aWay,startPointA+1);
            var b=checkWay(bWay,startPointB+1);
            var c=checkWay(cWay,startPointC+1);
            if (a==c) {
                if (cRealWay==b) {
                    startPointA++;
                    animationMove(a,null,null);
                }
                else {
                    if (aPassengersCount>= cPassengersCount) {
                        startPointA++;
                        startPointB++;
                        animationMove(a,b,null);
                    }
                else {
                        startPointC++;
                        startPointB++;
                        animationMove(null,b,c);
                    }

                }

            }
            else if (b==c) {
                if (bRealWay==a) {
                    startPointC++;
                    animationMove(null,null,c);
                }
                else {
                    if (bPassengersCount>=cPassengersCount) {
                        startPointB++;
                        startPointA++;
                        animationMove(a,b,null);
                    }
                else {
                        startPointC++;
                        startPointA++;
                        animationMove(a,null,c);
                    }
                }

            }

            else if (a==b) {
                //console.log('b--a');
                if (aRealWay==b) {
                    startPointB++;
                    animationMove(null,b,null);
                }
                else {
                    if (bPassengersCount>=aPassengersCount) {
                        startPointB++;
                        startPointC++;
                        animationMove(null,b,c);
                    }
                else {
                        startPointC++;
                        startPointA++;
                        animationMove(a,null,c);
                    }
                }

            }
            else {
                startPointA++;
                startPointB++;
                startPointC++;
                animationMove(a,b,c);
            }
            aRealWay=a;
            bRealWay=b;
            cRealWay=c;
            //console.log(aRealWay,bRealWay,cRealWay);
        },2000)
    }
    else {
        alert('Неправильно введены данные')
    }

}

function animationMove(a,b,c) {
    //console.log(a,b,c);
    aDotsPosition.map(function (item) {
        if (item.name==a) {
            document.querySelector('.a-train').style.top=item.posY;
            document.querySelector('.a-train').style.left=item.posX;
        }
    });
    bDotsPosition.map(function (item) {
        if (item.name==b) {
            document.querySelector('.b-train').style.top=item.posY;
            document.querySelector('.b-train').style.left=item.posX;
        }
    });
    cDotsPosition.map(function (item) {
        if (item.name == c) {
            document.querySelector('.c-train').style.top = item.posY;
            document.querySelector('.c-train').style.left = item.posX;
        }
    })
}



function checkWay(way,point) {
    var station=way[point%way.length];
    if (way[way.length-1-point%way.length]==way[0]) {
        way.reverse()
    }
    return station;
}


