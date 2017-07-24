//=require slick-carousel/slick/slick.min.js
//=require jquery-nice-select/js/jquery.nice-select.js
//=require exif-js/exif.js
//=require croppie/croppie.js
//=require bootstrap/js/modal.js
//=require @fengyuanchen/datepicker/dist/datepicker.js

(function($){
    'use strict';

    // setup the APP instance
    var APP = APP || {};

    // basic configuration options
    APP.options = {
        // the endpoint that we will hit for postcode lookup - do not incluce the postcode param
        postcode_lookup_endpoint: '/umbraco/surface/AddressLookup/addresses'
        //postcode_lookup_endpoint: 'http://mcbtsappdewea01.azurewebsites.net/umbraco/surface/AddressLookup/addresses'
    };

    // general helpers
    APP.helpers = {
        /**
         * receives a filename as a string and returns the extension
         */
        get_extension: function(filename) {
            return filename.substr(filename.lastIndexOf('.') +1 );
        },
        is_image_file: function(filename) {

            var ext = APP.helpers.get_extension(filename);

            switch(ext) {
                case 'jpg':
                case 'JPG':
                case 'jpeg':
                case 'JPEG':
                case 'png':
                case 'PNG':
                    return true;
            }

            return false;
        }
    };

    /**
     * Navigation constructor
     */
    function Navigation() {
        // locate the navigation container
        this.$nav = $('#navigation');
    }

    /**
     * is fired when the APP initialises and calls Navigation
     */
    Navigation.prototype.init = function() {
        // preserve the scope of this
        var Nav = this;
        // click event on the nav toggle button
        $(document).on('click', '[data-toggle="nav"]', function(){
            // check if the nav is open or closed and do the opposite
            Nav.$nav.hasClass('nav--active') ? Nav.$nav.removeClass('nav--active') : Nav.$nav.addClass('nav--active');
        });
    };

    /**
     * story carousel constructor
     */
    function Carousel() {
        // define the crousel container upon which slick will enact
        this.$carousel = $('.carousel');
    }

    /**
     * is fired when the APP initialises and calls Carousel
     */
    Carousel.prototype.init = function() {

        this.$carousel.slick({
            slidesToShow: 1,
            adaptiveHeight: true,
            prevArrow: '<button class="carousel__button carousel__button--prev" aria-label="Read previous item"></button>',
            nextArrow: '<button class="carousel__button carousel__button--next" aria-label="Read next item"></button>'
        });
    };

    /**
     * story carousel constructor
     */
    function Storycarousel() {
        // define the story crousel container upon which slick will enact
        this.$story_csl = $('#story-csl');
    }

    /**
     * is fired when the APP initialises and calls Storycarousel
     */
    Storycarousel.prototype.init = function() {
        // initiate slick with options
        this.$story_csl.slick({
            centerMode: true,
            centerPadding: '20%',
            slidesToShow: 1,
            prevArrow: '<button class="story-csl__button story-csl__button--prev" aria-label="Previous story"></button>',
            nextArrow: '<button class="story-csl__button story-csl__button--next" aria-label="Next story"></button>',
            adaptiveHeight: true,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        centerPadding: '120px'
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        centerPadding: '80px',
                        arrows: false
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        centerPadding: '40px',
                        arrows: false
                    }
                }
            ]
        });
    };

    /**
     * Donat constructor
     * the donate object is used to toggle values in the donate to shaver form
     */
    function Donate() {
        this.$button_set = $('[data-donate="options"]');
        this.$field = $('[data-donate="value"]').first();
        this.$totals = $('[data-donate="total"]');
        this.$error_el = $('[data-donate="error"]').first();
        this.has_error = false;
        this.donation_amount = 0;
    }
    // toggle between radio options
    Donate.prototype.toggle = function($btn) {
        // locate the radio field input in the selected option
        var $target = $btn.find('input[type="radio"]').first();
        // set the chosen value in the text entry field
        if($target.length > 0 && $target.val()) this.setAmount($target.val());
        // apply focus to the target - should help with accessibility on this feature
        $target.trigger('focus');
        // remove any currently active button states
        this.$button_set.find('.active').removeClass('active');
        // hand active state to the target button
        $btn.addClass('active');
        // update the summary totals
        this.updateTotals();
    };
    // sets the chosen amount to the field
    Donate.prototype.setAmount = function(amount) {
        this.$field.val(amount);
        this.donation_amount = amount;
    };
    // removes active states from all donate pre-set options
    Donate.prototype.resetButtons = function() {
        // remove any currently active button states
        this.$button_set.find('.active').removeClass('active');
    };
    // activates a radio option if the user inputted value matches it
    Donate.prototype.reconcileButtons = function() {
        // see if the user created value exists as a button
        var $btn = this.$button_set.find(':radio[value="' + this.donation_amount + '"]');
        // if a button exists for this value, make it active
        if($btn.length) $btn.first().closest('.button').addClass('active');
    };

    /**
     * basic number format validation
     *
     * @param {str} input - the value the user has entered in the value field
     * @returns {bool} is(not) valid
     */
    Donate.prototype.validateAmount = function(input) {
        // allow numbers, full stops and commas
        var format = /^[0-9,.]*$/;
        // pre-define valid as true
        var valid = true;
        // check that the input satisfies the regex and no more than one full stop
        if((input.match(/\./g) || []).length > 1 || format.test(input) === false) valid = false;
        // show an error message
        if(!valid) this.showError('Please enter a valid number, such as 50 or 50.00');
        // send back the outcome
        return valid;
    };

    Donate.prototype.updateTotals = function() {
        // preserve the ol' this scope
        var DON = this;
        // iterate over all total instances and update the text value.
        // NOTE: does not require the &pound; as this is included in the template
        this.$totals.each(function(){
            isNaN(DON.donation_amount) ? $(this).text('£0.00') : $(this).text('£' + DON.donation_amount);
        });
    };

    Donate.prototype.showError = function(message) {
        this.has_error = true;
        this.$field.addClass('field--error');
        this.$field.attr('aria-invalid', 'true');
        this.$error_el.addClass('field__hint--error').text(message);
    };

    Donate.prototype.clearError = function() {
        this.has_error = false;
        this.$field.removeClass('field--error');
        this.$field.attr('aria-invalid', 'false');
        this.$error_el.removeClass('field__hint--error').text('');
    };

    Donate.prototype.init = function() {
        // preserve the scope of this for use in function
        var DON = this;
        // watch for a click event on the toggle set parent
        this.$button_set.on('click', function(e){
            // negates double click events
            e.preventDefault();
            // get the target button
            var $btn = $(e.target).closest('.button');
            // make sure there is a target button!!
            // if so, toggle it
            if($btn.length > 0) DON.toggle($btn);
            // clear any legacy errors
            if(DON.has_error) DON.clearError();
        });
        // watch for manual changes to the text field as the user types
        this.$field.on('input', function(){
            // clear any legacy errors
            if(DON.has_error) DON.clearError();

            if($(this).val() !== '') {
                // capture the new donation value as a 2 decimal float
                DON.donation_amount = parseFloat($(this).val());
                DON.donation_amount = DON.donation_amount.toFixed(2);
            } else {
                DON.donation_amount = 0;
            }
            // update the totals summary
            DON.updateTotals();
            // reset option buttons appearance to default
            DON.resetButtons();
        });
        // watch for manual change to the input after the field loses focus
        this.$field.on('change', function(){
            // clear any legacy errors
            if(DON.has_error) DON.clearError();
            // run a basic validator over the value
            if(DON.validateAmount($(this).val())) {
                // tidy the input value to 2 decimal places if it has gone over
                DON.donation_amount > 0 ? $(this).val(DON.donation_amount) : $(this).val('Amount');
                // activate the applicable button if the user created value happens to match
                DON.reconcileButtons();
            }
        });
    };

    /**
     * Shaver Image updloads
     */
    function Shaver() {
        // buttons to initiate the nativ upload dialogue
        this.$field_raw_file_trigger = $('[data-upload-trigger]');
        // the file field to grab the local file
        this.$field_raw_file = $('#image-upload');
        // the hidden field to hold the 'before' base64 string
        this.$field_before_image = $('#shaver-before-image');
        // the hidden field to hold the 'after' base64 string
        this.$field_after_image = $('#shaver-after-image');
        // the modal containing the crop UI
        this.$crop_modal = $('#crop-modal');
        // the preview div that is enacted upon by croppie
        this.$crop_preview = $('#crop-preview');
        // saves the croppie outcome to the hidden fields
        this.$get_crop_result_btn = $('#get-crop-result');
        // will be updated to represent before/after
        this.image_scope = '';
    }

    Shaver.prototype.init = function() {
        // preserve this
        var SHV = this;

        // intiate croppie
        //this.before_image_ui = new Croppie(document.getElementById('before-image-raw'));

        // upload trigger click evevnt
        SHV.$field_raw_file_trigger.on('click', function(e){
            // just in case it decides to submit the form
            e.preventDefault();
            // set the image scope based on button clicked. will be 'before' or 'after'
            SHV.image_scope = $(e.target).data('upload-trigger');
            // hit the click event on the corresponding hidden field
            SHV.$field_raw_file.trigger('click');
        });
        // wait for the on change event on the file field
        SHV.$field_raw_file.on('change', function(){

            // reset any error messages
            var upload_error_container = $('[data-upload-error="' + SHV.image_scope + '"]');
            $(upload_error_container).text('');
            $(upload_error_container).closest('.field-row').removeClass('field-row--error');

            // check if the field has a file
            if (this.files && this.files[0]) {
                // check the file is a valid image type
                if(APP.helpers.is_image_file(this.files[0].name) === true) {
                    // construct a new file reader
                    var reader = new FileReader();
                    // when the new filereader finalises, attach the src to the crop preview
                    reader.onload = function (e) {
                        var result = e.target.result;
                        // initialise croppy - https://foliotek.github.io/Croppie/
                        SHV.$crop_preview.croppie({
                            url: result,
                            // requires exif.js (included in package.json) - orientates the image correctly
                            //enableExif: true, [Disabled for now - As not working on firefox]
                            boundary: {width: 250, height: 250},
                            viewport: {width: 150, height: 150}
                        });
                        //launch the modal
                        SHV.$crop_modal.modal('show');
                    };
                    // get the dataUrl
                    reader.readAsDataURL(this.files[0]);
                } else {
                    // output an error message
                    $(upload_error_container).text('Please choose a .jpg, .jpeg or .png image');
                    $(upload_error_container).closest('.field-row').addClass('field-row--error');
                    // kill the modal
                    SHV.$crop_modal.modal('hide');

                }
            }
        });
        // click event attached to the the save image button
        SHV.$get_crop_result_btn.on('click', function(e) {
            // just in case it sneakily submits the form in opera or crappy Safar-IE6
            e.preventDefault();
            // get the croppie result and do something with it...
            SHV.$crop_preview.croppie('result', {
                    type: 'base64',
                    size: {
                        height: 800,
                        width: 800
                    },
                    format: 'jpeg',
                    quality: 1,
                    circle: false
                }).then(function(base64) {
                    // determine where to append the data based on the image_scope
                    switch(SHV.image_scope) {
                        case 'before':
                            SHV.$field_before_image.val(base64);
                            break;
                        case 'after':
                            SHV.$field_after_image.val(base64);
                            break;
                        default:
                            console.error('crop preview was not defined!');
                    }

                    // update teh preview
                    $('[data-preview-image="' + SHV.image_scope + '"]').css({
                        'background-image': 'url(' + base64 + ')'
                    });
                    // hide the modal
                    SHV.$crop_modal.modal('hide');
                });
        });
        // event when the modal closes
        SHV.$crop_modal.on('hide.bs.modal', function() {
            // remove the file from the input value so that it fires onchange even if the same file is chosen
            SHV.$field_raw_file.val('');
            // we need to destroy the current croppie so that they don't stack
            SHV.$crop_preview.croppie('destroy');
        });
    };

    /**
     * category switches
     */
    function Categoryswitch() {

        this.init = function() {

            var Switch = this;

            $(document).on('change', '[data-selector="category-switch"]', function(){
                // navigate to the chosen page
                // current values assume no change to the url structure
                location.assign($(this).val());
            });
        };
    }

    function Backtop() {
        this.$back_top_button = $('#back-top');
    }

    Backtop.prototype.init = function() {
        var BK = this;

        BK.$back_top_button.on('click', function(e) {
            $("html, body").animate({ scrollTop: "0px" });
        });
    };

    function Toggle() {
        this.$button_set = $('[data-toggle="heading"]');
    }

    Toggle.prototype.close_all = function() {

        var $open_headings = $('.toggle__heading'),
            $open_contents = $('.toggle__content'),
            TOG = this;

        $open_headings.removeClass('open');

        // loop through all the content areas and any open ones should have the close method run
        $open_contents.each(function(){
            if($(this).hasClass('open')) {
                TOG.close_content($(this));
            }
        });
    };

    Toggle.prototype.open_content = function($content) {

        var TOG = this;

        // add the open class
        $content.animate({
            'max-height': '9999px'
        }, 500, function(){
            // finally, add the open class
            $content.addClass('open');
            // take user to the newly opened section
            TOG.scroll_to_section($content);
            // anoying
            setTimeout(function(){
                TOG.update_max_height($content);
            }, 1000);
        });
    };

    Toggle.prototype.close_content = function($content) {

        $content.removeClass('open');

        $content.animate({
            'max-height': '0px'
        }, 0, function() {
            $content.removeAttr('style');
        });
    };

    Toggle.prototype.update_max_height = function($content) {
        var max_height = $content.outerHeight();

        $content.css({
            'max-height': (max_height * 2) + 'px'
        });
    };

    Toggle.prototype.open_on_load = function() {
        var $open_contents = $('.toggle__content'),
            TOG = this;

        $open_contents.each(function(){

            if($(this).hasClass('open')) {

                $(this).css({'max-height': '9999px'}).addClass('open');

                setTimeout(function(){
                    TOG.update_max_height($(this));
                }, 500);
            }
        });
    };

    Toggle.prototype.scroll_to_section = function($content) {
        $('html, body').animate({
            scrollTop: ($content.offset().top - 40)
        }, 500);

        var $first_field = $content.find('.field').first();
        if($first_field) $first_field.focus();
    };

    Toggle.prototype.toggle = function($btn) {
        var $heading = $btn.closest('.toggle__heading'),
            $content = $heading.next('.toggle__content');

        // if this is a toggle-all variant, we need to close any open sections first
        if($btn.data('toggle-all') === true) this.close_all();

        $heading.hasClass('open') ? $heading.removeClass('open') : $heading.addClass('open');
        //$content.hasClass('open') ? $content.removeClass('open') : $content.addClass('open');
        $content.hasClass('open') ? this.close_content($content) : this.open_content($content);
    };

    Toggle.prototype.init = function() {
        // preserve the scope of this for use in function
        var TOG = this;
        // open default toggles
        TOG.open_on_load();
        // watch for a click event on a toggle button
        this.$button_set.on('click', function(e){
            // don't link to anywhere
            e.preventDefault();
            // get the target button
            var $btn = $(e.target);
            // make sure there is a target button!!
            // if so, toggle it
            if($btn.length > 0) TOG.toggle($btn);
        });
    };

    /**
     * age check
     */
    function Agecheck() {
        this.$field = $('[data-age-check="trigger"]');
    }

    // show the age message
    Agecheck.prototype.show_message = function($the_field) {
        var message = $the_field.data('age-check-message') || '';
        $the_field
            .closest('.field-row')
            .addClass('field-row--warning')
            .find('.field__hint').text(message);

    };

    // clear the age message
    Agecheck.prototype.clear_message = function($the_field) {
        $the_field
            .closest('.field-row')
            .removeClass('field-row--warning')
            .find('.field__hint').text('');
    };

    // initiate age check
    Agecheck.prototype.init = function() {
        // preserve this
        var AC = this;
        // event firs when a qualifying field value changes
        AC.$field.on('change', function(e) {
            // this is the expected html select:option value if under 18
            $(e.target).val() == 'Under 18' ? AC.show_message($(e.target)) : AC.clear_message($(e.target));
        });
    };

    /**
     * share related functionality
     */
    function Share() {
        // only really dealing wih images at the mo, simon has written links for everything else
        //this.$share_images = $('[data-share-image]');
        this.$share_links = $('[data-share]');
    }

    /**
     * formats a data uri for pinterest share
     */
    Share.prototype.render_for_pinterest = function($link) {

            // define the sarting part of a pinterest share url
        var pinterest_share_url = '//www.pinterest.com/pin/create/button/?',
            // set out an object which is going to defone the param values - property names as per the required param names
            share_params = {
                url: window.location.href,
                media: $link.data('share-image')
            },
            // explode the param object out into a usable string
            params_str = Object.keys(share_params).map(function(key){return key + '=' + encodeURIComponent(share_params[key]);}).join('&');
        // update the share link with the new values
        $link.attr('href', pinterest_share_url + params_str);
    };

    /**
     * initialises the share component
     */
    Share.prototype.init = function() {
        // preserve this;
        var SH = this;
        // run through all the page's share images
        SH.$share_links.each(function(i){
            // reserve the image object
            var $link = $(this);

            // if the image object is pinterest - format the data uri
            if($link.data('share') === 'pinterest') {
                SH.render_for_pinterest($link);
            }
        });
    };

    function Showfield() {
        this.$field = $('[data-show-field]');
    }

    Showfield.prototype.init = function(target) {

        var SF = this;

        SF.$field.on('change', function(e) {

            if( $(e.target).val() === 'True' ){
                $('[data-hidden-field="' + $(e.target).data('show-field') + '"]').show();
            } else {
                $('[data-hidden-field="' + $(e.target).data('show-field') + '"]').hide();
            }
        });
    };

    /**
     * Cookie consent
     */
    function Cookieconsent() {
        this.$cookie_ui = $('[data-cookies="ui"]');
        this.$cookie_accept_btn = $('[data-cookies="accept"]');
        this.cookie_consent_name = '_cookie_consent';
        this.cookie_consent_lifetime = 365;
        this.cookie_consent_value = 'true';
    }

    Cookieconsent.prototype.has_consent = function() {
        var prefix = this.cookie_consent_name + "=";

        if ((document.cookie.indexOf("; " + prefix) == -1) && document.cookie.indexOf(prefix) !== 0) {
            return false;
        } else {
            return true;
        }
    };

    Cookieconsent.prototype.consent = function() {

        // date now
        var d = new Date(),
            expires;

        // set the datetime for however long from now the config defines
        d.setTime(d.getTime() + (this.cookie_consent_lifetime * 24 * 60 * 60 * 1000));
        // use the baove to populate the max-age
        expires = "expires="+ d.toUTCString();
        // set the cookie
        document.cookie = this.cookie_consent_name + "=" + this.cookie_consent_value + ";" + expires + ";path=/";

    };

    Cookieconsent.prototype.init = function() {

        // preserve scope of this
        var CC = this;

        // check if the cookie message needs to be shown
        if(!this.has_consent()) CC.$cookie_ui.addClass('cookies--no-consent');

        CC.$cookie_accept_btn.on('click', function(){
            // remove the no-consent modifier
            CC.$cookie_ui.removeClass('cookies--no-consent');
            // run the consent
            CC.consent();
        });
    };

    function Togglecheckbox() {
        // select all toggleable checkboxes
        this.$checkboxes = $('[data-toggle-checkbox]');
    }

    Togglecheckbox.prototype.init = function() {
        // when any toggleable checkbox changes
        this.$checkboxes.on('change', function(e){
            // if the new value is true
            if($(e.target).prop('checked') === true) {
                // locate all checkboxes within the same data-toggle-checkbox value definition (except 'this' one)
                $('[data-toggle-checkbox="' + $(e.target).data('toggle-checkbox') + '"]').not(this).each(function(){
                    // set to unchecked
                    $(this).prop('checked', false);
                });
            }
        });
    };

    /**
     * Postcode lookup
     */
    function Postcode() {
        this.$search_btn = $('[data-postcode="search"]');
        this.default_btn_text = 'Look up address';
        this.$address_postcode = $('[data-postcode="address-postcode"]');
        this.$address_select = $('[data-postcode="options"]');
        this.address_options = [];
        this.$address_line_1 = $('[data-postcode="address-line-1"]');
        this.$address_line_2 = $('[data-postcode="address-line-2"]');
        this.$address_line_3 = $('[data-postcode="address-line-3"]');
        this.$address_town = $('[data-postcode="address-city"]');
        this.$address_verification_flag = $('#IsPafValid');
    }

    Postcode.prototype.init = function() {

        var POS = this;

        // attach click event ot the postcode search button
        this.$search_btn.on('click', function(e){
            // prevent the for sybmit
            e.preventDefault();
            // kill any existing results if they're present
            POS.$address_select.closest('.field-row').addClass('field-row--hidden');
            if(POS.$address_select.find('option').length > 0) POS.$address_select.find('option').remove().end().niceSelect('update');
            // set the text on the button to indicate a search
            $(this).text('searching...');
            // clear any errors
            POS.clear_error_message();
            // test the input postcode with the field validator
            if(POS.validate_field() === true) {
                POS.find_address();
            }
        });

        this.$address_select.on('change', function(){
            POS.update_address();
        });
    };

    // validates the content of the postcode
    // * currently only checks the postcoce field is not an empty string (does not seek to test format)
    // * only really here as a separate function for purpose of easy expansion if required later
    Postcode.prototype.validate_field = function() {

        if(this.$address_postcode.val() !== '') {
            return true;
        }

        // putput an error message
        this.show_message('Please enter a postcode', 'error');
        // reset the button text
        this.$search_btn.text(this.default_btn_text);

        return false;
    };

    // show a validation message
    Postcode.prototype.show_message = function(message, type) {
        // check for the message type - may need an error class
        if(type == 'error') this.$address_postcode.closest('.field-row').addClass('field-row--error');
        // output the message text
        this.$address_postcode.siblings('.field__hint').text(message);
    };

    // clear a validation message
    Postcode.prototype.clear_error_message = function() {
        this.$address_postcode.closest('.field-row').removeClass('field-row--error');
        this.$address_postcode.siblings('.field__hint').text('');
    };

    // finds the addresses
    Postcode.prototype.find_address = function() {

        // preserve the scope of core Postcode
        var POS = this;

        // store the postcode we're looking for
        var postcode = POS.$address_postcode.val();
        // remove any spaces
        postcode = postcode.replace(/\s+/g, '');
        // set up the request promise
        var address_request = $.ajax({
            url: APP.options.postcode_lookup_endpoint + '?postcode=' + postcode,
            method: 'GET'
        });
        // when the promse resolves successfully
        address_request.done(function(data){
            // reset the button text
            POS.$search_btn.text(POS.default_btn_text);
            // if he response is an array, and the array is empty - show a message to indicate no addresses found
            if(data.constructor === Array && data.length === 0) {
                POS.show_message('No addresses found for this postcode');
            }
            // show the new options in the dropdown
            POS.show_address_options(data);
            // store the current options for later reference
            POS.address_options = data;
        });
        // when the promise fails
        address_request.fail(function(jqXHR, text){
            // reset the button text
            POS.$search_btn.text(POS.default_btn_text);
            // show a message - do no show as a user error
            POS.show_message('Could not retrieve any addresses matching that postcode - please manually enter your address');
            console.error('the GET request to ' + APP.options.postcode_lookup_endpoint + '?postcode=' + postcode + ' failed');
            console.error(jqXHR);
            console.error(text);
        });

    };

    // populate and show the address dropdown
    Postcode.prototype.show_address_options = function(data) {

        // preserve the Postcode scope
        var POS = this;

        if(data.length > 0) {
            POS.$address_select.append($('<option></option>').attr('value', '').text('Please choose your address...'));
        }

        for(var i = 0; i < data.length; i++) {
            POS.$address_select.append($('<option></option>').attr('value', i).text(data[i].CompleteAddress));
        }
        // show the form row
        POS.$address_select.closest('.field-row').removeClass('field-row--hidden');
        // run niceSelect on it
        POS.$address_select.niceSelect('update');

    };

    Postcode.prototype.update_address = function() {
        // preserve Postcode scope
        var POS = this;

        if(POS.$address_select.val() !== '') {
            // store the verified address as a global variable
            window.verified_address = POS.address_options[POS.$address_select.val()];

            for(var line in window.verified_address) {
                if(!window.verified_address[line]) window.verified_address[line] = '';
            }

            // if the data exists, populate it
            POS.$address_line_1.val(window.verified_address.Line1);
            POS.$address_line_2.val(window.verified_address.Line2);
            POS.$address_line_3.val(window.verified_address.Line3);
            POS.$address_town.val(window.verified_address.Town);
            POS.$address_postcode.val(window.verified_address.PostCode);

            // immediately set the verified address flag to true
            POS.set_verified_address_flag(true);
        }
    };

    /**
     * sets the verified address flag input#IsPafValid as value {str} 'True' or 'False'
     * @param {bool} verified is the boolean represenation of either 'True' or 'False'
     */
    Postcode.prototype.set_verified_address_flag = function(verfied) {
        verfied ? this.$address_verification_flag.val('True') : this.$address_verification_flag.val('False');
    };

    // inject the required component dependencies into the APP object.
    // each is assumed to have an init() method which will be called on docuemnt.ready
    APP.components = {
        // define the app navigation
        navigation: new Navigation(),
        // define the standard carousels
        carousel: new Carousel(),
        // define the story carousel
        story_carousel: new Storycarousel(),
        // defone category switches
        category_switches: new Categoryswitch(),
        // define toggle buttons
        donate: new Donate(),
        // define shaver
        shaver: new Shaver(),
        // define backtop
        backtop: new Backtop(),
        // define toggle
        toggle: new Toggle(),
        // define share
        share: new Share(),
        // define age check
        age_check: new Agecheck(),
        // define show field
        show_field: new Showfield(),
        // define cookie consent
        cookie_consent: new Cookieconsent(),
        // gift aid
        toggle_checkbox: new Togglecheckbox(),
        // postcode
        postcode_lookup: new Postcode()
    };

    // initiate all the required components
    APP.init = function() {
        // iterate over the intialisers and run each one
        for(var component in APP.components) {
            // check each property for an initialiser and run it
            if(typeof APP.components[component].init === 'function') {
                APP.components[component].init();
            }
        }
    };

    // wait for jQuery and then run the initialiser
    $(function(){
        APP.init();
        // call the external 'nice select' plugin on all select elements
        $('select').niceSelect();
        // calll the external datepicker intialiser
        $('[data-toggle="datepicker"]').datepicker({
            format: 'dd/mm/yyyy',
            minDate: 0
        });

        /**
         * intercept the form submit to test if the address is changed
         */
        $("#joinForm").submit(function(e){
            // intercept the form submit
            e.preventDefault();
            // preserve the scope of this
            var FORM = this;

            if(window.verified_address) {

                var address_line_1 = $('[data-postcode="address-line-1"]').val(),
                    address_line_2 = $('[data-postcode="address-line-2"]').val(),
                    address_line_3 = $('[data-postcode="address-line-3"]').val(),
                    address_town = $('[data-postcode="address-city"]').val(),
                    address_postcode = $('[data-postcode="address-postcode"]').val();

                if((window.verified_address.Line1 != address_line_1) || (window.verified_address.Line2 != address_line_2) || (window.verified_address.Line3 != address_line_3) || (window.verified_address.Town != address_town) || (window.verified_address.PostCode != address_postcode)) {
                    // set the flag to 'False'
                    APP.components.postcode_lookup.$address_verification_flag.val('False');
                } else {
                    // set the flag to 'True'
                    APP.components.postcode_lookup.$address_verification_flag.val('True');
                }

            } else {
                // set the flag to 'False'
                APP.components.postcode_lookup.$address_verification_flag.val('False');
            }

            FORM.submit();
        });

    });

})(jQuery);
