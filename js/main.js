


class Station {
    constructor(name, posX, posY) {
        this.name = name;
        this.posX = posX;
        this.posY = posY;
    }

}

let aDotsPosition=[
    new Station("a0", '61px' , '107px'),
    new Station("a1", '115px' , '101px'),
    new Station("ac", '168px' , '96px'),
    new Station("a2", '206px' , '91px'),
    new Station("ab", '241px' , '87px'),
    new Station("a3", '288px' , '80px'),
    new Station("a4", '337px' , '75px'),

];


let cDotsPosition=[
    new Station("c0", '122px' , '49px'),
    new Station("c1", '140px' , '67px'),
    new Station("ac", '168px' , '96px'),
    new Station("bc", '218px' , '146px'),
    new Station("c2", '251px' , '176px'),
    new Station("c3", '293px' , '219px'),
];

let bDotsPosition=[
    new Station("b0", '190px' , '223px'),
    new Station("b1", '203px' , '187px'),
    new Station("ab", '240px' , '87px'),
    new Station("bc", '218px' , '146px'),
    new Station("b2", '253px' , '51px'),
    new Station("b3", '266px' , '16px'),
];

let trainPassengers={
    a:0,
    b:0,
    c:0,
};

let startPoints={
    a:0,
    b:0,
    c:0,
};

let moveInterval;

 let animationMove=(a,b,c)=> {

    aDotsPosition.map((item)=> {
        if (item.name==a) {
            document.querySelector('.a-train').style.top=item.posY;
            document.querySelector('.a-train').style.left=item.posX;
        }
    });
    bDotsPosition.map((item) =>{
        if (item.name==b) {
            document.querySelector('.b-train').style.top=item.posY;
            document.querySelector('.b-train').style.left=item.posX;
        }
    });
    cDotsPosition.map((item)=> {
        if (item.name == c) {
            document.querySelector('.c-train').style.top = item.posY;
            document.querySelector('.c-train').style.left = item.posX;
        }
    })
};



 let checkWay=(way,point)=> {
    let station=way[point%way.length];
    if (way[way.length-1-point%way.length]==way[0]) {
        way.reverse()
    }
    return station;
}


 let startMove = () => {
    
    document.getElementById('go').disabled=true;
    let aWay=['a0','a1','ac','a2','ab','a3','a4'];
    let bWay=['b0','b1','bc','ab','b2','b3'];
    let cWay=['c0','c1','ac','bc','c2','c3'];
    trainPassengers.a=document.getElementById('aTrainCount').value || 10;
    trainPassengers.b=document.getElementById('bTrainCount').value || 12;
    trainPassengers.c=document.getElementById('cTrainCount').value || 20;
    let aRealWay=document.getElementById('aTrainStation').value || 'a0';
    let bRealWay=document.getElementById('bTrainStation').value || 'b0';
    let cRealWay=document.getElementById('cTrainStation').value || 'c0';

    startPoints.a=aWay.indexOf(aRealWay);
    startPoints.b=bWay.indexOf(bRealWay);
    startPoints.c=cWay.indexOf(cRealWay);
    if ((startPoints.a!=-1 && startPoints.b!=-1 && startPoints.c!=-1) && (aRealWay!=bRealWay && bRealWay!=cRealWay && aRealWay!=cRealWay)) {
        animationMove(aRealWay,bRealWay,cRealWay);
        moveInterval=setInterval(function() {
            // var a=startCheck(aWay,startPointA);
            let aPoint=checkWay(aWay,startPoints.a+1);
            let bPoint=checkWay(bWay,startPoints.b+1);
            let cPoint=checkWay(cWay,startPoints.c+1);
            if (aPoint==cPoint) {

                if (cRealWay==bPoint) {
                    startPoints.a++;
                    animationMove(aPoint,null,null);
                }
                else {
                    if (trainPassengers.a>= trainPassengers.c) {
                        startPoints.a++;
                        startPoints.b++;
                        animationMove(aPoint,bPoint,null);
                    }
                    else {
                        startPoints.c++;
                        startPoints.b++;
                        animationMove(null,bPoint,cPoint);
                    }

                }
            }
            else if (bPoint==cPoint) {

                if (bRealWay==aPoint) {
                    startPoints.c++;
                    animationMove(null,null,cPoint);
                }
                else {
                    if (trainPassengers.b>=trainPassengers.c) {
                        startPoints.b++;
                        startPoints.a++;
                        animationMove(aPoint,bPoint,null);
                    }
                else {
                        startPoints.c++;
                        startPoints.a++;
                        animationMove(aPoint,null,cPoint);
                    }
                }

            }

            else if (aPoint==bPoint) {
                if (aRealWay==bPoint) {
                    startPoints.c++;
                    animationMove(null,null,cPoint);
                }
                else {
                    if (trainPassengers.b>=trainPassengers.a) {
                        startPoints.b++;
                        startPoints.c++;
                        animationMove(null,bPoint,cPoint);
                    }
                else {
                        startPoints.c++;
                        startPoints.a++;
                        animationMove(aPoint,null,cPoint);
                    }
                }

            }
            else {
                startPoints.a++;
                startPoints.b++;
                startPoints.c++;
                animationMove(aPoint,bPoint,cPoint);
            }
            aRealWay=aPoint;
            bRealWay=bPoint;
            cRealWay=cPoint;

        },2000)
    }
    else {
        alert('Неправильно введены данные')
    }

}





 resetMove=()=> {
    clearInterval(moveInterval);
    document.getElementById('go').disabled=false;
    animationMove('a0','b0','c0');
    startPoints.a=0;
    startPoints.b=0;
    startPoints.c=0;

};

document.getElementById('go').addEventListener('click',startMove);
document.getElementById('reset').addEventListener('click',resetMove);
