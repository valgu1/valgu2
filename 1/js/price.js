$(function () {
    var country;
    if (country == 'DE') {
       de_selected = 'selected="selected"';
    } else {
        de_selected = 'selected="selected"';
    }
    selects = $("select[name='country']");
    selects.append('<option value="DE">Germany</option>');
    var change = 0,
        updatePrices = function (item) {
            change = 1;
            $(item.children).each(function () {
                if (this.selected) sel = $(this).val();
            });
            if (typeof sel === 'undefined') {
                sel = 'DE';
            }
            if (sel == 'DE') {
                $('.old_price_val').html('78');
                $('.old_price_cur').html('eur');
                $('.old_price_sig').html('');
                $('.new_price_val').html('39');
                $('.new_price_cur').html(' eur ');
                $('.new_price_sig').html('');
                $('select').val(sel).trigger('change');
                inESializeMask('+(4\\9)9{10}')
            }
            change = 0;
        };
    $("select").change(function () {
        if (change == 0) updatePrices(this);
    }).change();
    function inESializeMask (mask) {
        $('[name=phone]').inputmask(mask);
    }
});
