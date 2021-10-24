
var myCoords = {
    latitude : 37.588663,
    logitude : 126.8123398
};


var map;
//상세주소를 넣을 배열 생성(아래에서 비교하게 됨)
var Dobong = new Array();
var Nowon = new Array();
var Gangbuk = new Array();
var Jungrang = new Array();
var Yongsan = new Array();
var Seongbuk = new Array();
var Dongdaemun = new Array();
var Gwangjin = new Array();
var Seongdong = new Array();
var Mapo = new Array();
var Jung = new Array();
var  Seodaemun= new Array();
var Eunpyeong = new Array();
var Jongro = new Array();
var Gangdong = new Array();
var Songpa = new Array();
var Gangnam = new Array();
var Seocho = new Array();
var Dongjak = new Array();
var Gwanak = new Array();
var Geumcheon = new Array();
var Yeongdeungpo = new Array();
var Guro = new Array();
var Yangcheon = new Array();
var Gangseo = new Array();

//마커 이미지
var imageSrc = 'https://mblogthumb-phinf.pstatic.net/MjAxODA2MjZfMjMx/MDAxNTMwMDA1ODYwNjU0.SZK11uT7BxxNxQbJSU_8f9PlEbGFNhG_JXbB4gPstT0g.ZZ9e-Bxg57AdaOzbXX-YipiqOzsmiWYkEsoC0DKblE4g.PNG.guamtour2014/%EC%9C%84%EC%B9%98.png?type=w800',
    imageSize = new daum.maps.Size(50, 55),
    imageOption = {offset: new daum.maps.Point(22, 53)};

var markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption)


//지도를 6레벨로 생성하고 지도 타입의 컨트롤, 교통정보를 같이 띄우고 deployCharge함수 실행
window.onload = function(){
    var mapContainer = document.getElementById('map'),
    mapOption = { 
        center: new daum.maps.LatLng(37.566535, 126.977969), 
        level: 6 
    };

    map = new daum.maps.Map(mapContainer, mapOption); 
    var mapTypeControl = new daum.maps.MapTypeControl();
    map.addControl(mapTypeControl, daum.maps.ControlPosition.BOTTOMRIGHT);
    map.addOverlayMapTypeId(daum.maps.MapTypeId.TRAFFIC);  

 deployCharge(myCoords);   
}

// JSON파일의 내용들을 받을 객체 생성
var Charge;
function deployCharge(coords){
    if(!Charge){
        var url = "http://openapi.seoul.go.kr:8088/454950475065686435317a4d6a5071/json/MgisCarCharge/1/100/";
	
	var request = new XMLHttpRequest();
	request.open("GET", url);
	request.onload = function(){
            if(request.status === 200){
                Charge = extractRows(JSON.parse(request.responseText));
                deployCharge(coords);
            };
	};
    request.send(null);
    //Charge에 JSON에서 제공되는 내용들을 저장
    }else{
        for(var i = 0 ; i < Charge.length ; i++){
            var markerPosition  = new daum.maps.LatLng(Charge[i].COT_COORD_Y, Charge[i].COT_COORD_X);
            var iwContent = Charge[i].COT_ADDR_FULL_NEW;
            var manage = Charge[i].COT_CONTS_NAME;
            var Guname = Charge[i].COT_GU_NAME;
            MapMarker(markerPosition, manage, iwContent, Guname)
            postaddress(iwContent)
            }
        } 
    }

//행별로 읽어들임
function extractRows(jsonObject){
    var arr;
    var key;
    for(key in jsonObject){
        arr = jsonObject[key].row;
    }
    return arr;
}
//반복문을 통해서 맵에 충전소의 위치들을 마커로 표시
function MapMarker(markerPosition, manage, iwContent, Guname){
    var marker = new daum.maps.Marker({
        position: markerPosition,
        image: markerImage
    });
    marker.setMap(map)
//선택 위치의 정보를 보여주는 윈도우생성
    var infomessage = 
    '    <div class="info">' + 
    '        <div class="title" style="font-family: Do Hyeon, sans-serif;">' + 
                    manage + "   " + 
    '        </div>' + 
    '        <div class="body">' + 
    '            <div class="img">' +
    '                <img src = "https://cdn-icons.flaticon.com/png/512/3170/premium/3170325.png?token=exp=1635090661~hmac=9c940f15a9f2d683b2666459321e9c9a" width="73" height="70">' +
    '           </div>' + 
    '            <div class="desc" style="font-family: Do Hyeon, sans-serif; text-align: center; color:black;" >' + 
    '                <div class="ellipsis">' + "세부주소: " + iwContent + "   " + '</div>' + 
    '                <div class="jibun ellipsis">' + "관할구: " +  Guname + '</div>' + 
    '                 <div class="jibun ellipsis">' + "관할시설: " +  manage + '</div>' + 
    '                </div>' + 
    '            </div>' + 
    '        </div>' + 
    '    </div>'   
    ;
//닫기가 가능하도록 true 설정
    var CC = infomessage;
    iwRemoveable = true;
 //인포윈도우 생성   
    var infowindow = new daum.maps.InfoWindow({
        content : CC,
        removable : iwRemoveable,
        position: markerPosition
    });
//클릭하게 되면 맵상에서 표시되게 됨
    daum.maps.event.addListener(marker, 'click', function() {
        infowindow.setMap(map); 
    });
}
// iwContent를 띄어쓰기 기준으로 나누어 c에 저장
// 각 주소들은 서울시 ~~구로 받게되고 이는 0번째 다음 첫번째의 내용이고 이 주소들을 각 구마다 비교하여 미리만들어둔 배열에 저장
function postaddress(iwContent) {
    var c = iwContent.split(' ');
    if (c[1] == '도봉구') {
        Dobong.push(iwContent);
    } else if (c[1] == '노원구') {
        Nowon.push(iwContent);
    } else if (c[1] == '강북구') {
        Gangbuk.push(iwContent);
    } else if (c[1] == '성북구') {
        Seongbuk.push(iwContent);
    } else if (c[1] == '중랑구') {
        Jungrang.push(iwContent);
    } else if (c[1] == '동대문구') {
        Dongdaemun.push(iwContent);
    } else if(c[1] == '광진구') {
        Gwangjin.push(iwContent);
    } else if(c[1] == '성동구') {
        Seongdong.push(iwContent);
    } else if(c[1] == '용산구') {
        Yongsan.push(iwContent);
    } else if(c[1] == '마포구') {
        Mapo.push(iwContent);
    } else if(c[1] == '중구') {
        Jung.push(iwContent);
    } else if(c[1] == '서대문구') {
        Seodaemun.push(iwContent);
    } else if(c[1] == '은평구') {
        Eunpyeong.push(iwContent);
    } else if(c[1] == '종로구') {
        Jongro.push(iwContent);
    } else if(c[1] == '강동구') {
        Gangdong.push(iwContent);
    } else if(c[1] == '송파구') {
        Songpa.push(iwContent);
    } else if(c[1] == '강남구') {
        Gangnam.push(iwContent);
    } else if(c[1] == '서초구') {
        Seocho.push(iwContent);
    } else if(c[1] == '동작구') {
        Dongjak.push(iwContent);
    } else if(c[1] == '관악구') {   
        Gwanak.push(iwContent);
    } else if(c[1] == '금천구') {
        Geumcheon.push(iwContent);
    } else if(c[1] == '영등포구') {
        Yeongdeungpo.push(c);
    } else if(c[1] == '구로구') {
        Guro.push(iwContent);
    } else if(c[1] == '양천구') {
        Yangcheon.push(iwContent);
    } else if(c[1] == '강서구') {
        Gangseo.push(iwContent);
    }
}


//선택 컨틀롤을 이용하여 각 케이스문을 보게 되고 선택하는 것에 따라 위도,경도,저장된 배열들을 panTo 함수로 보낸다.
function selectLoc(value) {
	var a, b;

	switch(value){
		case 'dobong'       : a=37.661468; b=127.040861; ad = Dobong;
            break;
        case 'nowon'        : a=37.649294; b=127.070101; ad = Nowon;
            break;
        case 'gangbuk'      : a=37.634199; b=127.022582; ad = Gangbuk;
            break;
        case 'seongbuk'     : a=37.599262; b=127.021769; ad = Seongbuk;
            break;
        case 'jungrang'     : a=37.598305; b=127.092789; ad = Jungrang;
            break;
        case 'dongdaemun'   : a=37.583020; b=127.053642; ad = Dongdaemun;
            break;
        case 'gwangjin'     : a=37.544900; b=127.085698; ad = Gwangjin;
            break;
        case 'seongdong'    : a=37.552091; b=127.043127; ad = Seongdong;
            break;
        case 'yongsan'      : a=37.534968; b=126.979823; ad = Yongsan;
            break;
        case 'mapo'         : a=37.563026; b=126.904062; ad = Mapo;
            break;
        case 'jung'         : a=37.561781; b=126.995654; ad = Jung;
            break;
        case 'seodaemun'    : a=37.577865; b=126.930797; ad = Seodaemun;
            break;
        case 'eunpyeong'    : a=37.609428; b=126.921145; ad = Eunpyeong;
            break;
        case 'jongro'       : a=37.575388; b=126.976543; ad = Jongro;
            break;
        case 'gangdong'     : a=37.546840; b=127.143165; ad = Gangdong;
            break;
        case 'songpa'       : a=37.508110; b=127.116699; ad = Songpa;
            break;        
        case 'gangnam'      : a=37.499001; b=127.061073; ad = Gangnam;
            break;
        case 'seocho'       : a=37.480900; b=127.012611; ad = Seocho;
            break;
        case 'dongjak'      : a=37.503030; b=126.947700; ad = Dongjak;
            break;
        case 'gwanak'       : a=37.477413; b=126.937067; ad = Gwanak;
            break;
        case 'geumcheon'    : a=37.461534; b=126.897721; ad = Geumcheon;
            break;
        case 'yeongdeungpo' : a=37.518749; b=126.912619; ad = Yeongdeungpo;
            break;
        case 'guro'         : a=37.496990; b=126.856334; ad = Guro;
            break;        
        case 'yangcheon'    : a=37.521474; b=126.855875; ad = Yangcheon;
            break;
        case 'gangseo'      : a=37.560486; b=126.822730; ad = Gangseo;
            break;
    }
    panTo(a,b, ad)
}



//a,b는 위치에 대한 정보로 선택된 구역으로 지도가 이동되게 되며 ad로 받은 배열들을 하나씩 address가 id인 부분에 출력된다.
function panTo(a,b, ad) {
    var moveLatLon = new daum.maps.LatLng(a, b);
    map.panTo(moveLatLon);
var b = ""
    for(var i = 0 ; i < ad.length ; i++) {
        
        b = b + ad[i] + '<hr/>' + '<br>'; 
    }
        var rise = document.getElementById("address");
        rise.innerHTML = "<b><font color='Black'>"+b+"</font></b>";
}