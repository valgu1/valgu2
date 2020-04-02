try {
    siteProduct;
} catch (error) {
    alert('Нет Объекта siteProduct')
}




if (siteProduct) {
    var xhr = new XMLHttpRequest(),
        currentProdCountries = [],
        rusPrice,
        response,
        _data,
        inputMask;

    xhr.open('GET', '//click.lucky.online/click/ip-location.html', false);
    xhr.send();

    if (xhr.status === 200) {
        response = JSON.parse(xhr.responseText);
    }

    if (siteProduct.demonPopup) {
        var demonPopupTitle = 'Подождите! У нас есть для Вас предложение';

        if(response.city !== null) {
            demonPopupTitle = 'Вы из города ' + response.city + '? Подождите!';
        }
        $('head').append('<link rel="stylesheet" href="css/popup.css">');
        $('body').append('<div class="demon_popup">\n' +
            '        <div class="demon_overflow"></div>\n' +
            '        <div class="demon_popup_body">\n' +
            '            <a href="javascript:void(0)" target="_blank" class="demon_close"></a>\n' +
            '            <h4 class="demon_popup_title">' + demonPopupTitle + '</h4>\n' +
            '            <img src="img/product.png" alt="" style="width:239px">\n' +
            '            <p>Для Вас ещё действует специальное ограниченное предложение</p>\n' +
            '            <p>Успейте принять участие в программе и получите "' + siteProduct.name + '" по акции за  <span class="lt-product-price">149 руб</span><span style="font-size: 32px;color:#fff;">!</span></p>\n' +
            '            <a href="javascript:void(0)" class="popup_btn">узнать подробнее</a>\n' +
            '        </div>\n' +
            '    </div>');
        var closeElems = document.querySelectorAll('.demon_overflow, .demon_close'),
            demonPopup = document.getElementsByClassName('demon_popup')[0];
        for(let i = 0; i < closeElems.length; i++) {closeElems[i].onclick = function(){demonPopup.remove();}}
        
        
        
        var flag = true;

        $(window).mouseout(function(e){
            if(e.pageY - $(window).scrollTop() < 1 && flag == true)
            {
                demonPopup.classList.add('active');
            };
        });
    }
    var prod = document.getElementsByClassName('lt-product-name'),
        price = document.getElementsByClassName('lt-product-price'),
        country = document.getElementsByClassName('lt-product-country'),
        tcountry = document.getElementsByClassName('lt-country'),
        tcity = document.getElementsByClassName('lt-city');


    function loop(target, data) {
        for (let i = 0; i < target.length; i++) {
            if (typeof data === 'string') {
                target[i].innerHTML = data;
            }
        }
    }
     document.getElementsByClassName('popup_btn')[0].onclick = function() {
        setTimeout(function(){
            window.location.href = siteProduct.vitrMainPage;
        },4000);
        window.open(siteProduct.demonLandLink,'_blank');
    }
     
     document.getElementsByClassName('demon_close')[0].onclick = function() {
         demonPopup.classList.remove('active');
        window.open(siteProduct.vitrMainPage,'_blank');


     }
    

    loop(prod, siteProduct.name);
    loop(tcountry, response.country);
    loop(tcity, response.city);

    function countryDetect(price) {
        var priceVal = price.split(' ')[1];
        switch (priceVal) {
            case 'руб':
                return 'Россия';
            case 'тнг':
                return 'Казахстан';
            case 'бр':
                return 'Беларусь';
            case 'сом':
                return 'Кыргизия';
            case 'грн':
                return 'Украина';
            case 'др':
                return 'Армения';
        }
    }
    for (let i = 0; i < siteProduct.price.length; i++) {
        currentProdCountries.push(countryDetect(siteProduct.price[i]));
    }

    var switcher = false;
    siteProduct.price.forEach(function (country) {
        if (country === 'БЕСПЛАТНО') {
            rusPrice = country;
        }
        if (country.split(' ')[1] === 'руб') {
            rusPrice = country;
        }
        var currentCountry = countryDetect(country);
        if (currentCountry === response.country) {
            switcher = true;
            loop(price, country);
            loop(country, countryDetect(country));
        }
    });

    if (switcher === false) {
        loop(price, rusPrice);
        loop(country, countryDetect(rusPrice));
    }
   
} else {
    console.error('Переменная siteProduct не заполнена');
}



    
    
    
