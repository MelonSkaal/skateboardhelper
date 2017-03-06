$(document).ready(function() {
    //laddningsikon
    $(window).on('load', function(){
        $("#loading").css({display: "none"});
    });
    
    if (document.readyState == "complete") {
        $("#loading").css({display: "none"});
    }

    //om man använder touch, gör så hover inte fungerar:http://stackoverflow.com/questions/23885255/how-to-remove-ignore-hover-css-style-on-touch-devices
    var touch = 'ontouchstart' in document.documentElement
            || (navigator.MaxTouchPoints > 0)
            || (navigator.msMaxTouchPoints > 0);

    if (touch) { // remove all :hover stylesheets
        try { // prevent exception on browsers not supporting DOM styleSheets properly
            for (var si in document.styleSheets) {
                var styleSheet = document.styleSheets[si];
                if (!styleSheet.rules) continue;

                for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
                    if (!styleSheet.rules[ri].selectorText) continue;

                    if (styleSheet.rules[ri].selectorText.match(':hover')) {
                        styleSheet.deleteRule(ri);
                    }
                }
            }
        } catch (ex) {}
    }

    var rotate = 180;
    var width = window.innerWidth;               
    //console.log("starting width is " + width)
    
    //desktop, kollar när sidan laddas in
    if(width >= 1224) {
        $(".menu").addClass("animate-menu");
        $(".desktop-info").addClass("desktop-info-active");
        $("#logo").css({opacity: 0.3});
    }
    else {
        $(".show-mobile").removeClass("hide-desktop");
        //om man laddar in sidan på mobile, indikera ikonen
        $("#logo").addClass("infinite-bounce");
    }

    //när man trycker på loggan
    $("#logo").click(function() {
        width = window.innerWidth;
        //console.log("current width is " + width)
        
        if(width < 1224) {
            //om den inte är desktop, visa meny, göm sida, vrid logga
            $("#logo").removeClass("infinite-bounce");
            setTimeout(function () {    
                $("#logo").css({transform: `rotate(${rotate}deg)`});
                rotate += 180;  
            },3);

            $(".active").toggleClass("hidden");
            $(".menu").toggleClass("animate-menu down");
            //$(".svara").toggleClass("hidden");
        }
        //desktop
        else {
            //om det är desktop, gör lägg till, ta bort wiggle
            $("#logo").addClass("wiggle");
            $(".menu").addClass("animate-menu");
            
            $("#logo").on("animationend webkitAnimationEnd", function() {
                $(this).removeClass("wiggle");
            }); 
        }
    });

    //när fönstret ändrar storlek
    $(window).resize(function() {
        width_check = $(window).width();
        
        if(width_check < 1224) {
            $("#logo").removeClass("wiggle wiggle2").addClass("transition");
            $(".show-mobile").removeClass("hide-desktop");
            $(".desktop-info").removeClass("desktop-info-active");
            $("#logo").css({opacity: 1});
            
            if(!($(".menu").hasClass("down"))) {
                $(".menu").removeClass("animate-menu");
            }
        }
        
        //desktop
        else {
            $("#logo").removeClass("transition infinite-bounce");
            $("#logo").css({transform: `rotate(0deg)`,opacity: 0.3});
            rotate = 180;
            
            $("#logo").addClass("wiggle");
            $(".show-mobile").addClass("hide-desktop");
            $(".desktop-info").addClass("desktop-info-active");
            
            $("#logo").on("animationend webkitAnimationEnd", function() {
                $(this).removeClass("wiggle");
            }); 
            
            //reset mobil meny så den göms
            $(".menu").removeClass("down").addClass("animate-menu");
            $(".active").removeClass("hidden");
            $(".svara").removeClass("hidden");
        };
    });
    
    //förhindra zoom på mobil
    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });

    //Slumpa bakgrund
    var images = ["bridge.jpg", "city.jpg", "orange.jpg", "outdoor.jpg", "park.jpg", "rail.jpg", "skater.jpg", "wall.jpg"];
    
    var picture = images[Math.floor(Math.random() * images.length)];
    $(".skater-picture").css({"background-image": "url(../img/" + picture + ")"});
    $(".bg").data("ibg-bg", "img/" + picture);
    
    //bakgrunden parallax
    $(".bg").interactive_bg({
       strength: 25,//10 mobile
       scale: 1.1,//2 mobile
       animationSpeed: "100ms",
       contain: true,
       wrapContent: false
     });
    
    //Visa vald undersida
    $(".menu-option").click(function() {
        //lagra vilken titel som trycktes på
        var target = $(this).data("title");
        
        //Gör text fet
        $(".menu h2").removeClass("selected-title");
        $("." + target + "2").addClass("selected-title");
        
        //Visa rätt page
        $(".page").addClass("hidden").removeClass("active");
        $("#" + target).removeClass("hidden").addClass("active");
        
        //välj boll
        $(".menu-dot").removeClass("selected-dot");
        $("." + target).addClass("selected-dot");
        
        //Dölj menyn med delay (på mobile; visas alltid på desktop)
        var width = $(window).width(); 
        console.log(width);
        if(width <= 1224) {
            
            $("#logo").css({transform: `rotate(${rotate}deg)`});
            rotate += 180;

            $(".menu").removeClass("animate-menu");  
        }
    });
    
    //visa att svara på frågor är aktivt
    $("#starta-knapp").click(function() {
        $(".animated-dot").addClass("rings");
        $(".jump").addClass("bounce").on("animationend webkitAnimationEnd", function() {
            $(this).removeClass("bounce");
        });
        
        //Byt ut startsidans innehåll mot frågorna
        $("#button-page, #frågor").toggleClass("hidden");
        $("#exit-icon").toggleClass("not-visible"); 
    });
    
    //göm frågor
    $("#exit-icon").click(function() {
        $("#quit-page").removeClass("hidden");
        $("#questions-and-skateboard").addClass("hidden");
    });
    
    //Ta svar från frågorna
    var skateboard = {
        board_type: "",
        board_size: "",
        board_price: "",
        board_link: "",
        griptape: "",
        griptape_price: "",
        griptape_link: "",
        truck_size: "",
        truck_hardness: "",
        truck_price: "",
        truck_link: "",
        wheel_size: "",
        wheel_hardness: "",
        wheel_price: "",
        wheel_link: "",
        bearings: "",
        bearings_price: "",
        bearings_link: "",
        screw_length: "",
        screw_price: "",
        screw_link: "",
        question1_info: "",
        question2_info: "",
        question3_info: "",
        question4_info: "",
        extra_info: "",
        extra_info_rea: " Priserna utesluter rea."
    };
        
    var question_1 = {
        title: "Fråga 1",
        question: "Vad föredrar du?",
        answers: ["Göra tricks", "Stadsåkning"],
        info1: "Betyder att flippa brädan, åka i ramp eller på räcken och skateboardparker m.m.",
        info2: "När fokus ligger på att ta det lugnt och åka runt, eller transportera sig.",
        /*göra trick*/  data: "tricks",//lagra detta["skateboard", "mindre hjul"]
        /*stadsåkning*/ data2: "cityriding"//lagra detta["cruiser", "longboard", "större hjul"]
    };
    
    var question_2a = {
        title: "Fråga 2",
        question: "Vad lockar dig mest?",
        answers: ["Åka street", "Åka ramp"], 
        info1: "Streetåkning innefattar saker som curbs, rails, trappor och andra hinder/objekt som ofta går att skejta på i städer.",
        info2: "Rampåkning görs i pooler (bowls) och vanliga halvpipes.",
        /*street*/   data: "street",//lagra detta["<8.2", "mild griptape", "smala truckar", "hårda hjul"]
        /*ramp*/     data2: "ramp"//lagra detta[">8.2", "grov griptape", "breda truckar", "mjuka hjul"],
    };
    
    var question_2b = {
        title: "Fråga 2",
        question: "Vad lockar dig mest?",
        answers: ["Långa sträckor", "Trafik och skarpa svängar"],
        info1: "När du tänker åka till avlägsna platser många kilometer bort.",
        info2: "Att åka genom städer och upptagna gator. Kräver mycket uppmärksamhet.",
        /*åka långt*/data: "åka långt",//lagra detta["longboard", "grov griptape", "breda truckar", "hårda hjul"],
        /*trafik*/   data2: "trafik"//lagra detta["cruiser", "grov griptape", "breda truckar", "mjuka hjul"]
    };
    
    var question_3 = {
        title: "Fråga 3",
        question: "Hur mycket vill du kunna svänga?",
        answers: ["Mycket", "Lite"],
        info1: 'Leder till mer kontroll vid lägre hastigheter, men mindre kontroll vid höga hastigheter p.g.a. <a href="#wobble" data-link="wobble" class="link">wobble</a>.',
        info2: 'Leder till mindre kontroll vid lägre hastigheter, men mer kontroll vid höga hastigheter p.g.a. reducerat <a href="#wobble" data-link="wobble" class="link">wobble</a>.',
        /*mycket*/  data: "mycket",//lagra detta "mjuka truckar",
        /*lite*/    data2: "lite"//lagra detta "hårda truckar"
    };
    
    var question_4 = {
        title: "Fråga 4",
        question: "Hur vill du åka?",
        answers: ["Snabbt", "Vardagligt"],
        info1: "Exempelvis åka ned för långa backar utan att bromsa. Hastigheter som kan vara skrämmande.",
        info2: "När man åker långsammare och inte har ett behov av att åka väldigt snabbt.",
        /*snabbt*/   data: "snabbt",//lagra detta "hög abec",
        /*lugnt*/ data2: "vardagligt"//lagra detta "låg abec"
    };
    
    var questions = [question_1, "question_2", question_3, question_4];
    
    var current_question = 0;
    var highest_answered_question = 0;
    var available_right_arrow = false;
    
    function next_question(question) {
        //byt ut innehåll
        $("#question-title").text(question.title);
        $(".question-undertitle").text(question.question);
        $(".answer-1").text(question.answers[0]);
        $(".answer-2").text(question.answers[1]);
        
        //pilarna
        $("#left-arrow").addClass("available-arrow");
        $("#right-arrow").removeClass("available-arrow");
        available_right_arrow = false;
        
        //ändra värde i rutorna
        $(".value-1").data('value', question.data);
        $(".value-2").data('value', question.data2);
        
        //console.log("current question is: " + current_question);
        //console.log("highest answered question is: " + highest_answered_question);
    }
    
    function show_skateboard() {
        //visa skateboard!
        $("#skateboard-page").removeClass("hidden");
        $("#inner-questions").addClass("hidden");
        //Egenskaper
        $(".b1").html(skateboard.board_type + ", som är " + skateboard.board_size);
        $(".b2").html(skateboard.griptape);
        $(".b3").html(skateboard.truck_size + ", " + skateboard.truck_hardness);
        $(".b4").html(skateboard.wheel_size + ", med " + skateboard.wheel_hardness);
        $(".b5").html(skateboard.bearings);
        $(".b6").html(skateboard.screw_length);
        //Länkarna
        $("#a1").attr("href", skateboard.board_link);
        $("#a2").attr("href", skateboard.griptape_link);
        $("#a3").attr("href", skateboard.truck_link);
        $("#a4").attr("href", skateboard.wheel_link);
        $("#a5").attr("href", skateboard.bearings_link);
        $("#a6").attr("href", skateboard.screw_link);
        //Värden
        $("#t1").text(skateboard.board_price + "kr");
        $("#t2").text(skateboard.griptape_price + "kr");
        $("#t3").text(skateboard.truck_price + "kr");
        $("#t4").text(skateboard.wheel_price + "kr");
        $("#t5").text(skateboard.bearings_price + "kr");
        $("#t6").text(skateboard.screw_price + "kr");
        $("#t7").text(skateboard.board_price + skateboard.griptape_price + skateboard.truck_price + skateboard.wheel_price + skateboard.bearings_price + skateboard.screw_price + "kr");
        //sammanfattning
        $("#summary").text("Sammansättning av dina svar: " + skateboard.question1_info + skateboard.question2_info + skateboard.question3_info + skateboard.question4_info);
        $("#extra-info").text("Extra information: " + skateboard.extra_info + skateboard.extra_info_rea);
        //skrolla upp skateboarddelarna
        document.querySelector("#reset-scroll").scrollIntoView({ behavior: 'instant' });
    }
      
    $(".info-1").click(function() {
        $(".info-click").addClass("question-info");
        $(".q-holder").addClass("hidden");
        $(".hidden-info").removeClass("hidden");
        $("#info-title").text(questions[current_question].answers[0])
        $(".hidden-info p").html(questions[current_question].info1);
    });
    
    $(".info-2").click(function() {
        $(".info-click").addClass("question-info");
        $(".q-holder").addClass("hidden");
        $(".hidden-info").removeClass("hidden");
        $("#info-title").text(questions[current_question].answers[1])
        $(".hidden-info p").html(questions[current_question].info2);
    });
    
    function hide_info() {
        $(".info-click").removeClass("question-info");
        $(".q-holder").removeClass("hidden");
        $(".hidden-info").addClass("hidden")
    }
    
    $(".info-3").click(function() {
        hide_info();;         
    })
    
    $(".question").click(function() {

        var clicked_question = $(this).data('value');
    
        switch (clicked_question) {
            //avsluta session
            case "yes":
                $(".animated-dot").removeClass("rings");
                $("#frågor, #quit-page").addClass("hidden");
                $("#exit-icon").addClass("not-visible");
                //återställ frågor
                hide_info();
                current_question = 0;
                next_question(questions[current_question]);
                $("#left-arrow").removeClass("available-arrow");
                //visa home
                $("#button-page, #questions-and-skateboard").removeClass("hidden");
                //göm skateboard
                $("#skateboard-page").addClass("hidden");
                $("#inner-questions").removeClass("hidden");
                break;
            case "no":
                $("#quit-page").addClass("hidden"); 
                $("#questions-and-skateboard").removeClass("hidden");
                break;
                
            //fråga 1
            case "tricks":
                skateboard.question1_info = "Du föredrar att göra tricks, "
                skateboard.board_type = "Skateboard";
                skateboard.wheel_size = "50mm - 54mm";
                skateboard.wheel_link = "https://www.hollywood.se/hjul/s/914?p=24621&p=18221&p=24633&p=24639&p=24075&orderBy=Published";
                skateboard.wheel_price = 500;
                
                skateboard.screw_length = "Korta skruvar";
                skateboard.screw_link = "https://www.hollywood.se/1-combi-bolts-hardware/p/65318";
                skateboard.screw_price = 39;
                //nästa fråga
                current_question += 1;
                highest_answered_question = 1;
                questions[1] = question_2a;
                next_question(questions[current_question]);
                break;
            case "cityriding":
                skateboard.question1_info = "Du föredrar stadsåkning, "
                skateboard.wheel_size = "55mm - 60mm";
                skateboard.wheel_link = "https://www.hollywood.se/hjul/s/918";
                skateboard.wheel_price = 550;
                
                skateboard.screw_length = "Långa skruvar";
                skateboard.screw_link = "https://www.hollywood.se/1-25-longboard-hardware-set/p/65171";
                skateboard.screw_price = 29;
                //nästa fråga
                current_question += 1;
                highest_answered_question = 1;
                questions[1] = question_2b;
                next_question(questions[current_question]);
                break;
                
            //fråga 2  
            case "street":
                skateboard.question2_info = "åka street lockar dig, "
                skateboard.board_size = "från 7.625 tum till 8 tum";
                skateboard.board_link = "https://www.hollywood.se/skate/s/472?p=48997&p=86331&p=19424&p=18246&p=144423&p=145806&p=176179&p=145299&p=18211&orderBy=Published";
                skateboard.board_price = 550;
                
                skateboard.griptape = "Mild griptape";
                skateboard.griptape_link = "https://www.hollywood.se/jessup-griptape/p/2189";
                skateboard.griptape_price = 59;
                
                skateboard.truck_size = "Smala";
                skateboard.truck_link = "https://www.junkyard.se/products/skateboard?cat=97%2C78%2C28%2C93&department=1177&size_truck=786%2C788%2C797%2C1655%2C531%2C1657&order=position&dir=asc";
                skateboard.truck_price = 700;
                
                skateboard.wheel_hardness = 'hög <a href="#durometer" data-link="durometer"  class="link">durometer</a>';
                //nästa fråga
                current_question += 1;
                highest_answered_question = 2;
                next_question(questions[current_question]);
                break;
            case "ramp":
                skateboard.question2_info = "rampåkning lockar dig, "
                skateboard.board_size = "större än 8 tum";
                skateboard.board_link = "https://www.hollywood.se/skate/s/472?p=254987&p=550123&p=19853&p=559060&p=18235&p=19809&p=18190&p=144397&p=173204&p=18199&p=255018&p=157382&p=541647&p=19644&p=144389&p=144432&p=258603&p=19676&p=86317&p=157109&p=145519&p=86369&p=259902&p=157281&p=566045&p=157375&p=475967&p=163975&orderBy=Published";
                skateboard.board_price = 550;
                
                skateboard.griptape = "Grov griptape";
                skateboard.griptape_link = "https://www.hollywood.se/bear-cut-grip-regular/p/18611";
                skateboard.griptape_price = 89;
                
                skateboard.truck_size = "Breda";
                skateboard.truck_link = "https://www.junkyard.se/products/skateboard?cat=97%2C78%2C28%2C93&department=1177&size_truck=505%2C782%2C796%2C784%2C790&order=position&dir=asc";
                skateboard.truck_price = 700;
                
                skateboard.wheel_hardness = 'låg <a href="#durometer" data-link="durometer" class="link">durometer</a>';
                skateboard.wheel_link = "https://www.junkyard.se/products/skateboard?cat=78&department=1177&size_wheel=707%2C544%2C709%2C703&order=position&dir=asc";
                skateboard.wheel_price = 450;
                //nästa fråga
                current_question += 1;
                highest_answered_question = 2;
                next_question(questions[current_question]);
                break;
            case "åka långt":
                skateboard.question2_info = "långa sträckor lockar dig, "
                skateboard.board_type = "Longboard";
                skateboard.board_size = "större än 8 tum";
                skateboard.board_link = "https://www.hollywood.se/longboards/s/89";
                skateboard.board_price = 1550;
                
                skateboard.griptape = "Grov griptape";
                skateboard.griptape_link = "https://www.skatepro.se/261-10108.htm?stockcode=1261000007&gclid=CMuB_LqWwtECFcXKsgod_xEH7A";
                skateboard.griptape_price = 99;
                
                skateboard.truck_size = "Breda";
                skateboard.truck_link = "http://www.boardlife.se/produkt-kategori/longboard/components-longboard/trucks-longboard/";
                skateboard.truck_price = 700;
                
                skateboard.wheel_hardness = 'hög <a href="#durometer" data-link="durometer" class="link">durometer</a>';
                skateboard.wheel_size = "60mm eller större";
                //nästa fråga
                current_question += 1;
                highest_answered_question = 2;
                next_question(questions[current_question]);
                break;
            case "trafik":
                skateboard.question2_info = "trafik lockar dig, "
                skateboard.board_type = "Cruiser";
                skateboard.board_size = "från 7.75 tum eller större";
                skateboard.board_link = "https://www.hollywood.se/kompletta-cruisers/s/1193?p=19424&p=19742&p=163975&orderBy=Published";
                skateboard.board_price = 1500;
                
                skateboard.griptape = "Grov griptape";
                skateboard.griptape_link = "https://www.skatepro.se/261-10108.htm?stockcode=1261000007&gclid=CMuB_LqWwtECFcXKsgod_xEH7A";
                skateboard.griptape_price = 99;
                
                skateboard.truck_size = "Breda";
                skateboard.truck_link = "http://www.boardlife.se/produkt-kategori/longboard/components-longboard/trucks-longboard/";
                skateboard.truck_price = 700;
                
                skateboard.wheel_hardness = 'låg <a href="#durometer" data-link="durometer" class="link">durometer</a>';
                skateboard.wheel_size = "60mm eller större";
                skateboard.extra_info = 'Cruisers säljs oftast kompletta vilket gör att delarna som valts ut finns ifall du vill bygga ihop en egen cruiser, eller om du behöver byta ut delar.'
                //nästa fråga
                current_question += 1;
                highest_answered_question = 2;
                next_question(questions[current_question]);
                break;
                
            //fråga 3
            case "mycket":
                skateboard.question3_info = "du vill kunna svänga mycket "
                skateboard.truck_hardness = '<a href="#mjuka" data-link="hardness" class="link">mjuka</a> truckar';
                //nästa fråga
                current_question += 1;
                highest_answered_question = 3;
                next_question(questions[current_question]);
                break;
            case "lite":
                skateboard.question3_info = "du vill inte kunna svänga så mycket "
                skateboard.truck_hardness = '<a href="#hårda" data-link="hardness" class="link">hårda</a> truckar';
                //nästa fråga
                current_question += 1;
                highest_answered_question = 3;
                next_question(questions[current_question]);
                break;
                
            //fråga 4
            case "snabbt":
                skateboard.question4_info = "och du vill åka snabbt."
                skateboard.bearings = 'hög <a href="#abec" data-link="abec" class="link">abec</a>';
                skateboard.bearings_link = "https://www.junkyard.se/kullager-independent-abec7";
                skateboard.bearings_price = 199;
                //visa uppsättningen
                current_question += 1;
                highest_answered_question = 4;
                show_skateboard();
                break;
            case "vardagligt":
                skateboard.question4_info = "och du vill åka vardagligt."
                skateboard.bearings = 'låg <a href="#abec" data-link="abec" class="link">abec</a>';
                skateboard.bearings_link = "https://www.junkyard.se/kullager-independent-abec5";
                skateboard.bearings_price = 169;
                //visa uppsättningen
                current_question += 1;
                highest_answered_question = 4;
                show_skateboard();
                break;

            default:
                console.log("Vad håller du på med?");
                break;
        };
        //console.log(skateboard);
    });

    $("#left-arrow").click(function() {
        if(current_question > 0) {
            //gå bak en fråga
            current_question -= 1;
            next_question(questions[current_question]);
            make_right_arrow_available();
            
            if(current_question === 0) {
                $("#left-arrow").removeClass("available-arrow"); 
            }
        }
    });
    
    function make_right_arrow_available() {
        $("#right-arrow").addClass("available-arrow");
        available_right_arrow = true;
    }
    
    function compare_questions(active, highest) {
        if(active < highest) {
            available_right_arrow = true;
            $("#right-arrow").addClass("available-arrow");
        }
        else {
            available_right_arrow = false;
        }
    }
    
    $("#right-arrow").click(function() {
        if(available_right_arrow === true) {
            //gå fram en fråga
            current_question += 1;
            next_question(questions[current_question]);
            //jämför den nya frågon och kolla om den är lägre än den högst besvarade
            compare_questions(current_question, highest_answered_question);
        } 
    });
    
    //trycker på anchor. Den läggs till efteråt genom .html()"cant jquery click on html from jquery"
    $(document).on("click", ".link", function(){
        //Gör text fet
        $(".menu h2").removeClass("selected-title");
        $(".anchor").addClass("selected-title");
        //Visa rätt page
        $(".page").addClass("hidden").removeClass("active");
        $("#information-sida").removeClass("hidden").addClass("active");
        //välj boll
        $(".menu-dot").removeClass("selected-dot");
        $(".information-sida").addClass("selected-dot");
        
        $("article").removeClass("display-link display-link-animation");
        //se vilken länk som trycktes på, lägg till klasserna på dess artikel
        var link = $(this).data("link");
        
        //skrolla ned till artikeln
        document.querySelector('.' + link).scrollIntoView({ behavior: 'smooth' });
        
        $("." + link).addClass("display-link display-link-animation");
        //gör bara wiggle på logga om länken kommer utifrån
        if(!(link === "wheelbite")) { 
            $("#logo").addClass("wiggle");
        }
        setTimeout(function() {
            $("." + link).removeClass("display-link-animation");
            $("#logo").removeClass("wiggle");
        }, 3000);

    });
    
    $("article").click(function () {
        $(this).removeClass("display-link");
    })
    
    
});
    
